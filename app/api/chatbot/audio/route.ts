import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json(
        { error: "Matn bo'sh bo'lmasligi kerak" },
        { status: 400 }
      );
    }

    // Gemini TTS model
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-preview-tts",
    });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text }] }],
      generationConfig: {
        responseModalities: ["AUDIO"],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {
              voiceName: "Aoede" // Ayol ovozi
            }
          }
        }
      } as any
    });

    const response = result.response;

    // Audio data olish
    if (response.candidates && response.candidates[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if ((part as any).inlineData) {
          const audioData = (part as any).inlineData;
          
          // PCM ni WAV formatiga o'girish
          const pcmData = Buffer.from(audioData.data, 'base64');
          const wavData = pcmToWav(pcmData, 24000, 1, 16);
          
          // Use Response with ArrayBuffer
          return new Response(wavData as unknown as BodyInit, {
            status: 200,
            headers: {
              "Content-Type": "audio/wav",
              "Content-Length": wavData.length.toString(),
            },
          });
        }
      }
    }

    return NextResponse.json(
      { error: "Audio generatsiya qilinmadi" },
      { status: 500 }
    );
  } catch (error) {
    console.error("Audio generation error:", error);
    return NextResponse.json(
      { error: "Audio generatsiya qilishda xatolik" },
      { status: 500 }
    );
  }
}

// PCM to WAV converter
function pcmToWav(pcmData: Buffer, sampleRate: number, numChannels: number, bitsPerSample: number): Buffer {
  const byteRate = sampleRate * numChannels * (bitsPerSample / 8);
  const blockAlign = numChannels * (bitsPerSample / 8);
  const dataSize = pcmData.length;
  const headerSize = 44;
  const fileSize = headerSize + dataSize;

  const buffer = Buffer.alloc(fileSize);

  // RIFF header
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(fileSize - 8, 4);
  buffer.write('WAVE', 8);

  // fmt chunk
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16); // fmt chunk size
  buffer.writeUInt16LE(1, 20); // audio format (PCM)
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(bitsPerSample, 34);

  // data chunk
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);
  pcmData.copy(buffer, 44);

  return buffer;
}
