# BetterPuertoPrincesa.org

A community-run civic transparency portal for **Puerto Princesa City, Palawan** — government services directory, department/office pages, city statistics, weather + map, and local news, built so residents can actually find and use them. Part of the [BetterGov.ph](https://bettergov.ph) civic tech movement.

![Version](https://img.shields.io/badge/version-0.2.0-green)
![License](https://img.shields.io/badge/license-CC0%201.0-blue)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)

## Stack

- **React 19 + TypeScript**, built with **Vite 7**
- **React Router v7** for routing
- **Tailwind CSS v4** (CSS-first `@theme` config in `src/index.css`) + [`@bettergov/kapwa`](https://github.com/bettergov/kapwa) (CC0 design system) for card/banner primitives
- **`content/*.md` + `*.yaml`** for service and government department pages — no database, no CMS; edit Markdown directly, the same pattern BetterGov.ph and other BetterLGU sites use
- **i18next** (English/Filipino) with `HttpBackend`-loaded translation JSON from `public/locales/`
- **Leaflet** + `react-leaflet` for the city map, **Open-Meteo** for live weather
- Deploy target: **Vercel** (`vercel.json` included); alternatives documented in [DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md)

## Getting started

```bash
git clone https://github.com/hmcldryl/betterpuertoprincesa.git
cd betterpuertoprincesa
npm install
npm run dev          # http://localhost:5173
```

```bash
npm run build   # tsc -b && vite build
npm run lint
```

## Branches & environments

- **`main`** — production.
- **`develop`** — default integration branch. Branch feature/fix work off `develop`, open a PR back into it.

When `develop` is ready to ship, open a PR from `develop` into `main`.

CI (`.github/workflows/vercel-deploy.yml`) builds and deploys to Vercel on pull requests (preview) and pushes to `main` (production). Still run `npm run lint` and `npm run build` locally before opening a PR. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Data policy — no fabricated civic data

**Never fabricate or guess values for officials, statistics, ordinances, or contact info.** Content under `content/**/*.md` and `src/data/{hotlines,news,statistics}.ts` is written from verified sources — cite the source (a comment or note) whenever you add or change a real-world fact.

## Documentation

- **[CONTRIBUTING.md](CONTRIBUTING.md)** — branching model, commit style, and how to submit a PR (code or content)
- **[CONTENT-GUIDE.md](CONTENT-GUIDE.md)** — content writing and structure guidelines
- **[CONTENT-MANAGEMENT.md](CONTENT-MANAGEMENT.md)** — step-by-step guide for editing content from GitHub's web UI, no Git required
- **[DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md)** — deploying to Vercel and alternatives
- **[CHANGELOG.md](CHANGELOG.md)** — version history

## Project structure

```
content/
├── government/          # Government section markdown & YAML
│   └── departments/     # Department pages (executive, legislative)
└── services/             # Services section markdown & YAML, by category

src/
├── components/           # Reusable UI components
│   ├── home/             # Home page sections
│   ├── layout/           # Navbar, Footer, InfoBar
│   └── ui/                # Base UI primitives (Section, Heading, Breadcrumbs, ...)
├── data/                 # YAML category config + sourced data (statistics, news, hotlines)
├── i18n/                 # i18next setup
├── lib/                  # markdownLoader, yamlLoader, and other utilities
├── pages/                # Route-level pages (Home, Services, Government, Statistics, News, Document)
└── types/                # TypeScript type definitions
```

## Contributing

Whether you're a developer, a Puerto Princesa resident, or just spotted an outdated phone number — see **[CONTRIBUTING.md](CONTRIBUTING.md)** for the branching model, commit conventions, and how to submit a change. It covers both code contributions and non-technical content edits made straight from GitHub's web UI. Also see **[CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)** and, if you find a security issue, **[SECURITY.md](SECURITY.md)** for how to report it responsibly.

## Community

Join the [BetterGov.ph Discord](https://discord.com/invite/mHtThpN8bT) to hang out, ask questions, or help build BetterLGU sites like this one.

## Contributors

[![Contributors Display](https://badges.pufler.dev/contributors/hmcldryl/betterpuertoprincesa?size=50&padding=5&perRow=10&bots=true)](https://github.com/hmcldryl/betterpuertoprincesa/graphs/contributors)

## License

Creative Commons Zero (CC0) 1.0 — see [LICENSE](LICENSE). Public domain, no restrictions on use, modification, or distribution.

## Acknowledgments

- Built with [React](https://reactjs.org/) and [Vite](https://vitejs.dev/)
- Styled with [Tailwind CSS v4](https://tailwindcss.com/)
- UI components by [@bettergov/kapwa](https://github.com/bettergov/kapwa)
- Icons by [Lucide](https://lucide.dev/)
- Content managed as [YAML](https://yaml.org/) + Markdown
- Internationalization with [i18next](https://www.i18next.com/)
- Part of the [BetterGov.ph](https://bettergov.ph) civic tech movement

---

**Made for the people of Puerto Princesa City.**
