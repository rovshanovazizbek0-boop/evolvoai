# EvolvoAI - Render.com Deploy Qo'llanmasi

## 1. GitHub Repository

Kod allaqachon GitHub ga push qilindi:
```
https://github.com/rovshanovazizbek0-boop/evolvoai.git
```

## 2. Render.com Dashboard

1. https://dashboard.render.com ga kiring
2. **New +** → **Web Service** tanlang
3. GitHub repository ni ulang: `rovshanovazizbek0-boop/evolvoai`

## 3. Build Sozlamalari

| Sozlama | Qiymat |
|---------|--------|
| **Name** | evolvoai |
| **Region** | Oregon (US West) |
| **Branch** | main |
| **Runtime** | Node |
| **Build Command** | `npm install && npx prisma generate && npm run build` |
| **Start Command** | `npm start` |

## 4. Environment Variables (MUHIM!)

Render.com → **Environment** bo'limiga qo'shing:

```env
# Database
DATABASE_URL=postgresql://...your_render_postgres_url...

# Gemini AI
GEMINI_API_KEY=your_main_api_key
GEMINI_API_KEY3=your_audio_api_key

# Telegram
TELEGRAM_BOT_TOKEN=8258225391:AAFRtCKfTgK3NOtqBVsgY7kDmyB1mWCDdnQ
TELEGRAM_CHANNEL_ID=@evolvoaichannel

# App
NEXT_PUBLIC_APP_URL=https://evolvoai-j86e.onrender.com
NEXTAUTH_URL=https://evolvoai-j86e.onrender.com
NEXTAUTH_SECRET=your_secret_key

# Admin
ADMIN_EMAIL=admin@evolvoai.uz
ADMIN_PASSWORD=your_admin_password
```

## 5. Deploy

1. **Create Web Service** tugmasini bosing
2. Deploy avtomatik boshlanadi (5-10 daqiqa)
3. Build logs ni kuzating

## 6. Deploy Tugagandan Keyin

Tekshiring:
- https://evolvoai-j86e.onrender.com - Asosiy sayt
- https://evolvoai-j86e.onrender.com/live-audio - Live Audio
- https://evolvoai-j86e.onrender.com/chatbot - Chatbot

## 7. Xatolik Bo'lsa

**Build xatosi:**
- Logs ni tekshiring
- `prisma generate` buyrug'ini build command ga qo'shing

**Database xatosi:**
- Render PostgreSQL yarating
- DATABASE_URL ni yangilang

**Audio ishlamasa:**
- GEMINI_API_KEY3 qo'shilganini tekshiring
