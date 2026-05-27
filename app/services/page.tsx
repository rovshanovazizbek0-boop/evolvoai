import { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import ServicesSection from "@/components/sections/services";
import WorkflowSection from "@/components/sections/workflow";
import TechStackSection from "@/components/sections/tech-stack";
import BackToTop from "@/components/ui/back-to-top";
import FloatingContact from "@/components/ui/floating-contact";

export const metadata: Metadata = {
  title: "Xizmatlar - EvolvoAI",
  description:
    "EvolvoAI tomonidan taqdim etiladigan professional AI xizmatlari: web sayt, Telegram bot, AI chatbot va biznes avtomatlashtirish.",
  keywords: [
    "web sayt yaratish",
    "Telegram bot",
    "AI chatbot",
    "biznes avtomatlashtirish",
    "EvolvoAI xizmatlari",
  ],
  openGraph: {
    title: "Xizmatlar - EvolvoAI",
    description: "Professional AI va dasturlash xizmatlari",
    url: "https://evolvoai.uz/services",
  },
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />

      {/* Page Hero */}
      <div className="pt-32 pb-4 px-6 text-center bg-gradient-to-b from-gray-900 to-transparent">
        <h1 className="text-5xl md:text-7xl font-black text-white mb-4">
          Xizmatlarimiz
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Biznesingizni kelajakka olib chiquvchi zamonaviy AI va dasturlash
          yechimlari
        </p>
      </div>

      <ServicesSection />
      <WorkflowSection />
      <TechStackSection />

      <Footer />
      <BackToTop />
      <FloatingContact />
    </main>
  );
}
