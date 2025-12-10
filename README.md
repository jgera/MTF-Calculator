# MTF Calculator

React + Vite single-page calculator for modeling Margin Trading Facility (MTF) scenarios. Tweak leverage, interest, taxes, and holding periods to see how fees and financing impact delivery trades.

## Screenshot
![MTF Calculator](mtf-calculator.png)

## Features
- Adjustable inputs for buy/sell prices, quantity, and holding period with automatic % change link between price and percentage.
- Configurable leverage, daily interest rate, and tax rate to reflect your broker or personal assumptions.
- Summary of margin required, loan amount, gross vs net profit, returns with/without MTF, and breakeven percentage.
- Detailed charges breakdown (brokerage, exchange txn, STT, GST, SEBI, stamp duty, DP, pledge, interest) plus total fees.
- Taxation helper that applies long/short-term logic and lets you override the tax rate.
- Prebuilt single-file bundle in `dist/index.html` for easy sharing or static hosting.

## Quick start
- Node.js 18+
- Install: `npm install`
- Dev server: `npm run dev` (Vite, with fast reloads)
- Lint: `npm run lint`
- Build: `npm run build` (outputs `dist/index.html` + assets; current repo already includes a built bundle)

## Run the built file
- Local: open `dist/index.html` directly in your browser (it is self contained via `vite-plugin-singlefile`).
- Preview server: `npm run preview` after `npm run build` to serve the production bundle.
- GitHub: once pushed, you can use the Raw link for the file (e.g. `https://raw.githubusercontent.com/<your-username>/MTF-Calculator/main/dist/index.html`) or a static host/CDN of your choice.

## Calculator inputs and outputs
- Inputs: stock/ETF name (label only), buy price, sell price or % change, quantity, holding period (days).
- Config: leverage (e.g. 4x), daily interest rate %, tax rate %.
- Outputs: margin required vs loan amount, gross profit and %, interest and fees, net profit, returns with/without MTF, breakeven %, and a line-item fee breakdown for transparency.

## Tech stack
- React 19 + Vite
- Tailwind CSS
- `vite-plugin-singlefile` for a portable production bundle
- ESLint for linting
