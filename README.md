# Spot

A browser-based puzzle game. Connect matching coloured dots on a grid without letting paths cross.

## How it works

Each level presents a grid with pairs of coloured dots. The player draws a path from one dot to its matching partner for every colour. Paths must not cross. When all pairs are connected, the level is solved and play advances automatically.

## Current state

- Single level (level 1) — 5×5 grid, 3 colour pairs
- Canvas-based rendering with mouse and touch support
- Path drawing with automatic retract when doubling back
- Win detection

## Planned

- 10 hardcoded levels, increasing in difficulty
- Grid sizes grow as levels progress (5×5 → 7×7 → 9×9)
- Auto-advance on solve
- Level rotation as a cheap way to generate visual variety from a single layout

## Tech

Vanilla HTML/CSS/JS, no dependencies. Deployed on Cloudflare Pages.

- `index.html` — game shell
- `assets/js/main.js` — all game logic
- `assets/css/styles.css` — styles
- `about/index.html` — how-to-play page
- `docs/levels.md` — level design notes and solvability rules

## Running locally

Open `index.html` in a browser directly, or serve with any static file server:

```
npx serve .
```

## Level design

See [docs/levels.md](docs/levels.md) for the rules and process for designing valid levels.
