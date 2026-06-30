# ClanConnect Zap — Interactive Guides

A small set of self-contained, interactive HTML tutorials for the **ClanConnect Zap**
(Instagram DM automation) flow. No build step, no dependencies.

## Open it

Open the root `index.html` in any browser — it's a hub linking to both guides. Or open a
guide directly.

```bash
open index.html        # macOS — the hub
# or serve the whole folder:
python3 -m http.server 8080   # then visit http://localhost:8080
```

## Guides

Each guide is its own self-contained module (own `index.html`, `styles.css`, `script.js`
and `assets/screens/`), so you can open or ship either one on its own.

| Module | Covers |
| --- | --- |
| [`zap-link/`](zap-link/index.html) | **Zap Tour** — overview, Instagram setup, choosing a content type, selecting posts/stories, building rules (keywords + comment replies), Direct Message vs ⚡ Zap Link product cards, publishing & managing in *My Zaps*. |
| [`zap-link-analytics/`](zap-link-analytics/index.html) | **Zap Link Analytics** — opening the panel (Interactions + date range), the *My Zap Links* funnel (DMs Sent → Opened → Unique/Total Clicks), *My Zap Linked Products*, *Automations*, *My Earnings*, and the *Interaction Tracking* drill-down (flow + catalogue with short codes). |

## Structure

```
.
├── index.html                  # hub linking to all guides
├── README.md
├── zap-link/                   # "Zap Tour" guide (user-facing)
│   ├── index.html
│   ├── styles.css              # styling (brand color #1774B2)
│   ├── script.js               # scroll-spy, lightbox, reveals
│   └── assets/screens/         # app screenshots
├── zap-link-analytics/         # "Zap Link Analytics" guide (user-facing)
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   └── assets/screens/
└── dev/                        # developer guides (password-protected)
    ├── dev.css                 # shared dev styling
    ├── crypto.js               # shared PBKDF2 + AES-GCM unlock
    ├── zap-analytics/
    │   ├── index.html          # lock-screen shell
    │   └── content.enc.js      # AES-256-GCM encrypted content
    └── affiliation/
        ├── index.html
        └── content.enc.js
```

## Developer guides (password-protected)

Two **internal architecture deep-dives** for engineers live under `dev/`. They are
**AES-256-GCM encrypted** — the content is not in page source, and a wrong password reveals
nothing (the team password derives the AES key via PBKDF2; decryption happens client-side).

| Module | Covers |
| --- | --- |
| [`dev/zap-analytics/`](dev/zap-analytics/index.html) | **Zap Link Analytics internals** — the send→open→click→sale tracking pipeline, the `ig_zap_*` data model, the three influencer analytics endpoints, and the exact SQL behind every metric. |
| [`dev/affiliation/`](dev/affiliation/index.html) | **Affiliation & Pixel internals** — the client pixel, the 11-table data model, `/pixel/event` ingestion, server-side clicks, `recordAffiliateConversion()` attribution, and the commission lifecycle. |

> **Note:** decryption uses the Web Crypto API, which needs a **secure context** — serve over
> **HTTPS or `localhost`** (Vercel is fine). Opening a dev guide via `file://` won't decrypt in
> most browsers. The plaintext is never committed — only the encrypted `content.enc.js` blobs are.

## Features (both guides)

- Sticky nav with scroll-spy section highlighting
- Animated scroll-progress bar & reveal-on-scroll
- Click any phone screenshot to open it in a lightbox
- Fully responsive (mobile menu included)

## Source

Screens correspond to the influencer Zap module at
`modules/influencer/components/tools/ig-dm-automations/` in `clanconnect_mobile`.
The analytics guide maps to the **Interactions / Zap Link Analytics** panel
(`components/ActivityLog.tsx`), backed by `/zap-flow/influencer/analytics` and
`/zap-flow/influencer/automation-tracking`.
