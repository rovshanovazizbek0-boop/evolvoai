// Gemini 2.5 Flash Native Audio Test
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("❌ GEMINI_API_KEY topilmadi!");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function testAudioModel() {
  console.log("🔊 Gemini Audio Model Testini Boshlash...\n");

  try {
    // Model nomi
    const modelName = "gemini-2.5-flash-preview-tts";
    console.log(`📌 Model: ${modelName}`);

    const model = genAI.getGenerativeModel({
      model: modelName,
    });

    // Oddiy text request
    const prompt = "Salom, EvolvoAI kompaniyasiga xush kelibsiz!";
    console.log(`📝 Prompt: ${prompt}\n`);

    console.log("⏳ Audio generatsiya qilinyapti...");
    
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseModalities: ["AUDIO"],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {
              voiceName: "Aoede"
            }
          }
        }
      }
    });

    const response = result.response;
    console.log("\n✅ Javob keldi!");
    console.log("Response:", JSON.stringify(response, null, 2).substring(0, 500));

    // Audio data tekshirish
    if (response.candidates && response.candidates[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          console.log("\n🎵 Audio data topildi!");
          console.log("MIME type:", part.inlineData.mimeType);
          console.log("Data length:", part.inlineData.data?.length || 0, "bytes");
        }
      }
    }

  } catch (error: any) {
    console.error("\n❌ Xatolik:", error.message || error);
    if (error.response) {
      console.error("Response:", error.response);
    }
  }
}

// Model ro'yxatini olish
async function listModels() {
  console.log("\n📋 Mavjud modellar ro'yxati:");
  try {
    const models = await genAI.listModels();
    for await (const model of models) {
      if (model.name?.includes("audio") || model.name?.includes("tts") || model.name?.includes("flash")) {
        console.log(`  - ${model.name}`);
      }
    }
  } catch (e: any) {
    console.error("Modellar ro'yxatini olishda xato:", e.message);
  }
}

async function main() {
  await listModels();
  await testAudioModel();
}

main();
