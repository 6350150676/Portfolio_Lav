# Lav Naruka – 3D Portfolio

A production-ready 3D portfolio built with React + TypeScript + Three.js + React Three Fiber.

## Tech Stack

- **React 18** + **TypeScript**
- **Three.js** + **React Three Fiber** + **@react-three/drei** — 3D scene, floating geometry, stars
- **GSAP-ready** — install `gsap` for page transition animations
- **Vite** — blazing fast dev server and build
- **Custom CSS** — dark game-dev aesthetic, scanlines, glitch effects, custom cursor

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
- `personalInfo` — name, email, phone, social links
- `experience` — work history
- `projects` — your shipped games / tools
- `skills` — tech categories and items
- `stats` — headline numbers
- `education` / `certifications`

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
    3d/         # Three.js scene components
    sections/   # Hero, About, Experience, Projects, Skills, Contact
    ui/         # Navbar, Footer, Cursor, DataFlow particles
  data/         # All portfolio content (edit this!)
  styles/       # Global CSS with CSS variables
  App.tsx
  main.tsx
```

## Performance Tips

- The 3D canvas uses `dpr={[1, 1.5]}` — cap pixel ratio for mobile perf
- Stars count can be reduced in `Hero.tsx` for low-end devices
- Disable `OrbitControls autoRotate` if you want a static scene

---

Built for **Lav Naruka** — Unity Game Developer & Level Designer
