# 🌉 MindBridge MVP - Complete Setup Guide

## 📋 Prerequisites
- Node.js 18+ installed
- GitHub account (for Codespaces)
- Supabase account (free tier)
- OpenRouter account (free tier)

## 🚀 Quick Start

### Step 1: Set Up Supabase Database

1. **Go to [Supabase](https://supabase.com)** and create a new project
2. **Wait for project to initialize** (takes ~2 minutes)
3. **Go to SQL Editor** (left sidebar → SQL Editor)
4. **Copy and run the SQL script**:
   - Open `/workspace/mindbridge-mvp/scripts/setup-supabase-mvp.sql`
   - Copy entire contents
   - Paste into Supabase SQL Editor
   - Click "Run" or press `Ctrl+Enter`

✅ You should see "Success. No rows returned" for each statement

5. **Get your Supabase credentials**:
   - Go to Project Settings → API
   - Copy **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - Copy **anon/public key** (starts with `eyJ...`)

### Step 2: Get OpenRouter API Key

1. **Go to [OpenRouter](https://openrouter.ai)**
2. **Sign up/Login** (free account)
3. **Go to Keys** section
4. **Create a new API key**
5. **Copy the key** (starts with `sk-or-...`)

### Step 3: Configure Environment Variables

Create `.env.local` file in the project root:

```bash
cd /workspace/mindbridge-mvp
cp .env.local.example .env.local
```

Edit `.env.local` with your actual keys:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# OpenRouter Configuration
OPENROUTER_API_KEY=sk-or-v1-your-key-here

# Crisis Resources (Kenya example)
CRISIS_HOTLINE=+254-700-000-000
```

### Step 4: Install Dependencies

```bash
cd /workspace/mindbridge-mvp
npm install
```

### Step 5: Run Development Server

```bash
npm run dev
```

✅ **Access the app at**: http://localhost:3000

## 📁 File Locations

### Environment Variables
📍 `/workspace/mindbridge-mvp/.env.local`
- Contains Supabase URL & Key
- Contains OpenRouter API Key
- Contains Crisis Hotline numbers

### Database Schema
📍 `/workspace/mindbridge-mvp/scripts/setup-supabase-mvp.sql`
- Community groups tables
- Group posts tables
- Journal entries tables
- Mood logs tables
- Row Level Security policies
- Seed data for 5 MVP groups

### Application Code
📍 `/workspace/mindbridge-mvp/src/`
- `app/` - All pages and API routes
- `components/` - UI components
- `lib/` - Supabase, OpenRouter integrations
- `hooks/` - React hooks
- `types/` - TypeScript types
- `config/` - App configuration

## 🔧 Testing Without API Keys

The app works in **mock mode** without real API keys:
- ✅ UI renders correctly
- ✅ Navigation works
- ✅ Mock chat responses
- ✅ Mock community posts
- ✅ Local mood tracking (localStorage)

To test with real backend:
1. Add real Supabase credentials
2. Add real OpenRouter API key
3. Restart dev server

## 📱 Features to Test

### 1. Home Page (`/`)
- Hero section with background
- Feature cards
- Call-to-action buttons

### 2. Chat (`/chat`)
- AI companion interface
- Message bubbles
- Typing indicator
- Mobile-responsive layout

### 3. Community (`/community`)
- Group selector (5 pre-seeded groups)
- Real-time posts feed
- Like/comment functionality
- Anonymous posting support

### 4. Journal (`/journal`)
- Private text editor
- Mood tagging
- Entry history
- Local storage sync

### 5. Mood Tracking (`/mood`)
- PHQ-2 check-in
- Mood slider (1-10)
- Trend visualization
- Pattern recognition

### 6. Crisis Resources (`/crisis`)
- Emergency contacts
- Crisis hotline surfacing
- Support resources

## 🛠 Troubleshooting

### "No space left on device"
```bash
# Clean up node_modules and cache
rm -rf node_modules .next
npm install
```

### Supabase connection errors
1. Verify URL format: `https://xxxxx.supabase.co`
2. Verify key starts with `eyJ...`
3. Check RLS policies are enabled
4. Ensure tables exist in Supabase dashboard

### OpenRouter API errors
1. Verify key starts with `sk-or-...`
2. Check API key has credit balance
3. Try different model in `src/lib/openrouter.ts`

### Port already in use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
# Or use different port
npm run dev -- -p 3001
```

## 📦 Download as ZIP

In GitHub Codespace:
```bash
cd /workspace
zip -r mindbridge-mvp-complete.zip mindbridge-mvp/
```

Then download from Codespace file explorer:
1. Click **"..."** menu
2. Select **"Download"**
3. Choose the zip file

## 🌐 Deploy to Production

### Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd /workspace/mindbridge-mvp
vercel

# Add environment variables in Vercel dashboard
# Redeploy
```

### Environment Variables for Production
Add these in Vercel/Netlify/Railway settings:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `OPENROUTER_API_KEY`

## 🎯 Next Steps

### Phase 1 (MVP) ✅
- [x] Core UI components
- [x] Chat interface
- [x] Community groups
- [x] Mood tracking
- [x] Crisis resources

### Phase 2 (Enhanced)
- [ ] WhatsApp/SMS integration
- [ ] Peer listener dashboard
- [ ] Health scholar portal
- [ ] Analytics dashboard
- [ ] Swahili language support

### Phase 3 (Scale)
- [ ] Multi-campus support
- [ ] Institutional licensing
- [ ] Advanced analytics
- [ ] Research partnerships

## 📞 Support

For issues:
1. Check this SETUP_GUIDE.md
2. Review README.md
3. Check Supabase logs (Dashboard → Logs)
4. Check browser console (F12)

---

**Built with ❤️ for African university students**
