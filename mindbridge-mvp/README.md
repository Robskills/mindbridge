# 🌉 MindBridge - Peer-Powered Mental Health Support for African Students

## 🎯 Mission Statement
MindBridge is a peer-powered, culturally calibrated mental health support ecosystem built specifically for African university students. We don't import expertise — we organize what already exists on campus.

## 🚀 Features

### ✅ Core Functionality
- **AI-Powered Chat Companion**: Culturally calibrated AI trained on East African campus life (HELB stress, exam shame, collectivist family pressure)
- **Community Groups**: Anonymous peer support groups (Study Stress, Financial Help, Addiction Recovery, Exam Anxiety)
- **Private Journal**: Secure mood tracking and reflection space with end-to-end encryption
- **Mood Intelligence**: Conversational PHQ-2 → optional PHQ-9 with pattern recognition
- **Crisis Escalation**: Invisible tiered system (AI → Peer Listener → Health Scholar → Professional)

### 🎨 Design Philosophy
- **Mobile-First PWA**: No app store required, works on 2G networks
- **Culturally Calibrated**: Context-aware for African university experiences
- **Stigma-Aware**: Entry point is "a space to talk", not "mental health app"
- **Cost-Free**: 100% free for students via institutional licensing
- **Swahili-Aware**: UI supports Kiswahili phrases and cultural idioms

## 🛠 Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Frontend | Next.js 14 + TypeScript + Tailwind CSS | SSR/SSG, mobile-first, responsive design |
| Backend | Supabase (PostgreSQL) | Auth, Database, Realtime subscriptions, Row-Level Security |
| AI | OpenRouter API | Multi-model routing, streaming responses, safety filters |
| Hosting | Vercel | Zero-config deploy, edge caching, CI/CD |
| Fallback (Phase 2) | Africa's Talking / Twilio | WhatsApp/SMS bot for low-data users |

## 🏗 Architecture

### Directory Structure
```
mindbridge-mvp/
├── .env.local.example          # Environment variables template
├── .gitignore                  # Git ignore rules
├── next.config.mjs             # Next.js configuration
├── package.json                # Dependencies and scripts
├── postcss.config.js           # PostCSS configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── public/                     # Static assets
│   ├── icons/                  # PWA icons
│   ├── images/                 # Background images
│   ├── manifest.json           # PWA manifest
│   └── robots.txt              # SEO robots file
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout with navigation
│   │   ├── page.tsx            # Home page
│   │   ├── globals.css         # Global styles
│   │   ├── chat/               # AI chat interface
│   │   ├── community/          # Community groups & posts
│   │   ├── journal/            # Private journal entries
│   │   ├── mood/               # Mood tracking & PHQ assessments
│   │   ├── crisis/             # Crisis resources & emergency contacts
│   │   └── api/                # API routes (chat, escalate, mood)
│   ├── components/             # React components
│   │   ├── ui/                 # Reusable UI components
│   │   ├── layout/             # Layout components (Header, BottomNav)
│   │   ├── chat/               # Chat-specific components
│   │   ├── community/          # Community components
│   │   ├── journal/            # Journal components
│   │   ├── mood/               # Mood tracking components
│   │   ├── crisis/             # Crisis support components
│   │   └── animations/         # Animation components
│   ├── lib/                    # Core libraries
│   │   ├── supabase.ts         # Supabase client
│   │   ├── openrouter.ts       # OpenRouter AI integration
│   │   ├── escalation.ts       # Crisis escalation logic
│   │   ├── phq-scoring.ts      # PHQ assessment scoring
│   │   ├── utils.ts            # Utility functions
│   │   └── constants.ts        # Application constants
│   ├── hooks/                  # Custom React hooks
│   │   ├── useAnonymousAuth.ts # Anonymous authentication
│   │   ├── useChatStream.ts    # Chat streaming logic
│   │   ├── useMoodTracking.ts  # Mood tracking state
│   │   ├── useRealtimePosts.ts # Realtime community posts
│   │   └── useEscalationCheck.ts # Crisis detection
│   ├── types/                  # TypeScript type definitions
│   ├── utils/                  # Helper utilities
│   └── config/                 # Configuration files
├── scripts/                    # Database setup & seeding
│   ├── seed-groups.ts          # Seed community groups
│   └── setup-supabase.sql      # Supabase schema setup
└── README.md                   # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager
- Supabase account (free tier)
- OpenRouter API key (free models available)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd mindbridge-mvp
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your credentials:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# OpenRouter Configuration
OPENROUTER_API_KEY=your_openrouter_api_key_here

# Crisis Resources
CRISIS_HOTLINE=+254-700-000-000
```

4. **Set up Supabase database**
   - Go to your Supabase project dashboard
   - Navigate to SQL Editor
   - Run the contents of `scripts/setup-supabase.sql`
   - This creates all tables, policies, and default groups

5. **Seed initial data (optional)**
```bash
npx ts-node scripts/seed-groups.ts
```

6. **Run development server**
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📱 Usage Guide

### For Students
1. **No signup required** - Start chatting immediately with anonymous auth
2. **Choose your path**:
   - 💬 Chat with AI companion for immediate support
   - 👥 Join community groups for peer support
   - 📔 Write in private journal for self-reflection
   - 📊 Track mood patterns over time
3. **Crisis support** - Emergency resources always accessible

### For Peer Listeners (Health Scholars)
1. Review flagged conversations (with consent)
2. Provide psychoeducation and resources
3. Escalate to professionals when needed
4. Track interventions for portfolio building

## 🔄 Escalation Engine (Invisible Safety)

### Tiered Protocol System

#### Tier 0: AI Validation
- **Triggers**: General distress, seeking validation
- **Response**: Immediate validation + grounding techniques
- **Time**: Instant

#### Tier 1: Peer Listener
- **Triggers**: Moderate distress, crisis keywords detected
- **Response**: Peer listener assigned within 5 minutes
- **Actions**: Active listening, resource sharing, flagging

#### Tier 2: Health Scholar
- **Triggers**: High risk indicators, escalation from Tier 1
- **Response**: Health scholar review within 15 minutes
- **Actions**: Psychoeducation, structured support, monitoring

#### Tier 3: Professional Handover
- **Triggers**: Critical risk, immediate danger, suicide ideation
- **Response**: Crisis line surfacing + professional intervention
- **Time**: Within 30 minutes
- **Contact**: +254-700-000-000 (configurable per institution)

## 🎯 The Innovation

### Problem We Solve
| Barrier | How MindBridge Responds |
|---------|------------------------|
| **Stigma** | No clinical language upfront; entry is "a space to talk" |
| **Access** | Mobile-first PWA (no app store), WhatsApp/SMS fallback |
| **Cost** | 100% free for students; sustainability via institutional licensing |
| **Cultural mismatch** | AI trained on East African campus life: HELB stress, exam shame, collectivist pressure |

### Core Innovation
We don't import expertise — we organize what already exists on campus. Final-year nursing, medicine, pharmacy, and public health students have clinical knowledge, cultural context, and empathy. MindBridge gives them a structured, supervised, safe channel to support peers.

## 🌍 Impact Vision

When MindBridge launches:
- ✅ A nursing student at Maseno can guide a peer through PHQ-9 — supervised, safe, counted toward their portfolio
- ✅ A first-year struggling with HELB stress finds the Financial Help Network — anonymous, peer-run, stigma-free
- ✅ An AI companion validates without diagnosing, grounds without minimizing, escalates without alarming
- ✅ Campus counsellors receive anonymised trend data + warm handovers — not cold referrals
- ✅ Kenya gets its first granular student mental health dataset — for policy, research, advocacy

**This is not just an app. It's infrastructure for student wellbeing — built by students, for students.**

## 🔒 Privacy & Security

- **Anonymous by default** - No personal information required
- **Row-Level Security** - Database-level access control
- **End-to-end encryption** (Phase 2) - Journal entries encrypted client-side
- **Data minimization** - Only collect what's necessary
- **Transparent policies** - Clear data usage guidelines

## 🤝 Contributing

We welcome contributions that align with our mission:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Areas We Need Help
- 🌐 Swahili and Amharic translations
- 🎨 Student-designed visual identity
- 📚 Culturally relevant coping resources
- 🔬 Research partnerships for impact evaluation
- 🏫 University pilot programs

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 💚 Acknowledgments

- Built with ❤️ for African university students
- Inspired by the resilience and strength of our community
- Supported by the belief that mental health matters everywhere
- Special thanks to campus health scholars and peer counselors

## 📞 Contact & Support

- **Website**: https://mindbridge-africa.vercel.app
- **Crisis Hotline**: +254-700-000-000 (Kenya)
- **Email**: support@mindbridge.africa
- **Twitter**: @mindbridge_africa

---

**Remember**: Your life has value. This crisis will pass. There are people who care. Treatment works. 🌉💚
