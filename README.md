# Dr. Barkot Ali — Child Specialist Khulna

A modern doctor portfolio website with a built-in admin panel (CMS-style) to manage all content dynamically.

- **Framework:** TanStack Start (React 19 + Vite 7)
- **Styling:** Tailwind CSS v4
- **Data storage:** Browser `localStorage` (no backend required for now)
- **Admin panel:** `/admin` (default credentials → username: `admin`, password: `Barkot Ali`)

> ⚠️ Change the admin password from the **Settings** section after first login.

---

## 🚀 Deploy to Vercel — Full Step-by-Step Guide

This project currently uses the **Cloudflare Workers adapter** (default Lovable setup). To deploy on **Vercel**, we need to switch to the Vercel adapter.

### Step 1 — Push the code to GitHub

1. In the Lovable editor, click **GitHub → Connect to GitHub** (top-right).
2. Authorize Lovable, then click **Create Repository**.
3. Wait until the repo is created — you'll get a GitHub URL like
   `https://github.com/<your-username>/<repo-name>`.

### Step 2 — Import the project into Vercel

1. Go to [vercel.com](https://vercel.com) and sign in (use GitHub for the easiest flow).
2. Click **Add New → Project**.
3. Select your GitHub repo from the list.
4. **Framework Preset:** Vercel will auto-detect **Vite**. Leave it as is.
5. **Build & Output Settings** — leave the defaults:
   - Build Command: `npm run build` (or `bun run build`)
   - Output Directory: `dist` (auto-detected)
   - Install Command: `npm install` (or `bun install`)
6. **Root Directory:** leave as `./`
7. Click **Deploy**.

### Step 3 — Environment Variables

This project **does not use any environment variables** at the moment, because:

- All content is stored in the browser's `localStorage` (no database).
- There are no API keys, no server functions, no third-party integrations.

So in Vercel's **Environment Variables** section, you can leave it **empty**. ✅

> 📌 **For the future** — if you later add a backend (e.g. Lovable Cloud / Supabase / Firebase), add their keys here:
>
> | Name | Where to find it | Example |
> |---|---|---|
> | `VITE_SUPABASE_URL` | Supabase project settings → API | `https://xxxx.supabase.co` |
> | `VITE_SUPABASE_ANON_KEY` | Supabase project settings → API | `eyJhbGciOi...` |
> | `VITE_FIREBASE_API_KEY` | Firebase console → Project settings | `AIzaSy...` |
>
> All client-visible vars **must start with `VITE_`** for Vite to expose them.
>
> ⚠️ Never commit secret/private keys. Add them only in Vercel's dashboard.

### Step 4 — Custom Domain

1. After the first successful deploy, open your project on Vercel.
2. Go to **Settings → Domains**.
3. Click **Add** and enter your custom domain (e.g. `drbarkatali.com`).
4. Vercel will show you DNS records to add to your domain registrar:
   - **A Record** → `76.76.21.21`
   - **CNAME (www)** → `cname.vercel-dns.com`
5. Add those records in your domain provider's dashboard (Namecheap, GoDaddy, etc.).
6. Wait 5–30 minutes for DNS propagation. Vercel will issue an SSL certificate automatically.

### Step 5 — Future updates

Every time you push code to your GitHub `main` branch, Vercel will **automatically redeploy** the site. No manual steps needed.

---

## 🛠️ Local Development

```bash
bun install      # or: npm install
bun dev          # or: npm run dev
```

Visit `http://localhost:8080` (or the port shown in the terminal).

## 🧑‍💻 Admin Panel

- Visit `/admin`
- Default username: **`admin`**
- Default password: **`Barkot Ali`** (change it from Settings after first login)

From the admin panel you can edit:

- Doctor info (name, title, BMDC, intro, profile image)
- Qualifications, Memberships, Experience, Services
- Gallery (images + captions)
- Chambers (multiple, with schedule, phones, hotline, etc.)
- Contact (multiple WhatsApp + Phone numbers, website, Facebook)
- Site settings (logo, site title, admin password)

All changes are saved to the browser's `localStorage` and reflect on the website instantly.

---

## 📝 Notes

- If the website's **Book Appointment** button shows nothing, it's because both the WhatsApp and Phone number lists are empty in the admin Contact section. Add at least one number.
- Since data is stored in `localStorage`, the admin's edits are **per-browser** — they won't sync across devices. If you need a real shared database, ask Lovable to enable **Lovable Cloud**.
