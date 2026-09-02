# SwiftRise website — next generation (2026-08-24)

A new-generation redesign of **swiftrise.app**, built the same way as the Verto
Technologies site: one standalone HTML file, no build step, plus a `deploy/`
folder ready to upload.

**Now a product-led multi-page site** (12 EN + 12 AR pages). The IA follows the
four real SwiftRise products — Organizer Portal, Event Website, Mobile Apps,
On-Site Suite — each with its own rich page using real product screenshots
extracted from the product-doc PDFs (`images/products/`). The old 6 feature
pages and the platform overview were absorbed into these four.

| File(s) | What they are |
|---|---|
| `index.html` | Homepage (wireframe "Homepage" frame): hero → trust → One Platform. Every Stakeholder → The Complete Event Technology Platform (6 linked feature cards, each with its own product shot) → Proven Results at Scale → judge quotes → FAQ → CTA |
| `about.html` | Built for Event Excellence + stats (12+/50,000+/10+/Gold) + 4 commitment cards + trusted-by |
| `solutions.html` | Solutions Built for Every Event Stakeholder — organizer / exhibitor / attendee sections with the wireframe's checklists |
| `product-*.html` ×4 | Organizer Portal, Event Website, Mobile Apps, On-Site Suite — HTML/CSS **UI vignette** hero + capability splits (with real product screenshots as proof) + "Every Feature, Listed" matrix + works-together links + case mini-card |
| `case-zatca.html`, `case-hewar.html` | Case studies (wireframe case template; ZATCA copy is verbatim from the frame + judge pull-quote) |
| `contact.html`, `book-a-demo.html` | Contact + Book a Demo (what-to-expect + form via mailto) |
| `swiftrise.css`, `swiftrise.js` | Shared skin (designli look × SwiftRise palette) + interactions; nav has Features/Case Studies dropdowns |
| `images/` | Six distinct product mockups (dashboard, phones, event microsite, speakers page, AI thermal gates, passes page) + photos + award badge |
| `deploy/` | **Ready to upload:** all pages + assets + robots.txt + sitemap.xml (13 URLs) + llms.txt |

Run: `preview_start swiftrise` (or `python3 -m http.server 8734`) → http://localhost:8734/

## The design system (current: PheedLoop-reference light SaaS skin)

Current (2026-08-26): the team didn't love the dark indigo theme, so the site
was reskinned using **pheedloop.com** (a direct event-platform peer) as the
reference: photo-backed navy hero (ZATCA shot with Ken Burns zoom + Eventex
★★★★★ badge, mirroring PheedLoop's G2 row), clean white body with icy-blue
alternate sections, Poppins type, vivid blue #1D64F2 buttons with 10px radii,
white cards with hairline borders, navy CTA band and footer. Client logos
darken via CSS filter on the light background. The theme is a switch in
site_gen.py (`SKIN = 'pheedloop' | 'darkindigo'`) — the previous dark skin
remains intact and one flag away. Structure still follows the Figma wireframe
flow exactly: hero ("All-In-One Event Management For On-Site,
High-Impact Events.") → trust strip → Made for Events That Matter (4 event
types) → One Platform. Every Stage (Before/During/After) → Everything You Need
(6 feature cards, each enriched with capability chips from the backend audit)
→ Built for the Reality of On-Site Events (2 split blocks) → Proven in Real
Events (ZATCA + Hewar with stat rows) → Trusted by Award-Winning Events (judge
quotes on navy) → FAQ → Ready-to-Run CTA → contact → footer.

Kept throughout every pass: the real srLogo.svg wordmark (inline SVG symbol,
context-recolorable), all real content and verifiable claims, and the full
JSON-LD schema from the live Next.js site so SEO is preserved. The wireframe
file also contains subpage frames (Home, About, Solutions, six Feature pages,
two Case studies, Contact, Book a demo) — ready blueprints if the site goes
multi-page later.

| Alternate versions | What they are |
|---|---|
| `swiftrise-light.html` | The light OpenXcell × Innovacio mix. Needs `images/`. |
| `swiftrise-designli.html` | The designli.co-style indigo+coral pass with the 8-suite capabilities section. Needs `images/`. |
| `swiftrise-spaceship.html` | The spaceship.com-style dark restyle. Needs `images/`. |

## UI vignettes instead of raw screenshots

The hero visual on each product page — and the four cards on the homepage — are
**live HTML/CSS recreations** of the product's signature screen, not raster
screenshots: a dashboard with stat tiles/bar chart/donut/country bars, a public
event site with day tabs and an agenda, and the badge print studio at real
50x65 mm proportions. The **Mobile Apps** visual is different by design: real
app screenshots (agenda / home / AI matchmaking, trimmed out of the product
docs) mounted inside CSS phone mockups — device bezel, dynamic island, shadow —
so it reads as the actual app on real hardware. They are built from the site's own design tokens, so all four pages
read as one product, they are pixel-crisp at any zoom, they reflow on mobile
(tiles go 2x2, the donut card hides, one phone drops) instead of shrinking into
an unreadable slab, and they weigh nothing. The QR codes are generated as
deterministic inline SVG (`_qr_svg()` in pages_gen.py); vignette internals are
sized in `em` off one root font-size, so the same markup renders at hero scale
and at card scale. Each vignette is wrapped in `dir="ltr"` and its labels are
translated, so the Arabic pages show an Arabic product UI.

**Every** UI panel on the product pages is now HTML — heroes *and* the
capability splits: form builder (field rows with visible/required toggles,
link/QR/embed), mail composer (merge-variable chips, inline QR, recipients and
schedule), custom report builder (condition chips + results table), public
exhibitor directory, mobile-app configurator (drag-to-reorder sections with a
live phone preview), badge template library with a live print queue, and the
operations console (scan/search + recent scans). No screenshot crops remain.

Every real screenshot is presented **inside a mockup** — desktop screens in a
browser window (chrome dots + URL pill, `winmock()` in pages_gen), app screens
in CSS phone frames — never pasted flat. The raster images in `images/products/` are **real product screens**
mounted inside CSS phone mockups — 368 KB total. Five come straight from the
Figma design file (`Registration Mobile`, exported at 3x and downscaled to
720 px): agenda, home, digital badge, app menu and live chat. Two exhibitor
screens (menu, meeting slots) still come from the product-doc PDF because that
Figma file covers the attendee app only.

## Page structure (wireframe order)

1. **Topbar** — phone, email, WhatsApp, Riyadh (navy)
2. **Sticky nav** — real wordmark, links per wireframe (Solutions / How it Works / Features / Why SwiftRise / Case Studies) with scrollspy, Contact Us pill; burger below 1020px
3. **Hero** — "All-In-One Event Management For On-Site, High-Impact Events." (blue em) + wireframe copy + Book a Demo / See How It Works + iPad dashboard shot
4. **Trust strip** — ZATCA · HEWAR GROUP · SAMI + Eventex badge ("An Award-Winning Solution")
5. **Solutions** — Made for Events That Matter: 4 event-type cards (Conferences & Summits, Exhibitions & Trade Shows, Corporate & Enterprise, Government & Public), wireframe copy verbatim, photos on the two tall cards
6. **How it works** — One Platform. Every Stage: Before / During / After cards (Post-Event Intelligence is the wide card with a dashboard crop)
7. **Features** — Everything You Need: 6 wireframe cards, each enriched with capability chips from the backend audit (form builder, PayTabs, RFID+NFC, kiosks, heatmaps, WhatsApp automation, custom reports…)
8. **Why SwiftRise** — Built for the Reality of On-Site Events: two split blocks (On-Site Operations with app mockup; Crowd Insights with heatmap crop), each with proof bullets (thermal cameras + LiDAR, face detection, <10s check-in)
9. **Case studies** — Proven in Real Events: ZATCA 2024 (<10s / 100% / 4 gates count-ups) + Hewar Day 2025, "Ask About This Event" buttons
10. **Testimonials (navy)** — Trusted by Award-Winning Events: Eventex Gold pill + 4 judge quotes
11. **FAQ** — 7-item accordion (matches FAQPage schema)
12. **CTA** — "Ready to Run Your Next Event with Confidence?" + two buttons
13. **Contact** — navy info card + demo form (mailto compose + WhatsApp fast lane)
14. **Footer** — navy, wireframe-style; **floating Book-a-Demo pill** after 620px scroll

## Engineering notes

- All navigation is JS `scrollIntoView` (hash jumps are dead in sandboxed previews); sections carry `scroll-margin-top`; `history.replaceState` keeps the hash shareable.
- Reveal-on-scroll, count-ups, scrollspy and the floating pill all run on IntersectionObserver; everything respects `prefers-reduced-motion` (reveals become instant, counters jump to final values).
- Font: Inter from Google Fonts with system fallbacks (wireframe-neutral).
- Zero console errors; no horizontal overflow at 390px; burger menu closes on link tap, backdrop tap and Escape.
- The contact form intentionally has no backend: it composes an email via `mailto:` and offers WhatsApp. Swap in a real endpoint later if wanted.
- Heaviest asset is `features_hi.webp` (1.1 MB, the hero LCP). If you want faster mobile loads, resize it to ~1600px wide before shipping.

## Deploying

Upload the **contents of `deploy/`** to the web root. The current live site is
a Next.js app — replacing it with this static build removes the `/_next/*`
chunks; `/privacy-policy` must keep existing on the server (the footer links to
it). `robots.txt`, `sitemap.xml` and `llms.txt` are included.
