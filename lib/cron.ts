import cron from "node-cron";
import { categories } from "./gemini";

export function setupCronJobs() {
  // HOURLY content generation - every hour at minute 0
  cron.schedule("0 * * * *", async () => {
    console.log("🚀 Running hourly blog post generation...");
    
    try {
      // Select random category for hourly post
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

  // Additional: Every 3 hours - Trend post (from Google Search)
  cron.schedule("30 */3 * * *", async () => {
    console.log("🔥 Running trend post generation...");
    
    try {
      const trendCategories = ["biznes", "texnologiya", "AI", "startaplar"];
      const randomTrend = trendCategories[Math.floor(Math.random() * trendCategories.length)];
      
      // This would call the trend generation API if we add one
      // For now, using regular generation with trend-focused prompt
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

  console.log("⏰ Cron jobs configured: Hourly posts + 3-hourly trends");
}

