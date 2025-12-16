# AI Project Documentation Site

This is the single source of truth for AI project guidelines, built with Docusaurus v3.

## 📂 Project Structure

- `docs/ec`: External Contributor (EC) guidelines (Submitter, Reviewer, Adjudicator).
- `docs/internal`: Internal team documentation (Snorkel/Mistral).
- `src/pages/index.tsx`: Landing page with role-based routing.
- `docusaurus.config.ts`: Main configuration.
- `sidebars.ts`: Sidebar structure for EC docs.
- `sidebarsInternal.ts`: Sidebar structure for Internal docs.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- pnpm (recommended) or npm

### Installation

```bash
pnpm install
```

### Running the Development Server

```bash
pnpm start
```

This starts the site at `http://localhost:3000`.

### Building for Production

```bash
pnpm build
```

### Local Serve (Build)

```bash
pnpm serve
```

## 🔐 Internal Documentation

The internal documentation is hidden by default. To enable it, set the `INTERNAL_DOCS` environment variable to `true`.

**Enable in development:**

```bash
INTERNAL_DOCS=true pnpm start
```

**Enable in production build:**

```bash
INTERNAL_DOCS=true pnpm build
```

When enabled:
- "Internal" link appears in the navbar.
- `/internal` routes are accessible and indexed by search.

## 📝 Adding Content

1. **EC Guidelines:** Add markdown/MDX files to `docs/ec/`.
   - Update `sidebars.ts` if adding a new top-level item.
2. **Internal Docs:** Add markdown/MDX files to `docs/internal/`.
   - Update `sidebarsInternal.ts` to include the new file.

### Custom Components

You can use `<Good>` and `<Bad>` components in your markdown for examples:

```mdx
<Good>
This is a good example.
</Good>

<Bad>
This is a bad example.
</Bad>
```
