import { GoogleGenerativeAI } from "@google/generative-ai";

// API keys with fallback support (up to 3 keys)
const API_KEYS = [
  process.env.GEMINI_API_KEY,
  process.env.GEMINI_API_KEY2,
  process.env.GEMINI_API_KEY3,
].filter(Boolean) as string[];

if (API_KEYS.length === 0) {
  throw new Error("No GEMINI_API_KEY configured in environment variables");
}

// Create clients for each API key
const clients = API_KEYS.map(key => new GoogleGenerativeAI(key));

export const categories = [
  "biznes",
  "texnologiya",
  "marketing",
  "AI",
  "dasturlash",
  "startaplar",
  "dizayn",
  "sotsiomedia",
  "e-commerce",
  "avtomatlashtirish",
  "chatbotlar",
  "SEO",
];

export interface GeneratedContent {
  title: string;
  excerpt: string;
  content: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
}

const prompt = (category: string) => `Sen professional ${category} bo'yicha kontent yozuvchisan. 
O'zbek auditoriyasi uchun qiziqarli, amaliy va SEO-optimallashtirilgan blog post yarat. 

Mavzu: ${category} sohasida dolzarb va amaliy mavzu tanlang
Format:
- Catchy sarlavha (50-60 belgi)
- Qisqa kirish (150-160 belgi) - bu excerpt bo'ladi
- Asosiy kontent (800-1200 so'z):
  * Kirish qismi (2-3 paragraf)
  * 3-4 ta asosiy bo'lim (har biri subheading bilan)
  * Amaliy maslahatlar yoki misollar
  * Xulosa + CTA
- SEO sarlavha (60 belgi)
- SEO tavsif (150-160 belgi)
- 5-8 ta kalit so'z (vergul bilan ajratilgan)

Ton: professional, do'stona, sodda tilda
Format: Markdown

Javobni quyidagi JSON formatda qaytaring:
{
  "title": "Blog post sarlavhasi",
  "excerpt": "Qisqa tavsif",
  "content": "To'liq markdown kontent",
  "seoTitle": "SEO sarlavha",
  "seoDescription": "SEO tavsif",
  "keywords": ["kalit1", "kalit2", "kalit3"]
}`;

// Generate content with a specific client and model
async function generateWithClient(
  client: GoogleGenerativeAI, 
  category: string,
  keyIndex: number,
  modelName: string = "gemini-2.0-flash"
): Promise<GeneratedContent> {
  const model = client.getGenerativeModel({ model: modelName });
  
  console.log(`[Gemini] Using API key ${keyIndex + 1}/${clients.length} with model ${modelName}`);
  
  const result = await model.generateContent(prompt(category));
  const response = await result.response;
  const text = response.text();

  // Clean the response and parse JSON
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("Failed to parse JSON from Gemini response");
  }

  const parsedContent: GeneratedContent = JSON.parse(jsonMatch[0]);

  // Validate required fields
  if (!parsedContent.title || !parsedContent.content) {
    throw new Error("Generated content is missing required fields");
  }

  return parsedContent;
}

export async function generateBlogPost(category: string): Promise<GeneratedContent> {
  let lastError: Error | null = null;
  const models = ["gemini-2.0-flash", "gemini-1.5-flash"];

  // Try each combination of Model + API Key
  for (const modelName of models) {
    for (let i = 0; i < clients.length; i++) {
      try {
        return await generateWithClient(clients[i], category, i, modelName);
      } catch (error: any) {
        lastError = error;
        
        // Log warning but continue to next option
        console.warn(`[Gemini] Failed with Key ${i + 1} & Model ${modelName}: ${error?.message?.substring(0, 100)}...`);
        
        // If it's a quota error or 503 (overloaded), continue. 
        // For other fatal errors (like invalid prompt), we might want to throw, but safer to try all options.
        continue;
      }
    }
  }

  // All combinations failed
  console.error(`[Gemini] All keys and models failed. Last error:`, lastError);
  throw lastError || new Error("All API keys and models exhausted");
}

export async function generateMultiplePosts(
  categories: string[],
  maxConcurrent: number = 3
): Promise<Array<{ category: string; content: GeneratedContent | null; error?: string }>> {
  const results: Array<{ category: string; content: GeneratedContent | null; error?: string }> = [];

  // Process in batches to avoid rate limiting
  for (let i = 0; i < categories.length; i += maxConcurrent) {
    const batch = categories.slice(i, i + maxConcurrent);
    const batchPromises = batch.map(async (category) => {
      try {
        const content = await generateBlogPost(category);
        return { category, content };
      } catch (error) {
        return {
          category,
          content: null,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    });

    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults);

    // Wait a bit between batches to avoid rate limiting
    if (i + maxConcurrent < categories.length) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  return results;
}
