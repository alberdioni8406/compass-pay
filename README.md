# ⚡ CashCompass Pay

> **Open-source Bitcoin Cash payment tools. No login. No custody. No fees. Just BCH.**

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![BCH](https://img.shields.io/badge/Powered%20by-Bitcoin%20Cash-brightgreen)](https://bitcoincash.org)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/cashcompass/cashcompass-pay)
[![Vercel](https://img.shields.io/badge/Hosted%20on-Vercel-black)](https://cashcompass.space)

---

## What is CashCompass Pay?

**CashCompass Pay** is a lightweight, browser-only Bitcoin Cash (BCH) payment toolkit built for merchants, freelancers, developers, and everyday BCH users. It generates BIP21-compliant payment URIs and QR codes, creates professional invoices, and stores your invoice history — all **100% locally in your browser**.

No server ever sees your addresses, amounts, or invoice data. No account required. No app to install.

---

## ✨ Features

### 💸 Payment Generator
- Build standard `bitcoincash:` BIP21 URIs with amount and memo fields
- Renders a scannable QR code accepted by **any BCH wallet** (Electron Cash, Paytaca, Zapit, Bitcoin.com Wallet, etc.)
- One-click copy of the full payment URI
- Quick tip buttons for common amounts (0.001, 0.005, 0.01, 0.05 BCH)

### 🧾 Invoice Generator
- Create professional payment invoices with merchant name, item description, reference number, and unique auto-generated invoice ID
- Previews invoice in a clean, readable format before saving
- Encodes all invoice metadata directly into the BIP21 URI `message` field — no external database needed
- Save invoices locally; view historical QR codes from saved invoices in a popup

### 📚 Invoice History
- All saved invoices persisted in `localStorage` — survives page refreshes and browser restarts
- Reverse-chronological listing with merchant, item, date, and BCH amount
- Export all invoices as a JSON file for backup or accounting
- One-click QR regeneration for any past invoice
- Clear all history with a confirmation prompt

### 📊 Dashboard Stats
- At-a-glance count of total invoices created
- Running total of BCH invoiced
- Always shows 0% platform fee — because there is none

---

## 🔒 Security Design

| Property | Implementation |
|---|---|
| **Non-custodial** | No funds ever pass through this app |
| **No server** | 100% static HTML/CSS/JS — no backend |
| **No tracking** | No analytics, no cookies, no external calls |
| **XSS protection** | All user input sanitized via `textContent` before rendering |
| **CSP headers** | Strict Content-Security-Policy via `vercel.json` |
| **No telemetry** | Zero network requests to any proprietary service |
| **Open source** | Full source auditable by anyone |

The `vercel.json` configuration enforces the following security headers on every response:

```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: no-referrer
Permissions-Policy: geolocation=(), microphone=(), camera=()
Content-Security-Policy: default-src 'self'; ...
```

---

## 🚀 Deploy in 60 Seconds

### Option 1 — Vercel (Recommended)

1. **Fork** this repository on GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your fork
4. Click **Deploy** — no settings to change

Done. Your instance is live at `your-project.vercel.app`.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/cashcompass/cashcompass-pay)

---

### Option 2 — GitHub Pages

1. Fork the repository
2. Go to **Settings → Pages**
3. Set source to `main` branch, `/ (root)`
4. Your site will be live at `https://yourusername.github.io/cashcompass-pay`

> Note: GitHub Pages does not support custom HTTP headers, so the CSP and security headers in `vercel.json` will not apply. Vercel is recommended for production use.

---

### Option 3 — Self-Hosted (Nginx / Apache)

This is a fully static site — just serve the files from any web server:

```bash
git clone https://github.com/cashcompass/cashcompass-pay.git
cd cashcompass-pay

# Nginx example
cp -r . /var/www/html/cashcompass-pay/
```

Add equivalent security headers to your server config (see `vercel.json` for reference).

---

### Option 4 — Local / Offline

```bash
git clone https://github.com/cashcompass/cashcompass-pay.git
cd cashcompass-pay

# Open directly in browser (works offline after first load)
open index.html
# or
python3 -m http.server 3000
```

---

## 🗂️ Project Structure

```
cashcompass-pay/
├── index.html          # Entire application (single file)
├── vercel.json         # Vercel deployment + security headers config
├── LICENSE             # MIT License
└── README.md           # This file
```

The entire app lives in a **single HTML file** by design. This makes it:
- Easy to audit (no hidden dependencies, no build step)
- Trivial to self-host or run offline
- Simple to fork and customize

---

## 🧩 How It Works

### BIP21 URI Format

CashCompass Pay generates standard BIP21 payment URIs:

```
bitcoincash:qrtv37u522gz8a5lezfqk5vukly93cu7gc8tn09040?amount=0.01000000&message=Invoice%20ORD-001
```

These are the same URIs used by all major BCH wallets. Scanning the QR code opens the wallet's send screen with the address and amount pre-filled.

### Invoice Encoding

Invoice metadata (merchant name, item, reference, invoice ID) is encoded directly into the URI's `message` field using pipe-separated values:

```
message=MyShop | Web design | ORD-001 | INV-1717000000000
```

This means the invoice is **self-contained in the QR code** — no database, no server, no account.

### Local Storage Schema

Invoices are stored in `localStorage` under the key `cc_invoices_v2`:

```json
[
  {
    "id": "INV-1717000000000",
    "name": "My BCH Shop",
    "item": "Web design services",
    "amt": 0.05,
    "addr": "bitcoincash:qrtv37u522gz8a5lezfqk5vukly93cu7gc8tn09040",
    "ref": "ORD-001",
    "uri": "bitcoincash:qrtv37...",
    "ts": "2024-05-29T12:00:00.000Z"
  }
]
```

You can export this as JSON at any time from the History tab.

---

## 🧪 Tested Wallets

The generated `bitcoincash:` URIs have been tested with:

| Wallet | Platform | Status |
|--------|----------|--------|
| Electron Cash | Desktop / Android | ✅ |
| Paytaca | Android / iOS | ✅ |
| Zapit | Android / iOS | ✅ |
| Bitcoin.com Wallet | Android / iOS | ✅ |
| Stack Wallet | Android / iOS | ✅ |

---

## 🛠️ Customization

### Add Your Own Branding

Edit the `<title>`, `.nav-brand`, and footer in `index.html`. All CSS variables are defined at the top of the `<style>` block:

```css
:root {
  --green:   #00e676;   /* Primary accent — change to your brand color */
  --blue:    #29b6f6;   /* Secondary buttons */
  --bg:      #060a0f;   /* Page background */
  --surface: #0d1520;   /* Card backgrounds */
  /* ... */
}
```

### Pre-fill Your Address

To create a merchant-specific fork with your address pre-filled, add this to the end of the `<script>` block:

```javascript
document.getElementById('m_address').value = 'bitcoincash:YOUR_ADDRESS_HERE';
document.getElementById('p_address').value  = 'bitcoincash:YOUR_ADDRESS_HERE';
```

### Add CashTokens Support

CashCompass Pay currently generates standard BCH payment URIs. CashTokens (BCMR, fungible/NFT tokens) URI support is planned for a future release.

---

## 📋 Roadmap

- [x] BIP21 payment URI + QR code generation
- [x] Merchant invoice creation and preview
- [x] Invoice history with localStorage persistence
- [x] Export invoices as JSON
- [x] Security headers via Vercel config
- [x] Input sanitization against XSS
- [ ] BCH/fiat price conversion (via public API)
- [ ] CashTokens (BCMR) URI support
- [ ] Print-friendly invoice export (PDF)
- [ ] Multi-language support
- [ ] PWA (installable, works offline)

---

## 🤝 Contributing

Contributions are welcome! This is a community project for the BCH ecosystem.

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Commit your changes: `git commit -m "feat: add my feature"`
4. Push to your fork: `git push origin feat/my-feature`
5. Open a Pull Request

Please keep the single-file architecture unless you have a strong reason to add a build step. The goal is maximum simplicity and auditability.

---

## ☕ Support the Project

If CashCompass Pay is useful to you, consider sending a small BCH donation:

**`bitcoincash:qrtv37u522gz8a5lezfqk5vukly93cu7gc8tn09040`**

Or visit [cashcompass.space](https://cashcompass.space) to explore the full BCH ecosystem resource hub.

---

## 📄 License

MIT License — free to use, fork, and modify. See [LICENSE](LICENSE) for full text.

---

## 🔗 Part of the CashCompass Ecosystem

CashCompass Pay is one tool in the broader [CashCompass](https://cashcompass.space) project — a community-maintained Bitcoin Cash resource hub covering wallets, explorers, developer tools, CashTokens, DeFi, and onboarding resources.

| Resource | Description |
|---|---|
| [cashcompass.space](https://cashcompass.space) | Main ecosystem hub |
| [CashCompass Pay](https://cashcompass.space/pay) | This project |
| [@alberdioni8406_](https://twitter.com/alberdioni8406_) | Project updates on X |

---

<div align="center">
  <br/>
  Built with ⚡ for the Bitcoin Cash community<br/>
  <sub>Non-custodial · Open Source · Zero Fees · Forever Free</sub>
</div>
