"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Mic, MicOff, Phone, PhoneOff, Bot, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

// Audio context and worklet for processing
interface LiveAudioState {
  isConnected: boolean;
  isListening: boolean;
  isSpeaking: boolean;
  statusText: string;
}

export default function LiveAudioPage() {
  const [state, setState] = useState<LiveAudioState>({
    isConnected: false,
    isListening: false,
    isSpeaking: false,
    statusText: "Ulanish uchun tugmani bosing",
  });

  const wsRef = useRef<WebSocket | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const audioQueueRef = useRef<Float32Array[]>([]);
  const isPlayingRef = useRef(false);

  // Helper: ArrayBuffer to Base64
  const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  // Connect to Gemini Live API
  const connect = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, statusText: "Ulanmoqda..." }));

      // Get config from server
      const configRes = await fetch("/api/live-audio");
      const config = await configRes.json();

      if (config.error) {
        throw new Error(config.error);
      }

      // Create WebSocket connection
      const ws = new WebSocket(config.wsEndpoint);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log("WebSocket connected");
        
        // Send setup message
        const setupMessage = {
          setup: {
            model: `models/${config.model}`,
            generationConfig: {
              responseModalities: ["AUDIO"],
              speechConfig: config.config.speechConfig
            },
            systemInstruction: {
              parts: [{ text: config.systemInstruction }]
            }
          }
        };
        
        ws.send(JSON.stringify(setupMessage));
        setState(prev => ({ 
          ...prev, 
          isConnected: true, 
          statusText: "Ulandi! Mikrofon tugmasini bosing" 
        }));
      };

      ws.onmessage = async (event) => {
        try {
          // Check if data is Blob (binary audio) or string (JSON)
          if (event.data instanceof Blob) {
            // Handle binary audio data directly
            console.log("Received audio blob:", event.data.size, "bytes");
            setState(prev => ({ ...prev, isSpeaking: true }));
            
            // Convert Blob to ArrayBuffer
            const arrayBuffer = await event.data.arrayBuffer();
            const base64Data = arrayBufferToBase64(arrayBuffer);
            await playAudio(base64Data);
            
            setState(prev => ({ ...prev, isSpeaking: false }));
            return;
          }

          // Handle JSON messages
          const data = JSON.parse(event.data);
          console.log("Received JSON:", data);

          // Handle setup complete
          if (data.setupComplete) {
            console.log("Setup complete!");
            return;
          }

          // Handle audio response
          if (data.serverContent?.modelTurn?.parts) {
            for (const part of data.serverContent.modelTurn.parts) {
              if (part.inlineData?.data) {
                setState(prev => ({ ...prev, isSpeaking: true }));
                await playAudio(part.inlineData.data);
              }
            }
          }

          // Handle turn complete
          if (data.serverContent?.turnComplete) {
            setState(prev => ({ ...prev, isSpeaking: false }));
          }
        } catch (e) {
          console.error("Message parse error:", e);
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        setState(prev => ({ 
          ...prev, 
          statusText: "Xatolik yuz berdi" 
        }));
      };

      ws.onclose = () => {
        console.log("WebSocket closed");
        setState(prev => ({ 
          ...prev, 
          isConnected: false, 
          isListening: false,
          statusText: "Uzildi. Qayta ulanish uchun bosing" 
        }));
      };

    } catch (error) {
      console.error("Connection error:", error);
      setState(prev => ({ 
        ...prev, 
        statusText: "Ulanishda xatolik" 
      }));
    }
  }, []);

  // Disconnect
  const disconnect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    setState({
      isConnected: false,
      isListening: false,
      isSpeaking: false,
      statusText: "Ulanish uchun tugmani bosing",
    });
  }, []);

  // Start/stop microphone
  const toggleMicrophone = useCallback(async () => {
    if (state.isListening) {
      // Stop listening
      if (processorRef.current) {
        processorRef.current.disconnect();
        processorRef.current = null;
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
        mediaStreamRef.current = null;
      }
      setState(prev => ({ 
        ...prev, 
        isListening: false, 
        statusText: "Mikrofon o'chirildi" 
      }));
      return;
    }

    try {
      setState(prev => ({ ...prev, statusText: "Mikrofon so'ralmoqda..." }));

      // Get microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
        } 
      });
      mediaStreamRef.current = stream;

      // Create audio context
      const audioContext = new AudioContext({ sampleRate: 16000 });
      audioContextRef.current = audioContext;

      const source = audioContext.createMediaStreamSource(stream);
      const processor = audioContext.createScriptProcessor(4096, 1, 1);
      processorRef.current = processor;

      processor.onaudioprocess = (e) => {
        if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;

        const inputData = e.inputBuffer.getChannelData(0);
        
        // Convert float32 to int16
        const int16Data = new Int16Array(inputData.length);
        for (let i = 0; i < inputData.length; i++) {
          const s = Math.max(-1, Math.min(1, inputData[i]));
          int16Data[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
        }

        // Send to WebSocket - convert to base64
        const uint8Array = new Uint8Array(int16Data.buffer);
        let binary = '';
        for (let i = 0; i < uint8Array.length; i++) {
          binary += String.fromCharCode(uint8Array[i]);
        }
        const base64Audio = btoa(binary);
        
        const message = {
          realtimeInput: {
            mediaChunks: [{
              mimeType: "audio/pcm;rate=16000",
              data: base64Audio
            }]
          }
        };

        wsRef.current.send(JSON.stringify(message));
      };

      source.connect(processor);
      processor.connect(audioContext.destination);

      setState(prev => ({ 
        ...prev, 
        isListening: true, 
        statusText: "🎤 Gaplashing..." 
      }));

    } catch (error) {
      console.error("Microphone error:", error);
      setState(prev => ({ 
        ...prev, 
        statusText: "Mikrofon xatosi" 
      }));
    }
  }, [state.isListening]);

  // Play received audio
  const playAudio = async (base64Data: string) => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext({ sampleRate: 24000 });
      }

      const audioContext = audioContextRef.current;
      
      // Decode base64 to ArrayBuffer
      const binaryString = atob(base64Data);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      // Convert Int16 PCM to Float32
      const int16Data = new Int16Array(bytes.buffer);
      const float32Data = new Float32Array(int16Data.length);
      for (let i = 0; i < int16Data.length; i++) {
        float32Data[i] = int16Data[i] / 32768.0;
      }

      // Create audio buffer
      const audioBuffer = audioContext.createBuffer(1, float32Data.length, 24000);
      audioBuffer.getChannelData(0).set(float32Data);

      // Play
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.start();

    } catch (error) {
      console.error("Audio playback error:", error);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary-500 to-purple-600 flex items-center justify-center">
          <Bot className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">
          EvolvoAI Live Audio
        </h1>
        <p className="text-gray-400">
          Real-time ovozli suhbat
        </p>
      </motion.div>

      {/* Status */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-8 text-center"
      >
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
          state.isConnected ? "bg-green-500/20 text-green-400" : "bg-gray-800 text-gray-400"
        }`}>
          <div className={`w-2 h-2 rounded-full ${
            state.isConnected ? "bg-green-500 animate-pulse" : "bg-gray-500"
          }`} />
          {state.statusText}
        </div>
        
        {state.isSpeaking && (
          <div className="mt-2 flex items-center justify-center gap-2 text-purple-400">
            <Volume2 className="w-5 h-5 animate-pulse" />
            <span>AI gaplashmoqda...</span>
          </div>
        )}
      </motion.div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        {/* Connect/Disconnect */}
        <Button
          size="lg"
          onClick={state.isConnected ? disconnect : connect}
          className={`w-16 h-16 rounded-full ${
            state.isConnected 
              ? "bg-red-500 hover:bg-red-600" 
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {state.isConnected ? (
            <PhoneOff className="w-8 h-8" />
          ) : (
            <Phone className="w-8 h-8" />
          )}
        </Button>

        {/* Microphone */}
        {state.isConnected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            <Button
              size="lg"
              onClick={toggleMicrophone}
              disabled={!state.isConnected}
              className={`w-20 h-20 rounded-full transition-all ${
                state.isListening 
                  ? "bg-purple-500 hover:bg-purple-600 animate-pulse shadow-lg shadow-purple-500/50" 
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              {state.isListening ? (
                <Mic className="w-10 h-10" />
              ) : (
                <MicOff className="w-10 h-10 text-gray-400" />
              )}
            </Button>
          </motion.div>
        )}
      </div>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-8 text-center text-gray-500 text-sm max-w-md"
      >
        <p>1. 📞 Yashil tugmani bosib ulaning</p>
        <p>2. 🎤 Mikrofon tugmasini bosib gaplashing</p>
        <p>3. 🔊 AI real-time javob beradi</p>
      </motion.div>

      {/* Info */}
      <div className="mt-8 text-xs text-gray-600">
        Model: gemini-2.5-flash-native-audio-preview-12-2025
      </div>
    </div>
  );
}
