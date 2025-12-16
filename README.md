# Supernaut EC Guidelines Documentation

Complete documentation website for the Supernaut AI project guidelines, built with Docusaurus v3 and TypeScript.

## 📋 Overview

This is a comprehensive documentation site serving as the **single source of truth** for project guidelines. It provides role-based documentation for External Contributors (Submitters, Reviewers, Adjudicators) and internal teams (Snorkel + Mistral).

### Key Features

- ✨ **Role-Based Navigation** - Quick access paths for Submitters, Reviewers, and Adjudicators
- 📚 **Comprehensive Reference** - Detailed workflow, failure modes, system prompts, and tools documentation
- 🔍 **Local Search** - Fast, offline-capable search across all documentation
- 🔐 **Internal Docs Gating** - Controlled access to internal documentation via environment variable
- 📱 **Mobile Responsive** - Works seamlessly on all devices
- 🔗 **Deep-Linkable** - Every heading has a stable anchor for easy sharing
- 📅 **Version Tracking** - Effective dates and last updated timestamps on all pages

## 🚀 Quick Start

### Prerequisites

- Node.js 18.0 or higher
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository (if not already done)
git clone <repository-url>
cd supernaut-ec-guidelines

# Install dependencies
pnpm install
```

### Development

Start the local development server:

```bash
pnpm start
```

This will open `http://localhost:3000` in your browser with hot-reload enabled.

### Build

Create a production build:

```bash
pnpm build
```

The static files will be generated in the `build/` directory.

### Serve Production Build

Test the production build locally:

```bash
pnpm build
pnpm serve
```

This will serve the built site at `http://localhost:3000`.

## 🔐 Internal Documentation

The site includes internal documentation that can be shown or hidden using an environment variable.

### Show Internal Docs (for Snorkel/Mistral teams)

```bash
INTERNAL_DOCS=true pnpm start
```

Or set in your environment permanently:

```bash
export INTERNAL_DOCS=true
pnpm start
```

### Hide Internal Docs (for External Contributors)

```bash
# Default behavior - just run without the variable
pnpm start
```

Or explicitly:

```bash
INTERNAL_DOCS=false pnpm start
```

**Note:** The "Internal" menu item and internal doc pages will only be visible when `INTERNAL_DOCS=true`.

## 📁 Project Structure

```
/workspace/
├── docs/                       # Documentation content
│   ├── ec/                    # EC-facing documentation
│   │   ├── intro.md          # Landing/intro page
│   │   ├── roles/            # Role-based guides
│   │   │   ├── submitter/
│   │   │   ├── reviewer/
│   │   │   └── adjudicator/
│   │   └── reference/        # Reference documentation
│   │       ├── workflow/
│   │       ├── failure-modes/
│   │       ├── system-prompts/
│   │       ├── tools/
│   │       ├── faq-glossary.md
│   │       └── changelog.md
│   └── internal/             # Internal documentation
│       ├── overview.md
│       ├── calibration-notes.md
│       ├── qa-process.md
│       ├── metrics-and-health.md
│       └── release-notes.md
├── src/                       # Source code
│   ├── components/           # React components
│   │   ├── Checklist.tsx
│   │   ├── GoodBadExample.tsx
│   │   └── DocMetadata.tsx
│   ├── css/                  # Stylesheets
│   │   └── custom.css
│   └── pages/                # Custom pages
│       └── index.tsx         # Landing page
├── static/                    # Static assets
│   └── img/                  # Images
├── docusaurus.config.ts      # Docusaurus configuration
├── sidebars.ts               # EC docs sidebar
├── sidebars-internal.ts      # Internal docs sidebar
├── tsconfig.json             # TypeScript configuration
├── package.json              # Dependencies and scripts
└── README.md                 # This file
```

## 📝 Adding New Documentation

### Add a New Page

1. **Create the markdown file** in the appropriate directory:
   ```bash
   # For EC docs
   touch docs/ec/reference/your-page.md
   
   # For internal docs
   touch docs/internal/your-page.md
   ```

2. **Add frontmatter** at the top of the file:
   ```markdown
   ---
   title: Your Page Title
   sidebar_position: 1
   effectiveDate: 2025-12-16
   owners:
     - Team Name
   ---
   
   # Your Page Title
   
   Your content here...
   ```

3. **Update the sidebar** configuration:
   - For EC docs: Edit `sidebars.ts`
   - For internal docs: Edit `sidebars-internal.ts`

### Use MDX Components

The site includes reusable components for common patterns:

#### Checklist Component

```mdx
import Checklist from '@site/src/components/Checklist';

<Checklist items={[
  "First item to check",
  "Second item to check",
  "Third item to check"
]} />
```

#### Good vs Bad Example Component

```mdx
import GoodBadExample from '@site/src/components/GoodBadExample';

<GoodBadExample
  good={<div>This is a good example</div>}
  bad={<div>This is a bad example</div>}
/>
```

#### Document Metadata Component

```mdx
import DocMetadata from '@site/src/components/DocMetadata';

<DocMetadata 
  effectiveDate="2025-12-16"
  owners={["Team Name", "Another Team"]}
/>
```

### Use Docusaurus Admonitions

```markdown
:::note
This is a note
:::

:::tip
This is a helpful tip
:::

:::info
This is informational
:::

:::caution
This is a caution/warning
:::

:::danger
This is a danger/error message
:::
```

### Add Images

1. Place images in `static/img/`
2. Reference them in markdown:
   ```markdown
   ![Alt text](/img/your-image.png)
   ```

## 🔍 Search

The site uses `docusaurus-lunr-search` for local search. The search index is automatically rebuilt when you run `pnpm build`.

**Features:**
- Works offline
- Searches both EC and Internal docs (if internal docs are enabled)
- Keyboard shortcut: Press `/` to focus search

## 🎨 Customization

### Styling

Edit `src/css/custom.css` to customize:
- Color schemes (light and dark modes)
- Component styles
- Custom CSS classes

### Configuration

Edit `docusaurus.config.ts` to customize:
- Site metadata (title, tagline, URL)
- Navbar items
- Footer content
- Theme configuration
- Plugin settings

### Landing Page

The landing page is a custom React component at `src/pages/index.tsx`. Modify it to change:
- Role cards
- Quick links
- Layout and design

## 📦 Available Scripts

```bash
# Development
pnpm start              # Start dev server
pnpm start -- --port 3001  # Start on custom port

# Building
pnpm build             # Production build
pnpm serve             # Serve production build locally

# Maintenance
pnpm clear             # Clear Docusaurus cache
pnpm typecheck         # Run TypeScript type checking

# Docusaurus utilities
pnpm docusaurus        # Run Docusaurus CLI
pnpm swizzle           # Customize theme components
pnpm write-translations  # Extract translatable strings
pnpm write-heading-ids   # Add explicit heading IDs
```

## 🚢 Deployment

### Build for Production

```bash
pnpm build
```

The `build/` directory contains the static site ready for deployment.

### Deploy Options

**Static Hosting:**
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Any static hosting service

**Server Deployment:**
- Copy `build/` directory to web server
- Serve with nginx, Apache, or any web server
- Ensure proper MIME types and routing

### Environment-Specific Builds

Build with internal docs enabled:
```bash
INTERNAL_DOCS=true pnpm build
```

Build with internal docs disabled:
```bash
INTERNAL_DOCS=false pnpm build
```

## 📚 Documentation Sections

### By Role

- **[Submitter](/roles/submitter/overview)** - Overview, Checklist, Common Mistakes
- **[Reviewer](/roles/reviewer/overview)** - Overview, Rubric, Feedback Writing, Edge Cases
- **[Adjudicator](/roles/adjudicator/overview)** - Overview, Tie-Breaking, Edge Cases

### Reference

- **[Workflow](/reference/workflow/step-1-intent)** - 6-step submission process
- **[Failure Modes](/reference/failure-modes/overview)** - Instruction Retention, Course Correction, Task Continuation
- **[System Prompts](/reference/system-prompts/rules-and-patterns)** - Rules, Patterns, Templates
- **[Tools](/reference/tools/overview)** - web_search, news_search, open_url, open_search
- **[FAQ & Glossary](/reference/faq-glossary)** - Common questions and term definitions
- **[Changelog](/reference/changelog)** - Documentation updates and changes

### Internal (INTERNAL_DOCS=true only)

- **[Overview](/internal/overview)** - Internal documentation introduction
- **[Calibration Notes](/internal/calibration-notes)** - EC training and alignment
- **[QA Process](/internal/qa-process)** - Quality assurance workflows
- **[Metrics & Health](/internal/metrics-and-health)** - KPIs and monitoring
- **[Release Notes](/internal/release-notes)** - Technical releases and deployments

## 🛠️ Troubleshooting

### Port Already in Use

If port 3000 is occupied:
```bash
pnpm start -- --port 3001
```

### Clear Cache

If you encounter build issues:
```bash
pnpm clear
pnpm install
pnpm start
```

### TypeScript Errors

Run type checking:
```bash
pnpm typecheck
```

### Search Not Working

Rebuild the search index:
```bash
pnpm build
```

### Internal Docs Not Showing

Verify the environment variable:
```bash
echo $INTERNAL_DOCS  # Should show "true"
INTERNAL_DOCS=true pnpm start
```

## 🤝 Contributing

### Adding Content

1. Create or edit markdown files in `docs/`
2. Follow the existing structure and frontmatter format
3. Test locally with `pnpm start`
4. Build to verify: `pnpm build`
5. Commit your changes

### Style Guide

- Use clear, concise language
- Include examples where helpful
- Add frontmatter to all pages (title, effectiveDate, owners)
- Use appropriate admonitions (note, tip, caution, etc.)
- Create deep-linkable sections with descriptive headings

### Code Standards

- TypeScript for all React components
- ESLint configuration (if added)
- Format markdown consistently
- Optimize images before adding

## 📄 License

[Your license here]

## 👥 Team

**Owners:**
- EC Ops Team
- Documentation Team
- Engineering Team

**Maintainers:**
- [List maintainers]

## 📞 Support

- **Documentation Issues:** [Contact info]
- **Technical Problems:** [Contact info]
- **Content Questions:** [Contact info]

---

## 🎯 Quick Reference

### Key URLs (when running locally)

- **Home:** http://localhost:3000
- **Submitter Guide:** http://localhost:3000/roles/submitter/overview
- **Reviewer Guide:** http://localhost:3000/roles/reviewer/overview
- **Adjudicator Guide:** http://localhost:3000/roles/adjudicator/overview
- **Workflow:** http://localhost:3000/reference/workflow/step-1-intent
- **Internal Docs:** http://localhost:3000/internal/overview (with INTERNAL_DOCS=true)

### Essential Commands

```bash
# Install
pnpm install

# Develop
pnpm start

# Build
pnpm build

# Internal docs
INTERNAL_DOCS=true pnpm start
```

---

**Version:** 1.0.0  
**Last Updated:** 2025-12-16  
**Built with:** Docusaurus 3 + TypeScript + ❤️
