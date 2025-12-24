import { NextRequest, NextResponse } from "next/server";

// Bu endpoint Gemini Live Audio uchun server-side proxy vazifasini bajaradi
// Client WebSocket orqali ulanadi, biz esa Gemini Live API ga yo'naltiramiz

export async function GET(req: NextRequest) {
  // WebSocket upgrade uchun - GEMINI_API_KEY3 audio uchun alohida
  const apiKey = process.env.GEMINI_API_KEY3 || process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    return NextResponse.json(
      { error: "API key topilmadi" },
      { status: 500 }
    );
  }

  // Return configuration for client
  return NextResponse.json({
    model: "gemini-2.5-flash-native-audio-preview-12-2025",
    apiKey: apiKey, // Client uchun API key
    wsEndpoint: `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent?key=${apiKey}`,
    config: {
      responseModalities: ["AUDIO"],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: {
            voiceName: "Aoede"
          }
        }
      }
    },
    systemInstruction: `Sen EvolvoAI kompaniyasining AI assistentisan. 
    
Kompaniya haqida:
- EvolvoAI - O'zbekistonda AI va web development xizmatlari
- Xizmatlar: Web saytlar, Telegram botlar, AI chatbotlar, biznes avtomatlashtirish

Narxlar:
- Landing Page: 500,000 - 1,500,000 so'm
- Telegram Bot: 300,000 - 2,000,000 so'm
- AI Chatbot: 1,000,000 - 5,000,000 so'm
- Full Web App: 3,000,000 - 15,000,000 so'm

Aloqa:
- Telefon: +998 99 644 84 44
- Email: azizbekboy84@gmail.com
- Telegram: @evolvoai_bot

Qoidalar:
- Har doim O'zbek tilida javob ber
- Qisqa va aniq javob ber
- Do'stona va professional bo'l`
  });
}
