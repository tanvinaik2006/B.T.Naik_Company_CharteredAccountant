# B.T. Naik & Company – Chartered Accountant Monorepo

## Overview

This repository is a **monorepo** that hosts both the public website and the client portal for **B.T. Naik & Company**, a Chartered Accountant firm. It is built with:
- **Next.js 16** (frontend) – modern React with server‑components, route‑based code‑splitting, and built‑in SEO support.
- **Node.js/Express** (backend) – lightweight API for health checks, contact‑form handling, and rate‑chart data.
- **Firebase Auth + Firestore** – authentication and metadata storage for client documents.
- **Supabase Storage** – secure file storage for uploaded client documents.
- **Tailwind CSS** – utility‑first styling with custom design tokens.

The repository follows a **Y‑monorepo** layout:
```
.
├─ backend/               # Express API, Firestore rules, env config
│   └─ src/server.js
├─ frontend/              # Next.js 16 application
│   ├─ src/app/...        # Pages (home, services, portal, admin, contact, …)
│   ├─ src/components/... # UI components (Navbar, Footer, animations)
│   ├─ src/lib/...        # Firebase & Supabase client wrappers
│   └─ public/…
├─ .gitignore
├─ BT_Naik_&_Co_PRD.md   # Product Requirements Document
└─ README.md              # **THIS FILE** – detailed developer guide (generated)
```

---

## Quick Start (Local Development)

### Prerequisites
- **Node.js >= 20** (use nvm or asdf to manage versions)
- **npm** (comes with Node) – we use npm workspaces via the root `package.json`
- **Docker** (optional, for running a local Supabase emulator)
- **Firebase project** with Auth enabled (email/password & phone)
- **Supabase project** with a storage bucket called `client-documents`

### 1️⃣ Clone & Install
```bash
git clone <repo-url>
cd B.T.Naik_Company_CharteredAccountant
npm install            # installs root dev deps
npm --prefix frontend install   # frontend deps
npm --prefix backend install    # backend deps
```

### 2️⃣ Environment Variables
Create a `.env.local` at the **frontend** root (next to `package.json`):
```
# Firebase (required for portal auth & Firestore)
NEXT_PUBLIC_FIREBASE_API_KEY=xxxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxxx
NEXT_PUBLIC_FIREBASE_APP_ID=xxxxx

# Supabase (optional – required for document upload)
NEXT_PUBLIC_SUPABASE_URL=https://xyz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=public-anon-key
```
If you only want to test the public site, you can leave these blank; the app will display helpful configuration warnings instead of crashing.

Create a `.env` at the **backend** root:
```
PORT=5001            # default, can be changed
# (optional) you can add any email service keys here for real contact‑form delivery
```

### 3️⃣ Run Services
```bash
# In one terminal – backend API
npm --prefix backend run dev   # runs `node --watch src/server.js`

# In another terminal – frontend dev server
npm --prefix frontend run dev   # runs `next dev`
```
Open <http://localhost:3000> for the public site and <http://localhost:3000/portal/login> for the client portal.

---

## Architecture Details

### Frontend
- **`/app` router** – each folder is a route segment (`/portal`, `/admin`, `/services/[slug]`).
- **Auth Context (`src/context/AuthContext.tsx`)** provides `user`, `loading`, and `signOut` throughout the app.
- **Firebase client (`src/lib/firebase/clientApp.ts`)** lazily initialises only when credentials exist; otherwise it exports `null` placeholders.
- **Supabase client (`src/lib/supabase/clientApp.ts`)** follows the same pattern with `isSupabaseConfigured`.
- UI components such as **`AnimatedNumber`**, **`ScrollReveal`**, and **`Navbar`** are reusable and animation‑aware (prefers‑reduced‑motion handling).

### Backend
- **Express** exposed at `http://localhost:5001` (default). Endpoints:
  - `GET /api/health` – simple health check.
  - `POST /api/contact` – receives contact‑form JSON, logs it, and returns a success response.
  - `GET /api/rates` – serves static rate‑chart metadata consumed by the `/rate-charts` page.
- **Firestore security rules** (`backend/firebase-rules.ts`) – restrict client‑portal reads/writes to authenticated users.

---

## Common Issues & How to Resolve

| Symptom | Likely Cause | Fix |
|---------|--------------|-----|
| **Blank portal login page** | `PortalLayout` blocks unauthenticated routes, including `/portal/login`. | Updated layout to bypass auth guard for the login route. |
| **Runtime error "db is undefined"** | Firebase credentials missing (`isFirebaseConfigured === false`). | UI now shows a friendly message and disables dashboard functionality. |
| **Runtime error "supabase is undefined"** | Supabase keys missing. | UI now warns and disables upload feature. |
| **Contact form does nothing** | Form was using a mock `setTimeout`. | Integrated real POST request to `/api/contact`. |
| **Styling looks broken after Tailwind update** | `tailwind.config.js` missing custom colors. | Ensure you run `npm run build` after changing config. |

---

## Deploying

1. **Frontend** – Deploy to Vercel (the `vercel.json` in the repo already points to the `frontend` directory). Connect your Git repo, set the same environment variables in Vercel dashboard.
2. **Backend** – Deploy to any Node‑compatible platform (Render, Fly.io, Railway). Ensure the `PORT` env var is set.
3. **Firebase & Supabase** – Keep the same projects used locally; the production build will read the env vars you set in Vercel/Render.

---

## License & Contributions

This is a learning project; feel free to fork, experiment, and submit PRs. The code is provided **as‑is** under the MIT license.
