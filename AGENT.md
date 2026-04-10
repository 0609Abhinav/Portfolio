# AGENT.md — Autonomous Coding Agent Reference

---

# Project Overview

- **Purpose**: Personal developer portfolio for Abhinav Tripathi — showcases skills, projects, education, certifications, and contact info
- **Type**: Static single-page application (SPA)
- **Tech Stack**:
  - React 18 (CRA / react-scripts 5)
  - Plain CSS (per-component)
  - react-scroll (smooth anchor navigation)
  - react-icons + @fortawesome/react-fontawesome (icon libraries)
  - emailjs-com (contact form — imported but NOT wired up in current code)
  - react-router-dom (installed but NOT used)
- **Entry Points**:
  - `public/index.html` — HTML shell, mounts `#root`
  - `src/index.js` — React root, renders `<App>`
  - `src/App.js` — Top-level component, composes all sections

---

# Architecture

- **Type**: Component-based monolith SPA (no routing, no backend, no state manager)
- **Pattern**: Flat feature-folder layout — one folder per section

```
index.html
  └── src/index.js
        └── <App>
              ├── <Navbar>       sticky nav, smooth scroll links
              ├── <Intro>        hero section
              ├── <About>        bio, education, projects, certs
              ├── <Skills>       skill bars + tools grid
              ├── <Works>        project gallery with modal
              └── <Contact>      social links + contact form
```

---

# Folder Structure

```
/public
  index.html          HTML shell
  style.css           Global base styles (body, reset, font)
  logo.png            Favicon/brand asset
  resume.pdf          Downloadable CV (linked from Intro)

/src
  index.js            React DOM entry
  App.js              Root component, section composition

  /assets             All static images (PNG, JPG, SVG, JPEG)
  
  /components
    /Navbar           Sticky nav, mobile hamburger, react-scroll links
    /Intro            Hero, typing animation, social icons, CTA buttons
    /About            Profile pic, bio, education, projects, skills, certs
    /Skills           Skill bars with progress, tools/tech icon grid
    /Works            Project cards, category filter, modal, favorites
    /Contacts         Social links + contact form (emailjs not wired)
```

---

# Components & Modules

| Component | Responsibility |
|-----------|---------------|
| `Navbar` | Sticky top nav; hamburger on mobile; react-scroll `<Link>` to sections |
| `Intro` | Full-viewport hero; custom typing effect (useState/useEffect); social icons; "Hire Me" + "Get My CV" CTAs |
| `About` | Static bio card; education timeline; project list; skills list; certifications; location |
| `Skills` | Category-filtered skill bars with % progress; icon grid split by Frontend/Backend/Fullstack/Tools |
| `Works` | Project gallery; category filter; show more/less toggle; favorites (heart); click-to-open modal with GitHub link |
| `Contact` | Social links (LinkedIn, GitHub, Email); contact form UI (submit not functional — emailjs not connected) |

---

# Data Flow

```
User opens browser
  → public/index.html loads
  → src/index.js mounts React root
  → App.js renders all section components in order
  → Each component manages its own local state (useState)
  → react-scroll <Element> wrappers enable smooth anchor navigation
  → No API calls, no backend, no database
  → Contact form: UI only — emailjs imported but sendForm() never called
  → Resume download: static file at /public/resume.pdf
```

---

# UI / Design System

- **Framework**: Plain CSS (no Tailwind, no CSS-in-JS, no design system library)
- **Font**: `'Poppins', sans-serif` (referenced in CSS, loaded assumed via Google Fonts or system fallback — not confirmed in index.html)
- **Icons**: `react-icons` (FaLinkedin, FaGithub, FaEnvelope, FaHeart, etc.) + `@fortawesome/react-fontawesome`

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| Primary cyan | `#00bcd4` | Accent, highlights, typing cursor, hover states |
| Primary cyan dark | `#018b8e` | Button hover |
| Deep navy | `#1a1a2e` | Section backgrounds (About, Contact) |
| CTA orange | `#ff5722` | "Hire Me" button |
| CTA orange hover | `#e64a19` | "Hire Me" hover |
| CTA green | `#4caf50` | "Get My CV" button |
| CTA green hover | `#388e3c` | "Get My CV" hover |
| Blue primary | `#007bff` | Works buttons, contact gradient |
| Blue dark | `#0056b3` | Works button hover |
| LinkedIn blue | `#1e40af` | About social link |
| Email green | `#10b981` | About social link |
| Phone orange | `#f97316` | About social link |
| GitHub gray | `#4b5563` | About social link |
| Contact red | `#ff4b2b` | Contact submit button |
| Modal bg | `rgb(98, 3, 3)` | Works modal background (dark red — likely unintentional) |
| Body bg | `radial-gradient(circle, rgba(0,0,0,0.7), rgba(0,0,0,1))` + cyan overlay | Global dark background |
| Works bg | `#f9f9f9` | Skills/Works section light background |

## Typography

- Font: `Poppins` (sans-serif)
- Base body: `aliceblue` on dark background
- Headings range: `1rem` (mobile) → `3.5rem` (About name)
- Intro hero: `3rem` for Hello/introText
- Navbar items: `1.85rem`
- No defined type scale — sizes set ad hoc per component

## Spacing / Layout

- No grid system or spacing tokens
- Flexbox used throughout for layout
- CSS Grid used in About (`info-grid`) with `auto-fit, minmax(380px, 1fr)`
- Responsive breakpoints: `320px`, `375px`, `480px`, `768px`, `1024px`, `1200px`
- Padding set per-component (e.g., `4rem` in About/Contact, `50px` in Works)

---

# NUI

- **Not present** in this project. No NUI framework, library, or pattern detected.

---

# State Management

- **Tool**: React local state only (`useState`, `useEffect`)
- **No global state** — no Redux, Zustand, Context API, or similar
- **State per component**:
  - `Navbar`: `isOpen` (mobile menu toggle)
  - `Intro`: `currentTitle`, `typing`, `isDeleting`, `delay` (typing animation)
  - `Skills`: `selectedCategory` (filter)
  - `Works`: `showAll`, `favorites[]`, `selectedProject`, `selectedCategory`

---

# APIs & Services

| Service | Status | Notes |
|---------|--------|-------|
| emailjs-com | Installed, NOT wired | Imported in package.json; no `send()` call in contact.js |
| react-router-dom | Installed, NOT used | No `<BrowserRouter>` or `<Route>` anywhere |
| GitHub (external links) | Used | Project cards link to github.com/0609Abhinav/* |
| LinkedIn (external link) | Used | Hardcoded profile URL |
| CDN icons (skills.js) | Used | `cdn.jsdelivr.net/npm/simple-icons` + `i.imgur.com` for MERN logo |
| resume.pdf | Static file | Served from `/public/resume.pdf` |

---

# Config & Environment

- **No `.env` file** — no environment variables used
- **Build system**: Create React App (`react-scripts 5.0.1`)
- **Babel plugins**: class-properties, nullish-coalescing, numeric-separator, optional-chaining, private-methods (all in `dependencies`, should be `devDependencies`)
- **Browserslist**: Standard CRA config
- **ESLint**: `react-app` + `react-app/jest` extends

### Scripts
```bash
npm start       # dev server
npm run build   # production build
npm test        # jest tests
npm run eject   # eject CRA config
```

---

# Conventions

- **Naming**:
  - Components: PascalCase files (`About.js`, `Navbar` uses lowercase `navbar.js` — inconsistent)
  - CSS: kebab-case classes (`.about-section`, `.info-card`)
  - JS variables: camelCase
- **File structure**: One folder per component, co-located CSS
- **Imports**: Relative paths, no path aliases
- **Inline styles**: Heavy use in `intro.js` (button styles, social link styles) — mixed with CSS classes
- **Data**: Hardcoded arrays inside component bodies (education, projects, skills, certifications, toolsAndTechnologies)
- **No TypeScript**, no prop-types, no JSDoc

---

# Setup & Run

```bash
# Install
npm install

# Dev server
npm start        # runs on http://localhost:3000

# Production build
npm run build    # outputs to /build
```

---

# Dependency Graph

```
App.js
├── react-scroll (Element)
├── Navbar
│   ├── react-scroll (Link)
│   └── @fortawesome/react-fontawesome (faBars, faTimes)
├── Intro
│   ├── react-scroll (Link)
│   ├── @fortawesome/react-fontawesome (faLinkedin, faGithub, faInstagram, faFacebook)
│   └── react-icons (FaEnvelope)
├── About
│   ├── react-icons (FaLinkedin, FaGithub, FaEnvelope, FaPhoneAlt, FaLocationArrow)
│   └── ../../assets/profile-pic.png
├── Skills
│   ├── @fortawesome/react-fontawesome (faDatabase, faCode)
│   ├── ../../assets/*.png (6 skill images)
│   └── CDN URLs (simple-icons, imgur)
├── Works
│   ├── react-icons (FaHeart)
│   └── ../../assets/*.jpg/png (10 project images)
└── Contact
    └── react-icons (FaLinkedin, FaGithub, FaEnvelope)
```

**Unused installed packages**:
- `emailjs-com` — installed, never called
- `react-router-dom` — installed, never used
- `web-vitals` — installed, not imported in index.js (removed from default CRA setup)
- `@testing-library/*` — installed, no test files present

---

# Risks / Notes

## Bugs
- **Contact form is broken**: `emailjs-com` is imported as a dependency but `send()` / `sendForm()` is never called in `contact.js`. Form submits do nothing.
- **Modal background color** (`rgb(98, 3, 3)` — dark red) in `works.css` looks unintentional; likely should be dark neutral.
- **Phone number exposed**: `tel:9621854341` hardcoded in `About.js` — PII in source code.
- **Email exposed**: `abhinavtripathi6sep@gmail.com` hardcoded in multiple components.

## Tech Debt
- **Inline styles in intro.js**: Button and social icon styles are defined as JS objects inline. Should be moved to `intro.css`.
- **Hardcoded data in components**: All arrays (education, projects, skills, tools) are defined inside component bodies. Should be extracted to `/src/data/` files.
- **Inconsistent file naming**: `About.js` (PascalCase) vs `navbar.js`, `intro.js`, `skills.js`, `works.js`, `contact.js` (lowercase).
- **Babel plugins in `dependencies`**: Should be in `devDependencies`.
- **CDN image URLs in skills.js**: External CDN dependency for tool icons (`cdn.jsdelivr.net`, `i.imgur.com`) — fragile, can break.
- **No error boundaries**: Any render error crashes the whole app.
- **`public/style.css` not linked**: Defined in `/public/` but not imported in `index.html` or `index.js` — may be dead code (assumed).
- **`react-router-dom` unused**: Adds ~50KB to bundle for no reason.
- **No `reportWebVitals`**: `web-vitals` installed but not used.
- **`ul` styles in `about.css` are global**: Targets all `ul` elements, not scoped — will affect other components.

## Performance
- **All sections render on mount**: No lazy loading or code splitting.
- **10 project images imported statically**: All loaded upfront regardless of visibility.
- **Bouncing animation on every tool icon** (`animation: bounce 2s infinite`) — runs on ~20+ elements simultaneously, potential jank on low-end devices.
- **Typing animation uses `setTimeout` in `useEffect`** with multiple state updates per tick — acceptable but could be simplified with a custom hook.

## Suggestions
1. Wire up `emailjs-com` in `contact.js` or remove the dependency.
2. Remove `react-router-dom` if routing is not planned.
3. Extract all hardcoded data to `/src/data/index.js`.
4. Move inline styles from `intro.js` to `intro.css`.
5. Standardize file naming to PascalCase for components.
6. Add `React.lazy` + `Suspense` for section-level code splitting.
7. Scope `ul` styles in `about.css` to `.about-section ul`.
8. Replace CDN icon URLs with locally installed `simple-icons` package.
9. Fix modal background color in `works.css`.
10. Move Babel plugins to `devDependencies`.
11. Consider extracting the typing animation into a reusable `useTypingEffect` hook.
12. Add `<title>` and meta tags in `public/index.html` for SEO.
