# ⚡ mertcandar.com — Portfolio

Personal portfolio website for **Mertcan DAR**, Electrical & Electronics Engineer.

Built with a terminal / circuit-board–inspired dark UI, featuring animated oscilloscope bars, floating code snippets, custom cursor, and scanline overlays.

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [Next.js 14](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| CMS | Contentful |
| Email | Resend |
| i18n | next-intl (🇹🇷 TR / 🇬🇧 EN) |
| Fonts | JetBrains Mono, IBM Plex Mono, Fira Code |
| Deploy | Vercel (Frankfurt) |

## 📂 Project Structure

```
├── app/
│   ├── [locale]/          # i18n routed pages
│   │   ├── layout.tsx     # Root layout with fonts & providers
│   │   ├── page.tsx       # Homepage (Hero, About, Projects, Contact)
│   │   └── projects/      # Projects list & detail pages
│   ├── api/contact/       # Contact form email endpoint
│   └── globals.css
├── components/
│   ├── sections/          # Hero, About, Projects, Contact
│   ├── layout/            # Navbar, ScanlineOverlay
│   └── ui/                # ProjectCard, CustomCursor, OscilloscopeBar, etc.
├── lib/                   # Contentful client & animation variants
├── messages/              # i18n translation files (tr.json, en.json)
├── types/                 # TypeScript interfaces
└── routing.ts             # Localized pathnames (/projeler ↔ /projects)
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Setup

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Fill in your API keys in .env

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Environment Variables

| Variable | Description |
|----------|-------------|
| `APP_URL` | Hosted URL of the application |
| `RESEND_API_KEY` | API key for contact form emails |
| `CONTENTFUL_SPACE_ID` | Contentful space identifier |
| `CONTENTFUL_ACCESS_TOKEN` | Contentful delivery API token |

> **Note:** Without Contentful credentials, the app falls back to mock data automatically.

### Contentful Data Models

To connect your own Contentful space, create the following two **Content Types**:

#### 1. Project (ID: `project`)
| Field ID | Type | Description |
|----------|------|-------------|
| `title` | Short text | Project name |
| `slug` | Short text | URL slug (e.g., `my-project`) |
| `description` | Text | Project description |
| `techTags` | List (Short text) | Array of technologies (e.g., `["React", "Node"]`) |
| `githubUrl` | Short text | Link to source code |
| `liveUrl` | Short text | Link to live demo |
| `featured` | Boolean | Show on homepage (Yes/No) |
| `resourceLinks` | Array of References | Links to files/assets (e.g., PDF schematics) |

#### 2. Profile (ID: `profile`)
| Field ID | Type | Description |
|----------|------|-------------|
| `heroTitle` | Short text | Main title in Hero (e.g., `MERTCAN_D`) |
| `heroRole` | Short text | Subtitle in Hero |
| `firstName` | Short text | First Name |
| `lastName` | Short text | Last Name |
| `role` | Short text | Professional Title |
| `location` | Short text | Location (e.g., `İstanbul, Türkiye`) |
| `email` | Short text | Contact Email |
| `experienceYears` | Integer | Years of experience |
| `bio` | Text | Long biography text |
| `skills` | JSON Object | Array of skills: `[{"name": "C++", "level": 90}]` |
| `cvFile` | Reference (Asset) | Upload your PDF CV |
| `githubUrl` | Short text | GitHub Profile URL |
| `linkedinUrl` | Short text | LinkedIn Profile URL |

## 🌐 Internationalization

- Default locale: **Türkçe (tr)**
- Supported: Türkçe, English
- Localized routes: `/projeler/[slug]` ↔ `/projects/[slug]`

## 📦 Build

```bash
npm run build
npm start
```

## 📄 License

MIT
