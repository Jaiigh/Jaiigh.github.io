# Portfolio — Chanon Chiang

## About

Personal portfolio website for Chanon Chiang (Jay), Computer
Engineering student at Chulalongkorn University, Bangkok. GPA 3.31.
Trilingual: English (IELTS 8), Chinese (HSK 3), Thai (native).
GitHub: github.com/Jaiigh

## Goal

Reposition profile from full-stack/frontend toward AI, data science,
and ML engineering. Target companies: Grab, Agoda, SCB Tech X.

## Stack

React + Vite + Tailwind CSS v3 + React Three Fiber + Three.js + GSAP

## Design

- Background: #0a0a0a (pure black)
- Accent: #E63946 (crimson red)
- Secondary background: #1a0a0a (very dark red tint)
- Border color: #2a1a1a (dark red-tinted border)
- Text: #ffffff
- Muted text: #999999
- Display font: Bebas Neue (via Google Fonts)
- Body font: DM Mono (via Google Fonts)
- Aesthetic: Brutal editorial, aggressive high contrast,
  think fashion magazine meets data terminal.
  Hard ruled lines, oversized type, asymmetric layouts.
  Red is used sparingly — only for accents, not fills.

## Design Tokens (Source of Truth)

These are the ONLY correct values. If any file contradicts these,
the file is wrong — update it to match.

### Colors (tailwind.config.js)

- accent: #E63946 ← the ONLY accent color, never amber/gold
- background: #0a0a0a
- secondary: #1a0a0a
- border: #2a1a1a
- text: #ffffff
- muted: #999999

NEVER use: #F5A623, #f5a623, amber-_, yellow-_, orange-\*
If you see amber or gold anywhere, it is a bug — fix it immediately.

### Fonts (index.html Google Fonts import)

Must import BOTH fonts via Google Fonts link tag:

- Bebas Neue — used for ALL headings, section titles, hero name
- DM Mono — used for ALL body text, labels, tags, descriptions

font-family assignments in index.css:

- .font-display or h1/h2/h3 → 'Bebas Neue', cursive
- body, p, span, div → 'DM Mono', monospace

If either font is missing from the Google Fonts import, add it.
Never fall back to system fonts for display text.

## Frontend Design Principles

- Create distinctive, production-grade UI that avoids generic aesthetics
- Typography must be intentional — Bebas Neue for display, DM Mono for body
- Use bold asymmetric layouts, hard ruled lines, oversized type
- Animations should be purposeful — staggered reveals on load,
  hover states that surprise
- Every component should feel like it was designed, not generated
- Red (#E63946) is used for accents only — never flood a section with it
- Negative space is intentional — don't fill every pixel
- Avoid: purple gradients, centered hero text on white, card grids
  with equal padding, generic "AI portfolio" patterns

## Sections

1. Hero — full-screen 3D neural network particle scene (R3F),
   mouse-reactive, slow camera drift. Name in large Bebas Neue.
2. About — bio, stats (GPA, languages, availability)
3. Experience — BotNoi (AI NLP intern), JobTopGun (Full-Stack intern),
   AIS Thailand (incoming Software Dev intern, highlight as upcoming)
4. Projects — Bulbbet (hackathon 2nd runner-up), A2A Agent Platform
   (AI workflow builder at BotNoi), Larngear Camp (66k+ users)
5. Skills — grouped: ML/Data | Frontend | Languages & Tools
6. Contact — email, GitHub, phone

## Conventions

- Components in src/components/
- One component per file
- Always run `npm run dev` to verify changes render correctly
- Keep 3D logic isolated in HeroScene.tsx

## Code Conventions

- ALL component files must use .tsx extension, never .jsx
- ALL utility and helper files must use .ts extension, never .js
- TypeScript strict mode is enabled — no implicit any types
- All component props must have explicit TypeScript interfaces defined
- Never create .jsx or .js files — if you do, immediately rename them to .tsx or .ts
- Use React.FC type for functional components
- Three.js and R3F objects must use proper @types/three types
- Never use inline styles as the primary styling method —
  use Tailwind CSS utility classes
- Only use inline styles for dynamic values that
  cannot be expressed in Tailwind (e.g. Three.js canvas positioning)
