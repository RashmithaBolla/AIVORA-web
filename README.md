# AIVORA Web

Official website for **AIVORA** — the student-driven AI/ML club at BVRIT Hyderabad College of Engineering for Women.

Built with React, TypeScript, Vite, Tailwind CSS, and Supabase.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| React 19 + TypeScript | UI framework |
| Vite 8 | Build tool & dev server |
| Tailwind CSS 3 | Styling |
| Framer Motion | Animations |
| React Router 6 | Client-side routing |
| Supabase | Database & backend |
| Lucide React | Icons |

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project

### Installation

```bash
# Clone the repo
git clone https://github.com/your-org/aivora-web.git
cd aivora-web

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Supabase credentials
```

### Environment Variables

Create a `.env` file in the project root (copy from `.env.example`):

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Get these from your Supabase project: **Settings → API**.

### Running Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Build for Production

```bash
npm run build
npm run preview   # preview the production build locally
```

---

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── EventCard.tsx
│   ├── EventGrid.tsx
│   ├── EventDetails.tsx
│   ├── CategoryTabs.tsx
│   ├── Footer.tsx
│   └── ...
├── pages/            # Route-level page components
│   ├── Home.tsx
│   ├── Events.tsx
│   ├── AboutUs.tsx
│   └── admin/
├── hooks/            # Custom React hooks
│   └── useEvents.ts
├── lib/              # External service clients
│   └── supabase.ts
├── types/            # TypeScript type definitions
│   └── event.ts
└── index.css         # Global styles
public/
├── logos/            # AIVORA and BVRIT logos
└── images/           # Team photos and assets
supabase/
├── schema.sql        # Database schema
└── seed.sql          # Seed data
```

---

## Database Setup

Run the schema and seed files against your Supabase project:

1. Go to **Supabase → SQL Editor**
2. Run `supabase/schema.sql`
3. Optionally run `supabase/seed.sql` for sample data

---

## Deployment

The project is deployed on [Vercel](https://vercel.com).

1. Push to GitHub
2. Import the repo on Vercel
3. Add the environment variables in Vercel → Settings → Environment Variables
4. Deploy

For client-side routing to work correctly, a `vercel.json` is included at the project root.

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run Oxlint |

---

## License

MIT
