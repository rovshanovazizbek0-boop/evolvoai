import { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import ContactSection from "@/components/sections/contact";
import BackToTop from "@/components/ui/back-to-top";
import FloatingContact from "@/components/ui/floating-contact";

export const metadata: Metadata = {
  title: "Aloqa - Biz bilan Bog'laning | EvolvoAI",
  description:
    "EvolvoAI bilan bog'laning. Bepul konsultatsiya oling, loyihangizni muhokama qiling. Telegram, email yoki telefon orqali muloqot.",
  keywords: [
    "EvolvoAI aloqa",
    "bog'lanish",
    "konsultatsiya",
    "Telegram bot",
    "contact",
    "murojaat",
  ],
  openGraph: {
    title: "Aloqa - EvolvoAI",
    description: "Biz bilan bog'laning va bepul konsultatsiya oling",
    url: "https://evolvoai.uz/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Page Hero */}
      <div className="pt-32 pb-4 px-6 text-center bg-gradient-to-b from-gray-900 to-gray-900">
        <h1 className="text-5xl md:text-7xl font-black text-white mb-4">
          Aloqa
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Loyihangizni muhokama qilaylik — bepul konsultatsiya taklif qilamiz
        </p>
      </div>

      <ContactSection />

      <Footer />
      <BackToTop />
      <FloatingContact />
    </main>
  );
}
