/* Static site generator for BOSS Associates LLC
   Produces plain HTML files (no runtime dependency) for GitHub Pages. */
const fs = require("fs");
const path = require("path");

const OUT = __dirname;

const SITE = {
  name: "BOSS Associates LLC",
  short: "BOSS Associates",
  tagline: "Accounting, Tax & Financial Education",
  phoneDisplay: "(303) 931-5098",
  phoneHref: "+13039315098",
  email: "malika@bossassociate.com",
  city: "Atlanta, Georgia",
  domain: "https://www.bossassociate.com", // update to your GoDaddy domain
};

/* ---------------- Icons (inline SVG, stroke = currentColor) ---------------- */
const I = {
  accounting: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 3v18"/><path d="M13 13h4M13 16.5h4"/></svg>`,
  bookkeeping: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19a2 2 0 0 0 2 2h13"/><path d="M8 7h7M8 10.5h7"/></svg>`,
  tax: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2h9l4 4v16l-2.5-1.5L14 22l-2.5-1.5L9 22l-2.5-1.5L4 22V4a2 2 0 0 1 2-2z"/><path d="M9 8l6 6M9.5 8.5h.01M14.5 13.5h.01"/></svg>`,
  payroll: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><circle cx="9" cy="12" r="2.5"/><path d="M15 9h4M15 15h4M2 9h4"/></svg>`,
  consulting: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M7 14l3.5-3.5 3 3L21 7"/><path d="M16 7h5v5"/></svg>`,
  education: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M22 9 12 4 2 9l10 5 10-5z"/><path d="M6 11v5c0 1 2.5 3 6 3s6-2 6-3v-5"/><path d="M22 9v6"/></svg>`,
  training: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="9" r="5"/><path d="M12 4.5v4l2 1.5"/><path d="M8.5 13.5 7 22l5-2.5L17 22l-1.5-8.5"/></svg>`,
  verify: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="m9 12 2 2 4-4"/><path d="M12 2 4 5v6c0 5 3.4 8.6 8 11 4.6-2.4 8-6 8-11V5z"/></svg>`,
  phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.6a16 16 0 0 0 6 6l1.1-1.1a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 6 10 7L22 6"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m20 6-11 11-5-5"/></svg>`,
  arrow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`,
  chevron: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 4 5v6c0 5 3.4 8.6 8 11 4.6-2.4 8-6 8-11V5z"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>`,
};

const seal = fs.readFileSync(path.join(OUT, "assets", "logo.svg"), "utf8");

/* ---------------- Shared partials ---------------- */
const NAVITEMS = [
  ["index.html", "Home", "home"],
  ["about.html", "About", "about"],
];
const SERVICE_LINKS = [
  ["services.html", "All Services", "Overview of everything we do"],
  ["tax-preparation.html", "Tax Preparation", "Individual & small-business filing"],
  ["accounting.html", "Accounting", "Statements, reconciliations, reporting"],
  ["bookkeeping.html", "Bookkeeping", "Clean, current, monthly books"],
  ["bookkeeping-training.html", "Bookkeeping Training", "Learn the skill yourself"],
];

function head(page) {
  const canonical = SITE.domain + "/" + (page.file === "index.html" ? "" : page.file);
  const jsonld = page.jsonld ? `\n  <script type="application/ld+json">${JSON.stringify(page.jsonld)}</script>` : "";
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${page.title}</title>
  <meta name="description" content="${page.desc}">
  <link rel="canonical" href="${canonical}">
  <meta name="theme-color" content="#0B2545">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${SITE.name}">
  <meta property="og:title" content="${page.title}">
  <meta property="og:description" content="${page.desc}">
  <meta property="og:url" content="${canonical}">
  <meta name="twitter:card" content="summary">
  <link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,500;1,9..144,600&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/styles.css">${jsonld}
</head>
<body>
  <a class="skip" href="#main">Skip to content</a>`;
}

function header(active) {
  const link = (file, label, key) =>
    `<a href="${file}"${active === key ? ' aria-current="page"' : ""}>${label}</a>`;
  const dropItems = SERVICE_LINKS.map(([f, t, s]) =>
    `<a href="${f}"><b>${t}</b><small>${s}</small></a>`).join("");
  const servicesActive = ["services","tax","accounting","bookkeeping","training"].includes(active);
  return `
  <header class="site-header">
    <div class="wrap nav">
      <a class="brand" href="index.html" aria-label="${SITE.name} home">
        <img class="brand__mark" src="assets/logo.svg" alt="">
        <span class="brand__name">BOSS Associates<span>${SITE.tagline}</span></span>
      </a>
      <nav class="nav__links" aria-label="Primary">
        ${link("index.html","Home","home")}
        ${link("about.html","About","about")}
        <div class="has-dropdown${servicesActive ? " open-active" : ""}">
          <button class="nav__drop" aria-haspopup="true" aria-expanded="false"${servicesActive ? ' aria-current="page"' : ""}>Services ${I.chevron}</button>
          <div class="dropdown">
            ${dropItems}
          </div>
        </div>
        ${link("certificate-verification.html","Verify Certificate","verify")}
        ${link("contact.html","Contact","contact")}
      </nav>
      <div class="nav__cta">
        <a class="btn btn--ghost" href="tel:${SITE.phoneHref}">${I.phone} ${SITE.phoneDisplay}</a>
        <a class="btn btn--gold" href="contact.html">Book a Consultation</a>
      </div>
      <button class="menu-btn" aria-label="Menu" aria-expanded="false"><span></span></button>
    </div>
  </header>`;
}

function footer() {
  return `
  <footer class="site-footer">
    <div class="wrap">
      <div class="footer-grid">
        <div>
          <div class="fbrand">
            <img class="mark" src="assets/logo.svg" alt="">
            <span class="brand__name">BOSS Associates<span>LLC</span></span>
          </div>
          <p class="fdesc">Trusted accounting, tax, and financial education for small businesses and entrepreneurs across Georgia and beyond.</p>
        </div>
        <div>
          <h4>Services</h4>
          <ul>
            <li><a href="accounting.html">Accounting</a></li>
            <li><a href="bookkeeping.html">Bookkeeping</a></li>
            <li><a href="tax-preparation.html">Tax Preparation</a></li>
            <li><a href="services.html#payroll">Payroll</a></li>
            <li><a href="services.html#consulting">Business Consulting</a></li>
            <li><a href="services.html#education">Financial Education</a></li>
          </ul>
        </div>
        <div>
          <h4>Company</h4>
          <ul>
            <li><a href="about.html">About</a></li>
            <li><a href="bookkeeping-training.html">Bookkeeping Training</a></li>
            <li><a href="certificate-verification.html">Verify a Certificate</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4>Get in touch</h4>
          <ul class="fcontact">
            <li>${I.pin}<span>${SITE.city}</span></li>
            <li>${I.phone}<a href="tel:${SITE.phoneHref}">${SITE.phoneDisplay}</a></li>
            <li>${I.mail}<a href="mailto:${SITE.email}">${SITE.email}</a></li>
            <li>${I.clock}<span>Mon-Fri · 9:00am-5:00pm ET</span></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; <span id="year">2026</span> ${SITE.name}. All rights reserved.</span>
        <span>Atlanta, Georgia · Serving clients nationwide</span>
      </div>
      <p class="disclaimer">BOSS Associates LLC provides accounting, bookkeeping, tax preparation, and educational services. Content on this website is for general informational purposes and does not constitute individualized tax, legal, or financial advice. Please contact us to discuss your specific situation.</p>
    </div>
  </footer>
  <script src="js/main.js"></script>
</body>
</html>`;
}

function page(p) {
  const html = head(p) + header(p.active) + `\n  <main id="main" tabindex="-1">` + p.body + `\n  </main>` + footer();
  fs.writeFileSync(path.join(OUT, p.file), html, "utf8");
  console.log("wrote", p.file);
}

/* ---------------- Reusable body chunks ---------------- */
const consult = `<a class="btn btn--gold" href="contact.html">Book a Consultation ${I.arrow}</a>`;
const callBtn = `<a class="btn btn--ghost" href="tel:${SITE.phoneHref}">${I.phone} Call ${SITE.phoneDisplay}</a>`;

function pagehero(crumb, title, sub) {
  return `
  <section class="pagehero">
    <div class="wrap">
      <div class="crumbs reveal"><a href="index.html">Home</a> / <span>${crumb}</span></div>
      <h1 class="reveal d1">${title}</h1>
      <p class="reveal d2">${sub}</p>
    </div>
  </section>`;
}

function ctaBand(title, text) {
  return `
  <section class="section">
    <div class="wrap">
      <div class="ctaband reveal">
        <h2 class="h2">${title}</h2>
        <p>${text}</p>
        <div class="btnrow">
          ${consult}
          <a class="btn btn--outline" href="tel:${SITE.phoneHref}">${I.phone} ${SITE.phoneDisplay}</a>
        </div>
      </div>
    </div>
  </section>`;
}

const TESTIMONIALS = [
  ["The transition to BOSS Associates was the best decision we made this year. Our books are finally clean, current, and something I actually understand.", "R. Daniels", "Owner, Peachtree Interiors", "RD"],
  ["Malika explains the numbers in plain English. For the first time I know exactly where my business stands before I make a decision.", "T. Okafor", "Founder, Okafor Consulting", "TO"],
  ["Tax season used to keep me up at night. Now it's organized, on time, and I keep more of what I earn. Worth every penny.", "S. Whitfield", "Independent Contractor", "SW"],
  ["I took the Bookkeeping Basics course and came out able to run my own monthly books. The certificate helped me land a part-time bookkeeping role.", "J. Alvarez", "Course Graduate", "JA"],
];

function testimonialsSection() {
  const cards = TESTIMONIALS.map(([q, name, role, av], i) => `
        <figure class="quote reveal d${(i % 4) + 1}">
          <div class="stars" aria-label="5 out of 5 stars">★★★★★</div>
          <blockquote>&ldquo;${q}&rdquo;</blockquote>
          <figcaption>
            <span class="avatar">${av}</span>
            <span class="who"><b>${name}</b><span>${role}</span></span>
          </figcaption>
        </figure>`).join("");
  return `
  <section class="section section--gray">
    <div class="wrap">
      <div class="center" style="margin-bottom:48px">
        <span class="eyebrow reveal">Client Voices</span>
        <h2 class="h2 reveal d1">Trusted by owners who value clarity</h2>
        <p class="lead reveal d2">Real results from business owners and course graduates who wanted their numbers to finally make sense.</p>
      </div>
      <div class="grid grid-2">
        ${cards}
      </div>
    </div>
  </section>`;
}

function faqSection(items, heading = "Frequently asked questions", sub = "Straight answers to the questions we hear most.") {
  const rows = items.map(([q, a]) => `
        <details class="faq__item reveal">
          <summary class="faq__q">${q}<span class="plus" aria-hidden="true"></span></summary>
          <div class="faq__a"><p>${a}</p></div>
        </details>`).join("");
  return `
  <section class="section">
    <div class="wrap">
      <div class="center" style="margin-bottom:40px">
        <span class="eyebrow reveal">FAQ</span>
        <h2 class="h2 reveal d1">${heading}</h2>
        <p class="lead reveal d2">${sub}</p>
      </div>
      <div class="faq reveal d1">
        ${rows}
      </div>
    </div>
  </section>`;
}

/* Small service card */
function svcCard([icon, title, desc, link], delay) {
  return `
        <a class="card reveal d${delay}" href="${link}" style="display:block">
          <div class="card__icon">${I[icon]}</div>
          <h3>${title}</h3>
          <p>${desc}</p>
          <span class="card__link">Learn more ${I.arrow}</span>
        </a>`;
}

/* ============================================================
   PAGE: HOME
   ============================================================ */
const homeServices = [
  ["accounting", "Accounting", "Accurate financial statements, reconciliations, and reporting that give you a true picture of your business.", "accounting.html"],
  ["bookkeeping", "Bookkeeping", "Clean, current books maintained monthly so you always know where your money is going.", "bookkeeping.html"],
  ["tax", "Tax Preparation", "Individual and small-business returns prepared accurately, filed on time, and optimized to your situation.", "tax-preparation.html"],
  ["payroll", "Payroll Services", "Reliable payroll processing, filings, and pay-run support that keep your team paid and compliant.", "services.html#payroll"],
  ["consulting", "Business Consulting", "Practical guidance on cash flow, systems, and growth from someone who reads the numbers with you.", "services.html#consulting"],
  ["education", "Financial Education", "Workshops and one-on-one coaching that turn confusing finances into confident decisions.", "services.html#education"],
];

page({
  file: "index.html",
  active: "home",
  title: "BOSS Associates LLC | Accounting, Tax & Bookkeeping Training in Atlanta",
  desc: "BOSS Associates LLC is an Atlanta-based accounting firm offering bookkeeping, tax preparation, payroll, business consulting, and hands-on bookkeeping training for small business owners.",
  jsonld: {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    "name": SITE.name,
    "description": "Accounting, bookkeeping, tax preparation, payroll, and financial education for small businesses.",
    "areaServed": "US",
    "address": { "@type": "PostalAddress", "addressLocality": "Atlanta", "addressRegion": "GA", "addressCountry": "US" },
    "email": SITE.email,
    "telephone": SITE.phoneDisplay,
    "url": SITE.domain,
    "priceRange": "$$"
  },
  body: `
  <section class="hero">
    <div class="wrap">
      <div class="hero__inner">
        <div>
          <span class="eyebrow hero__eyebrow reveal">Atlanta, Georgia · Accounting &amp; Financial Education</span>
          <h1 class="reveal d1">Your numbers, handled with <em>precision</em> and care.</h1>
          <p class="hero__sub reveal d2">BOSS Associates LLC helps small business owners keep clean books, file confident taxes, and finally understand the story their finances are telling , plus training to master bookkeeping yourself.</p>
          <div class="hero__cta reveal d3">
            ${consult}
            <a class="btn btn--outline" href="services.html">Explore Services ${I.arrow}</a>
          </div>
          <div class="hero__trust reveal d4">
            <div class="stat"><b>15+</b><span>Years of accounting expertise</span></div>
            <div class="stat"><b>100%</b><span>On-time, accurate filings</span></div>
            <div class="stat"><b>1:1</b><span>Personal attention, every client</span></div>
          </div>
        </div>
        <aside class="hero__card reveal d2">
          <div class="seal">${seal}</div>
          <h3>Why owners choose us</h3>
          <ul class="hero__list">
            <li><span class="tick">${I.check}</span> CPA-firm trained, detail-obsessed accounting</li>
            <li><span class="tick">${I.check}</span> Plain-English explanations, no jargon</li>
            <li><span class="tick">${I.check}</span> Books, payroll &amp; taxes under one roof</li>
            <li><span class="tick">${I.check}</span> Education so you're never in the dark</li>
          </ul>
        </aside>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="center" style="margin-bottom:52px">
        <span class="eyebrow reveal">What We Do</span>
        <h2 class="h2 reveal d1">Full-service financial support for growing businesses</h2>
        <p class="lead reveal d2">From day-to-day bookkeeping to tax season and beyond, we handle the details so you can focus on running your business.</p>
      </div>
      <div class="grid grid-3">
        ${homeServices.map((s,i)=>svcCard(s,(i%3)+1)).join("")}
      </div>
    </div>
  </section>

  <section class="section section--navy">
    <div class="wrap">
      <div class="split">
        <div class="reveal">
          <span class="eyebrow">The BOSS Difference</span>
          <h2 class="h2">Accounting that treats your business like it matters , because it does.</h2>
          <p class="lead">We built BOSS Associates on a simple belief: every owner deserves financials they can trust and understand. You get a real professional who knows your books, answers your calls, and helps you make decisions with confidence.</p>
          <div class="hero__cta" style="margin-top:1.5rem">
            <a class="btn btn--gold" href="about.html">Meet BOSS Associates ${I.arrow}</a>
          </div>
        </div>
        <ul class="checklist reveal d2" style="background:rgba(255,255,255,.05);border:1px solid rgba(198,161,91,.3);border-radius:16px;padding:28px 30px">
          <li><span class="tick">${I.check}</span><span><b style="color:#fff">Accuracy first.</b> <span style="color:#B9C6D8">Reconciled, review-ready books every month.</span></span></li>
          <li><span class="tick">${I.check}</span><span><b style="color:#fff">One point of contact.</b> <span style="color:#B9C6D8">You work directly with your accountant.</span></span></li>
          <li><span class="tick">${I.check}</span><span><b style="color:#fff">Proactive, not reactive.</b> <span style="color:#B9C6D8">We flag issues before they become problems.</span></span></li>
          <li><span class="tick">${I.check}</span><span><b style="color:#fff">We teach, too.</b> <span style="color:#B9C6D8">Optional training so you understand your own numbers.</span></span></li>
        </ul>
      </div>
    </div>
  </section>

  <section class="section section--gray">
    <div class="wrap">
      <div class="split">
        <div class="media-frame reveal">
          <span class="tag">Now Enrolling</span>
          <h3 class="h2" style="font-size:1.9rem">Bookkeeping Basics for Small Business Owners</h3>
          <p style="color:var(--muted)">A practical, 3-hour introductory course that takes you from &ldquo;I avoid my books&rdquo; to confidently recording transactions, reconciling accounts, and reading your own reports.</p>
          <ul class="checklist">
            <li><span class="tick">${I.check}</span> Built and taught by an experienced accountant</li>
            <li><span class="tick">${I.check}</span> Workbook, real examples &amp; a certificate of completion</li>
            <li><span class="tick">${I.check}</span> Perfect for owners, freelancers &amp; aspiring bookkeepers</li>
          </ul>
          <a class="btn btn--gold" href="bookkeeping-training.html">View the Course ${I.arrow}</a>
        </div>
        <div class="reveal d2">
          <span class="eyebrow">Financial Education</span>
          <h2 class="h2">Don't just outsource your finances , understand them.</h2>
          <p class="lead">Most owners were never taught how their books actually work. Our training changes that. Whether you want to keep your own books or simply speak the language, you'll leave knowing exactly what your numbers mean.</p>
          <div class="training-stats" aria-label="Course highlights">
            <div class="training-stat"><strong>3 hrs</strong><span>Hands-on bookkeeping training</span></div>
            <div class="training-stat"><strong>15</strong><span>Course materials included</span></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  ${testimonialsSection()}

  ${faqSection([
    ["Where is BOSS Associates located, and do you work remotely?", "We're based in Atlanta, Georgia, and serve clients both locally and nationwide. Most bookkeeping, accounting, and tax work is handled securely online, with calls and video meetings whenever you'd like to talk things through."],
    ["What size businesses do you work with?", "We specialize in small businesses, solo entrepreneurs, freelancers, and contractors. If you're just getting organized or you've outgrown doing it yourself, we can meet you where you are."],
    ["Do I have to choose between hiring you and learning it myself?", "Not at all. Many clients hire us for their books and taxes while also taking our training so they understand what's happening. You can do one, the other, or both."],
    ["How do I get started?", "Book a consultation and we'll talk through your situation, what you need, and how we can help. There's no obligation , just a clear next step."],
  ])}

  ${ctaBand("Ready for financials you can finally trust?", "Let's talk about your books, your taxes, and your goals. Book a free consultation and see how much lighter running your business can feel.")}
  `,
});

/* ============================================================
   PAGE: ABOUT
   ============================================================ */
page({
  file: "about.html",
  active: "about",
  title: "About BOSS Associates LLC | Atlanta Accounting Firm",
  desc: "Learn about BOSS Associates LLC, an Atlanta-based accounting and financial education firm founded on accuracy, integrity, and clear communication.",
  body: `
  ${pagehero("About", "Built on accuracy, integrity, and plain English.", "BOSS Associates LLC is a boutique accounting and financial-education firm that treats your numbers with the care and precision they deserve.")}

  <section class="section">
    <div class="wrap">
      <div class="split">
        <div class="reveal">
          <span class="eyebrow">Our Story</span>
          <h2 class="h2">A firm built for owners who want to actually understand their business.</h2>
          <p>BOSS Associates LLC was founded to close a frustrating gap. Too many small business owners hand off their finances and never really know what's happening , until something goes wrong. We do things differently.</p>
          <p>Our founder, Malika, brings formal accounting education and hands-on CPA-firm experience across bookkeeping, payroll, reconciliations, and tax preparation. That background shapes everything here: work that's technically sound, carefully reviewed, and explained in language that makes sense.</p>
          <p>Today we combine full-service accounting with financial education, because the best outcomes happen when a business owner and their accountant are truly on the same page.</p>
        </div>
        <div class="media-frame reveal d2">
          <div class="seal" style="width:120px;height:120px;margin:0 auto 20px">${seal}</div>
          <h3 style="text-align:center;font-size:1.5rem">BOSS Associates LLC</h3>
          <p style="text-align:center;color:var(--muted)">Accounting · Tax · Financial Education<br>Atlanta, Georgia</p>
          <hr class="rule">
          <ul class="checklist">
            <li><span class="tick">${I.check}</span> Formal accounting education (BS &amp; AAS in Accounting)</li>
            <li><span class="tick">${I.check}</span> CPA-firm experience in the work that matters</li>
            <li><span class="tick">${I.check}</span> Approved workforce-development curriculum developer</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--navy">
    <div class="wrap">
      <div class="center" style="margin-bottom:48px">
        <span class="eyebrow">What Guides Us</span>
        <h2 class="h2">Values we won't compromise on</h2>
      </div>
      <div class="grid grid-3">
        <div class="card reveal d1"><div class="card__icon">${I.shield}</div><h3>Integrity</h3><p>Truthful, defensible, and done right , even when no one's checking. Your trust is the whole business.</p></div>
        <div class="card reveal d2"><div class="card__icon">${I.accounting}</div><h3>Precision</h3><p>Reconciled, reviewed, and consistent. Details matter in accounting, and we sweat them so you don't have to.</p></div>
        <div class="card reveal d3"><div class="card__icon">${I.education}</div><h3>Empowerment</h3><p>We explain, teach, and share the &ldquo;why.&rdquo; You should never feel in the dark about your own money.</p></div>
      </div>
    </div>
  </section>

  <section class="section section--gray">
    <div class="wrap">
      <div class="statband">
        <div class="stat reveal d1"><b>15+</b><span style="color:var(--muted)">Years of expertise</span></div>
        <div class="stat reveal d2"><b>6</b><span style="color:var(--muted)">Core service areas</span></div>
        <div class="stat reveal d3"><b>1:1</b><span style="color:var(--muted)">Direct client relationships</span></div>
        <div class="stat reveal d4"><b>ATL</b><span style="color:var(--muted)">Based, serving nationwide</span></div>
      </div>
    </div>
  </section>

  ${faqSection([
    ["Who will I actually work with?", "You will work directly with your accountant at BOSS Associates, not a rotating call center. That personal continuity is how we keep your books highly accurate and ensure your questions are answered quickly."],
    ["Are you accepting new clients?", "Yes, we are currently welcoming new monthly bookkeeping, tax, and consulting clients. Because we focus on delivering personalized, 1:1 service, we manage our client roster carefully to ensure everyone receives the attention they deserve."],
    ["Can you work with my existing software?", "Absolutely. We work with QuickBooks Online, Xero, and other leading accounting platforms. If you already have a system in place, we can typically work within your existing setup. If you're starting from scratch or paying for software that doesn't fit your needs, we'll evaluate your business, transaction volume, and goals to recommend and implement a solution that supports your operations efficiently and cost-effectively."],
  ], "About working with us")}

  ${ctaBand("Let's build a financial foundation you can rely on.", "Book a consultation to meet BOSS Associates and see whether we're the right fit for your business.")}
  `,
});

/* ============================================================
   PAGE: SERVICES (overview + anchors for payroll/consulting/education)
   ============================================================ */
const allServices = [
  ["accounting", "Accounting", "Financial statements, reconciliations, month-end close, and reporting that reflect the true state of your business.", "accounting.html", "accounting"],
  ["bookkeeping", "Bookkeeping", "Ongoing, monthly bookkeeping that keeps your records clean, categorized, and ready for tax time or lending.", "bookkeeping.html", "bookkeeping"],
  ["tax", "Tax Preparation", "Accurate individual and small-business tax preparation and filing, with planning to help you keep more of what you earn.", "tax-preparation.html", "tax"],
  ["payroll", "Payroll Services", "Dependable payroll runs, pay-stub and filing support, and help staying compliant as your team grows.", "#payroll", "payroll"],
  ["consulting", "Business Consulting", "Guidance on cash flow, budgeting, systems, and financial strategy from someone who reads your numbers with you.", "#consulting", "consulting"],
  ["education", "Financial Education", "Workshops, coaching, and training that build real financial confidence for you and your team.", "#education", "education"],
];

page({
  file: "services.html",
  active: "services",
  title: "Services | Accounting, Bookkeeping, Tax, Payroll & Consulting | BOSS Associates",
  desc: "Explore BOSS Associates LLC services: accounting, bookkeeping, tax preparation, payroll, business consulting, financial education, and bookkeeping training.",
  body: `
  ${pagehero("Services", "Everything your finances need, in one trusted place.", "A complete suite of accounting, tax, payroll, and education services designed for small businesses and entrepreneurs.")}

  <section class="section">
    <div class="wrap">
      <div class="grid grid-3">
        ${allServices.map((s,i)=>`
        <a class="card reveal d${(i%3)+1}" href="${s[3]}" style="display:block">
          <div class="card__icon">${I[s[0]]}</div>
          <h3>${s[1]}</h3>
          <p>${s[2]}</p>
          <span class="card__link">${s[3].startsWith("#") ? "Details below" : "Learn more"} ${I.arrow}</span>
        </a>`).join("")}
      </div>
    </div>
  </section>

  <section class="section section--gray">
    <div class="wrap narrow prose">
      <div id="payroll" style="scroll-margin-top:100px">
        <span class="eyebrow reveal">Payroll Services</span>
        <h2 class="h2 reveal d1">Pay your team correctly, on time, every time.</h2>
        <p class="reveal d2">Payroll is where small errors turn into big headaches. We help you run payroll smoothly and stay on top of the filings and deadlines that come with it , so your people are paid right and your records stay clean.</p>
        <ul class="checklist reveal d2">
          <li><span class="tick">${I.check}</span> Regular payroll processing and pay-run support</li>
          <li><span class="tick">${I.check}</span> Wage, withholding, and filing organization</li>
          <li><span class="tick">${I.check}</span> Clean hand-off into your books and tax prep</li>
        </ul>
      </div>
      <hr class="rule">
      <div id="consulting" style="scroll-margin-top:100px">
        <span class="eyebrow reveal">Business Consulting</span>
        <h2 class="h2 reveal d1">A financial partner in your corner.</h2>
        <p class="reveal d2">Numbers only help if they inform decisions. We sit down with you to make sense of cash flow, pricing, budgeting, and the systems running your business , then turn that into a clear, practical plan.</p>
        <ul class="checklist reveal d2">
          <li><span class="tick">${I.check}</span> Cash-flow and budgeting guidance</li>
          <li><span class="tick">${I.check}</span> Systems, workflow, and record-keeping setup</li>
          <li><span class="tick">${I.check}</span> Financial strategy conversations you can act on</li>
        </ul>
      </div>
      <hr class="rule">
      <div id="education" style="scroll-margin-top:100px">
        <span class="eyebrow reveal">Financial Education</span>
        <h2 class="h2 reveal d1">Confidence comes from understanding.</h2>
        <p class="reveal d2">We're an accounting firm that also teaches. Through workshops, coaching, and our bookkeeping training, we help owners and teams understand the fundamentals , so financial decisions feel a lot less intimidating.</p>
        <ul class="checklist reveal d2">
          <li><span class="tick">${I.check}</span> Practical workshops and one-on-one coaching</li>
          <li><span class="tick">${I.check}</span> Approved workforce-development curriculum</li>
          <li><span class="tick">${I.check}</span> The <a href="bookkeeping-training.html">Bookkeeping Basics</a> course for owners</li>
        </ul>
      </div>
    </div>
  </section>

  ${testimonialsSection()}

  ${ctaBand("Not sure which service you need?", "Tell us about your business and we'll point you to the right starting place. No pressure, just a helpful conversation.")}
  `,
});

/* ============================================================
   Shared service-detail builder for Tax / Accounting / Bookkeeping
   ============================================================ */
function servicePage({ file, active, crumb, title, metaTitle, metaDesc, hero, lead, intro, includesHeading, includes, steps, forWho, faq, closing }) {
  return page({
    file, active,
    title: metaTitle, desc: metaDesc,
    jsonld: {
      "@context": "https://schema.org", "@type": "Service",
      "serviceType": crumb, "provider": { "@type": "AccountingService", "name": SITE.name },
      "areaServed": "US", "url": SITE.domain + "/" + file
    },
    body: `
    ${pagehero(crumb, hero, lead)}

    <section class="section">
      <div class="wrap">
        <div class="split">
          <div class="reveal">
            <span class="eyebrow">${crumb}</span>
            <h2 class="h2">${title}</h2>
            ${intro.map(p=>`<p>${p}</p>`).join("")}
            <div class="hero__cta" style="margin-top:1.4rem">${consult}${callBtn}</div>
          </div>
          <div class="card card--gray reveal d2">
            <h3 style="font-size:1.3rem">${includesHeading}</h3>
            <ul class="checklist">
              ${includes.map(x=>`<li><span class="tick">${I.check}</span> ${x}</li>`).join("")}
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--gray">
      <div class="wrap">
        <div class="center" style="margin-bottom:44px">
          <span class="eyebrow reveal">How It Works</span>
          <h2 class="h2 reveal d1">A clear, simple process</h2>
        </div>
        <div class="steps narrow" style="margin-inline:auto">
          ${steps.map(([h,p])=>`
          <div class="step reveal"><div class="step__num"></div><div><h4>${h}</h4><p>${p}</p></div></div>`).join("")}
        </div>
      </div>
    </section>

    <section class="section section--navy">
      <div class="wrap narrow center">
        <span class="eyebrow reveal">Who It's For</span>
        <h2 class="h2 reveal d1">${forWho.h}</h2>
        <p class="lead reveal d2" style="margin-inline:auto">${forWho.p}</p>
      </div>
    </section>

    ${faqSection(faq, "Questions about " + crumb.toLowerCase())}

    ${ctaBand(closing.h, closing.p)}
    `,
  });
}

/* ---- TAX PREPARATION ---- */
servicePage({
  file: "tax-preparation.html", active: "tax", crumb: "Tax Preparation",
  metaTitle: "Tax Preparation Services | Atlanta | BOSS Associates LLC",
  metaDesc: "Accurate, on-time individual and small-business tax preparation from BOSS Associates LLC in Atlanta, Georgia. File with confidence and keep more of what you earn.",
  hero: "Tax preparation without the stress.",
  lead: "Accurate returns, filed on time, prepared by someone who actually understands your business and your goals.",
  title: "File with confidence, keep more of what you earn.",
  intro: [
    "Tax season shouldn't feel like a scramble. We prepare individual and small-business returns with the same accuracy and review a CPA firm demands , and we do it while there's still time to plan, not just report.",
    "Because we also handle bookkeeping and accounting, your numbers arrive at tax time already clean and organized. That means fewer surprises, fewer missed deductions, and a return you can stand behind.",
  ],
  includesHeading: "What's included",
  includes: [
    "Individual (1040) and small-business return preparation",
    "Review of income, expenses, and deductions",
    "Organized, accurate, on-time filing",
    "Year-round questions answered , not just in April",
    "Guidance to plan ahead for next year",
  ],
  steps: [
    ["Gather", "We give you a simple checklist and collect your documents securely , no guesswork about what you need."],
    ["Prepare", "We prepare your return carefully, reviewing for accuracy and looking for every deduction you're entitled to."],
    ["Review together", "We walk you through the return in plain English so you understand it before anything is filed."],
    ["File &amp; plan", "We file on time and talk through simple steps to make next year even smoother."],
  ],
  forWho: {
    h: "Ideal for owners, freelancers, and contractors who want it done right.",
    p: "If your finances have gotten more complex, or you're tired of rushing every spring, we bring order and confidence to your filing , and keep the conversation going all year.",
  },
  faq: [
    ["Do you handle both personal and business taxes?", "Yes. We prepare individual returns as well as returns for small businesses, sole proprietors, freelancers, and contractors, and we can coordinate the two so nothing falls through the cracks."],
    ["What if my books are a mess?", "That's common , and fixable. We can clean up and reconcile your books first so your return is built on accurate numbers. Ask us about bundling bookkeeping with tax prep."],
    ["When should I reach out?", "The earlier the better. Getting organized before deadline season means more time to plan, fewer surprises, and a smoother filing. That said, we're glad to help even if you're already behind."],
    ["Can you help me pay less next year?", "We can identify practical, above-board steps to plan ahead. Real tax savings usually come from good decisions made throughout the year, not from anything done at the last minute."],
  ],
  closing: { h: "Make this the year taxes feel handled.", p: "Book a consultation and let's get your filing organized, accurate, and off your plate." },
});

/* ---- ACCOUNTING ---- */
servicePage({
  file: "accounting.html", active: "accounting", crumb: "Accounting",
  metaTitle: "Accounting Services | Financial Statements & Reporting | BOSS Associates",
  metaDesc: "Professional accounting services from BOSS Associates LLC: financial statements, reconciliations, month-end close, and reporting that give small businesses a true financial picture.",
  hero: "Accounting that tells the truth about your business.",
  lead: "Accurate statements, careful reconciliations, and reporting you can actually use to make decisions.",
  title: "A clear financial picture, every single month.",
  intro: [
    "Good accounting is more than data entry , it's turning your activity into a reliable, reviewed picture of how your business is really doing. That's what we deliver.",
    "We handle reconciliations, month-end close, and financial statements with CPA-firm discipline, then translate the results into insights you can act on. No mystery numbers, no April surprises.",
  ],
  includesHeading: "What's included",
  includes: [
    "Monthly or periodic financial statements",
    "Bank and account reconciliations",
    "Month-end and year-end close",
    "Clear reporting and review of results",
    "Books kept audit- and lender-ready",
  ],
  steps: [
    ["Assess", "We review your current setup and records to understand where things stand and what needs cleaning up."],
    ["Reconcile", "We reconcile accounts and close the books so your statements reflect reality, not guesswork."],
    ["Report", "You receive clear financial statements , and a plain-English explanation of what they mean."],
    ["Advise", "We flag trends and opportunities so your accounting informs real decisions, not just compliance."],
  ],
  forWho: {
    h: "For owners who need numbers they can bank on.",
    p: "Whether you're seeking financing, planning growth, or just want to sleep at night, dependable accounting gives you the confidence to lead with facts.",
  },
  faq: [
    ["What's the difference between bookkeeping and accounting?", "Bookkeeping records the day-to-day transactions; accounting turns those records into reconciled statements and insight. Many clients need both, and we handle them together so nothing is duplicated or missed."],
    ["Can you get my books caught up first?", "Yes. If you're behind, we can bring your records current and reconciled before setting up an ongoing rhythm, so everything moving forward is accurate."],
    ["Will I understand the reports?", "That's the point. We don't just hand over statements , we walk you through them so you know exactly what each number is telling you."],
  ],
  closing: { h: "Ready for accounting you can trust?", p: "Book a consultation and let's get your financial picture accurate, current, and genuinely useful." },
});

/* ---- BOOKKEEPING ---- */
servicePage({
  file: "bookkeeping.html", active: "bookkeeping", crumb: "Bookkeeping",
  metaTitle: "Bookkeeping Services | Clean, Monthly Books | BOSS Associates LLC",
  metaDesc: "Reliable monthly bookkeeping from BOSS Associates LLC. Clean, categorized, reconciled books that keep your small business organized and ready for tax time.",
  hero: "Clean books, kept current, every month.",
  lead: "Categorized, reconciled, and up to date , so you always know where your money is going.",
  title: "Never fall behind on your books again.",
  intro: [
    "Messy or missing books cost you money, time, and peace of mind. Our monthly bookkeeping keeps your records accurate and current, so tax season is simple and your decisions are informed.",
    "We record and categorize transactions, reconcile your accounts, and keep everything organized to a standard that stands up to lenders, tax prep, and your own peace of mind.",
  ],
  includesHeading: "What's included",
  includes: [
    "Transaction recording and categorization",
    "Monthly account reconciliations",
    "Organized, tax-ready records",
    "Regular summaries of where you stand",
    "A tidy hand-off into accounting &amp; taxes",
  ],
  steps: [
    ["Set up", "We connect and organize your accounts and establish a clean, consistent system tailored to your business."],
    ["Maintain", "Each month we record, categorize, and reconcile , keeping your books current and accurate."],
    ["Reconcile", "We make sure your books match reality, catching discrepancies before they become problems."],
    ["Report", "You get clear monthly summaries, so you're never guessing about your cash or your position."],
  ],
  forWho: {
    h: "For owners who'd rather run their business than chase receipts.",
    p: "If bookkeeping keeps ending up at the bottom of your to-do list, hand it to us. You'll get clean books and hours of your week back.",
  },
  faq: [
    ["How often will my books be updated?", "Most clients are on a monthly cadence, with reconciliations and a summary each period. If your business moves faster, we can talk about a schedule that fits."],
    ["I'm months behind , can you help?", "Absolutely. Catch-up bookkeeping is one of the most common things we do. We'll bring your records current and then keep them that way."],
    ["Do you offer training if I want to learn myself?", "Yes , that's a big part of what we do. Check out our <a href='bookkeeping-training.html'>Bookkeeping Training</a> to learn the skill, or combine training with done-for-you bookkeeping."],
  ],
  closing: { h: "Hand off the books. Reclaim your time.", p: "Book a consultation and let's get your bookkeeping clean, current, and off your mind for good." },
});

/* ============================================================
   PAGE: BOOKKEEPING TRAINING
   ============================================================ */
page({
  file: "bookkeeping-training.html",
  active: "training",
  title: "Bookkeeping Training | Bookkeeping Basics for Small Business Owners | BOSS Associates",
  desc: "Bookkeeping Basics for Small Business Owners , a practical 3-hour bookkeeping training course from BOSS Associates LLC. Learn to record, reconcile, and read your own books, with a certificate of completion.",
  jsonld: {
    "@context": "https://schema.org", "@type": "Course",
    "name": "Bookkeeping Basics for Small Business Owners",
    "description": "A practical 3-hour introductory bookkeeping course for small business owners, freelancers, and aspiring bookkeepers.",
    "provider": { "@type": "Organization", "name": SITE.name, "url": SITE.domain }
  },
  body: `
  ${pagehero("Bookkeeping Training", "Learn to run your own books with confidence.", "Bookkeeping Basics for Small Business Owners , a practical, plain-English course taught by an experienced accountant.")}

  <section class="section">
    <div class="wrap">
      <div class="split">
        <div class="reveal">
          <span class="tag">Now Enrolling</span>
          <h2 class="h2">Bookkeeping Basics for Small Business Owners</h2>
          <p class="lead">A focused, 3-hour introductory course that takes you from avoiding your books to confidently recording transactions, reconciling accounts, and reading your own financial reports.</p>
          <p>This isn't a dry lecture. It's the practical foundation every owner should have , built from real curriculum used for workforce-development training, taught in language anyone can follow.</p>
          <div class="hero__cta" style="margin-top:1.4rem">
            <a class="btn btn--gold" href="contact.html">Enroll or Ask a Question ${I.arrow}</a>
            <a class="btn btn--ghost" href="certificate-verification.html">${I.verify} Verify a Certificate</a>
          </div>
        </div>
        <div class="card card--gray reveal d2">
          <div class="card__icon">${I.training}</div>
          <h3 style="font-size:1.35rem">Course at a glance</h3>
          <ul class="checklist">
            <li><span class="tick">${I.check}</span> <b>Format:</b>&nbsp; 3-hour introductory course</li>
            <li><span class="tick">${I.check}</span> <b>Level:</b>&nbsp; Beginner , no experience needed</li>
            <li><span class="tick">${I.check}</span> <b>Materials:</b>&nbsp; Participant workbook &amp; examples</li>
            <li><span class="tick">${I.check}</span> <b>Outcome:</b>&nbsp; Certificate of completion</li>
            <li><span class="tick">${I.check}</span> <b>Taught by:</b>&nbsp; An experienced accountant</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--gray">
    <div class="wrap">
      <div class="center" style="margin-bottom:44px">
        <span class="eyebrow reveal">What You'll Learn</span>
        <h2 class="h2 reveal d1">Walk out able to keep your own books</h2>
        <p class="lead reveal d2">Practical skills you'll use the very next day in your business.</p>
      </div>
      <div class="grid grid-3">
        <div class="card reveal d1"><div class="card__icon">${I.bookkeeping}</div><h3>The fundamentals</h3><p>What bookkeeping really is, the core terms, and why clean books protect your business.</p></div>
        <div class="card reveal d2"><div class="card__icon">${I.accounting}</div><h3>Recording transactions</h3><p>How to categorize income and expenses accurately and consistently, without second-guessing.</p></div>
        <div class="card reveal d3"><div class="card__icon">${I.verify}</div><h3>Reconciling accounts</h3><p>How to make your books match your bank , and catch errors before they grow.</p></div>
        <div class="card reveal d1"><div class="card__icon">${I.consulting}</div><h3>Reading your reports</h3><p>How to read a basic financial report and understand the story your numbers are telling.</p></div>
        <div class="card reveal d2"><div class="card__icon">${I.calendar}</div><h3>Building a routine</h3><p>A simple monthly rhythm that keeps your books current instead of piling up.</p></div>
        <div class="card reveal d3"><div class="card__icon">${I.education}</div><h3>Confidence to continue</h3><p>The foundation to keep learning , or to speak your accountant's language fluently.</p></div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="split">
        <div class="reveal">
          <span class="eyebrow">Who It's For</span>
          <h2 class="h2">Made for owners, freelancers, and future bookkeepers.</h2>
          <ul class="checklist">
            <li><span class="tick">${I.check}</span> <b>Small business owners</b> who want to understand and control their finances.</li>
            <li><span class="tick">${I.check}</span> <b>Freelancers &amp; contractors</b> ready to get organized before tax time.</li>
            <li><span class="tick">${I.check}</span> <b>Aspiring bookkeepers</b> looking for a solid, practical foundation.</li>
            <li><span class="tick">${I.check}</span> <b>Career changers</b> exploring bookkeeping as a new path.</li>
          </ul>
        </div>
        <div class="media-frame reveal d2">
          <span class="tag">Certificate Included</span>
          <h3 class="h2" style="font-size:1.7rem">Finish with proof of your new skill.</h3>
          <p style="color:var(--muted)">Graduates receive a certificate of completion. Employers and clients can confirm it any time using our online verification tool.</p>
          <a class="btn btn--ghost" href="certificate-verification.html">${I.verify} Go to Certificate Verification ${I.arrow}</a>
        </div>
      </div>
    </div>
  </section>

  ${faqSection([
    ["Do I need any experience or accounting background?", "None at all. The course is designed for complete beginners and is taught in plain English. If you can run a business, you can follow this course."],
    ["Will I get a certificate?", "Yes. When you complete the course you'll receive a certificate of completion, which can be confirmed online through our <a href='certificate-verification.html'>Certificate Verification</a> page."],
    ["Is this enough to do my own books?", "For many small businesses, yes , you'll have the foundation to record, reconcile, and review your books. If your situation is more complex, you'll also know exactly when to bring in help."],
    ["Can my team take it together?", "Yes. Reach out about group and team training, and we'll tailor the details to your organization."],
  ], "Course questions")}

  ${ctaBand("Ready to master your own books?", "Enroll in Bookkeeping Basics for Small Business Owners, or reach out with any questions. Let's build your financial confidence.")}
  `,
});

/* ============================================================
   PAGE: CERTIFICATE VERIFICATION (embed slot for Apps Script)
   ============================================================ */
page({
  file: "certificate-verification.html",
  active: "verify",
  title: "Certificate Verification | BOSS Associates LLC",
  desc: "Verify the authenticity of a BOSS Associates LLC certificate of completion. Enter a certificate ID to confirm course completion.",
  body: `
  ${pagehero("Certificate Verification", "Verify a BOSS Associates certificate.", "Confirm the authenticity of a certificate of completion issued by BOSS Associates LLC.")}

  <section class="section">
    <div class="wrap narrow">
      <div class="center" style="margin-bottom:36px">
        <span class="eyebrow reveal">Authenticity Check</span>
        <h2 class="h2 reveal d1">Confirm a certificate in seconds</h2>
        <p class="lead reveal d2" style="margin-inline:auto">Use the tool below to verify a certificate issued by BOSS Associates LLC. If you're an employer or client, this confirms that the named individual completed the course.</p>
      </div>

      <!-- ===================================================================
           EMBED SLOT: Paste your Google Apps Script web-app URL below.
           1) Deploy your Apps Script as a Web App (Execute as: Me,
              Access: Anyone). Copy the resulting /exec URL.
           2) Replace YOUR_APPS_SCRIPT_URL_HERE in the iframe src.
           3) Delete the .verify-placeholder block once the iframe works.
           =================================================================== -->
      <div class="verify-shell reveal d1">

        <!-- Placeholder (remove once your iframe is live) -->
        <div class="verify-placeholder" id="verifyPlaceholder">
          <div>
            <div class="seal">${seal}</div>
            <h3 style="margin-bottom:.4rem">Verification tool goes here</h3>
            <p style="color:var(--muted);max-width:44ch;margin-inline:auto">
              Embed your existing Google Apps Script verification tool by pasting its web-app URL into the
              <code>iframe</code> in <code>certificate-verification.html</code>, then remove this placeholder.
            </p>
          </div>
        </div>

        <!-- Live embed: uncomment and add your URL -->
        <!--
        <iframe
          src="YOUR_APPS_SCRIPT_URL_HERE"
          title="BOSS Associates Certificate Verification"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade">
        </iframe>
        -->
      </div>

      <p class="form-note center reveal d2" style="margin-top:20px">
        Can't find a certificate? <a href="contact.html" style="color:var(--gold-deep);font-weight:600">Contact us</a> and we'll help you confirm it.
      </p>
    </div>
  </section>

  <section class="section section--gray">
    <div class="wrap">
      <div class="center" style="margin-bottom:40px">
        <span class="eyebrow reveal">Verification Help</span>
        <h2 class="h2 reveal d1">Everything you need to confirm a certificate</h2>
      </div>
      <div class="faq reveal d1">
        <details class="faq__item"><summary class="faq__q">How do I verify a certificate?<span class="plus" aria-hidden="true"></span></summary><div class="faq__a"><p>Enter the certificate ID or the details requested by the tool above. It will confirm whether the certificate was issued by BOSS Associates LLC and to whom.</p></div></details>
        <details class="faq__item"><summary class="faq__q">I'm an employer , what does verification confirm?<span class="plus" aria-hidden="true"></span></summary><div class="faq__a"><p>A successful result confirms that the named individual completed the corresponding BOSS Associates course and was issued a valid certificate of completion.</p></div></details>
        <details class="faq__item"><summary class="faq__q">The tool isn't showing a result. What now?<span class="plus" aria-hidden="true"></span></summary><div class="faq__a"><p>Double-check the certificate ID for typos. If it still doesn't verify, please <a href="contact.html">contact us</a> with the name and approximate completion date and we'll look into it.</p></div></details>
      </div>
    </div>
  </section>
  `,
});

/* ============================================================
   PAGE: CONTACT
   ============================================================ */
page({
  file: "contact.html",
  active: "contact",
  title: "Contact BOSS Associates LLC | Atlanta Accounting & Bookkeeping",
  desc: "Contact BOSS Associates LLC in Atlanta, Georgia. Book a consultation for accounting, bookkeeping, tax preparation, payroll, or bookkeeping training.",
  jsonld: {
    "@context": "https://schema.org", "@type": "AccountingService", "name": SITE.name,
    "email": SITE.email, "telephone": SITE.phoneDisplay, "url": SITE.domain + "/contact.html",
    "address": { "@type": "PostalAddress", "addressLocality": "Atlanta", "addressRegion": "GA", "addressCountry": "US" }
  },
  body: `
  ${pagehero("Contact", "Let's talk about your business.", "Book a consultation or send a message. We'll get back to you promptly with a clear next step.")}

  <section class="section">
    <div class="wrap">
      <div class="contact-grid">
        <div class="reveal">
          <span class="eyebrow">Send a Message</span>
          <h2 class="h2">Tell us what you need</h2>
          <p style="color:var(--muted)">Fill out the form and your email app will open with your message ready to send. Prefer to talk? Call or email us directly , details are on the right.</p>
          <form id="contactForm" data-to="${SITE.email}" novalidate>
            <div class="field">
              <label for="name">Full name</label>
              <input id="name" name="name" type="text" autocomplete="name" required placeholder="Your name">
            </div>
            <div class="field">
              <label for="email">Email</label>
              <input id="email" name="email" type="email" autocomplete="email" required placeholder="you@example.com">
            </div>
            <div class="field">
              <label for="service">What can we help with?</label>
              <select id="service" name="service">
                <option value="">Select a service...</option>
                <option>Accounting</option>
                <option>Bookkeeping</option>
                <option>Tax Preparation</option>
                <option>Payroll Services</option>
                <option>Business Consulting</option>
                <option>Financial Education</option>
                <option>Bookkeeping Training</option>
                <option>Something else</option>
              </select>
            </div>
            <div class="field">
              <label for="message">Message</label>
              <textarea id="message" name="message" placeholder="Tell us a little about your business and how we can help..."></textarea>
            </div>
            <button class="btn btn--gold" type="submit">Send Message ${I.arrow}</button>
            <p class="form-note" id="formStatus" style="margin-top:14px">This form opens your email app , no data is stored on this site.</p>
          </form>
        </div>

        <div class="reveal d2">
          <span class="eyebrow">Reach Us Directly</span>
          <h2 class="h2">Contact details</h2>
          <div class="info-card">
            <div class="info-row"><div class="ic">${I.phone}</div><div><b>Phone</b><a href="tel:${SITE.phoneHref}">${SITE.phoneDisplay}</a></div></div>
            <div class="info-row"><div class="ic">${I.mail}</div><div><b>Email</b><a href="mailto:${SITE.email}">${SITE.email}</a></div></div>
            <div class="info-row"><div class="ic">${I.pin}</div><div><b>Location</b><span>${SITE.city}<br>Serving clients nationwide</span></div></div>
            <div class="info-row"><div class="ic">${I.clock}</div><div><b>Hours</b><span>Monday-Friday · 9:00am-5:00pm ET</span></div></div>
          </div>
          <div class="card" style="margin-top:22px">
            <div class="card__icon">${I.calendar}</div>
            <h3>Book a consultation</h3>
            <p>Ready to get started? A short conversation is the fastest way to see how we can help , no obligation.</p>
            <a class="btn btn--navy" href="tel:${SITE.phoneHref}">${I.phone} Call to schedule</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  ${faqSection([
    ["How quickly will I hear back?", "We aim to respond to every inquiry within one business day. If your matter is time-sensitive, calling is the fastest way to reach us."],
    ["Do you offer a free initial consultation?", "Yes. The first conversation is about understanding your needs and whether we're a good fit , there's no obligation."],
    ["Do I need to be local to Atlanta?", "No. We're based in Atlanta, Georgia, and work with clients across the country, handling most work securely online."],
  ], "Before you reach out")}
  `,
});

console.log("\nAll pages generated.");
