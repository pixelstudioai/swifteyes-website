# SwiftRise website — next generation (2026-08-24)

A new-generation redesign of **swiftrise.app**, built the same way as the Verto
Technologies site: one standalone HTML file, no build step, plus a `deploy/`
folder ready to upload.

**Now a full multi-page site** (13 pages) following the complete UX flow / user
journey from the user's Figma wireframe, with a distinct product mockup per
surface.

| File(s) | What they are |
|---|---|
| `index.html` | Homepage (wireframe "Homepage" frame): hero → trust → One Platform. Every Stakeholder → The Complete Event Technology Platform (6 linked feature cards, each with its own product shot) → Proven Results at Scale → judge quotes → FAQ → CTA |
| `about.html` | Built for Event Excellence + stats (12+/50,000+/10+/Gold) + 4 commitment cards + trusted-by |
| `solutions.html` | Solutions Built for Every Event Stakeholder — organizer / exhibitor / attendee sections with the wireframe's checklists |
| `feature-*.html` ×6 | Registration & Ticketing, Mobile App & Engagement, On-Site Technology, Analytics & Dashboards, Hybrid & Virtual Events, AI Solutions — wireframe feature-page template (hero + 3 value cards + 2 checklist splits + CTA) |
| `case-zatca.html`, `case-hewar.html` | Case studies (wireframe case template; ZATCA copy is verbatim from the frame + judge pull-quote) |
| `contact.html`, `book-a-demo.html` | Contact + Book a Demo (what-to-expect + form via mailto) |
| `swiftrise.css`, `swiftrise.js` | Shared skin (designli look × SwiftRise palette) + interactions; nav has Features/Case Studies dropdowns |
| `images/` | Six distinct product mockups (dashboard, phones, event microsite, speakers page, AI thermal gates, passes page) + photos + award badge |
| `deploy/` | **Ready to upload:** all pages + assets + robots.txt + sitemap.xml (13 URLs) + llms.txt |

Run: `preview_start swiftrise` (or `python3 -m http.server 8734`) → http://localhost:8734/

## The design system (current: Figma wireframe UX flow × designli.co skin)

Current (2026-08-25): the user clarified the intent — take the **UX flow**
from their Figma wireframe ("SwiftRise wireframe (Copy)", key
mxUiEuQ25VASkqe44vaCL4, read via the Figma web viewer), keep the
**designli.co visual language** (deep indigo #0E1034 canvas, tonal borderless
panels #171B4A with 28px radii, Nunito 900), and use the **SwiftRise palette**
for all accents: brand blue #3C5AE7 buttons/CTA band (bright #5B78FF/#7D95FF
for em-highlights, icons, chips and stats on the dark canvas), gold reserved
for the Eventex award. Structure follows the wireframe Landing frame exactly: hero ("All-In-One Event Management For On-Site,
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
