# Rasheed Systems — Next.js

Converted from HTML to Next.js 15 (App Router, TypeScript).

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm start
```

Node.js 18+ required. Install from https://nodejs.org

## Structure

```
app/
  layout.tsx          Root layout — fonts, metadata, globals.css
  globals.css         All shared CSS (preserved exactly from HTML)
  page.tsx            Home — kinetic hero (client component)
  services/page.tsx   Services — server component
  work/page.tsx       Work — server component
  about/page.tsx      About — server component
  contact/
    page.tsx          Contact — server component wrapper
    ContactForm.tsx   Contact form — client component (form state)

components/
  Header.tsx          Fixed nav — scroll state + mobile menu (client)
  Footer.tsx          Footer (server)
  PageEffects.tsx     Runs useReveal + useCardGlow (client, renders null)

hooks/
  useReveal.ts        IntersectionObserver scroll reveal
  useCardGlow.ts      Mouse-follow glow on [data-tilt] cards

public/
  work/               Project screenshots (extracted from original HTML)
  og-image.png
  logo-mark-512.png
```

## Notes

- All CSS is preserved exactly from the original HTML files
- Images were base64-embedded in the original HTML; they are now proper JPEG files in `public/work/`
- The kinetic hero parallax, cursor spotlight, scroll reveals, and card glow all work identically
- The contact form still uses `mailto:` (no backend) — wire to Formspree or your own endpoint to change that
- URLs changed from `.html` extensions to clean paths (`/services`, `/work`, `/about`, `/contact`)
