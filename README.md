# Matin Afzali Portfolio v2

A responsive React + Vite portfolio with a glassmorphism UI, animated starfield, typewriter role animation, reveal-on-scroll sections, technical matrix, experience timeline, project cards, and live public GitHub repository loading.

## Requirements
- Node.js 18+ (Node 20 recommended)
- npm

## Run locally
```bash
npm install
npm run dev
```

## Production build
```bash
npm run build
npm run preview
```

## GitHub repository list
The portfolio reads public repositories from `https://api.github.com/users/ifmat/repos` at runtime. The browser needs internet access for this section. If GitHub API is unavailable, the page shows a fallback link to the profile.

## Deploying to GitHub Pages
If deploying to `https://ifmat.github.io/`, the default Vite base path is suitable. If deploying to a project repository path, set `base` in `vite.config.js` to that repository path before building. Upload the generated `dist` contents to the configured hosting destination.

## Personal details to verify
- Public project links currently point to the portfolio website or GitHub profile where no specific repository URL was supplied.
- Experience descriptions are concise summaries based on the roles and durations provided.
