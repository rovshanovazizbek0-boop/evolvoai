import { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import PricingSection from "@/components/sections/pricing";
import BackToTop from "@/components/ui/back-to-top";
import FloatingContact from "@/components/ui/floating-contact";

export const metadata: Metadata = {
  title: "Narxlar - EvolvoAI",
  description:
    "EvolvoAI xizmatlarining narxlari. Starter, Pro va Enterprise rejalari. O'zingizga mos rejani tanlang.",
  keywords: [
    "web sayt narxi",
    "Telegram bot narxi",
    "AI xizmat narxi",
    "EvolvoAI narxlar",
    "dasturlash xizmati narxi",
  ],
  openGraph: {
    title: "Narxlar - EvolvoAI",
    description: "Har bir biznes uchun qulay narxlar va rejalari",
    url: "https://evolvoai.uz/pricing",
  },
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />

      {/* Page Hero */}
      <div className="pt-32 pb-4 px-6 text-center bg-gradient-to-b from-gray-900 to-transparent">
        <h1 className="text-5xl md:text-7xl font-black text-white mb-4">
          Narxlar
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Har bir biznes uchun qulay va shaffof narxlar
        </p>
      </div>

      <PricingSection />

      {/* FAQ CTA */}
      <div className="py-16 text-center bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-600 dark:text-gray-400 mb-4 text-lg">
          Narxlar haqida savol bormi?
        </p>
        <a
          href="/faq"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-all hover:scale-105 mr-4"
          style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }}
        >
          FAQ ni ko&apos;ring
        </a>
        <a
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold border-2 border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white transition-all"
        >
          Biz bilan bog&apos;laning
        </a>
      </div>

      <Footer />
      <BackToTop />
      <FloatingContact />
    </main>
  );
}
