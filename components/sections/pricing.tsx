"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Check, Sparkles, Zap, Rocket } from "lucide-react";
import { useI18n } from "@/context/i18n";

export default function PricingSection() {
  const { lang, t } = useI18n();

  const pricingPlans = [
    {
      name: t("pricing", "starter"),
      icon: Sparkles,
      price: "500,000",
      period: lang === "uz" ? "dan boshlab" : (lang === "ru" ? "от" : "starting from"),
      description: t("pricing", "starterDesc"),
      features: [
        "Landing page / Portfolio",
        "Responsive dizayn",
        "SEO asoslari",
        "Contact forma",
        "1 oy bepul qo'llab-quvvatlash",
        "Hosting va domen setup",
      ],
      popular: false,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      name: t("pricing", "pro"),
      icon: Zap,
      price: "1,500,000",
      period: lang === "uz" ? "dan boshlab" : (lang === "ru" ? "от" : "starting from"),
      description: t("pricing", "proDesc"),
      features: [
        "Multi-page web sayt",
        "Admin panel",
        "Telegram bot integratsiya",
        "CRM integratsiya",
        "To'lov sistemalari",
        "SEO optimizatsiya",
        "3 oy texnik qo'llab-quvvatlash",
        "Analytics & Reporting",
      ],
      popular: true,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      name: t("pricing", "enterprise"),
      icon: Rocket,
      price: lang === "uz" ? "Shartnoma" : (lang === "ru" ? "Договорная" : "Contract"),
      period: lang === "uz" ? "asosida" : (lang === "ru" ? "на основе" : "based"),
      description: t("pricing", "enterpriseDesc"),
      features: [
        "Custom web ilova",
        "AI Chatbot integratsiya",
        "Biznes avtomatlashtirish",
        "API rivojlantirish",
        "Ma'lumot tahlili",
        "Cloud infrastructure",
        "Maxsus dizayn va funksiyalar",
        "24/7 texnik qo'llab-quvvatlash",
        "Davomiy rivojlantirish",
      ],
      popular: false,
      gradient: "from-orange-500 to-red-500",
    },
  ];

  const handleCheckout = async (planName: string, price: string) => {
    if (planName === "Enterprise" || planName === "Корпоративный" || planName === "Contract") {
      window.location.hash = "#contact";
      return;
    }
    
    try {
      console.log(`Initiating checkout for plan: ${planName}`);
      const response = await fetch("/api/payments/click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planName, price }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        window.location.hash = "#contact";
      }
    } catch (e) {
      window.location.hash = "#contact";
    }
  };

  return (
    <section id="pricing" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t("pricing", "title")}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t("pricing", "subtitle")}
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="bg-gradient-to-r from-primary-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                    ⭐ {t("pricing", "popular")}
                  </span>
                </div>
              )}
              <Card
                className={`h-full border-2 transition-all duration-300 ${
                  plan.popular
                    ? "border-primary-500 shadow-xl shadow-primary-500/20 scale-105"
                    : "border-gray-200 dark:border-gray-800 hover:border-primary-500 hover:shadow-xl"
                }`}
              >
                <CardHeader>
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center mb-4`}
                  >
                    <plan.icon className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-base">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      {plan.price !== "Shartnoma" && plan.price !== "Договорная" && plan.price !== "Contract" && (
                        <span className="text-gray-500 ml-1">so'm</span>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">{plan.period}</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="w-5 h-5 text-primary-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={plan.popular ? "gradient" : "outline"}
                    className="w-full"
                    size="lg"
                    onClick={() => handleCheckout(plan.name, plan.price)}
                  >
                    {t("pricing", "buyNow")}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            🎁 Maxsus chegirmalar: Ikkinchi loyiha uchun 20% chegirma, 3+ loyihalar uchun maxsus narxlar
          </p>
          <p className="text-sm text-gray-500">
            * Barcha narxlar taxminiy va loyiha talablariga qarab o'zgarishi mumkin
          </p>
        </motion.div>
      </div>
    </section>
  );
}
