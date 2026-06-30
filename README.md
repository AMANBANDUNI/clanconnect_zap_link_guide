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
├── index.html                  # hub linking to both guides
├── README.md
├── zap-link/                   # "Using Zap Link" guide
│   ├── index.html
│   ├── styles.css              # styling (brand color #1774B2)
│   ├── script.js               # scroll-spy, lightbox, reveals
│   └── assets/screens/         # app screenshots
└── zap-link-analytics/         # "Zap Link Analytics" guide
    ├── index.html
    ├── styles.css
    ├── script.js
    └── assets/screens/
```

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
