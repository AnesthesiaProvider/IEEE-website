# IEEE Women in Engineering (WIE) — Bennett University

> **Official student chapter web platform for IEEE WIE Bennett University.**  
> *"Empowering Women. Engineering the Future."*

A modern, interactive, animated, and fully responsive web platform engineered with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. Features a futuristic dark-tech visual aesthetic, interactive canvas simulation, centralized data architecture, functional Junior Core recruitment portal, and a protected administrative dashboard.

---

## 🌟 Key Features

- **Futuristic Technology Aesthetic:** Slate black (`#080B14`), deep navy (`#0F172A`), electric violet (`#8B5CF6`), and cyber cyan (`#06B6D4`) with subtle glassmorphism and radiant glow orbs.
- **Interactive Engineering Network Canvas:** Custom HTML5 Canvas physics simulation in the Hero section with connected node lines, data pulses, and mouse parallax.
- **Dynamic Viewport Impact Counters:** Real-time animated counters that trigger on scroll (`100+ Members`, `20+ Events`, `10+ Workshops`, `50+ Projects`).
- **Senior Core Team Directory (`/team`):** Searchable leadership directory with domain filtering (`Leadership`, `Technical`, `Events`, `Design`, `PR & Marketing`, `Content & Media`), profile cards, and modal popups.
- **Events & Hackathons Showcase (`/events`):** Filterable event categories (`Workshops`, `Technical`, `Competitions`, `Networking`), countdown date badges, registration links, and past event lightbox galleries.
- **Community Pathways (`/join`):** 8 core engineering pillars, direct student WhatsApp community access, and leadership tracks.
- **Functional Junior Core Application Portal (`/junior-core`):**
  - Interactive domain picker and multi-step layout
  - Real-time client-side and server-side (Zod) validation
  - Duplicate enrollment prevention (HTTP 409)
  - Celebration confetti animation and application receipt
  - Email notification hook for applicant confirmations
- **Protected Chapter Admin Portal (`/admin`):**
  - Passkey-gated session authentication
  - Application metric cards (Total, Shortlisted, Selected, Pending)
  - Multi-criteria filtering (Domain, Academic Year, Status)
  - Search by Name, Enrollment Number, or Email
  - Live status workflow updates (`Pending`, `Shortlisted`, `Selected`, `Rejected`)
  - One-click CSV export and detailed applicant inspect modals
- **Dual-Layer Database Architecture:**
  - Zero-setup local JSON storage (`data/applications.json`) for effortless development
  - Full PostgreSQL / Supabase schema ready in [`supabase/schema.sql`](./supabase/schema.sql) with Row Level Security (RLS) policies
- **SEO & Accessibility:** Open Graph metadata, semantic HTML, sitemap (`/sitemap.xml`), robots (`/robots.txt`), and `prefers-reduced-motion` compliance.

---

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/AnesthesiaProvider/IEEE-website.git
cd IEEE-website
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Copy the example environment file:
```bash
cp .env.example .env.local
```
Inside `.env.local`:
```env
ADMIN_PASSWORD=your_secure_admin_password_here
ADMIN_SESSION_SECRET=your_random_session_secret_here
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Architecture

```
├── data/
│   └── applications.json          # Local persistence storage
├── public/                        # Static assets and favicons
├── src/
│   ├── app/
│   │   ├── admin/                 # Protected Admin Portal
│   │   ├── api/
│   │   │   ├── admin/auth/        # Admin login / session verification
│   │   │   ├── admin/applications/# Status updates, CSV data & deletion
│   │   │   └── junior-core/       # Application submission & duplicate checks
│   │   ├── events/                # Events & Hackathons page
│   │   ├── join/                  # Community pillars & WhatsApp join
│   │   ├── junior-core/           # Application registration portal
│   │   ├── team/                  # Senior Core Team directory
│   │   ├── globals.css            # Custom glassmorphism & gradients
│   │   ├── layout.tsx             # Root layout with fonts & Navbar/Footer
│   │   ├── page.tsx               # Flagship interactive home page
│   │   ├── robots.ts              # Search engine robots.txt
│   │   └── sitemap.ts             # Dynamic XML sitemap
│   ├── components/
│   │   ├── events/EventCard.tsx   # Event poster, badge, and details modal
│   │   ├── layout/Navbar.tsx      # Sticky glass navbar with mobile drawer
│   │   ├── layout/Footer.tsx      # Brand footer & social channels
│   │   ├── team/TeamCard.tsx      # Profile card with hover zoom & modal
│   │   └── ui/
│   │       ├── FuturisticHeroCanvas.tsx # HTML5 Canvas network simulation
│   │       ├── Modal.tsx          # Accessible backdrop-blur dialog
│   │       ├── SocialIcons.tsx    # SVG icons for social links
│   │       └── StatCounter.tsx    # Viewport scroll-triggered number counter
│   ├── data/                      # Centralized configuration (Future leads edit here)
│   │   ├── events.ts              # Upcoming & past events list
│   │   ├── siteConfig.ts          # Chapter information & social links
│   │   ├── stats.ts               # Chapter impact numbers
│   │   └── team.ts                # Senior core leadership data
│   └── lib/
│       ├── email.ts               # Confirmation email dispatcher hook
│       ├── storage.ts             # Dual persistence (local + Supabase)
│       └── types.ts               # TypeScript data definitions
└── supabase/
    └── schema.sql                 # Production PostgreSQL schema & RLS policies
```

---

## 🛠 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **Animation:** Framer Motion & Canvas Confetti
- **Icons:** Lucide React & Custom SVG Systems
- **Validation:** Zod

---

## 🔑 Administrative Access

- **Admin Portal:** `/admin`
- Access is authenticated via the `ADMIN_PASSWORD` variable configured in your private `.env.local` environment file.

---

## 📄 License

Created for **IEEE Women in Engineering, Bennett University**. All rights reserved.
