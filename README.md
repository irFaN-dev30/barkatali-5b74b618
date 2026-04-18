# Dr. Barkot Ali — Child Specialist Khulna

A modern doctor portfolio website with a built-in admin panel (CMS), backed by **Supabase** (via Lovable Cloud).

- **Framework:** TanStack Start (React 19 + Vite 7)
- **Styling:** Tailwind CSS v4
- **Backend:** Supabase (PostgreSQL + Auth + Storage)
- **Admin panel:** `/admin` (email + password login)

---

## 🚀 Deploy to Vercel — Full Step-by-Step Guide (Zero Errors)

### Step 1 — Push the code to GitHub

1. In Lovable, top-right → **GitHub → Connect to GitHub** → authorize → **Create Repository**.
2. Wait until you get a URL like `https://github.com/<your-username>/<repo>`. You can keep it **private**.

### Step 2 — Import the project into Vercel

1. Go to [vercel.com](https://vercel.com) → sign in with GitHub.
2. **Add New → Project** → select your repo.
3. **Framework Preset:** Vercel auto-detects **Vite**. Leave it.
4. **Build & Output Settings** — leave defaults:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
5. **Root Directory:** `./`
6. **Don't click Deploy yet** — first add env vars (Step 3).

### Step 3 — Environment Variables (REQUIRED)

In Vercel's project setup screen, scroll down to **Environment Variables** and add these **two** variables:

| Name | Value |
|---|---|
| `VITE_SUPABASE_URL` | Copy from Lovable: **Cloud → Settings → Project URL** |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Copy from Lovable: **Cloud → Settings → Publishable Key** |

> 🟢 Both keys are **publishable** (safe to expose in the browser). Row-Level Security in the database protects your data.
> 🔴 **Never** add the `SUPABASE_SERVICE_ROLE_KEY` — it bypasses security. We don't need it.

After adding both, click **Deploy**. ✅

### Step 4 — Update Supabase Auth redirect URLs

So login redirects work on your Vercel domain:

1. Open Lovable → **Cloud → Users → Auth Settings**.
2. Add your Vercel URL (e.g. `https://your-app.vercel.app`) and your custom domain (if any) to **Site URL** and **Redirect URLs**.

### Step 5 — Custom Domain on Vercel

1. Vercel project → **Settings → Domains** → **Add** your domain (e.g. `drbarkatali.com`).
2. Vercel shows DNS records — add them at your domain registrar:
   - **A Record** → `76.76.21.21`
   - **CNAME (www)** → `cname.vercel-dns.com`
3. Wait 5–30 min for DNS + auto SSL.
4. Add the new domain to Supabase Auth Redirect URLs (Step 4) too.

### Step 6 — Future updates

Push to GitHub `main` → Vercel auto-redeploys. Done.

---

## 🧑‍💻 Admin Panel — First-Time Setup

1. Go to `/admin`.
2. Click **"Need an account? Sign up"** → enter your email + password (min 6 chars). Email is **auto-confirmed**, so you're signed in immediately.
3. **Grant yourself the admin role** (one-time):
   - Open Lovable → **Cloud → Database → Tables → user_roles**.
   - Click **+ Insert row**:
     - `user_id` = your auth user ID (find it in **Cloud → Users**)
     - `role` = `admin`
   - Save. Refresh `/admin` — you're now in.
4. From the panel you can edit doctor info, qualifications, memberships, experience, services, gallery (file upload!), chambers, contact, and site settings.

> Changes save to Supabase and appear **instantly on every device** for all visitors (realtime sync).

---

## 🛠️ Local Development

```bash
bun install
bun dev
```

For local dev, create a `.env` at the project root with the same two `VITE_SUPABASE_*` vars as in Step 3.

---

## 📝 Notes

- **Appointment button** auto-falls-back: WhatsApp (if any number set) → Phone dialer → hidden.
- **Gallery** uploads go to Supabase Storage `gallery` bucket (public read, admin-only write).
- **Realtime sync:** any admin save instantly updates the website on all open browsers.
