# 🚀 FlowAI – AI-Powered SaaS Project Management

A production-ready, full-stack project management SaaS built with Next.js 15, Prisma, Gemini AI, and Stripe.

## ✨ Features

- 🤖 **AI-Powered** – Gemini AI for task suggestions, smart prioritization & project health analysis
- 📋 **Kanban Boards** – Drag & drop task management with 5 customizable columns
- 👥 **Real-Time Collaboration** – Multi-member projects with role-based access
- 📊 **Analytics Dashboard** – Activity charts, burndown, velocity tracking
- 💳 **Stripe Billing** – Free, Pro ($12/mo), and Enterprise ($49/mo) plans
- 🔐 **Auth** – Google & GitHub OAuth via NextAuth v5
- 🎨 **Beautiful UI** – Tailwind CSS + shadcn/ui components

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Database | PostgreSQL + Prisma ORM |
| Auth | NextAuth v5 |
| AI | Google Gemini 1.5 Flash |
| Payments | Stripe |
| State | Zustand |
| Charts | Recharts |
| Animation | Framer Motion |

## 📁 Project Structure

```
joo/
├── app/
│   ├── (auth)/login/         # Login page
│   ├── (dashboard)/
│   │   ├── dashboard/        # Main dashboard
│   │   └── projects/[id]/    # Project kanban view
│   ├── api/
│   │   ├── auth/             # NextAuth handlers
│   │   ├── projects/         # Project CRUD API
│   │   ├── tasks/            # Task CRUD + drag API
│   │   └── ai/               # AI endpoints (Gemini)
│   ├── layout.tsx
│   ├── page.tsx              # Landing page
│   └── globals.css
├── components/
│   ├── dashboard/            # Dashboard widgets
│   ├── projects/             # Kanban board components
│   ├── layout/               # Sidebar, navbar
│   └── ui/                   # shadcn/ui components
├── lib/
│   ├── auth.ts               # NextAuth config
│   ├── db.ts                 # Prisma client
│   ├── gemini.ts             # AI helpers
│   ├── stripe.ts             # Stripe config + plans
│   └── utils.ts              # Shared utilities
├── prisma/
│   └── schema.prisma         # DB schema
└── middleware.ts             # Route protection
```

## 🚀 Getting Started

### 1. Install dependencies
```bash
pnpm install
```

### 2. Set up environment variables
```bash
cp .env.example .env
# Fill in your keys (see .env.example for all required variables)
```

### 3. Set up the database
```bash
pnpm db:push       # Push schema to database
pnpm db:generate   # Generate Prisma client
```

### 4. Run the development server
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🔑 Required API Keys

| Service | Where to get |
|---------|-------------|
| PostgreSQL | [Supabase](https://supabase.com) or [Neon](https://neon.tech) |
| Google OAuth | [Google Console](https://console.cloud.google.com) |
| GitHub OAuth | [GitHub Settings](https://github.com/settings/developers) |
| Gemini API | [Google AI Studio](https://aistudio.google.com) |
| Stripe | [Stripe Dashboard](https://dashboard.stripe.com) |

## 📱 Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page with pricing |
| `/login` | Sign in with Google/GitHub |
| `/dashboard` | Main dashboard with stats |
| `/projects` | All projects list |
| `/projects/[id]` | Kanban board for a project |
| `/ai` | AI assistant page |
| `/analytics` | Charts and reports |
| `/billing` | Subscription management |
| `/settings` | User settings |

## 🤖 AI Features

1. **Project Summary** – Health score, bottlenecks, recommendations
2. **Task Suggestions** – AI generates 5 new tasks based on project context
3. **Smart Prioritization** – Re-ranks tasks by urgency, deadlines & importance

## 🚢 Deployment

```bash
# Build
pnpm build

# Deploy to Vercel (recommended)
vercel --prod
```

---

Built with ❤️ using Next.js 15 + Gemini AI
