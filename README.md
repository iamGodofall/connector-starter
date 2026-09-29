# connector-starter

Generate production-ready platform adapters in 60 seconds. Auth, caching, and audit logs included.

[![npm version](https://img.shields.io/npm/v/connector-starter.svg)](https://npmjs.com/package/connector-starter)

## 🚀 Quick Start (5 minutes)

```bash
npx connector-starter create mastodon
cd mastodon-adapter
npm install
MASTODON_KEY=your-key node adapter.js connect
```

See generated `./mastodon-adapter` folder.

## 📋 Commands

| Command | Description |
|---------|-------------|
| `create PLATFORM` | Generate adapter (prompts for name/auth/features) |
| `list` | Show available templates |
| `help` | Usage info |

**Templates**: mastodon, bluesky, generic

## 🔒 Security Model

- **User-controlled keys**: Env vars only, no hardcoded secrets
- **Local-first**: Encrypted cache, signed audit logs
- **Capkit-ready**: Scoped capabilities for generated adapters
- **No cloud deps**: Offline generation & testing

## 🧪 Development

```bash
npm install
npm test          # 5/5 tests
npm run demo      # Full generation flow
npm run build     # tsc dist
npm run dev       # ts-node src/index.ts
```

## **Part of the Agent Builder Suite**  
→ [capkit](https://github.com/iamGodofall/capkit): Scoped capabilities for agents  
→ [quickbench](https://github.com/iamGodofall/quickbench): Reproducible agent evaluation  
→ [edge-run](https://github.com/iamGodofall/edge-run): Offline-first orchestration  
→ [connector-starter](https://github.com/iamGodofall/connector-starter): Generate adapters fast

*Built for builders who ship. MIT licensed. Local-first by design.*

---

## ☕ Support the studio

Everything here is built indie — no VC money, no marketing budget. If this project saves you time or you believe in local-first, sovereign software, fuel the work:

[**Buy Me a Coffee**](https://www.buymeacoffee.com/enockgames) · [**PayPal**](https://paypal.me/enocklabs)

Every contribution goes into development time and keeping these tools free & MIT-licensed.

— *Enock Labs* · [enockgames.live](https://enockgames.live)
