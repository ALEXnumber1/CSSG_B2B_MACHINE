# Prompt para folleto PDF — Executive Protection for U.S. Investors (EN)

Prompt listo para pegar en Claude Design (o cualquier herramienta de diseño con IA). Genera un folleto/brochure en PDF con el mismo objetivo, calidad fotográfica y datos de contacto que la landing `/en/executive-protection-venezuela-investors`. No se generó el PDF — solo el prompt, a pedido.

---

## PROMPT

```
Design a premium, single-fold (bi-fold, 4-page — front cover, inside-left, inside-right, back cover) B2B brochure in PDF, US Letter or A4, for a corporate security firm targeting U.S. investors and executives (C-level, COO, Head of Security) traveling to Venezuela for energy, mining, infrastructure and trade opportunities. The goal is to generate the same buyer intent as a high-conversion landing page — professional, high-trust, not touristy.

BRAND: CSSG Global — Company Of Security And Service Global C.A. (RIF J-29782024-8). A Venezuelan corporate and diplomatic security firm, ISO 9001:2015 certified, 17+ years without a single security incident, serving G7 embassies and multinational corporations.

VISUAL IDENTITY — "Luxury Tech / The Distinction" editorial system:
- Background: near-black (#0B0B0F), never white backgrounds
- Accent: muted gold (#C9A24B / #EAB308), used sparingly for headlines, badges, CTA buttons
- Secondary accent: sky blue (#0EA5E9), minimal use
- Typography: Playfair Display (serif, semi-bold) for headlines; Inter (sans-serif) for body copy and labels
- Full-bleed photography with a dark gradient wash (black at edges, image visible center) — never stock-photo generic, always cinematic and hyperrealistic
- Thin hairline borders (rgba white 8-9%), no drop shadows, no gradients on buttons — flat gold fill with sharp/minimally-rounded corners (2px radius)
- Uppercase, letter-spaced eyebrow labels above every headline (e.g. "FOR U.S. INVESTORS AND EXECUTIVES TRAVELING TO VENEZUELA")

PHOTOGRAPHY DIRECTION (hyperrealistic, cinematic, photojournalistic style — not illustration, not stock-photo cheesy):
- Cover: a convoy of black armored SUVs with visible "ARMOURED ESCORT" / "PRIVATE SECURITY" markings, moving fast on a wide highway, motorcycle escort officer visible, city skyline in the background, dusk/daylight, shot from a low angle like a professional automotive/security campaign photo
- Inside spread: 4 supporting photos in a grid — (1) a single armored SUV parked in a dim underground garage with a security officer on radio nearby, (2) a tight formation of 4-5 motorcycle escort officers in full tactical gear riding through a city street at dusk, (3) a formally-dressed protective officer standing guard at a secured entrance with embassy-style architecture in the background, (4) a medical/emergency response vehicle with lights on in an urban night setting, representing medevac/crisis response
- All photography should look real — no visible AI artifacts, no illustration style, no cartoonish elements, no fake/invented company logos or license plates readable in a way that implies a real jurisdiction other than Venezuela
- Do not depict weapons pointed at camera or graphic violence — professional/deterrent posture only

BROCHURE CONTENT:

[COVER]
Eyebrow: "FOR U.S. INVESTORS AND EXECUTIVES TRAVELING TO VENEZUELA"
Headline: "Executive Protection & Security Services for Investors in Venezuela"
Subhead: "Trusted by corporations and G7 embassies for 17+ years. 24/7 coverage across Caracas, Maracaibo, Valencia and nationwide."
CSSG Global logo, gold on dark

[INSIDE LEFT — The Problem]
Eyebrow: "THE PROBLEM"
Headline: "Why U.S. investors need professional security in Venezuela"
Body: Venezuela remains classified under the U.S. State Department's highest-risk travel advisory tier — crime, kidnapping and wrongful-detention risk, with severely limited consular assistance on the ground. The standard duty-of-care playbook — a hotel car and a driver — does not hold up. What an investment trip actually requires is intelligence gathered before you land, verification of who you are meeting with, and ground logistics that are guaranteed, not improvised.

Stat bar (4 items, gold numerals, serif): "17+ Years Without Incident" · "ISO 9001:2015 Certified" · "24/7 CECOM Command Center" · "12h Response Time"

[INSIDE RIGHT — The Service]
Eyebrow: "OUR SERVICE"
Headline: "Specialized consulting, on-the-ground knowledge, guaranteed logistics."
Six-item icon list (short, 1-sentence each):
1. Preventive Intelligence & Pre-Travel Risk Briefing
2. Due Diligence & Counterparty Vetting
3. Executive Protection & Secured Transport (armored vehicles & motorcycle escorts)
4. Guaranteed Ground Logistics
5. On-the-Ground Local Knowledge
6. Specialized Consulting & Crisis Response

Credentials row: ISO 9001:2015 (Cert. 580181) · Cyber Essentials Certified · IFPO Corporate Member

Short testimonial block: "CSSG had a risk briefing and a vetting report on our local partner ready before our team ever boarded the flight. Every meeting, every route, was already accounted for." — Corporate Security Director, U.S. energy company evaluating a Venezuela investment (identity withheld under confidentiality protocol)

[BACK COVER — CTA + Contact]
Headline: "Ready to secure your trip? Contact us within 24 hours for a customized security plan."
CTA button: "Get Your Free Risk Assessment"
QR code linking to: https://cssg-global.com/en/executive-protection-venezuela-investors
Schedule directly (Google Meet): https://calendar.app.google/ZCLbjCCsbmYwMnEc6
U.S. Line: +1 (786) 309-0035
Venezuela Line: +58 424-101-7074
Email: gerencia@globalservices-ven.com
Legal footer: CSSG — Company Of Security And Service Global C.A. · RIF: J-29782024-8

TONE: confident, understated, high-ticket B2B — never alarmist, never "tactical/military larp." Written for a COO or Head of Corporate Security reading it on a plane, not a tourist.

OUTPUT: print-ready PDF, bleed included, CMYK-safe colors, both a US Letter (8.5x11in) and A4 version if possible.
```

---

## Notas

- Todos los links y datos de contacto del prompt son exactamente los que ya viven en `src/pages/landing/InvestorSecurity.tsx` / `InvestorSecurityThankYou.tsx` — no inventé ningún dato nuevo.
- La dirección de fotografía describe (sin repetirlas como archivo) las mismas 4 imágenes ya usadas en la sección "The Fleet & The Team" de la landing (`svc_blindados.webp`, `svc_reaccion_motorizada.webp`, `diplomatic_security.webp`, `ambulancia.webp`) y el hero (`svc_custodia_og.webp`), para que la herramienta de diseño genere/seleccione fotografía del mismo estilo hiperrealista — si la herramienta permite subir imágenes de referencia en vez de solo texto, esos 5 archivos de `public/` son la referencia visual más directa.
- No generé el PDF ni ninguna imagen — solo el prompt, tal como pediste.
