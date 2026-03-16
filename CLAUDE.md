# Portfolio — Chanon Chiang

## About
Personal portfolio website for Chanon Chiang (Jay), Computer
Engineering student at Chulalongkorn University, Bangkok. GPA 3.31.
Trilingual: English (IELTS 7.5), Chinese (HSK 3), Thai (native).
GitHub: github.com/Jaiigh

## Goal
Reposition profile from full-stack/frontend toward AI, data science,
and ML engineering. Target companies: Grab, Agoda, SCB Tech X.

## Stack
React + Vite + Tailwind CSS v3 + React Three Fiber + Three.js + GSAP

## Design
- Background: #080808 (near black)
- Accent: #F5A623 (amber/gold)
- Text: #ffffff
- Display font: Bebas Neue (via Google Fonts)
- Body font: DM Mono (via Google Fonts)
- Aesthetic: Bold editorial, high contrast, asymmetric layouts

## Sections
1. Hero — full-screen 3D neural network particle scene (R3F),
   mouse-reactive, slow camera drift. Name in large Bebas Neue.
2. About — bio, stats (GPA, languages, availability)
3. Experience — BotNoi (AI NL), JobTopGun (Full-Stack intern),
   AIS Thailand (incoming Software Dev intern, highlight as upcoming)
4. Projects — Bulbbet (hackathon 2nd runner-up), A2A Agent Platform
   (AI workflow builder at BotNoi), Larngear Camp (66k+ users)
5. Skills — grouped: ML/Data | Frontend | Languages & Tools
6. Contact — email, GitHub, phone

## Conventions
- Components in src/components/
- One component per file
- Always run `npm run dev` to verify changes render correctly
- Keep 3D logic isolated in HeroScene.jsx
