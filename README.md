# Everlasting Fadoo Company Limited — Official Website

![Everlasting Fadoo Company Limited Logo](assets/logo.png)

> **"THE RIGHT WATERPROOFING TODAY, A SAFER TOMORROW."**  
> *Waterproofing isn’t just a treatment, it’s protection, keeping your home safe from seepage, dampness and long-term damage.*  
> **Slogan:** *Where quality meets ambition*

---

## 1. Project Overview

This repository contains the official production website for **Everlasting Fadoo Company Limited**, a premier structural waterproofing, leak remediation, and industrial/residential epoxy flooring company headquartered at **Madina Estate (Digital Address: GK-018-2938), Accra, Ghana**.

The website is an architectural luxury web application inspired by the **Spaciaz** design system (warm cream `#FBFAF6`, deep charcoal `#111312`, electric lime `#D2F829`) paired with a floating frosted-glass navigation bar referenced from **Benny Homes**. It is engineered with a **mobile-first responsive architecture**, full **SEO (Search Engine Optimization)**, **AEO (Answer Engine Optimization)**, and **GEO (Generative Engine Optimization)** compliance, and zero external runtime framework dependencies.

---

## 2. Company Profile & Contact Coordinates

| Field | Official Details |
| :--- | :--- |
| **Company Name** | Everlasting Fadoo Company Limited |
| **Company Slogan** | *Where quality meets ambition* |
| **Main Headline** | `THE RIGHT WATERPROOFING TODAY, A SAFER TOMORROW.` |
| **Core Mission** | Waterproofing isn’t just a treatment, it’s protection, keeping your home safe from seepage, dampness and long-term damage. |
| **Direct Call Line** | `+233 55 774 6582` (`tel:+233557746582`) |
| **WhatsApp Enquiries** | `+233 20 451 3321` (`https://wa.me/233204513321` with pre-configured service enquiry templates) |
| **Official Email** | `everlastingfadoo@gmail.com` (Site Inspection Request destination) |
| **Operations Address** | Madina Estate (`GK-018-2938`), Accra, Greater Accra Region, Ghana |

---

## 3. Complete Portfolio of 11 Waterproofing & Flooring Services

Every service features dedicated category filtering, technical specifications, and one-click pre-filled WhatsApp enquiry routing:

1. **Roof Waterproofing** *(Roofs & Terraces)* — Heavy-duty bituminous membranes and UV-resistant reflective liquid elastomeric coatings for flat and pitched concrete roofs.
2. **Basement Waterproofing** *(Structural & Below-Ground)* — Positive and negative side hydrostatic pressure tanking to permanently halt water penetration, mold growth, and high water-table seepage.
3. **Foundation Protection** *(Structural & Below-Ground)* — Damp-Proof Course (DPC) installation and chemical soil-side membranes preventing capillary rising damp in ground-floor masonry walls.
4. **Concrete Waterproofing** *(Structural & Below-Ground)* — Self-healing crystalline admixtures and surface impregnators that chemically react with unhydrated cement to seal micro-cracks and prevent rebar corrosion.
5. **Balcony Waterproofing** *(Roofs & Terraces)* — Under-tile and exposed polyurethane systems with flexible thermal movement joints stopping rainwater migration into living spaces below.
6. **Water Tank Sealing** *(Water Tanks & Pools)* — Certified non-toxic, food-grade, potable drinking water approved polymer coatings for overhead and underground concrete reservoirs.
7. **Retaining Wall Protection** *(Structural & Below-Ground)* — Heavy-duty earth-retaining barriers with root penetration resistance and geocomposite pressure-relief drainage boards.
8. **Leakage Repairs & Injection** *(Structural & Below-Ground)* — High-pressure polyurethane chemical injection grouting to stop active rushing water in cracks, joints, and pipe penetrations without destructive demolition.
9. **Terrace Waterproofing** *(Roofs & Terraces)* — Walkable, pedestrian-traffic durable waterproof screeds and seamless transparent terrace coatings.
10. **Swimming Pool Waterproofing** *(Water Tanks & Pools)* — Two-component flexible cementitious and epoxy waterproofing engineered to withstand continuous water immersion, salt water, and chlorine chemicals.
11. **Epoxy Flooring** *(Flooring)* — High-gloss, self-leveling industrial, commercial, and residential epoxy coatings completely impervious to liquids, oils, and chemical spills.

---

## 4. Key Architectural & UX Features

### Desktop Design & Proportions (`> 768px`)
- **65% / 35% Hero Split Layout**: The hero architectural showcase occupies **65%** of the hero container (`grid-template-columns: 65% calc(35% - 40px)`), paired with a balanced **35%** right content column and a refined `1.9rem` display headline.
- **Benny Homes Floating Glass Navbar**: Fixed frosted-glass pill navigation (`backdrop-filter: blur(14px)`) that transitions into a dark glass bar on scroll, complete with active ScrollSpy indicators and a pill-shaped WhatsApp Enquiry CTA.
- **3-Card Architectural Impact Trio**: Cloned Spaciaz 3-column bento cards (*What we do*, *Our impact*, *Core values*) with circular corner-cutout action arrows.
- **Infinite Services Marquee Ticker**: Seamless CSS keyframe ticker displaying all 11 services with circular thumbnail previews (pauses on hover).
- **Dark Skyline Metrics Section**: Animated IntersectionObserver counters (`480+` completed projects, `52+` active sites, `100%` leak-free track record, `18M+` sq. ft. protected) with glowing lime vertical pinpoints.
- **Interactive Project Estimate Calculator**: Real-time specification generator that builds a tailored WhatsApp booking message based on selected service, square meters, property type, and timeline urgency.

### Mobile-First Enhancements (`<= 768px`)
- **Progressive "View More Services" Disclosure**: Displays **3 services** initially on mobile viewports to keep scrolling concise. Clicking **View More Services (+2)** reveals **2 additional services** per press (`3 → 5 → 7 → 9 → 11`) until all matching services are shown, then automatically hides the button.
- **Streamlined Mobile Page Flow**: Hides the *Standards & Recognitions* bar and *Interactive Estimate Calculator* on mobile viewports (`<= 768px`) so mobile visitors transition directly from the Services portfolio into the Contact & Site Inspection section.
- **Centered Hero Experience Badge & Compact Video Pill**: Centers the `5+ Years of Field Excellence` block and scales down the `Watch Proof` video trigger pill (`max-width: 190px; margin: 0 auto`) directly beneath it.
- **Stationary Floating Quick-Action Buttons**: Locks the floating WhatsApp and Direct Call buttons to `top: calc(100svh - 122px)` on their own GPU compositor layer (`transform: translate3d(0, 0, 0)`) with `overflow-x: clip` on `html, body` so mobile browser address bar resizing never causes the buttons to jump or shift during scrolling.
- **Fullscreen Glass Mobile Navigation Drawer**: Animated 3-bar hamburger (`44×44px` accessible touch target) opening a fullscreen blurred overlay with direct links, WhatsApp CTA, phone/email pills, and automatic scroll-lock release on selection.

### Lead Generation & Contact Routing
- **Email Site Inspection Form**: Submits inspection requests directly to `everlastingfadoo@gmail.com` via FormSubmit AJAX (`https://formsubmit.co/ajax/everlastingfadoo@gmail.com`) with an automatic pre-populated `mailto:everlastingfadoo@gmail.com` fallback if the user is offline.
- **Pre-Configured WhatsApp Deep Links**: Every WhatsApp CTA across the navbar, hero, 11 service cards, calculator, and contact section opens `https://wa.me/233204513321` with a context-specific enquiry message.

---

## 5. SEO, AEO & GEO Optimization Architecture

The website is engineered for maximum visibility across traditional search engines (**Google, Bing**), voice/answer engines (**Google Featured Snippets, Siri, Alexa**), and generative AI search engines (**ChatGPT Search, Perplexity, Google AI Overviews, Claude**):

1. **Technical & Local SEO (`index.html`, `sitemap.xml`, `robots.txt`)**
   - Canonical URL, keyword-rich `<title>` and `<meta name="description">`, and `max-snippet:-1, max-image-preview:large` robot directives.
   - Local Ghana Geo-Coordinates (`geo.region: GH-AA`, `geo.placename: Madina Estate, Accra, Ghana`, `geo.position: 5.6833;-0.1667`, Digital Address `GK-018-2938`).
   - Open Graph (`og:image`, `og:locale: en_GH`) and Twitter Card (`summary_large_image`) metadata configured with `assets/logo.png`.
   - XML Sitemap (`sitemap.xml`) with image schema extensions.

2. **AEO — Answer Engine Optimization (`SpeakableSpecification` & Structured Knowledge Graph)**
   - Embedded a `@graph` JSON-LD knowledge graph in `index.html` containing `HomeAndConstructionBusiness`, `LocalBusiness`, `OfferCatalog` (all 11 services), `WebSite`, and `WebPage` (with `SpeakableSpecification` CSS selectors).

3. **GEO — Generative Engine Optimization (`llms.txt` & AI Crawler Permissions)**
   - Provided a dedicated [`llms.txt`](llms.txt) root specification file formatted in clean Markdown for LLM ingestion, summarizing entity facts, verified metrics, service specifications, and contact endpoints.
   - Explicitly permitted AI crawlers (`GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot`, `ClaudeBot`, `anthropic-ai`, `Google-Extended`, `Applebot-Extended`) in [`robots.txt`](robots.txt).

---

## 6. Project Structure

```text
waterproofing service/
├── index.html          # Main semantic HTML5 document + JSON-LD Schema.org Knowledge Graph
├── css/
│   └── styles.css      # Custom luxury stylesheet + mobile-first responsive breakpoints
├── js/
│   └── main.js         # Navbar ScrollSpy, mobile drawer, progressive services, calculator, email form
├── assets/
│   └── logo.png        # Official Everlasting Fadoo emblem (used for Logo, Favicon, Apple Touch Icon & OG Image)
├── llms.txt            # Generative Engine Optimization (GEO) structured summary for AI search engines
├── robots.txt          # Search & AI crawler permissions + Sitemap pointer
├── sitemap.xml         # XML Sitemap with image metadata
├── site.webmanifest    # Web App Manifest with brand theme colors and icons
└── README.md           # Project documentation
```

---

## 7. Running & Deploying the Project

### Local Preview
Because the project uses standard HTML5, CSS3, and vanilla ES6 JavaScript with zero build step required:
1. Open `index.html` directly in any modern browser, or
2. Serve locally using VS Code Live Server, Python, or Node:
   ```bash
   # Using Python 3
   python -m http.server 8080

   # Or using npx serve
   npx serve .
   ```

### Production Deployment (Vercel / Netlify / GitHub Pages / Custom Domain)
1. Upload or push the repository root to your static host.
2. When deploying to your final production domain, update the placeholder canonical domain (`https://everlastingfadoo.com/`) in `index.html`, `sitemap.xml`, and `robots.txt` to match your live domain.
3. Upon the first submission of the **Request a Free Site Inspection** form, open the inbox for `everlastingfadoo@gmail.com` and click the one-time **FormSubmit activation link** to enable instant AJAX email delivery.
