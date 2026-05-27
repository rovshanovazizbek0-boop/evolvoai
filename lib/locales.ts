export type SectionKey = "nav" | "hero" | "services" | "pricing" | "faq" | "contact" | "footer";

export interface TranslationKey {
  [key: string]: string | Record<string, string>;
}

export const translations: Record<"uz" | "ru" | "en", Record<SectionKey, TranslationKey>> = {
  uz: {
    nav: {
      home: "Asosiy",
      services: "Xizmatlar",
      portfolio: "Portfolio",
      blog: "Blog",
      faq: "FAQ",
      pricing: "Narxlar",
      contact: "Aloqa",
      order: "Bepul konsultatsiya"
    },
    hero: {
      badge: "🤖 Sun'iy intellekt agentligi",
      titlePre: "Biznesingizni",
      titleHighlight: "AI Innovatsiyalari",
      titlePost: "Bilan Kengaytiring",
      subtitle: "EvolvoAI - zamonaviy veb-ilova dizayni, avtomatlashtirish va sun'iy intellekt integratsiyasi orqali sizning biznes jarayonlaringizni raqamlashtiradi va sotuvlaringizni oshiradi.",
      ctaPrimary: "Bepul konsultatsiya",
      ctaSecondary: "Portfolio ko'rish",
      statClients: "Mamnun Mijozlar",
      statProjects: "Tugallangan Loyihalar",
      statYears: "Yillik Tajriba"
    },
    services: {
      title: "Bizning Xizmatlar",
      subtitle: "Eng zamonaviy sun'iy intellekt modellari va yuqori darajadagi dizayn yechimlari bilan biznesingizni yangi darajaga olib chiqing.",
      webDevTitle: "Premium Veb-Dasturlash",
      webDevDesc: "Framer, Next.js va Tailwind CSS yordamida tezkor, chiroyli va SEO-optallashtirilgan mukammal veb-saytlar yaratish.",
      aiIntegrateTitle: "AI Integratsiyasi",
      aiIntegrateDesc: "Biznes jarayonlariga OpenAI, Gemini va maxsus LLM modellarini, chatbotlar va avtomatlashtirish tizimlarini joriy qilish.",
      botDevTitle: "Telegram Botlar",
      botDevDesc: "Murakkab biznes funksiyalariga ega bo'lgan, CRM va to'lov tizimlari bilan integratsiyalashgan yuqori tezlikdagi botlar.",
      designTitle: "Premium UX/UI Dizayn",
      designDesc: "Premium brending, foydalanuvchilar tajribasini yuksaltiruvchi va sotuvlarni oshiruvchi zamonaviy interfeys dizaynlari."
    },
    pricing: {
      title: "Moslashuvchan Narxlar",
      subtitle: "Sizning biznesingiz hajmiga va ehtiyojlariga mos keladigan professional tarif rejalarimiz bilan tanishing.",
      starter: "Starter",
      starterDesc: "Kichik biznes va shaxsiy brendlar uchun boshlang'ich yechim",
      pro: "Professional",
      proDesc: "Tez o'sayotgan kompaniyalar va to'liq avtomatlashtirish istagidagilar uchun",
      enterprise: "Enterprise",
      enterpriseDesc: "Katta tashkilotlar uchun maxsus moslashtirilgan xizmatlar",
      buyNow: "Xarid qilish",
      popular: "Eng ommabop",
      features: "Imkoniyatlar"
    },
    faq: {
      title: "Ko'p Beriladigan Savollar",
      subtitle: "Loyihangiz bo'yicha eng tez-tez so'raladigan savollarga javob toping."
    },
    contact: {
      title: "Loyihangizni Boshlang",
      subtitle: "G'oyalaringizni haqiqatga aylantirish vaqti keldi. Biz bilan bog'laning va bepul konsultatsiyaga ega bo'ling.",
      nameLabel: "Ismingiz",
      namePlaceholder: "Alisher Usmonov",
      emailLabel: "Elektron pochta",
      emailPlaceholder: "example@domain.com",
      phoneLabel: "Telefon raqamingiz",
      phonePlaceholder: "+998 90 123 45 67",
      msgLabel: "Xabaringiz",
      msgPlaceholder: "Loyihangiz haqida batafsil yozing...",
      submitButton: "Xabar yuborish",
      sendingButton: "Yuborilmoqda..."
    },
    footer: {
      desc: "Sun'iy intellekt va eng ilg'or texnologiyalar yordamida biznesingizni rivojlantirishga ko'maklashuvchi raqamli innovatsiyalar agentligi.",
      newsletter: "Yangiliklar byulleteni",
      newsletterDesc: "Eng so'nggi texnologik tendensiyalar va yangiliklardan boxabar bo'ling.",
      subPlaceholder: "Sizning elektron pochtangiz",
      subscribe: "A'zo bo'lish",
      rights: "Barcha huquqlar himoyalangan."
    }
  },
  ru: {
    nav: {
      home: "Главная",
      services: "Услуги",
      portfolio: "Портфолио",
      blog: "Блог",
      faq: "FAQ",
      pricing: "Цены",
      contact: "Контакты",
      order: "Бесплатная консультация"
    },
    hero: {
      badge: "🤖 Агентство искусственного интеллекта",
      titlePre: "Масштабируйте",
      titleHighlight: "ИИ Инновации",
      titlePost: "Свой Бизнес",
      subtitle: "EvolvoAI оцифровывает ваши бизнес-процессы и увеличивает продажи с помощью передового веб-дизайна, автоматизации и интеграции искусственного интеллекта.",
      ctaPrimary: "Бесплатная консультация",
      ctaSecondary: "Посмотреть портфолио",
      statClients: "Довольных клиентов",
      statProjects: "Готовых проектов",
      statYears: "Лет опыта"
    },
    services: {
      title: "Наши Услуги",
      subtitle: "Выведите свой бизнес на новый уровень с помощью новейших моделей искусственного интеллекта и передовых дизайнерских решений.",
      webDevTitle: "Премиум Веб-Разработка",
      webDevDesc: "Создание быстрых, красивых и оптимизированных для SEO веб-сайтов с использованием Framer, Next.js и Tailwind CSS.",
      aiIntegrateTitle: "Интеграция ИИ",
      aiIntegrateDesc: "Внедрение OpenAI, Gemini, специализированных LLM-моделей, чат-ботов и систем автоматизации в бизнес-процессы.",
      botDevTitle: "Telegram Боты",
      botDevDesc: "Высокоскоростные боты со сложными бизнес-функциями, интегрированные с CRM и платежными системами.",
      designTitle: "Премиум UX/UI Дизайн",
      designDesc: "Современный интерфейсный дизайн для премиум-брендинга, повышающий удобство использования и увеличивающий продажи."
    },
    pricing: {
      title: "Гибкие Цены",
      subtitle: "Ознакомьтесь с нашими профессиональными тарифными планами, которые соответствуют потребностям и масштабу вашего бизнеса.",
      starter: "Стартовый",
      starterDesc: "Начальное решение для малого бизнеса и личных брендов",
      pro: "Профессиональный",
      proDesc: "Для быстрорастущих компаний и тех, кто хочет полной автоматизации процессов",
      enterprise: "Корпоративный",
      enterpriseDesc: "Индивидуальные решения и выделенная поддержка для крупных организаций",
      buyNow: "Купить сейчас",
      popular: "Популярный",
      features: "Возможности"
    },
    faq: {
      title: "Часто Задаваемые Вопросы",
      subtitle: "Найдите ответы на самые часто задаваемые вопросы о вашем проекте."
    },
    contact: {
      title: "Начните Свой Проект",
      subtitle: "Пришло время воплотить ваши идеи в реальность. Свяжитесь с нами и получите бесплатную консультацию.",
      nameLabel: "Ваше имя",
      namePlaceholder: "Алишер Усмонов",
      emailLabel: "Электронная почта",
      emailPlaceholder: "example@domain.com",
      phoneLabel: "Номер телефона",
      phonePlaceholder: "+998 90 123 45 67",
      msgLabel: "Ваше сообщение",
      msgPlaceholder: "Опишите ваш проект подробно...",
      submitButton: "Отправить сообщение",
      sendingButton: "Отправка..."
    },
    footer: {
      desc: "Агентство цифровых инноваций, помогающее развивать ваш бизнес с помощью искусственного интеллекта и передовых технологий.",
      newsletter: "Новостная рассылка",
      newsletterDesc: "Будьте в курсе последних технологических тенденций и новостей.",
      subPlaceholder: "Ваш e-mail адрес",
      subscribe: "Подписаться",
      rights: "Все права защищены."
    }
  },
  en: {
    nav: {
      home: "Home",
      services: "Services",
      portfolio: "Portfolio",
      blog: "Blog",
      faq: "FAQ",
      pricing: "Pricing",
      contact: "Contact",
      order: "Free Consultation"
    },
    hero: {
      badge: "🤖 Artificial Intelligence Agency",
      titlePre: "Empower Your",
      titleHighlight: "AI Innovations",
      titlePost: "Business Strategy",
      subtitle: "EvolvoAI digitalizes your business processes and maximizes sales through cutting-edge web design, automation, and seamless artificial intelligence integrations.",
      ctaPrimary: "Free Consultation",
      ctaSecondary: "View Portfolio",
      statClients: "Happy Clients",
      statProjects: "Finished Projects",
      statYears: "Years of Experience"
    },
    services: {
      title: "Our Services",
      subtitle: "Take your business to the next level with state-of-the-art AI models and high-end modern design solutions.",
      webDevTitle: "Premium Web Development",
      webDevDesc: "Creating fast, stunning, and highly SEO-optimized websites using Framer, Next.js, and Tailwind CSS.",
      aiIntegrateTitle: "AI Integration",
      aiIntegrateDesc: "Deploying OpenAI, Gemini, custom LLM models, conversational chatbots, and automated workflows into your business.",
      botDevTitle: "Telegram Bot Dev",
      botDevDesc: "High-performance Telegram bots with complex custom backends, integrated with CRM and billing gateways.",
      designTitle: "Premium UX/UI Design",
      designDesc: "High-end branding, interface designs, and rich user experiences crafted specifically to convert visitors into buyers."
    },
    pricing: {
      title: "Flexible Pricing Plans",
      subtitle: "Explore our professionally tailored subscription pricing plans that perfectly align with your business objectives.",
      starter: "Starter",
      starterDesc: "A solid entry-level solution for small businesses and personal branding",
      pro: "Professional",
      proDesc: "Specially crafted for fast-growing startups demanding complete digital automation",
      enterprise: "Enterprise",
      enterpriseDesc: "Fully customized software solutions with dedicated support for corporations",
      buyNow: "Buy Now",
      popular: "Popular",
      features: "Features"
    },
    faq: {
      title: "Frequently Asked Questions",
      subtitle: "Find fast answers to our most common customer inquiries."
    },
    contact: {
      title: "Kickstart Your Project",
      subtitle: "It's time to turn your concepts into functional reality. Get in touch with us for a free expert consultation.",
      nameLabel: "Your Name",
      namePlaceholder: "Alisher Usmonov",
      emailLabel: "Email Address",
      emailPlaceholder: "example@domain.com",
      phoneLabel: "Phone Number",
      phonePlaceholder: "+998 90 123 45 67",
      msgLabel: "Your Message",
      msgPlaceholder: "Describe your project requirements in detail...",
      submitButton: "Send Message",
      sendingButton: "Sending..."
    },
    footer: {
      desc: "Digital innovation agency empowering businesses to scale using state-of-the-art AI applications and engineering practices.",
      newsletter: "Newsletter Signup",
      newsletterDesc: "Stay ahead of the curve with our latest tech insights and updates.",
      subPlaceholder: "Your email address",
      subscribe: "Subscribe",
      rights: "All rights reserved."
    }
  }
};
