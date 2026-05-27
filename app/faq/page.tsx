import { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import FAQSection from "@/components/sections/faq";
import ContactSection from "@/components/sections/contact";
import BackToTop from "@/components/ui/back-to-top";
import FloatingContact from "@/components/ui/floating-contact";

export const metadata: Metadata = {
  title: "FAQ - Ko'p So'raladigan Savollar | EvolvoAI",
  description:
    "EvolvoAI xizmatlari haqida tez-tez so'raladigan savollar va javoblar. Loyiha muddati, narxlar, qo'llab-quvvatlash va boshqa mavzular.",
  keywords: [
    "FAQ",
    "savollar javoblar",
    "EvolvoAI FAQ",
    "loyiha vaqti",
    "texnik qo'llab-quvvatlash",
  ],
  openGraph: {
    title: "FAQ - EvolvoAI",
    description: "Tez-tez so'raladigan savollarga to'liq javoblar",
    url: "https://evolvoai.uz/faq",
  },
};

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />

      {/* Page Hero */}
      <div className="pt-32 pb-4 px-6 text-center bg-gradient-to-b from-gray-900 to-transparent">
        <h1 className="text-5xl md:text-7xl font-black text-white mb-4">
          Savollar & Javoblar
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Eng ko&apos;p so&apos;raladigan savollarga batafsil javoblar
        </p>
      </div>

      <FAQSection />

      {/* Separator before contact */}
      <div className="py-4 bg-white dark:bg-gray-900 text-center">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          Javob topa olmadingizmi? Bizga yozing 👇
        </p>
      </div>

      <ContactSection />

      <Footer />
      <BackToTop />
      <FloatingContact />
    </main>
  );
}
