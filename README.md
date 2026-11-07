# GRANTLY — Scholarship Discovery & Application Management Platform

GRANTLY is an academic scholarship discovery and application tracking workspace designed to replace fragmented portals, buried eligibility clauses, and ad-hoc spreadsheets with a structured, cohesive student journey.

---

## Problem Statement

Students struggle to discover relevant scholarships, understand eligibility, navigate fragmented application processes, and track deadlines/status across many sources. GRANTLY makes discovery, understanding, applying, and tracking feel like one coherent journey instead of scattered paperwork.

---

## Tech Stack

- **React 18** + **Vite**
- **Tailwind CSS** (Bespoke editorial theme with custom CSS variable mapping)
- **Framer Motion** (Scroll reveals, layout transitions, micro-interactions)
- **React Router v6** (Client-side routing with scroll restoration)
- **Lucide React** (Minimal, structural icons only)

---

## Design System

- **Palette**:
  - `--paper`: `#FBF9F4` (Warm off-white background)
  - `--ink`: `#14181A` (Near-black editorial text)
  - `--forest`: `#1F4D3A` (Primary deep emerald green)
  - `--forest-deep`: `#0E1210` (Dark emerald foundation)
  - `--gold`: `#D7A33E` (Accent for highlights, underlines, and active states)
  - `--sand`: `#E9E4D8` (Subtle architectural borders and fills)
  - `--stone`: `#6B6F6A` (Secondary/muted text)
- **Typography**:
  - **Headlines**: Fraunces (Variable display serif with optical sizing and negative letter-spacing)
  - **Body / UI**: Inter (High-legibility grotesque sans-serif)
- **Buttons**:
  - Max 6px border radius, strictly non-pill.
  - Primary button features deep forest fill with gold-underline hover reveal.
  - Secondary button features outline with subtle sand fill-on-hover.
- **Copy Standards**:
  - Natural, specific, human tone without marketing buzzwords.
  - Zero placeholder / lorem-ipsum copy.
  - Zero emojis and zero em dashes.

---

## Pages & Routes

1. **Landing Page (`/`)**
   - Concrete value proposition hero with interactive autocomplete search matching mock data.
   - Editorial problem comparison framing the status quo vs. Grantly.
   - Signature stepped interactive sequence: Discover, Understand, Apply, Track.
   - Asymmetric bento grid with interactive qualification checks, deadline radar, and document readiness meters.
   - Live hands-on filter sandbox over the mock catalog.
2. **Scholarship Discovery (`/scholarships`)**
   - Multi-attribute search and filtering across fields, degree levels, award amounts, geographic regions, and GPA thresholds.
   - Sort by Deadline (soonest first), Award Amount, Match Score, or Title.
   - Visual differentiation between featured and standard listings with Grid and List views.
   - Comprehensive detail modal with eligibility criteria, document checklists, and direct tracker actions.
3. **Application Tracker (`/dashboard`)**
   - Four-stage Kanban board (Saved, In Progress, Submitted, Decision Received) with stage transitions and editable notes.
   - Deadline timeline view highlighting upcoming submission dates (<21 days).
   - Consolidated master document checklist updating readiness percentages live.
   - Local-first browser storage with one-click sample data reset.
4. **Privacy Policy (`/privacy`)**
   - Long-form editorial legal page detailing local browser storage usage and user data sovereignty.
5. **Terms & Conditions (`/terms`)**
   - Comprehensive terms covering eligibility responsibilities, educational disclaimers, and intellectual property.

---

## Project Structure

```text
scholarship-/
├── README.md
├── .gitignore
└── frontend/
    ├── package.json
    ├── package-lock.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── index.html
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── index.css
        ├── context/
        │   └── ScholarshipContext.jsx
        ├── data/
        │   └── scholarships.js
        ├── components/
        │   ├── common/
        │   │   ├── ScrollToTop.jsx
        │   │   └── Toast.jsx
        │   ├── layout/
        │   │   ├── Header.jsx
        │   │   └── Footer.jsx
        │   ├── home/
        │   │   ├── InteractiveHeroSearch.jsx
        │   │   ├── ProblemSection.jsx
        │   │   ├── HowItWorksSection.jsx
        │   │   ├── BentoFeatures.jsx
        │   │   └── InteractiveLiveDemo.jsx
        │   └── scholarships/
        │       ├── ScholarshipCard.jsx
        │       └── ScholarshipModal.jsx
        └── pages/
            ├── LandingPage.jsx
            ├── ScholarshipDiscoveryPage.jsx
            ├── DashboardPage.jsx
            ├── PrivacyPolicyPage.jsx
            └── TermsPage.jsx
```

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation & Development

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start local development server
npm run dev
```

Open `http://localhost:5173` in your browser.

### Production Build

```bash
# Inside the frontend directory
npm run build

# Preview production build locally
npm run preview
```
