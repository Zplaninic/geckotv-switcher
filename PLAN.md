# GeckoTV Switcher — MVP Chrome Extension Plan

## Context

Minimal Chrome (Manifest V3) extension that auto-opens the TradingView chart on CoinGecko coin pages (`coingecko.com/en/coins/*`), replacing the manual click on the "TradingView" toggle button. No persistence/memory of timeframe, indicators, or theme is in scope — just auto-switching the chart view on page load.

Grounded in live inspection of the actual CoinGecko page (headless-Chrome/Playwright session against `coingecko.com/en/coins/bitcoin`):

- The toggle is a real, stable DOM element: `<button id="live-chart-tradingview" data-option-value="tradingview" ...>`, wired to a Stimulus.js controller (`coin-chart-v2#updateOptions`).
- Clicking it does **not** persist anything — `localStorage`, `sessionStorage`, and cookies were diffed before/after click and are byte-identical. Every fresh page load defaults to the native chart, and the click has to happen every time.
- Clicking injects a genuine cross-origin `<iframe src="https://s.tradingview.com/widgetembed/...">` — confirming DOM click simulation is the only workable approach.
- No special Chrome permissions are needed (no `activeTab`, no `storage`).

## Files

```
geckotv_switcher/
  manifest.json
  content.js
  README.md
```

## Commits

### Commit 1 — chore: scaffold Manifest V3 extension
**Status: not done**

### Commit 2 — feat: auto-click TradingView toggle on coin pages
**Status: not done**

### Commit 3 — docs: README with install & test steps
**Status: not done**

## Verification (end-to-end)

1. `chrome://extensions` → enable Developer mode → Load unpacked → select `geckotv_switcher/`.
2. Visit a few different coin pages (`bitcoin`, `ethereum`, a low-traffic coin) in fresh tabs.
3. Confirm TradingView chart loads automatically each time.
4. Confirm no console errors and no infinite observer.

Full design rationale: see original plan at `~/.claude/plans/distributed-wiggling-sutton.md`.
