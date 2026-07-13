# BOSS Associates LLC — Website

A fast, responsive, SEO-friendly static website built with plain **HTML, CSS, and JavaScript**.
No build tools or frameworks are required to host it — just upload the files.

## Pages
- `index.html` — Home
- `about.html` — About
- `services.html` — Services (with Payroll, Business Consulting, and Financial Education sections)
- `tax-preparation.html` — Tax Preparation
- `accounting.html` — Accounting
- `bookkeeping.html` — Bookkeeping
- `bookkeeping-training.html` — Bookkeeping Training
- `certificate-verification.html` — Certificate Verification (embed slot for your tool)
- `contact.html` — Contact
- `404.html` — Friendly "page not found"

Shared assets: `css/styles.css`, `js/main.js`, `assets/logo.svg` (placeholder crest), `assets/favicon.svg`.

---

## 1) Update your details (do this first)

Open **`build.js`** and edit the `SITE` object at the top, then re-run the generator (see below).
Or, if you'd rather not use Node, edit the finished `.html` files directly with find-and-replace:

| What | Current placeholder | Where |
|---|---|---|
| Phone (display) | `(303) 931-5098` | all pages, footer |
| Phone (link) | `+13039315098` | all pages |
| Email | `malika@bossassociate.com` | all pages, contact form |
| City | `Atlanta, Georgia` | footer, contact |
| Domain (for SEO tags) | `https://www.bossassociate.com` | `<link rel="canonical">`, `sitemap.xml`, `robots.txt` |
| Founder name / bio | "Malika" | `about.html` |
| Stats (15+, 100%, etc.) | placeholders | `index.html`, `about.html` |

> The phone number, hours, and stats are sensible defaults — replace them with your real business information before going live.

### Re-generating the HTML (optional)
The `.html` files are produced from `build.js`. If you edit `build.js`, regenerate with:
```bash
node build.js
```
Node.js 18+ is required. If you edit the `.html` files directly, you don't need Node at all — but then don't re-run `build.js`, since it will overwrite your changes.

---

## 2) Embed your Certificate Verification tool (Google Apps Script)

Open **`certificate-verification.html`** and find the block marked **`EMBED SLOT`**.

1. In Google Apps Script, deploy your project as a **Web App**
   (Deploy → New deployment → Web app → *Execute as: Me*, *Who has access: Anyone*).
2. Copy the deployment URL (it ends in `/exec`).
3. In the file, **uncomment the `<iframe>`** and paste your URL into `src="…"`.
4. **Delete the `.verify-placeholder` block** so only your live tool shows.

```html
<iframe
  src="https://script.google.com/macros/s/XXXXXXXX/exec"
  title="BOSS Associates Certificate Verification"
  loading="lazy"></iframe>
```

That's it — your existing tool will load inside the styled page.

---

## 3) Host free on GitHub Pages

1. Create a **free GitHub account** and a new repository.
   - To use the free `username.github.io` address, name the repo exactly `username.github.io`.
   - For a custom domain (below), any repo name works.
2. Upload **all files and folders** in this project to the repo
   (drag-and-drop in the browser works, or use `git`). Keep the folder structure —
   `css/`, `js/`, and `assets/` must stay as folders.
3. In the repo, go to **Settings → Pages**.
4. Under *Build and deployment*, set **Source: Deploy from a branch**,
   **Branch: `main`**, **Folder: `/ (root)`**, then **Save**.
5. Wait ~1 minute. Your site appears at `https://username.github.io/` (or `/repo-name/`).

The included `.nojekyll` file tells GitHub Pages to serve the files as-is.

---

## 4) Connect your GoDaddy domain

**In GitHub** (repo → Settings → Pages → *Custom domain*):
1. Enter your domain, e.g. `www.bossassociate.com`, and Save.
   GitHub creates a `CNAME` file in the repo automatically.
2. Leave **Enforce HTTPS** unchecked until DNS finishes, then check it.

**In GoDaddy** (Domain → DNS → Manage DNS), add these records:

| Type | Name | Value |
|---|---|---|
| CNAME | `www` | `username.github.io` |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

(The four `A` records point your root/apex domain, e.g. `bossassociate.com`, to GitHub Pages.
The `CNAME` points `www` to your GitHub Pages address.)

DNS changes can take from a few minutes up to 48 hours. Once propagated, both
`bossassociate.com` and `www.bossassociate.com` will serve your site over HTTPS.

> After the custom domain is live, update `https://www.bossassociate.com` in
> `sitemap.xml`, `robots.txt`, and the canonical/OG tags if your final domain differs.

---

## Customizing the look

- **Colors & fonts** live as CSS variables at the top of `css/styles.css`
  (`--navy-800`, `--gold`, `--gray-50`, fonts, etc.). Change them in one place to re-theme.
- **Logo:** replace `assets/logo.svg` with your real logo (keep the filename, or update the
  references in `build.js`/HTML). The placeholder is a navy-and-gold "BA" crest.
- **Contact form:** it opens the visitor's email app pre-filled (no server needed — ideal for
  GitHub Pages). To collect submissions automatically instead, swap it for a free service like
  Formspree or Google Forms.

## Accessibility & SEO built in
Semantic landmarks, a skip-to-content link, keyboard-visible focus, `prefers-reduced-motion`
support, descriptive titles/meta descriptions, Open Graph tags, JSON-LD structured data,
`sitemap.xml`, and `robots.txt`.
