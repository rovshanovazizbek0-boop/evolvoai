"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/context/i18n";

interface NavbarProps {
  forceWhite?: boolean;
}

export default function Navbar({ forceWhite = false }: NavbarProps = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { lang, setLang, t } = useI18n();

  const navItems = [
    { name: t("nav", "home"), href: "/" },
    { name: t("nav", "services"), href: "/#services" },
    { name: t("nav", "pricing"), href: "/#pricing" },
    { name: t("nav", "portfolio"), href: "/#portfolio" },
    { name: t("nav", "blog"), href: "/blog" },
    { name: t("nav", "faq"), href: "/#faq" },
    { name: t("nav", "contact"), href: "/#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        forceWhite || isScrolled
          ? "bg-gray-900/80 backdrop-blur-lg shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative">
              <Sparkles className={`w-8 h-8 ${
                isScrolled ? "text-primary-500" : "text-white"
              }`} />
              <div className={`absolute inset-0 blur-xl animate-pulse ${
                isScrolled ? "bg-primary-500/30" : "bg-white/30"
              }`}></div>
            </div>
            <span className={`text-2xl font-bold ${
              isScrolled ? "text-gradient" : "text-white"
            }`}>EvolvoAI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white hover:text-primary-400 transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Language Selector & CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative group">
              <button className="px-3 py-2 text-white hover:text-primary-400 font-medium bg-white/5 border border-white/10 rounded-xl transition-all flex items-center space-x-1.5 uppercase text-sm">
                <span>🌐 {lang}</span>
              </button>
              <div className="absolute right-0 top-full mt-2 w-32 bg-gray-950 border border-white/10 rounded-xl shadow-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <button onClick={() => setLang("uz")} className={`w-full px-4 py-2.5 text-left text-sm hover:bg-white/5 transition-colors text-white ${lang === "uz" ? "text-primary-400 font-bold" : ""}`}>O'zbekcha</button>
                <button onClick={() => setLang("ru")} className={`w-full px-4 py-2.5 text-left text-sm hover:bg-white/5 transition-colors text-white ${lang === "ru" ? "text-primary-400 font-bold" : ""}`}>Русский</button>
                <button onClick={() => setLang("en")} className={`w-full px-4 py-2.5 text-left text-sm hover:bg-white/5 transition-colors text-white ${lang === "en" ? "text-primary-400 font-bold" : ""}`}>English</button>
              </div>
            </div>
            <Button asChild variant="gradient" size="lg">
              <a href="#contact">{t("nav", "order")}</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled
                ? "hover:bg-gray-100 dark:hover:bg-gray-800"
                : "hover:bg-white/10"
            }`}
          >
            {isOpen ? (
              <X className={isScrolled ? "w-6 h-6" : "w-6 h-6 text-white"} />
            ) : (
              <Menu className={isScrolled ? "w-6 h-6" : "w-6 h-6 text-white"} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
          >
            <div className="px-4 py-4 space-y-3">
              {/* Language switcher for mobile */}
              <div className="flex items-center space-x-2 px-4 py-2 border-b border-gray-200 dark:border-gray-800">
                <button onClick={() => setLang("uz")} className={`px-3 py-1.5 text-xs rounded-lg border ${lang === "uz" ? "bg-primary-500 text-white border-primary-500" : "bg-transparent text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700"}`}>UZ</button>
                <button onClick={() => setLang("ru")} className={`px-3 py-1.5 text-xs rounded-lg border ${lang === "ru" ? "bg-primary-500 text-white border-primary-500" : "bg-transparent text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700"}`}>RU</button>
                <button onClick={() => setLang("en")} className={`px-3 py-1.5 text-xs rounded-lg border ${lang === "en" ? "bg-primary-500 text-white border-primary-500" : "bg-transparent text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700"}`}>EN</button>
              </div>

              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <Button asChild variant="gradient" className="w-full" size="lg">
                <a href="#contact" onClick={() => setIsOpen(false)}>{t("nav", "order")}</a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
