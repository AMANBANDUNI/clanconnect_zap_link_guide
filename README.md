# ClanConnect Zap — Interactive Guide

A self-contained, interactive HTML tutorial explaining **how to use Zap** (Instagram DM
automation) in the ClanConnect mobile app — including the **Zap Link** product-card flow.

## Open it

Just open `index.html` in any browser — no build step, no dependencies.

```bash
open index.html        # macOS
# or serve it:
python3 -m http.server 8080   # then visit http://localhost:8080
```

## What it covers

The guide is built directly from the app's `ig-dm-automations` flow and walks through:

1. **Overview** — what Zap does (comment keyword → auto comment reply → DM).
2. **Setup** — connecting Instagram & enabling *"Allow access to Messages"*.
3. **Choose type** — ZAP Post/Reel, ZAP Story, ZAP Live.
4. **Step 1** — selecting the posts / stories to watch.
5. **Step 2 / Rules** — naming the Zap, adding trigger keywords & comment replies.
6. **Direct Message** vs **⚡ Zap Link** (auto-fetched product cards, up to 10 per rule).
7. **Publish & manage** — creating the automation and the *My Zaps* dashboard.
8. **Cheat sheet** — the whole flow at a glance.

## Features

- Sticky nav with scroll-spy section highlighting
- Animated scroll-progress bar & reveal-on-scroll
- Click any phone screenshot to open it in a lightbox
- Fully responsive (mobile menu included)

## Structure

```
.
├── index.html          # content & layout
├── styles.css          # styling (brand color #1774B2)
├── script.js           # scroll-spy, lightbox, reveals
└── assets/screens/     # 14 annotated app screenshots
```

## Source

Screens correspond to the influencer Zap module at
`modules/influencer/components/tools/ig-dm-automations/` in `clanconnect_mobile`.
