# Investment Banking Interview Prep

A password-protected interview practice tool for Darden MBA students. Pick a question, type or dictate an answer, and get scored AI feedback.

**Live site:** https://krd2ad.github.io/ib-interview-rep

## Repos

| Repo | Purpose |
|------|---------|
| [`ib-interview-rep`](https://github.com/krd2ad/ib-interview-rep) | React frontend — this repo |
| [`ib-interview-evaluator-api`](https://github.com/krd2ad/ib-interview-evaluator-api) | Vercel serverless API — holds the Anthropic key and evaluation logic |

## Stack

- Vite 6 + React 19 + TypeScript + Tailwind CSS v4
- Hosted on GitHub Pages (static, no server)
- Evaluation calls proxied through the Vercel API above

## Architecture

```
Browser (GitHub Pages)
  → user enters password (validated client-side + sent as x-site-password header)
  → picks random question from src/data/questions.ts
  → user types or dictates an answer (Web Speech API)
  → POST to ib-interview-evaluator-api on Vercel
      → Vercel validates x-site-password
      → calls Anthropic claude-haiku-4-5-20251001
      → returns { score, feedback, costUsd }
  → frontend renders score + feedback panel
```

## Dev

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc + vite build → dist/
```

## Question bank

Questions live in `src/data/questions.ts`. IDs follow `category-NNN`. 22 categories, 3 difficulty levels (Basic / Intermediate / Advanced).

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and deploys to GitHub Pages automatically. `VITE_EVALUATION_API_URL` is baked in at build time — no secrets needed in this repo.

## Questions

Reach out on [LinkedIn](https://www.linkedin.com/in/kiernan-dimeglio/).
