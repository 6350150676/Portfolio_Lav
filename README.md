# Lav's Experiments — Lav Naruka's portfolio

A game designer's portfolio built as an eccentric inventor's lab notebook: every
project is a numbered **experiment** with the question it set out to answer, and
the page is full of small experiments you can actually play.
React + TypeScript + Vite, with Three.js / React Three Fiber for the 3D controller.

## Tech Stack

- **React 18** + **TypeScript**
- **Three.js** + **React Three Fiber** + **@react-three/drei** — the 3D gamepad (lazy-loaded on demand)
- **Vite** — dev server and build
- **Custom CSS** — lab-notebook look: graph paper, index cards, rubber stamps, label-maker tags;
  day and night themes (fonts: Fraunces, IBM Plex Sans/Mono, Caveat)

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

Open [http://localhost:5173](http://localhost:5173)

## Customization

All content lives in **`src/data/index.ts`** — update:
- `personalInfo` — name, email, phone, social links, CV path
- `experience` — work history (the "lab log")
- `projects` — each one is an experiment: give it the next `no` and a `question`
- `benchExperiments` — the playable experiments on the page, numbered in the same series
- `skills` — the "apparatus" drawers
- `stats` — headline numbers
- `education` / `achievements`

The homepage tally (experiments / playable / shipped / still running / abandoned)
is counted from that file. A project with `status: "Abandoned"` shows up in the
"abandoned" count automatically.

Screenshots come from `src/assets/projects/<id>/` — see the README in that folder.

## Deployment

### Vercel (recommended — free)
```bash
npm install -g vercel
vercel --prod
```

### Netlify
```bash
npm run build
# Drag & drop the `dist/` folder to netlify.com
```

### GitHub Pages
Add to `vite.config.ts`:
```ts
base: '/your-repo-name/'
```
Then push to GitHub and enable Pages from the `dist` branch.

## Project Structure

```
src/
  components/
    3d/         # Three.js gamepad scene
    bench/      # The playable experiments (path puzzle, walls, speed, heartbeat, reconnect, résumé run)
    sections/   # Hero, Experiments, Bench, Lab log, Inventor, Apparatus, Credentials, Contact
    ui/         # Navbar, Footer, stamps, section heads, lab assistant (BIT)
  data/         # All portfolio content (edit this!)
  lib/          # lab.ts (numbering, stamps, tally), project media loader
  styles/       # globals.css (tokens + primitives), home.css, bench.css, report.css
  App.tsx
  main.tsx
```

## Performance Tips

- three.js only downloads when a visitor presses "Load the experiment" on #013
- Canvas experiments pause when scrolled off-screen
- The 3D controller uses a lower pixel ratio and skips bloom on small screens

---

Built for **Lav Naruka** — game designer & Unity developer
