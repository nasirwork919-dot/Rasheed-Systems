# Rasheed Systems — Next.js

Production portfolio built with Next.js 15, React 19, and TypeScript.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Node.js 18 or newer is required.

For a production check:

```bash
npm run build
npm start
```

## Structure

```text
app/
  api/contact/route.ts     Validated, rate-limited contact endpoint
  globals.css              Shared responsive design system and motion
  page.tsx                 Home
  services/page.tsx        Services
  work/page.tsx            Work index
  work/[slug]/page.tsx     Case studies
  about/page.tsx           About
  contact/                 Contact page and client form

components/
  HomeHero.tsx             Scroll-linked opening composition
  SelectedProjects.tsx     Sticky project sheets and progress state
  ServiceDiagram.tsx       Four service-specific system diagrams
  ServiceRail.tsx          Scroll-linked service chapters
  WorkStage.tsx            Active-project preview stage
  AboutHero.tsx            Light split studio introduction
  StudioTimeline.tsx       Progressive studio process timeline
  ProjectGallery.tsx       Accessible case-study lightbox
  Header.tsx               Fixed navigation and focus-trapped mobile menu

lib/
  motion.ts                Shared motion timings and reduced-motion helper
  projects.ts              Project and case-study content
```

## Contact configuration

The contact form posts to `/api/contact`. It includes client/server validation, a honeypot, and rate limiting. Production email delivery requires:

```text
RESEND_API_KEY
CONTACT_TO_EMAIL
CONTACT_FROM_EMAIL
```

`CONTACT_FROM_EMAIL` must be a Resend-verified sender.

## Verification

```bash
npm run build
node scripts/audit.mjs
node scripts/capture.mjs
```

The audit checks responsive overflow, navigation, validation, lightbox behavior, and reduced-motion handling. Captures are written to `screenshots/`.
