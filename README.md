# ClearCalculate

Production-ready calculator website built with Next.js 15, TypeScript, Tailwind CSS, and reusable shadcn-style UI components.

## Local setup

1. Install Node.js 20+ from [nodejs.org](https://nodejs.org/).
2. Install dependencies:

```bash
npm install
```

3. Start local development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000).

## Build static export

```bash
npm run build
```

Static files are generated in `out/`.

## Beginner-friendly Vercel deployment steps

### 1) Install requirements

- Install **Node.js 20+** and **Git**.
- Create accounts for **GitHub**, **Vercel**, and **Google Search Console**.

### 2) Create project folder

```bash
mkdir clearcalculate
cd clearcalculate
```

- Copy this codebase into the folder.

### 3) Run locally

```bash
npm install
npm run dev
```

- Confirm homepage and `/gpa-calculator` both work.

### 4) Create GitHub repo

- Go to GitHub and create a new repository named `clearcalculate`.
- Do not initialize with README if your local project already has one.

### 5) Push code to GitHub

```bash
git init
git add .
git commit -m "Initial production launch for ClearCalculate"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/clearcalculate.git
git push -u origin main
```

### 6) Connect to Vercel

- In Vercel, click **Add New Project**.
- Import your `clearcalculate` repository.
- Framework preset should auto-detect **Next.js**.
- Click **Deploy**.

### 7) Connect domain `clearcalculate.com`

- In Vercel project settings, open **Domains**.
- Add `clearcalculate.com` and `www.clearcalculate.com`.
- In your domain registrar DNS settings, add the records Vercel provides.

### 8) Enable HTTPS

- Vercel automatically provisions SSL certificates.
- Wait for DNS propagation and verify the site opens with `https://`.

### 9) Submit sitemap to Google Search Console

- Verify domain ownership in Google Search Console.
- Open **Sitemaps** and submit:

```txt
https://clearcalculate.com/sitemap.xml
```

- Also ensure `app/layout.tsx` has your real:
  - Google Search Console verification code
  - Google Analytics measurement ID
