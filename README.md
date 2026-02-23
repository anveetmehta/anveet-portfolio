# Anveet Mehta Portfolio Foundation

A scalable, structure-first portfolio scaffold built with **Next.js App Router**, **TypeScript**, and **Tailwind CSS**.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS

## Project Structure

```txt
app/
  case-studies/
    [slug]/
components/
  sections/
content/
lib/
styles/
```

### Architecture Highlights

- Reusable UI building blocks (`Layout`, `Container`, `Section`, `Card`, `Grid`, `WorkflowDiagram`)
- Home sections split into modular components for easy growth
- Case studies rendered dynamically from centralized content
- Typed content schema in `content/content.ts`
- Ready for future additions:
  - Blog pages and taxonomy
  - Dark mode theming
  - Per-page SEO enhancements
  - Analytics/event instrumentation

## Run Locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000)

## Deploy on Vercel

1. Push this repository to GitHub.
2. Import the repo in [Vercel](https://vercel.com/new).
3. Keep default Next.js settings and deploy.

## Edit Content

All portfolio content is centralized in:

- `content/content.ts`

To add a new case study:

1. Add a new object to the `caseStudies` array.
2. Ensure the `slug` is unique.
3. The new entry automatically appears in:
   - `/case-studies`
   - `/case-studies/[slug]`

You can also update:

- `siteMeta` for global metadata/contact info
- `expertiseAreas` for expertise section cards
- `writingEntries` for writing section placeholders
