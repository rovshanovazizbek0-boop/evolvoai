import cron from "node-cron";
import { categories } from "./gemini";

export function setupCronJobs() {
  // HOURLY content generation - 06:00 to 22:00 Tashkent time (UTC+5)
  // UTC hours: 01:00 to 17:00 (1-17)
  cron.schedule("0 1-17 * * *", async () => {
    console.log("🚀 Running hourly blog post generation...");
    
    try {
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.CRON_SECRET}`,
        },
        body: JSON.stringify({ category: randomCategory }),
      });

      const result = await response.json();
      console.log(`✅ Hourly post generated [${randomCategory}]:`, result.title || result);
    } catch (error) {
      console.error("❌ Error in hourly cron job:", error);
    }
  });

  // Trend posts - every 3 hours during active hours (08:30, 11:30, 14:30, 17:30, 20:30 Tashkent)
  // UTC: 03:30, 06:30, 09:30, 12:30, 15:30
  cron.schedule("30 3,6,9,12,15 * * *", async () => {
    console.log("🔥 Running trend post generation...");
    
    try {
      const trendCategories = ["biznes", "texnologiya", "AI", "startaplar"];
      const randomTrend = trendCategories[Math.floor(Math.random() * trendCategories.length)];
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.CRON_SECRET}`,
        },
        body: JSON.stringify({ category: randomTrend, type: "trend" }),
      });

      const result = await response.json();
      console.log(`🔥 Trend post generated [${randomTrend}]:`, result.title || result);
    } catch (error) {
      console.error("❌ Error in trend cron job:", error);
    }
  });

  console.log("⏰ Cron: Hourly 06:00-22:00 Tashkent + 5 trend posts/day");
}


