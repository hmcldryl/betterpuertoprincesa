# Contributing to BetterPuertoPrincesa.org

Thanks for wanting to help. This is a volunteer-built civic transparency portal for Puerto Princesa City, Palawan — contributions from developers, designers, translators, and residents who just know the city well are all welcome.

## Branching model

Two long-lived branches:

| Branch    | Purpose                                                                  |
| --------- | ------------------------------------------------------------------------ |
| `develop` | Default integration branch. All feature/fix branches target this.        |
| `main`    | Production. Only receives merges from `develop` once it's release-ready. |

Workflow:

1. Branch off `develop`: `git checkout develop && git pull && git checkout -b feat/short-description`
2. Make your changes, and run `npm run lint` and `npm run build` locally — there's no CI configured yet, so this is the only gate.
3. Open a PR into `develop`.
4. When `develop` is ready to ship, a maintainer opens a PR from `develop` into `main`.

## Getting started

Prerequisites: Node.js 18+, npm.

```bash
git clone https://github.com/hmcldryl/betterpuertoprincesa.git
cd betterpuertoprincesa
npm install          # also installs the git hooks (husky "prepare" script)
npm run dev          # http://localhost:5173
```

```bash
npm run build   # tsc -b && vite build
npm run lint     # ESLint
npm run format   # Prettier, writes changes
```

A pre-commit hook (`.husky/pre-commit` → `lint-staged`) runs ESLint and Prettier on staged files automatically.

## How to contribute

### Reporting bugs

1. Check existing [issues](https://github.com/hmcldryl/betterpuertoprincesa/issues) to avoid duplicates.
2. Open a new issue with a clear title, steps to reproduce, expected vs. actual behavior, and a screenshot if it's visual.

### Suggesting features

Open an issue describing the feature, who it helps, and why. Mockups or examples are a bonus, not a requirement.

### Submitting code

1. **Fork** the repository.
2. **Branch** off `develop`:
   ```bash
   git checkout develop && git pull
   git checkout -b feat/your-feature-name
   ```
3. **Make** your changes.
4. **Commit.** [Conventional Commits](https://www.conventionalcommits.org/) style (`feat: ...`, `fix: ...`, `docs: ...`) is preferred for a readable history, but it isn't enforced by a git hook in this repo — just write a clear, specific message.
5. **Push** to your fork and **open a Pull Request into `develop`** (not `main`).

### Submitting content — no coding required

Content edits (fixing an outdated phone number, adding a missing service page, correcting a fee) don't need Git at all — you can edit Markdown files directly from GitHub's web UI. See **[CONTENT-MANAGEMENT.md](CONTENT-MANAGEMENT.md)** for a complete, no-technical-knowledge walkthrough, and **[CONTENT-GUIDE.md](CONTENT-GUIDE.md)** for writing style and page templates.

## Contribution areas

| Area          | Description                                                            |
| ------------- | ---------------------------------------------------------------------- |
| Bug fixes     | Fix reported issues                                                    |
| Features      | New pages, components, or functionality                                |
| Content       | Update service/department info (fees, offices, processing times)       |
| Translations  | English/Filipino strings live in `public/locales/{en,fil}/common.json` |
| Design        | UI/UX and accessibility improvements                                   |
| Data          | Verify and update `src/data/{statistics,news,hotlines}.ts`             |
| Documentation | Improve this guide, the README, or the other `*.md` guides             |

## Data policy — read this before touching content or `src/data/*`

**Never fabricate or guess civic data** — official names, statistics, fees, ordinances, contact info. If you can't verify a value against an official source (the Puerto Princesa LGU, PSA, DILG, a department's own citizen's charter, etc.), leave it out rather than guess. When you do add a real value, note where it came from (a source comment near the data, or in the PR description) the way the existing `src/data/*.ts` files do.

## Code guidelines

- **TypeScript/React**: match the existing style in the file you're editing.
- **Styling**: Tailwind CSS v4 utility classes; reuse the primitives in `src/components/ui/` (`Section`, `Heading`, `Text`, `Breadcrumbs`, ...) instead of raw HTML where one exists.
- **Content system**: when adding a new service or government category, follow the registration steps in [CLAUDE.md](CLAUDE.md) (`src/data/{services,government}.yaml` + `src/data/yamlLoader.ts`) — a category that's only added to `content/` won't be picked up otherwise.
- **i18n**: any new UI copy needs a key in both `public/locales/en/common.json` and `public/locales/fil/common.json`, wired through `useTranslation('common')`. Markdown content in `content/` is not translated per-string; see [CONTENT-GUIDE.md](CONTENT-GUIDE.md).
- **Accessibility**: semantic HTML, `aria-label`s on icon-only buttons/links, keyboard-navigable interactive elements.
- **Mobile**: check your change at a narrow viewport (≤ 400px) before opening a PR — this is a civic site many residents will hit on a phone.

## Pull request process

1. Make sure `npm run lint` and `npm run build` pass locally.
2. Fill out the PR description — what changed and why, and link any related issue.
3. Wait for review and address feedback.

## Review criteria

- Correctness and no regressions
- Data accuracy and sourcing (for content or `src/data/*` changes)
- Accessibility and mobile responsiveness
- Code style consistency with the surrounding file

## Community

Join the [BetterGov.ph Discord](https://discord.com/invite/mHtThpN8bT) to ask questions or find other contributors.

## Questions?

Open an issue or ask on Discord.

---

Thank you for helping make Puerto Princesa's local government more transparent and accessible.
