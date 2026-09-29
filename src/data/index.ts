// ─────────────────────────────────────────────────────────────────────────
//  PORTFOLIO CONTENT — single source of truth.
//  Everything here is pulled straight from Lav Naruka's real résumé.
//
//  👉  THE LAB NOTEBOOK:
//      Every project is filed as a numbered EXPERIMENT (`no`) with the
//      `question` it set out to answer. The homepage tally (experiments /
//      playable / shipped / still running / abandoned) is counted from this
//      file — add a project with status "Abandoned" and it shows up there.
//
//      Screenshots come from src/assets/projects/<id>/ (see README.txt in
//      that folder) — drop images in and they appear automatically.
// ─────────────────────────────────────────────────────────────────────────

export const personalInfo = {
  name: "Lav Naruka",
  title: "Unity Game Developer",
  roles: ["Mobile Game Developer", "Game Systems Designer", "Gameplay Systems Engineer", "SDK & Monetization Dev", "Performance Optimizer"],
  tagline:
    "I design and build multiplayer mobile games, XR experiences, and production-ready gameplay systems — from ruleset and difficulty design to performance, networking, and clean architecture.",
  email: "lovenaruka514@gmail.com",
  phone: "+91-6350150676",
  linkedin: "https://linkedin.com/in/lavnaruka",
  linkedinHandle: "linkedin.com/in/lavnaruka",
  github: "https://github.com/6350150676",
  githubHandle: "github.com/6350150676",
  location: "India",
  // CV file in /public — every "Download CV" button points here
  resume: "/Lav_resume.pdf",
  bio:
    "I'm a Unity Developer with professional experience building and shipping multiplayer mobile games. My work spans game design and gameplay programming, networking, optimization, and XR applications — I designed the ruleset and difficulty curve for a live puzzle title, and built the content pipeline and difficulty-scored curve behind a full 80-level puzzle set. I enjoy solving engineering problems that make games scalable, maintainable, and fun to play.",
  bio2:
    "I care about clean, modular architecture and the parts that actually make a game shippable: reusable gameplay systems, object pooling, SDK & backend integration, and reliable real-time networking. My Engineering Physics background from NIT Hamirpur gives me a strong foundation in math, simulation, and systems thinking that I bring to gameplay and tooling.",
};

// "What I work on" — capability highlights for the About section
export const capabilities = [
  "Game design — rulesets, difficulty curves & progression (live Tango title)",
  "Level pipeline & difficulty curves — a solver-validated 80-level set sorted into a smooth ramp",
  "Real-time multiplayer with WebSockets & backend integration",
  "In-game chat & custom emoji systems in Unity",
  "Firebase with Google & Apple OAuth sign-in",
  "Ad monetization — Google AdMob, Unity Ads & ironSource",
  "Photon voice chat & multiplayer (10+ concurrent players)",
  "Ready Player Me avatars, Mixamo & Cinemachine",
  "Reusable, modular gameplay systems & clean architecture",
  "Custom 3D game assets modeled in Blender (via Claude MCP)",
  "Performance & memory optimization for low-end devices",
];

// ── WORK EXPERIENCE (résumé-accurate) ────────────────────────────────────
export const experience = [
  {
    role: "Unity Game Developer",
    company: "RENXO Technologies Pvt. Ltd.",
    period: "Jul 2025 – Present",
    type: "Full-Time",
    color: "#7c6cff",
    stack: ["Unity", "C#", "WebSockets", "Firebase", "OAuth", "AdMob", "Unity Ads", "ironSource"],
    bullets: [
      "Built mobile games as a Unity developer — Checkers, Ludo, Zip, Tango & Ball Merge — with Tango, Zip and Ball Merge now live on the stores (Tango with 15K+ players).",
      "Architected WebSocket-based multiplayer with backend integration, an in-game chat system, and a custom in-Unity emoji system.",
      "Implemented Firebase with Google & Apple OAuth sign-in, plus full ad monetization via Google AdMob, Unity Ads & ironSource mediation.",
      "Engineered reusable, modular gameplay & UI systems and profiled/optimized for a stable 60 fps on low-end Android & iOS.",
    ],
    challenge: {
      problem: "One of the hardest problems was keeping a live match intact when Android tears down the WebSocket the instant the app is backgrounded — locking the phone mid-game can't silently forfeit the match or desync the board.",
      solution: "I built a reconnection layer with heartbeats and exponential-backoff retries that restores the session on resume and reconciles authoritative state from the server, so a game resumes exactly where it left off instead of corrupting.",
    },
  },
  {
    role: "Unity Developer Intern",
    company: "Caarya",
    period: "Feb 2023 – Jul 2023",
    type: "Internship",
    color: "#5b8cff",
    stack: ["Unity", "C#", "Photon", "Ready Player Me", "Mixamo", "Cinemachine"],
    bullets: [
      "Built a real-time voice-chat system with Photon and scaled live gameplay to 10 concurrent players.",
      "Integrated Ready Player Me avatars with Mixamo animations and Cinemachine camera work.",
      "Maintained clean asset pipelines, collaborating across disciplines throughout the project lifecycle.",
    ],
    challenge: {
      problem: "Photon voice and avatar sync degrade quickly as players join — at 10 concurrent users, naive voice routing and animation updates burned through bandwidth and frame budget.",
      solution: "I scoped voice channels and synced only the avatar state that mattered — Mixamo-driven poses with Cinemachine framing — keeping live gameplay smooth at 10 concurrent players.",
    },
  },
];

// ── PROJECT CATEGORIES (the page splits work into these groups) ───────────
export const projectCategories = [
  { key: "Games", blurb: "Production mobile games — design, gameplay systems & monetization." },
  { key: "VR / XR", blurb: "Immersive headset & sensor-driven experiences." },
  { key: "Hardware & Simulation", blurb: "Unity talking to real-world hardware." },
];

const img = (seed: string, w = 1280, h = 720) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const projects = [
  {
    id: "tango-puzzle",
    no: 1,
    question: "Can one ruleset stretch from a 4×4 warm-up to an 8×8 brain-burner?",
    title: "Tango",
    subtitle: "Production Title @ RENXO Technologies · Live on Google Play & App Store",
    category: "Games",
    status: "Live",
    color: "#f59e0b",
    tech: ["Game Design", "Gameplay Logic", "REST API", "Ad Monetization", "Store Deployment", "iOS", "Android"],
    tagline: "A live production title — Tango-style logic puzzle with 3 board sizes × 5 difficulties.",
    cover: img("tango-cover", 900, 560),
    description:
      "A live mobile logic-puzzle game I built at RENXO Technologies, inspired by LinkedIn's Tango but with a deeper, more advanced rule set. It's published and live on both the Google Play Store and the Apple App Store. My work on it was the game design and the gameplay logic, the ad monetization, and the release itself — I deployed the game to both stores. The puzzle-generation logic lives in the backend and is served to the client over a REST API.",
    csr: {
      challenge: "A good logic puzzle needs the right difficulty curve and constraint-checking that feels instant — and fresh, always-solvable boards across every size and skill level.",
      solution: "I designed the game and built the client-side gameplay & constraint logic, while a backend service generates guaranteed-solvable puzzles and serves them to the game over a REST API.",
      result: ["15K+ live players on Google Play & App Store", "3 board sizes × 5 difficulties = 15 modes", "Server-generated, always-solvable boards"],
    },
    overview:
      "Tango is a live logic grid-puzzle game I built at RENXO Technologies, inspired by LinkedIn's Tango but with a more advanced rule set. When a game starts the player picks a board size — 4×4, 6×6 or 8×8 — then a difficulty from Beginner to Expert (five tiers), giving roughly 15 distinct customizations. My contribution to this production title spanned the game design and gameplay logic, the ad monetization, and the release: laying out the grid, placing the symbols, validating the row/column and adjacency constraints in real time, driving the play loop, wiring up the ads, and then deploying the finished game to both stores myself. The puzzle-creation logic itself runs on the backend, which generates solvable boards and delivers them to the client over a REST API — so the client stays light while the server handles level generation. The game is published and live on both the Google Play Store and the Apple App Store.",
    highlights: [
      "15K+ live players",
      "Live on Google Play & Apple App Store",
      "Deployed to both stores myself",
      "Ad monetization integrated",
      "3 board sizes × 5 difficulty tiers (~15 modes)",
      "Advanced logic beyond the original Tango",
      "Backend puzzle generation over REST API",
    ],
    images: [
      { src: img("tango-1"), caption: "Board-size & difficulty selection." },
      { src: img("tango-2"), caption: "Solving a board — live constraint checks." },
      { src: img("tango-3"), caption: "Completed puzzle — win state." },
    ],
    process: [
      { title: "Game design", detail: "Designed the Tango-inspired ruleset and difficulty curve — 4×4 / 6×6 / 8×8 boards across five tiers from Beginner to Expert, for ~15 distinct customizations." },
      { title: "Gameplay logic", detail: "Built the client-side play loop: grid layout, symbol placement, and real-time validation of row/column balance and adjacency constraints." },
      { title: "Backend integration", detail: "Connected the game to a backend that generates solvable puzzles, pulling levels into the client over a REST API so board generation stays server-side." },
      { title: "Monetization", detail: "Integrated ad monetization into the game as part of my work on the project." },
      { title: "Deployment", detail: "Handled the release myself — built, submitted and deployed the game to both the Google Play Store and the Apple App Store." },
    ],
    roadmap: [
      { label: "Core gameplay + 3 board sizes", done: true },
      { label: "5 difficulty tiers + backend levels", done: true },
      { label: "Live on Google Play & App Store", done: true },
      { label: "Daily challenges & leaderboards", done: false },
    ],
    links: { github: "", demo: "", playStore: "https://play.google.com/store/apps/details?id=com.gatch.tango", appStore: "https://apps.apple.com/us/app/tango-game/id6762611647" },
  },
  {
    id: "save-the-cat",
    no: 14,
    question: "Can a physics puzzle reward prediction instead of reflexes?",
    title: "Save the Cat",
    subtitle: "One-Stroke Physics Puzzle · Solo Title @ Parlok Studio · Live on Google Play",
    category: "Games",
    status: "Live",
    color: "#f472b6",
    tech: ["Unity 6", "C#", "URP", "2D Physics", "AdMob", "Supabase", "Python Tooling", "Android"],
    tagline: "Draw one line to save the cat — the line becomes a real object that falls, tips and rolls.",
    cover: img("savecat-cover", 900, 560),
    description:
      "A one-stroke physics puzzle I designed and shipped solo, published under my own studio label, Parlok Studio — live on Google Play. A cat is in danger; you draw one line; on release that line becomes a real rigid body with mass that falls, tips and rolls, and the simulation decides whether the cat is saved. Unity 6 / C#, the whole game built from code, with a deterministic physics world and an off-screen validator that proves generated levels playable before they're served.",
    csr: {
      challenge: "When the drawn line is a real falling object, every level is a physics question — and a level that's unwinnable, or secretly won by doing nothing, looks fine until someone plays it. Levels past the campaign had to be proven playable with no designer checking each one.",
      solution: "Made the simulation deterministic and stepped by hand, then ran a validator in an off-screen copy of the same world: reject any level that doing nothing wins, accept only if a drawable stroke wins, and tune the ink budget and star thresholds from the cheapest winning stroke.",
      result: ["Live on Google Play — solo-built & published", "Generated levels proven playable before they're served", "Daily puzzle with a global ink-efficiency leaderboard"],
    },
    overview:
      "Save the Cat is a one-stroke physics puzzle for Android that I designed and shipped on my own, published under my studio name, Parlok Studio. The player studies a frozen scene — a bee swarm, falling rocks, a rolling boulder, a toppling slab — and draws one continuous line. On release the line becomes a fully dynamic 2D rigid body whose mass comes from the ink actually drawn, so it falls, tips and gets shoved; the world only unfreezes when the finger lifts, which makes the game about predicting physics rather than reacting to it. Under the hood the entire game is assembled from code at boot — no prefabs, no authored scene hierarchy — hazards are advanced by a hand-stepped deterministic simulation, and that same simulation runs off-screen as a level validator. A designed campaign comes first; past it, a generator deals new levels, rejects repeats and trivial layouts, proves each one winnable with a stroke a player could actually draw, and tunes its ink budget and stars — prefetched a few milliseconds per frame while the player draws, so NEXT never stalls. A daily puzzle, identical worldwide, ranks one attempt by ink spent on a Supabase leaderboard.",
    highlights: [
      "Live on Google Play — solo-built & published",
      "Drawn line → real rigid body with mass",
      "Deterministic, hand-stepped physics world",
      "Off-screen validator proves levels playable",
      "Endless level generator + daily leaderboard",
      "Entire game built from code — no prefabs",
    ],
    images: [
      { src: img("savecat-1"), caption: "Frozen scene — study the threat, then draw." },
      { src: img("savecat-2"), caption: "The stroke becomes a real object and the sim runs." },
      { src: img("savecat-3"), caption: "Level cleared — stars for ink efficiency." },
    ],
    process: [
      { title: "Game design", detail: "Wrote the design document and a formal puzzle spec: five pillars (one stroke, the drawing is an object, the cat is passive, prediction never reflex, legible failure), ten level archetypes, seven hazards, ten prop types, and hard validity rules every level must pass — starting with 'doing nothing must lose'." },
      { title: "Ink physics", detail: "Touch samples draw a preview with no collider; on release they're built into a dynamic rigid body whose mass comes from the area actually drawn. The world stays frozen while drawing and runs the instant the finger lifts, so difficulty is understanding — never speed." },
      { title: "Deterministic simulation", detail: "Hazards are advanced by a hand-stepped SimWorld instead of Update/FixedUpdate, so the validator can run physics hundreds of steps inside one rendered frame and get exactly the result the player will see." },
      { title: "Level pipeline", detail: "Campaign levels are authored as JSON design data against the spec, audited by Python tools and compiled to C#. Past the campaign, a generate → reject-repeats → validate → tune pipeline serves new levels, with up to 7 re-rolls before a known-good fallback." },
      { title: "Live features & monetization", detail: "A UTC-seeded daily puzzle with one attempt and a Supabase leaderboard reached through plain UnityWebRequest (no SDK), a version manifest with Play in-app updates, and AdMob banners, paced interstitials and rewarded hints behind Google's UMP consent flow." },
      { title: "Testing & release", detail: "100+ PlayMode tests across ink physics, hazard interaction, the level pipeline, the daily and safe-area layout; configured the IL2CPP ARMv7/ARM64 Android build and published it to Google Play under Parlok Studio." },
    ],
    roadmap: [
      { label: "One-stroke ink physics + deterministic sim", done: true },
      { label: "Campaign, level generator & daily leaderboard", done: true },
      { label: "Live on Google Play", done: true },
      { label: "iOS build", done: false },
      { label: "Server-side replay check of daily strokes", done: false },
      { label: "Firebase Analytics + Crashlytics breadcrumbs — built, ships next update", done: false },
    ],
    links: { github: "", demo: "", playStore: "https://play.google.com/store/apps/details?id=com.parlok.savethecat", appStore: "" },
  },
  {
    id: "ball-merge",
    no: 15,
    question: "Can an ad break feel like part of the run instead of an interruption?",
    title: "Ball Merge",
    subtitle: "Drop-and-Merge Physics Puzzle · Solo Build @ RENXO Technologies · Live on Google Play & App Store",
    category: "Games",
    status: "Live",
    color: "#f59e0b",
    tech: ["Unity 6", "C#", "URP", "2D Physics", "AdMob", "Firebase Analytics", "Crashlytics", "REST API", "Android", "iOS"],
    tagline: "Drop sports balls into a jar and merge them up 12 tiers to a legendary Crown ball.",
    cover: img("ballmerge-cover", 900, 560),
    description:
      "A drop-and-merge physics puzzle in the Suika family that I built solo at RENXO Technologies, live on Google Play and the App Store. Sports balls with reactive faces merge up a 12-tier ladder to a legendary Crown ball, with four power-ups, three themes, saved runs and a global leaderboard. Ad-supported through AdMob, with every ad placed at a calm moment and every rewarded ad saying what it gives before the tap.",
    csr: {
      challenge: "An ad-supported merge game has to earn from ads without breaking the calm, one-thumb flow — and without the player ever losing a run to something the game did.",
      solution: "Timed mid-run ad breaks on active play only, waited for a calm moment to show them, and let the player choose the kind of break; added grace timers, a jar lid and saved runs so shakes, ads and resumes can never cause a loss.",
      result: ["Live on Google Play & App Store", "Player-chosen mid-run ad breaks", "No loss caused by the game's own actions"],
    },
    overview:
      "Ball Merge is a portrait, one-thumb physics puzzle: drag to aim, release to drop, and two identical balls that touch merge into the next, bigger ball — from a ping-pong ball up through golf, tennis, cricket, basketball, soccer and bowling to a rugby ball and a legendary Crown. Only the five smallest tiers are ever dealt, weighted towards small balls so the jar doesn't fill before a chain can be built, and each merge pays a triangular-number score. A run ends only when the pile stays above the danger line for 1.75 seconds, so a ball bouncing through the line is normal play. Four power-ups (Pop, Upgrade, Shake, Clear) help when the jar gets tight; each has its own charges, refill timer and rewarded-ad price, set by how powerful it is. The whole run — every ball's position, rotation and velocity — is saved and can be resumed. Monetization is ads only: a banner, a mid-run break the player chooses how to take, optional rewarded refills and a once-per-run second chance, all behind Google's consent form and Apple's tracking prompt.",
    highlights: [
      "Live on Google Play & App Store",
      "12-tier merge ladder up to a Crown ball",
      "4 power-ups with per-power charges & refill timers",
      "Player-chosen mid-run ad breaks",
      "Full run save & resume",
      "Global leaderboard with server-side score checks",
      "Firebase Analytics + Crashlytics breadcrumbs",
    ],
    images: [
      { src: img("ballmerge-1"), caption: "Endless merge — the jar filling up." },
      { src: img("ballmerge-2"), caption: "Clear the small ones — a power-up sheet." },
      { src: img("ballmerge-3"), caption: "Pause menu with themes." },
    ],
    process: [
      { title: "Core loop & physics", detail: "Drag-to-aim, release-to-drop merging on Unity 2D physics: colliders match the drawn balls exactly, the rugby ball gets an equal-area 16-point polygon, and tuned gravity, friction and a speed cap keep piles settling instead of sliding." },
      { title: "Balance", detail: "Ball sizes grow by 1.15× a tier, deal odds favour small balls (0.62× per tier), and merges pay triangular numbers — with the jar size as the main lever on run length." },
      { title: "Power-ups & economy", detail: "Pop, Upgrade, Shake and Clear, each with its own charges, refill timer while playing and while away, and rewarded-ad price; a charge is spent only when the effect actually happens." },
      { title: "Monetization", detail: "AdMob banner, a mid-run ad break the player chooses how to take, optional rewarded refills, and a once-per-run second chance — with a minimum gap between full-screen ads." },
      { title: "Online", detail: "Remote config over a signed REST API, anonymous players, ranked runs with signed tokens, a TOP 100 / AROUND YOU leaderboard, offline-queued score uploads and Firebase analytics after consent." },
      { title: "Release", detail: "Shipped to Google Play and the App Store (Android and iPhone), with Google UMP consent first and Apple's tracking prompt second." },
    ],
    roadmap: [
      { label: "12-tier merge loop, power-ups & themes", done: true },
      { label: "Mid-run ad breaks, second chance & leaderboard", done: true },
      { label: "Live on Google Play & App Store", done: true },
      { label: "Remove-ads & power-up IAP", done: false },
      { label: "Cloud save & daily challenges", done: false },
    ],
    links: { github: "", demo: "", playStore: "https://play.google.com/store/apps/details?id=com.gatch.ballmerge", appStore: "https://apps.apple.com/us/app/ball-merge-game/id6808634675" },
  },
  {
    id: "zip-puzzle",
    no: 2,
    question: "Can a puzzle's difficulty be measured instead of guessed?",
    title: "Zip Puzzle",
    subtitle: "Grid Path-Drawing Puzzle (inspired by LinkedIn Zip) · Live on Google Play",
    category: "Games",
    status: "Live",
    color: "#7c6cff",
    tech: ["Unity 6", "C#", "URP", "Input System", "Mobile", "ScriptableObjects"],
    tagline: "Draw one path through every cell — with a real-time hint solver.",
    cover: img("zip-cover", 900, 560),
    description:
      "A complete, polished mobile puzzle game in Unity 6. Players draw a single continuous path that connects numbered checkpoints in order and fills every cell exactly once — a Hamiltonian-path puzzle with walls blocking moves. An 80-level set built through a custom pipeline — difficulty-scored and sorted into a smooth curve — a real-time hint solver, and an entirely code-driven UI.",
    csr: {
      challenge: "Hamiltonian-path puzzles become computationally expensive on large boards, so a naive solver freezes the game when generating a hint.",
      solution: "Implemented DFS with connectivity pruning and a node budget so hints solve in real time without blocking the main thread.",
      result: ["80-level difficulty curve", "Real-time hints", "No frame drops"],
    },
    overview:
      "Zip Puzzle is a grid path-drawing game where you draw one continuous line that visits numbered checkpoints in order and fills every cell exactly once (a Hamiltonian path), with walls blocking certain moves. I built it end-to-end in Unity 6 / C# — gameplay, UI, audio, save system and tutorial — with a real-time hint solver and a clean, decoupled architecture. The standout piece is the solver: generating a hint means solving the puzzle from the player's current position, so a naive DFS would freeze on big grids; I added connectivity pruning (skip states that orphan cells) and a node budget to keep the main thread responsive.",
    highlights: [
      "Live on Google Play",
      "80-level set — pipeline-built & solver-validated",
      "Hamiltonian-path validation engine",
      "Real-time DFS hint solver (pruned + budgeted)",
      "100% code-driven UI (UIFactory)",
      "Decoupled: Service Locator · Event Bus · FSM",
      "Optional API level provider (HMAC-signed)",
    ],
    images: [
      { src: img("zip-1"), caption: "Drawing a path across the grid." },
      { src: img("zip-2"), caption: "Completed path — win state." },
      { src: img("zip-3"), caption: "Level select with non-linear progression." },
    ],
    process: [
      { title: "Core puzzle engine", detail: "Hamiltonian-path validation — adjacency checks, wall-blocking, checkpoint ordering, and a drag-to-backtrack mechanic returning rich move results (Success / Backtrack / Win / DeadEnd / Invalid)." },
      { title: "Hint solver", detail: "Depth-first search with connectivity pruning and a node budget so hints stay responsive on larger grids; short-circuits to the authored solution when the player is still on the optimal route." },
      { title: "Decoupled architecture", detail: "Service Locator (DI), Event Bus (pub/sub), Factory, Strategy and State Machine so gameplay, UI and audio never call each other directly." },
      { title: "Code-driven UI + config", detail: "Every panel built in code via a UIFactory with tween transitions; 200+ design values centralized in one ScriptableObject for no-code tuning." },
      { title: "Level pipeline + optional API", detail: "80 levels defined in a compact 'RLUD' move-string format, brought in through an AI-assisted transcription step guarded by a parity (graph-coloring) feasibility check and validated by the DFS solver so nothing unsolvable ships — with a guaranteed-solvable 'snake' generator filling any gap. An optional provider also loads levels over HTTP with HMAC-SHA256 signed requests, caching & timeout, with a local fallback (Strategy)." },
    ],
    roadmap: [
      { label: "80 levels + solver + UI complete", done: true },
      { label: "Responsive 3×3 → 8×8+ boards", done: true },
      { label: "Live on Google Play", done: true },
      { label: "WebGL build to share", done: false },
      { label: "Deploy the optional level API", done: false },
    ],
    links: { github: "https://github.com/6350150676", demo: "", playStore: "https://play.google.com/store/apps/details?id=com.gatch.zip", appStore: "" },
  },
  {
    id: "checkers-multiplayer",
    no: 3,
    question: "What does it take for a board game to survive the real internet?",
    title: "Online Multiplayer Checkers",
    subtitle: "Real-Time Multiplayer Board Game · Android + iOS",
    category: "Games",
    status: "Shipped",
    color: "#38bdf8",
    tech: ["Unity", "C#", "WebSockets", "JWT Auth", "Firebase", "AdMob/Meta/LevelPlay", "Blender"],
    tagline: "Real-time online checkers — dual-socket netcode, matchmaking, betting & ads.",
    cover: img("checkers-cover", 900, 560),
    description:
      "A production-grade real-time multiplayer checkers game in Unity / C#: online matchmaking, two-currency betting, chat + friends, three sign-in methods, ad monetization, and shipped Android + iOS builds. Custom 3D pieces & boards modeled in Blender.",
    csr: {
      challenge: "Real-time multiplayer has to survive dropped connections, app backgrounding and cross-region latency — without forfeiting a live match.",
      solution: "Built a dual-WebSocket layer (lobby + per-match) with heartbeats, exponential-backoff reconnect and region-aware routing over a JWT-authed client.",
      result: ["Shipped to iOS + Android", "Auto-reconnect survives backgrounding", "Matchmaking, betting, chat & ad monetization"],
    },
    overview:
      "A full real-time multiplayer board game built from scratch in Unity / C# — engine, networking, matchmaking, monetization, social systems and store-ready mobile builds. The standout is the netcode: a dual-WebSocket layer (one persistent connection for lobby / chat / matchmaking, a second per-match connection for gameplay) with heartbeats, auto-reconnect using exponential backoff, a reconnect watchdog, and connection persistence across app backgrounding — over a custom JWT-authenticated client with proactive token refresh and region-aware routing (NA / UK / India) that auto-selects the lowest-latency server. All 3D assets — pieces, boards, crowns, frames — were modeled by me in Blender via Claude MCP.",
    highlights: [
      "Dual-WebSocket netcode + auto-reconnect",
      "JWT auth + region-aware server routing",
      "Checkers engine: variants & 8 custom rules",
      "Two-currency wallet & bet tiers",
      "3 sign-ins: Google · Apple · Guest",
      "AdMob · Meta · LevelPlay + custom 3D (Blender)",
    ],
    images: [
      { src: img("checkers-1"), caption: "In-game HUD — turn timer & capture counts." },
      { src: img("checkers-2"), caption: "Animated matchmaking VS reveal." },
      { src: img("checkers-3"), caption: "Theme customization — pieces, boards, crowns." },
    ],
    process: [
      { title: "Game engine", detail: "Full checkers rules with multiple variants and 8 configurable rules (flying kings, forced/max capture, orthogonal moves, 8/10/12 boards) — move validation, captures, promotion, draw/resign — plus an orbit camera with 2D/3D toggle and auto-fit zoom." },
      { title: "Networking", detail: "Dual-WebSocket layer (lobby + per-match) with heartbeats, exponential-backoff reconnect, a watchdog, and persistence across app backgrounding." },
      { title: "Auth & routing", detail: "Custom JWT-authenticated WebSocket client with proactive token refresh; Google (Firebase), Apple Sign-In (native iOS) and Guest behind a pluggable abstraction; region-aware routing (NA/UK/India)." },
      { title: "Social", detail: "Real-time chat & friends: DMs, in-game broadcast/targeted chat, friend requests, block states, unread badges, and private join-code 'Play with Friends' lobbies." },
      { title: "Monetization", detail: "Two-currency wallet & server-driven bet tiers with prize payouts; AdMob + Meta Audience Network + IronSource LevelPlay mediation (interstitial + rewarded)." },
      { title: "UI, tooling & 3D", detail: "~15 screens via a code-driven UI framework; custom Editor tools (emoji→TMP sprite-atlas builder, automated iOS build post-processor); all 3D pieces/boards/crowns modeled in Blender via Claude MCP." },
    ],
    roadmap: [
      { label: "Engine + dual-socket netcode", done: true },
      { label: "Android APK + iOS builds shipped", done: true },
      { label: "Ranked / tournaments", done: false },
      { label: "Live-ops & analytics dashboard", done: false },
    ],
    links: { github: "https://github.com/6350150676", demo: "", playStore: "", appStore: "" },
  },
  {
    id: "car-racing",
    no: 4,
    question: "Can a mobile racer keep growing without its code — or its frame rate — falling apart?",
    title: "Multi-Environment Car Racing",
    subtitle: "Architecture & Optimization-Focused Racer",
    category: "Games",
    status: "In Development",
    color: "#7c6cff",
    tech: ["Unity", "C#", "WheelColliders", "Compute Shaders", "ProBuilder", "Mobile"],
    tagline: "WheelCollider physics, terrain streaming & GPU-grass compute shaders.",
    cover: img("racing-cover", 900, 560),
    description:
      "A mobile racer built as a systems & architecture showcase: a state-driven race flow, an EventBus-decoupled HUD, WheelCollider car physics with swappable keyboard/mobile/AI input, a speed-reactive chase camera, plus terrain streaming and GPU grass via compute shaders. Still in active development — I'm expanding environments, opponents and content. (The 3D art is from licensed asset packs — I built all the C#, integrated the assets, and assembled the scenes with ProBuilder + splat-mapped terrain.)",
    csr: {
      challenge: "Build a racer that stays maintainable as systems grow and still hits frame budget with dense terrain and foliage on mobile.",
      solution: "Decoupled game phases with a state machine + EventBus, made input swappable behind one interface, and moved terrain streaming and grass onto the GPU.",
      result: ["State machine + EventBus decoupling", "Keyboard / mobile / AI drivers interchangeable", "GPU grass + terrain streaming at frame budget"],
    },
    overview:
      "A mobile racing game I built primarily as a programming and architecture showcase. Game phases run through a State system (Menu → Racing → Paused → GameOver), and systems stay decoupled through an EventBus — the race fires events while the HUD, countdown, results screen and car all simply listen. The car drives on Unity WheelColliders (steer front, power rear, brake all four), input is an abstraction so keyboard, mobile and AI drivers are interchangeable, and the chase camera widens its FOV and adds motion blur as speed climbs. On the optimization side, terrain streaming loads only the world patch around the player, and grass is drawn with GPU compute shaders. To be clear: the 3D art — cars, trees, water, roads, skyboxes — is from licensed asset packs; what's mine is all the C# systems, the architecture, the optimization, the interactive garage, and the scene assembly (ProBuilder geometry + splat-mapped terrain). It's still a work in progress — I'm actively building it out with more environments and opponents.",
    highlights: [
      "State machine: Menu → Race → Pause → GameOver",
      "EventBus-decoupled HUD & race flow",
      "WheelCollider car physics",
      "Swappable input: keyboard · mobile · AI",
      "Speed-reactive chase cam (FOV + blur)",
      "Terrain streaming + GPU-grass compute shaders",
    ],
    images: [
      { src: img("racing-1"), caption: "Race HUD — timer, checkpoints, speed." },
      { src: img("racing-2"), caption: "Interactive garage — drag-to-spin & paint." },
      { src: img("racing-3"), caption: "Streamed terrain with GPU grass." },
    ],
    process: [
      { title: "Race systems", detail: "Countdown, timer, checkpoints, finish line and win/lose flow, with WheelCollider car control — steer the front wheels, power the rear, brake all four." },
      { title: "Decoupled architecture", detail: "A State system drives game phases and an EventBus lets the car, HUD, countdown and results screen communicate without holding references to each other." },
      { title: "Swappable input", detail: "Keyboard, mobile touch and AI are interchangeable drivers behind one input interface (Strategy), so the car code never changes." },
      { title: "Optimization", detail: "Terrain streaming loads only the world patch around the player; grass is generated & culled on the GPU with compute shaders for dense foliage at frame budget." },
      { title: "Garage UI/UX", detail: "Swipe between screens, drag-to-spin the car with realistic inertia, a 'hoist' car-swap animation, and live paint-color changes." },
      { title: "Levels & art", detail: "Assembled the scenes with ProBuilder geometry and splat-mapped terrain; the cars, trees, water, roads and skyboxes are licensed asset packs I integrated." },
    ],
    roadmap: [
      { label: "Core systems + optimization", done: true },
      { label: "Interactive garage", done: true },
      { label: "More environments & opponents", done: false },
      { label: "Online time-trial leaderboards", done: false },
    ],
    links: { github: "https://github.com/6350150676", demo: "", playStore: "", appStore: "" },
  },
  {
    id: "vr-acrophobia",
    no: 5,
    question: "Can exposure therapy listen to the patient's body?",
    title: "VR Acrophobia Therapy",
    subtitle: "Heart-Rate-Driven Exposure Therapy",
    category: "VR / XR",
    status: "Shipped",
    color: "#a78bfa",
    tech: ["Unity", "C#", "Oculus", "ESP32", "BLE", "Pulse Sensor"],
    tagline: "Virtual heights rise only as fast as your heart rate allows.",
    cover: img("vracro-cover", 900, 560),
    description:
      "A VR simulation for acrophobia (fear-of-heights) treatment. The patient is taken through gradually increasing virtual heights while their heart rate is monitored in real time over a pulse sensor, so the experience adapts to their comfort for personalized therapy sessions.",
    csr: {
      challenge: "Exposure therapy for fear of heights has to adapt to each patient — too fast and they panic, too slow and it does nothing.",
      solution: "Streamed live heart rate from an ESP32 + pulse sensor over BLE into Unity and paced the virtual height to the patient's comfort.",
      result: ["Real-time biometric link (ESP32 · BLE)", "Heights rise only while the patient stays calm", "Personalized, comfort-paced sessions"],
    },
    overview:
      "A VR acrophobia-therapy simulation built in Unity for Oculus. It guides a patient through gradually rising virtual heights while reading their live heart rate from a pulse sensor wired to an ESP32, which streams the data wirelessly over BLE. The simulation uses that signal to pace the exposure to the patient's comfort — heights only increase as they stay calm — making each session personalized rather than one-size-fits-all.",
    highlights: [
      "Gradual height-exposure therapy loop",
      "Real-time heart-rate monitoring",
      "ESP32 + BLE wireless biometric link",
      "Comfort-adaptive, personalized pacing",
      "Built in Unity for Oculus",
    ],
    images: [
      { src: img("vracro-1"), caption: "Exposure scene — virtual height rises with the session." },
      { src: img("vracro-2"), caption: "Live heart-rate readout pacing the experience." },
      { src: img("vracro-3"), caption: "ESP32 + pulse-sensor biometric rig (BLE)." },
    ],
    process: [
      { title: "Biometric rig", detail: "Wired a pulse sensor to an ESP32 and streamed heart-rate data wirelessly over BLE." },
      { title: "Unity link", detail: "Ingested the live heart-rate stream into Unity over BLE in real time." },
      { title: "Exposure loop", detail: "Gradually increased virtual height, paced by the patient's heart rate / comfort." },
      { title: "VR build", detail: "Built the immersive scene and interactions in Unity for Oculus." },
    ],
    roadmap: [
      { label: "Heart-rate → Unity over BLE", done: true },
      { label: "Comfort-paced exposure loop", done: true },
      { label: "Session logs for clinicians", done: false },
      { label: "More phobia scenarios", done: false },
    ],
    links: { github: "https://github.com/6350150676", demo: "", playStore: "", appStore: "" },
  },
  {
    id: "vr-paint",
    no: 6,
    question: "Can a menu live inside the world instead of on a screen?",
    title: "VR Paint Studio",
    subtitle: "Immersive 3D Drawing & Painting · XR Interaction Toolkit",
    category: "VR / XR",
    status: "Built",
    color: "#38bdf8",
    tech: ["Unity", "C#", "XR Interaction Toolkit", "OpenXR", "Line Renderer", "VR Controllers"],
    tagline: "Paint in 3D space with your headset — strokes, brushes and shapes, all in VR.",
    cover: img("vrpaint-cover", 900, 560),
    description:
      "A VR drawing & painting app built in Unity with the XR Interaction Toolkit. Draw freely in 3D space with the headset controllers — pick brush strokes, choose colors and stamp different shapes — all through a fully custom in-VR UI I designed and built for the experience.",
    csr: {
      challenge: "Drawing in 3D space needs intuitive controls and a UI that lives inside VR — without dropping headset framerate as the canvas grows.",
      solution: "Built trigger-driven brush strokes as lightweight line/mesh geometry and a fully custom in-VR (diegetic) UI on the XR Interaction Toolkit.",
      result: ["Free 3D drawing — brushes, colors & shapes", "Custom in-VR UI, no flat 2D menus", "Holds headset framerate as the drawing grows"],
    },
    overview:
      "An immersive VR painting app built in Unity using the XR Interaction Toolkit. You draw directly in 3D space with the headset controllers: pull the trigger to lay down a continuous brush stroke, switch between stroke styles and brush sizes, change colors, and place primitive shapes as you build a scene around you. Everything — the brush menu, color picker, shape palette and tool panels — runs as a custom in-VR (diegetic) UI I designed and built with the XR Interaction Toolkit's UI and ray-interaction systems. Strokes are rendered as efficient line/mesh geometry so the canvas stays smooth at headset framerate even as the drawing grows.",
    highlights: [
      "Free 3D drawing with VR controllers",
      "Multiple brush strokes & sizes",
      "Color picker + shape stamping",
      "Custom in-VR (diegetic) UI",
      "Built on XR Interaction Toolkit / OpenXR",
      "Optimized stroke rendering for HMD framerate",
    ],
    images: [
      { src: img("vrpaint-1"), caption: "Drawing a stroke in 3D space." },
      { src: img("vrpaint-2"), caption: "Brush & color menu in VR." },
      { src: img("vrpaint-3"), caption: "Shape palette and tool panel." },
    ],
    process: [
      { title: "XR setup", detail: "Configured the XR Interaction Toolkit / OpenXR rig — controllers, ray and direct interactors, and headset deployment." },
      { title: "Drawing system", detail: "Trigger-driven brush strokes drawn as continuous line/mesh geometry in 3D space, with adjustable stroke style and size." },
      { title: "Tools & shapes", detail: "A color picker, multiple brush types and a palette for stamping primitive shapes into the scene around you." },
      { title: "In-VR UI", detail: "Designed and built a custom diegetic UI — brush/color menus and tool panels driven by the XR Toolkit's UI & ray interactors." },
      { title: "Optimization", detail: "Kept stroke geometry lightweight so the canvas holds headset framerate as the drawing grows." },
    ],
    roadmap: [
      { label: "3D drawing + brushes built", done: true },
      { label: "Custom in-VR UI + shape tools", done: true },
      { label: "Save / load & share drawings", done: false },
      { label: "Hand-tracking input", done: false },
    ],
    links: { github: "https://github.com/6350150676", demo: "", playStore: "", appStore: "" },
  },
  {
    id: "fpv-drone",
    no: 7,
    question: "Can a drone tell you what's wrong with it?",
    title: "FPV Programmable Quadcopter",
    subtitle: "Custom-Built Drone · Final-Year Major Project @ NIT Hamirpur",
    category: "Hardware & Simulation",
    status: "Built",
    color: "#5b8cff",
    tech: ["SpeedyBee F405 V4", "Betaflight", "BLS 55A ESC", "DSHOT", "Blackbox", "Soldering"],
    tagline: "A custom FPV quadcopter — soldered, wired and Betaflight-tuned for immersive VR control.",
    cover: img("fpv-cover", 900, 560),
    description:
      "A custom-built FPV quadcopter for immersive VR control, with flexible dual-battery (3S/6S) operation and tuned flight stability. As my Engineering Physics final-year major project I led the FPV/electronics & flight-systems build and worked on the embedded side — full hardware integration, Betaflight firmware tuning, and blackbox-driven debugging.",
    csr: {
      challenge: "A custom FPV quadcopter has to fly stable across flight modes despite motor desyncs, throttle surges and failsafe events.",
      solution: "Soldered and wired the full flight stack, tuned Betaflight (PID loops, rates, DSHOT) and debugged real flights from blackbox logs.",
      result: ["Stable, responsive custom build", "Dual-battery 3S/6S switching from the TX", "Acro & Angle modes, blackbox-tuned"],
    },
    overview:
      "An FPV programmable quadcopter I built as my final-year major project in Engineering Physics at NIT Hamirpur. I led the electronics and flight-systems development and worked on the embedded side: full hardware integration (soldered and wired a SpeedyBee F405 V4 BLS 55A flight controller, BLS 55A ESCs and an FrSky receiver), Betaflight firmware tuning (PID loops, rate profiles, throttle response, DSHOT and ESC calibration), and dual-battery 3S/6S switching from the transmitter for flexible flight modes. I diagnosed and fixed real flight issues — motor desyncs, throttle surges and failsafe events — using blackbox logging and CLI debugging, and analyzed flights in Blackbox Explorer across Acro and Angle modes. The result is a stable, responsive build; I'm now working on a second-generation drone focused on modularity and autonomy.",
    highlights: [
      "SpeedyBee F405 V4 FC + BLS 55A ESCs",
      "Betaflight: PID loops, rates, throttle",
      "Dual-battery 3S/6S switching via TX",
      "DSHOT ESC protocol + calibration",
      "Blackbox Explorer telemetry analysis",
      "Acro & Angle flight modes",
    ],
    images: [
      { src: img("fpvdrone-1"), caption: "The finished FPV quadcopter build." },
      { src: img("fpvdrone-2"), caption: "Soldered flight controller, ESCs & wiring." },
      { src: img("fpvdrone-3"), caption: "Blackbox log analysis in Betaflight." },
    ],
    process: [
      { title: "Hardware integration", detail: "Soldered and wired the SpeedyBee F405 V4 BLS 55A flight controller, BLS 55A ESCs and FrSky receiver into the airframe." },
      { title: "Firmware tuning", detail: "Configured Betaflight — PID loops, rate profiles, throttle response — with the DSHOT protocol and ESC calibration." },
      { title: "Dual-battery operation", detail: "Enabled 3S/6S battery switching from the transmitter for flexible flight modes." },
      { title: "Debugging", detail: "Diagnosed and resolved motor desyncs, throttle surges and failsafe events using blackbox logging and CLI tools." },
      { title: "Tuning & analysis", detail: "Experimented with Acro and Angle modes and analyzed telemetry in Blackbox Explorer for a stable, responsive tune." },
    ],
    roadmap: [
      { label: "Stable, responsive build flying", done: true },
      { label: "Dual-battery + telemetry analysis", done: true },
      { label: "Gen-2: modularity & autonomy", done: false },
    ],
    links: { github: "", demo: "", playStore: "", appStore: "" },
  },

];

// ── DEEP-DIVE CONTENT (per project) — keyed by project id ────────────────
//  Powers the "metrics", "my role", "architecture" and "technical deep dive"
//  sections on each project page. Everything below was built by Lav.
export const projectExtra: Record<string, {
  role: string
  metrics: { value: string; label: string }[]
  architecture: string[]
  deepDive: { title: string; body: string }[]
}> = {
  "checkers-multiplayer": {
    role: "Solo developer — game engine, real-time netcode, backend integration, auth, monetization, social systems, 3D assets and shipped builds.",
    metrics: [
      { value: "2", label: "Platforms · iOS + Android" },
      { value: "3", label: "Sign-ins · Google, Apple, Guest" },
      { value: "3", label: "Ad networks" },
      { value: "15+", label: "UI screens" },
    ],
    architecture: ["Dual WebSockets", "JWT auth", "Region routing", "Pluggable auth abstraction", "Conditional compilation", "Custom Editor tooling"],
    deepDive: [
      { title: "Dual-socket networking", body: "Lobby, chat and matchmaking run on one persistent WebSocket while every match opens a second dedicated connection for gameplay. Heartbeats keep both alive; on a drop, an exponential-backoff reconnect with a watchdog restores state, and connections persist across app backgrounding — so locking the phone mid-game doesn't forfeit it." },
      { title: "JWT auth + region routing", body: "A custom JWT-authenticated WebSocket client refreshes tokens proactively before they expire, with three JWT-delivery methods for proxy compatibility. Backend routing is region-aware (NA / UK / India), auto-selecting the lowest-latency server from the device timezone." },
      { title: "Rules engine", body: "A full checkers engine supporting multiple variants and 8 configurable rules — flying kings, forced/max capture, orthogonal moves, board sizes 8/10/12 — with complete move validation, captures, promotion, and draw/resign handling. The orbit camera adds a 2D/3D toggle, board-flip animation and auto-fit zoom." },
      { title: "Social systems", body: "A real-time chat & friends layer: direct messages, in-game broadcast/targeted chat, friend requests, an address book with block states, unread badges, and private join-code 'Play with Friends' lobbies." },
      { title: "Monetization", body: "A two-currency wallet with server-driven entry fees and prize payouts feeds matchmaking bet tiers. Three ad networks — Google AdMob, Meta Audience Network and IronSource LevelPlay mediation — serve interstitial + rewarded ads behind conditional-compilation guards." },
      { title: "Tooling & 3D", body: "Custom Unity Editor tools: an emoji→TMP sprite-atlas builder and an automated iOS build post-processor that patches the Xcode project (ATT, Apple Sign-In framework, Google Sign-In URL schemes). Every 3D asset — pieces, boards, crowns, frames — was modeled by me in Blender via Claude MCP." },
    ],
  },
  "zip-puzzle": {
    role: "Solo developer — puzzle engine, real-time hint solver, code-driven UI framework, content pipeline and optional backend.",
    metrics: [
      { value: "80", label: "Curated levels" },
      { value: "8×8+", label: "Max grid" },
      { value: "200+", label: "Tunable values, no recompile" },
      { value: "5", label: "Design patterns" },
    ],
    architecture: ["Service Locator (DI)", "Event Bus", "Factory", "Strategy", "State Machine"],
    deepDive: [
      { title: "Difficulty model & the level pipeline", body: "The 80-level set isn't ordered by feel — it's difficulty-scored and sorted into a smooth easy→hard curve. The interesting design insight is that difficulty tracks how open the solution space is: a sparse, wall-free board allows huge numbers of valid paths and is hardest, while every checkpoint and every wall is a constraint that shrinks the search and makes a level easier. Layouts come in through an AI-assisted transcription step that emits my compact JSON/RLUD format, guarded by a parity (graph-coloring) feasibility check that rejects impossible boards, and the DFS solver validates every level so nothing unsolvable can ship — with a guaranteed-solvable 'snake' generator filling any gap. What's mine is the whole pipeline and curve: the authoring format, the validity checks, the solver, and the difficulty ordering." },
      { title: "The hint solver", body: "Generating a hint means solving the puzzle from the player's current position. A naive DFS freezes the game on big grids, so I added connectivity pruning (never explore states that orphan cells) and a node budget to keep the main thread responsive — and short-circuit straight to the authored solution when the player is still on the optimal route." },
      { title: "Decoupled architecture", body: "Systems never call each other directly — they communicate through a central Event Bus and resolve dependencies via a Service Locator. Audio, UI and gameplay stay independent, which made adding the optional backend level-provider trivial (Strategy pattern)." },
      { title: "Config in one place", body: "200+ tunable values — colors, sprites, audio, layout, even API config — live in a single ScriptableObject, so the whole look and feel can change without recompiling." },
      { title: "The backtrack UX detail", body: "Mid-drag I only allow a single-step rewind so you can't accidentally wipe your path; on a fresh finger-down you can jump back to any visited cell. A small detail that makes a big difference to feel." },
      { title: "Optional API provider", body: "An optional provider loads levels over HTTP with HMAC-SHA256 signed requests, caching and timeout handling — with a local provider as a seamless fallback." },
    ],
  },
  "ball-merge": {
    role: "Solo developer at RENXO Technologies — game design and tuning, physics and gameplay, power-ups, monetization, online features and both store releases.",
    metrics: [
      { value: "2", label: "Stores · Play + App" },
      { value: "12", label: "Ball tiers" },
      { value: "4", label: "Power-ups" },
      { value: "3", label: "Themes" },
    ],
    architecture: ["Pooled balls (no GC hitches)", "Server-driven config", "Signed ranked runs", "Offline-first saves & score queue", "Generated scene & data assets", "Automated play-through harness"],
    deepDive: [
      { title: "The mid-run ad break", body: "The main ad placement counts active play only — menus, pause and open sheets don't count — and once a break is due it waits for a calm moment: no ball in the air, no sheet open, no finger down, and never in the first 10 seconds. The card offers a choice: let the AD button fill and play a rewarded interstitial for a shorter gap, or watch one rewarded video for a much longer ad-free stretch. The run slows to a stop under the card and is frozen, not paused, so nothing is lost." },
      { title: "Power-ups priced by power", body: "Scarcity follows how strong a use is. Upgrade can start a chain, so it holds one charge, refills slowest and costs two rewarded ads; Shake is a gamble that can make things worse, so it's the most generous. Refill progress is kept as a fraction, time away counts for much less and is capped, and a clock moved backwards earns nothing." },
      { title: "Fair by construction", body: "A 1.75-second grace before a loss, a half-second arm delay so a falling ball never ends the run, a lid over the jar during a shake, and extra settling grace after a shake, a resume or a second-chance rescue — the game's own actions can never lose the player a run." },
      { title: "Save & resume", body: "Every ball's position, rotation, velocity and spin, plus the score, held ball and queue, are saved every five seconds when something changes and immediately on pause or backgrounding. The main menu isn't quitting — it offers RESUME." },
      { title: "Consent order", body: "Google's UMP consent form always comes first and Apple's tracking prompt second, raised at launch without waiting on the network. Ads and analytics wait for both answers — an order two App Store rejections taught." },
      { title: "Analytics & crash breadcrumbs", body: "Firebase Analytics (GA4) records run_start, run_end, tier_unlocked, top_tier_cleared, jar_overflowed, power_used and theme_changed — enough to watch D1/D7 retention, run length and how players use power-ups and ad breaks. Every event is also dropped as a Crashlytics breadcrumb before the consent gate (breadcrumbs only leave the phone inside a crash report), and Crashlytics keys hold the phase, score, drops, merges, highest tier, theme and live ball count at the moment of any crash. Collection starts only after consent, and ATT on iOS." },
      { title: "Leaderboard & anti-cheat", body: "Runs started online get a signed token and record drops, merges, highest tier and power uses; the server checks the score is plausible before ranking it. Scores are saved locally before any ad can open and queue for retry when offline." },
    ],
  },
  "save-the-cat": {
    role: "Solo developer & publisher — game design, ink physics and the deterministic simulation, the level pipeline and validator, the daily challenge, ad monetization, and the Google Play release under my own studio label, Parlok Studio.",
    metrics: [
      { value: "100+", label: "PlayMode tests" },
      { value: "1", label: "Stroke per level" },
      { value: "93%", label: "Generated levels playable first deal" },
    ],
    architecture: ["Code-built game (no prefabs)", "Deterministic SimWorld", "Off-screen validator", "Level generator + anti-repetition", "Supabase over UnityWebRequest", "Python level tooling"],
    deepDive: [
      { title: "Measuring it: analytics & crash breadcrumbs (next update)", body: "Built for the next update. Firebase Analytics logs the whole funnel — tutorial_begin/complete, level_start, level_end (stars, ink used, seconds, attempt), level_quit, hint_offered/unlocked, earn/spend_virtual_currency, skin_unlocked, crate_opened and ad events — so D1/D7 retention and where players drop off can be measured instead of guessed. Crashlytics gets breadcrumbs (level staged with its full spec — seed, archetype, variant — stroke released, ad opened, app backgrounded) plus keys for the current level, mode and attempt, because in a seeded physics game the level line is what actually reproduces a crash." },
      { title: "The drawing is an object, not a mark", body: "The finished stroke is a fully dynamic 2D rigid body — free to move and rotate, with mass derived from the ribbon area actually drawn. It's never pinned where the finger left it: during the drag you see a preview with no collider, and the physical body is created on release. So the line is a weight as much as a barrier — a bare vertical wall topples, a line drawn in mid-air falls — and where it comes to rest is half of most puzzles." },
      { title: "Prediction, never reflex", body: "While the player draws, the whole world is frozen — no hazard moves, the cat doesn't fall, the clock doesn't run — and it starts the moment the finger lifts. That one rule means difficulty can only ever be understanding, never speed or precision, and every loss is legible: 'my wall fell over', 'my roof had a gap'." },
      { title: "One simulation, two worlds", body: "Hazards tick through a hand-stepped SimWorld rather than Update/FixedUpdate, because the validator has to step physics hundreds of times inside a single rendered frame, where Unity would only call FixedUpdate once. The visible level and the off-screen validation world run the same code path, and the validator builds its candidate strokes through the same function the player's finger does — so a shape it proves stands up is a shape a player can actually draw." },
      { title: "Proving a generated level is a puzzle", body: "Every generated level has to pass two questions in the off-screen world: does doing nothing already win? (then it's trivial — reject it) and does at least one human-shaped stroke win? (cheapest first). The ink budget and star thresholds are then derived from the cheapest winning stroke, so three stars is provably reachable. A cheap structural check rejects repeats before any physics runs, and the accepted re-roll is saved so a level number always means the same level. In a 300-level sweep, 93% of levels were playable exactly as first dealt; the rest are re-rolled." },
      { title: "A validator must model the real world", body: "The campaign's Python audit checked levels against a simplified model with no projectiles and no bees — and a model that simple can pass answers the real engine rejects. The in-engine SolutionAudit, which replays stored strokes through the actual SimWorld, is what caught the gap. The lesson: a validator is only as trustworthy as its resemblance to the game it's judging." },
      { title: "Daily challenge & leaderboard", body: "Everyone in the world gets the same puzzle, seeded from the UTC date, and one attempt — spent the instant the stroke is released and flushed to disk, so force-quitting doesn't give it back. Ranking is by ink spent. The Supabase backend is reached with nothing but UnityWebRequest and JsonUtility — no SDK, no extra bytes in the build — and every path fails silently to a local board. Submissions carry the winning stroke itself: because the simulation is deterministic, a stroke is a checkable claim where a score is only a promise." },
    ],
  },
  "tango-puzzle": {
    role: "Production title developed at RENXO Technologies. My contribution: game design & gameplay programming, ad monetization, and the store deployment — I designed the ruleset and difficulty progression, built the client-side gameplay logic, wired up the ads, and deployed the game to both stores myself; the backend team's service generates the puzzles and serves them over a REST API. Live on Google Play & the App Store.",
    metrics: [
      { value: "15K+", label: "Live players" },
      { value: "2", label: "Stores · Play + App" },
      { value: "3", label: "Board sizes" },
      { value: "5", label: "Difficulty tiers" },
    ],
    architecture: ["Client gameplay logic", "REST API level provider", "Real-time constraint validation", "Ad monetization", "Backend puzzle generation"],
    deepDive: [
      { title: "Designing the puzzle", body: "Tango is a logic puzzle in the spirit of LinkedIn's Tango: fill the grid so each row and column stays balanced and no run of the same symbol breaks the adjacency rules. I designed a deeper ruleset than the original and shaped the difficulty curve across five tiers so a 4×4 Beginner board feels welcoming while an 8×8 Expert board is genuinely hard." },
      { title: "Sizes & difficulty", body: "At the start of a game the player chooses a board size — 4×4, 6×6 or 8×8 — and then a difficulty from Beginner to Expert. That's three sizes across five tiers, roughly 15 distinct ways to play, so the game scales from a quick casual round to a real brain-teaser." },
      { title: "Gameplay logic", body: "My focus on the client was the play loop: laying out the grid, placing and toggling symbols, and validating the row/column and adjacency constraints in real time so the player gets instant feedback on every move and knows immediately when the board is solved." },
      { title: "Backend puzzle generation", body: "The puzzle-creation logic lives on the backend rather than the device. A server generates solvable boards for each size and difficulty and the game pulls them in over a REST API — keeping the client light and letting level generation evolve server-side without shipping a new app build." },
      { title: "Monetization & deployment", body: "Beyond the gameplay I integrated the ad monetization and owned the release: I took the game all the way through build, submission and store deployment myself, and it's now live on both the Google Play Store (com.gatch.tango) and the Apple App Store on Android and iOS." },
    ],
  },
  "vr-paint": {
    role: "Built the full VR drawing app end-to-end — the XR rig, the 3D brush/stroke system, the shape tools and the custom in-VR UI — in Unity with the XR Interaction Toolkit.",
    metrics: [
      { value: "XRIT", label: "XR Interaction Toolkit" },
      { value: "OpenXR", label: "Runtime" },
      { value: "3D", label: "Spatial drawing" },
      { value: "In-VR", label: "Custom UI" },
    ],
    architecture: ["XR Interaction Toolkit", "OpenXR", "Ray & direct interactors", "Line/mesh stroke rendering", "Diegetic UI"],
    deepDive: [
      { title: "Drawing in 3D space", body: "Pulling the controller trigger lays down a continuous brush stroke that follows the controller tip through space. Each stroke is built as line/mesh geometry on the fly, so you can walk around your drawing and view it from any angle — it's a real 3D object, not a flat canvas." },
      { title: "Brushes, colors & shapes", body: "A tool layer lets you switch stroke styles and sizes, pick colors, and stamp primitive shapes into the scene — turning a simple doodle tool into a small spatial-creation kit you build around yourself." },
      { title: "Custom in-VR UI", body: "All the menus live in the world with you: brush/color selectors and tool panels built with the XR Interaction Toolkit's UI and ray interactors, so you point and click in VR instead of reaching for a 2D screen. Designing UI that feels good at arm's length in a headset is its own challenge — placement, scale and feedback all matter." },
      { title: "Built on XR Interaction Toolkit", body: "The whole experience runs on Unity's XR Interaction Toolkit over OpenXR — controllers, direct and ray interactors, and HMD deployment — the same toolkit and interaction patterns behind production VR apps." },
      { title: "Performance", body: "Stroke geometry is kept lightweight so the drawing stays smooth at headset framerate even as it fills up. VR is unforgiving about frame drops, so the rendering path has to stay cheap as the canvas grows." },
    ],
  },
  "vr-acrophobia": {
    role: "Built the VR simulation, the ESP32/BLE biometric pipeline, and the comfort-paced exposure loop.",
    metrics: [
      { value: "ESP32", label: "Microcontroller" },
      { value: "BLE", label: "Wireless link" },
      { value: "Real-time", label: "Heart rate" },
    ],
    architecture: ["ESP32 firmware", "BLE streaming", "Comfort-paced loop", "Unity · Oculus"],
    deepDive: [
      { title: "Wireless biometric link", body: "A pulse sensor on an ESP32 reads the patient's heart rate and streams it into Unity wirelessly over BLE in real time — no tethered cables, so the patient can move freely in the headset." },
      { title: "Comfort-paced exposure", body: "Virtual height only rises while the patient stays calm; a climbing heart rate slows or holds the ascent, turning a fixed scene into a personalized, self-regulating therapy session." },
    ],
  },
  "car-racing": {
    role: "Gameplay Programmer · Game Architect · Optimization Programmer · Level & UI/UX Designer. Every C# system, the architecture and the optimization are mine; the 3D art is licensed asset packs I integrated.",
    metrics: [
      { value: "6", label: "Design patterns" },
      { value: "3", label: "Swappable drivers" },
      { value: "Compute", label: "GPU grass" },
      { value: "Streamed", label: "Terrain" },
    ],
    architecture: ["State", "Strategy", "Factory", "Observer", "Singleton", "Dependency Injection"],
    deepDive: [
      { title: "Decoupled with an EventBus", body: "An EventBus is a publish/subscribe hub: instead of systems holding references to each other, the race publishes events and the HUD, countdown, results screen and car each subscribe. Adding or changing one system doesn't ripple through the rest — the codebase stays loosely coupled and testable." },
      { title: "Car physics via WheelColliders", body: "The car drives on Unity's WheelColliders rather than faked transform movement — steering applied to the front wheels, power to the rear, braking on all four. That gives real weight transfer, grip and suspension instead of a car that slides like a sticker." },
      { title: "Swappable input (Strategy pattern)", body: "Keyboard, mobile touch and AI are interchangeable 'drivers' behind a single input interface. The car asks the interface for steering/throttle and never knows or cares which one is plugged in — so the same vehicle works in the playable build, on a phone, and for AI opponents." },
      { title: "Terrain streaming", body: "Open worlds are too big to keep fully in memory on mobile, so only the patch of terrain around the player is loaded and distant patches are unloaded as you drive. It's the classic streaming trade-off — a little load logic for a large, steady memory & performance win." },
      { title: "GPU grass with compute shaders", body: "The most advanced piece: instead of instantiating thousands of grass objects on the CPU, the grass is generated, placed and culled on the GPU with compute shaders. The work happens where it's cheap (the GPU), keeping dense foliage within the frame budget — this is going below normal gameplay scripting into real GPU programming." },
      { title: "Speed-reactive chase camera", body: "The chase camera widens its field-of-view and ramps motion blur as speed increases, a cheap perceptual trick that makes 'fast' actually feel fast without changing the car's real velocity." },
      { title: "Interactive garage (UI/UX)", body: "A garage screen with swipe navigation, drag-to-spin the car with realistic inertia (it keeps spinning and eases to a stop), a 'hoist' car-swap animation, and live paint-color changes — all driven by my UI code." },
      { title: "What's mine vs integrated art (honesty)", body: "All the C# code, the architecture, the optimization and the UI are written by me, and I assembled the scenes with ProBuilder geometry and splat-mapped terrain (splat maps blend grass/dirt/rock textures across the ground). The 3D art itself — cars, trees, water, roads, skyboxes — is from licensed asset packs that I imported and integrated, not modeled by me." },
    ],
  },
  "fpv-drone": {
    role: "Led the FPV / electronics & flight-systems build and worked on the embedded side — hardware integration, Betaflight tuning and blackbox debugging. Final-year major project, Engineering Physics, NIT Hamirpur.",
    metrics: [
      { value: "F405", label: "SpeedyBee FC" },
      { value: "55A", label: "BLS ESCs" },
      { value: "3S/6S", label: "Dual battery" },
      { value: "DSHOT", label: "ESC protocol" },
    ],
    architecture: ["Betaflight", "DSHOT", "PID tuning", "ESC calibration", "Blackbox Explorer", "CLI debugging"],
    deepDive: [
      { title: "Hardware integration", body: "I soldered and wired the full stack: a SpeedyBee F405 V4 flight controller (the drone's 'brain' running the flight firmware), BLS 55A ESCs (electronic speed controllers that drive each motor), and an FrSky receiver for the radio link. Clean wiring and solder joints matter here — a bad joint shows up later as a mid-air glitch." },
      { title: "Betaflight & PID tuning", body: "Betaflight runs a PID control loop that constantly corrects the drone's attitude — Proportional reacts to current error, Integral to accumulated error, Derivative dampens oscillation. I tuned the PIDs along with rate profiles and throttle response so the craft stays locked-in but responsive." },
      { title: "DSHOT & ESC calibration", body: "DSHOT is a digital flight-controller↔ESC protocol — more precise and reliable than older analog PWM, with no calibration drift. I set it up and calibrated the ESCs so all four motors respond identically." },
      { title: "Dual-battery 3S/6S switching", body: "I wired transmitter-controlled switching between 3S and 6S batteries (≈11.1V vs 22.2V) — lower voltage for gentle, longer flights and higher voltage for punchy, aggressive ones — picking the flight mode in the field without rewiring." },
      { title: "Blackbox debugging", body: "Betaflight's blackbox logs every control loop to flash. When I hit motor desyncs, throttle surges and failsafe events, I replayed the logs in Blackbox Explorer and used the CLI to pinpoint and fix the root cause instead of guessing." },
      { title: "Flight modes", body: "Tuned and tested both Acro (full manual rate control — the drone holds whatever angle you give it) and Angle (self-levelling) modes for different flying scenarios, from steady FPV cruising to aggressive maneuvers." },
    ],
  },
}

// ── SKILLS (reconciled across résumé versions) ───────────────────────────
export const skills = {
  "Game Design": {
    blurb: "Rulesets, difficulty curves & level design that ship.",
    items: ["Ruleset & Systems Design", "Difficulty Curves & Progression", "Level Design", "Game Feel & Juice", "Economy Design (currencies · bet tiers)", "Player Onboarding & Tutorials"],
    color: "#f59e0b",
  },
  "Gameplay": {
    blurb: "Gameplay systems & clean, scalable architecture.",
    items: ["Unity Engine", "C# / OOP", "Gameplay Systems", "State Machines", "Clean Architecture", "Event Bus & DI", "Code-Driven UI", "Input System"],
    color: "#7c6cff",
  },
  "Networking": {
    blurb: "Real-time multiplayer & backend integration.",
    items: ["WebSockets", "Photon PUN", "Authoritative Sync", "Auto-Reconnect Netcode", "JWT Auth & OAuth", "Backend / REST APIs", "In-Game Chat & Voice"],
    color: "#38bdf8",
  },
  "Optimization": {
    blurb: "60 fps on low-end Android & iOS.",
    items: ["Memory & CPU Profiling", "Compute Shaders (GPU)", "LOD & Batching", "Terrain Streaming", "Object Pooling", "DFS / Pathfinding"],
    color: "#5b8cff",
  },
  "XR": {
    blurb: "Immersive headset & sensor-driven experiences.",
    items: ["XR Interaction Toolkit", "OpenXR", "Diegetic VR UI", "HMD Deployment"],
    color: "#a78bfa",
  },
  "AI": {
    blurb: "Game AI & AI-assisted workflows.",
    items: ["AI Opponents & Drivers", "Pathfinding & Search", "Hint Solvers (Pruned DFS)", "Claude MCP Tooling"],
    color: "#7c6cff",
  },
  "Tools": {
    blurb: "Content pipeline, SDKs & shipping.",
    items: ["Blender (Claude MCP)", "ProBuilder", "Custom Editor Tooling", "Firebase", "Ad SDKs (AdMob · ironSource)", "Git & GitHub", "Android & iOS"],
    color: "#38bdf8",
  },
};

export const proficiencies = [
  { name: "Unity Engine", pct: 92, color: "#7c6cff" },
  { name: "C# · OOP", pct: 90, color: "#7c6cff" },
  { name: "Mobile Game Development", pct: 90, color: "#5b8cff" },
  { name: "Firebase & SDK Integration", pct: 85, color: "#a78bfa" },
  { name: "Ad Monetization (Unity Ads · ironSource)", pct: 80, color: "#a78bfa" },
  { name: "Performance & Memory Optimization", pct: 86, color: "#5b8cff" },
  { name: "Clean Architecture & Modular Design", pct: 84, color: "#38bdf8" },
  { name: "UI / Animation Systems", pct: 82, color: "#7c6cff" },
];

export const education = [
  {
    degree: "B.Tech – Engineering Physics",
    school: "NIT Hamirpur",
    period: "2021 – 2025",
    note: "National Institute of Technology",
  },
];

// ── CERTIFICATIONS & ACHIEVEMENTS ────────────────────────────────────────
//  Drop real badge images in /public/badges and set `badge` to e.g.
//  "/badges/unity-junior.png" — the card renders the image if present,
//  otherwise a clean generated emblem.
export const achievements = [
  {
    id: "unity-jr",
    title: "Unity Junior Programmer",
    issuer: "Unity Technologies",
    kind: "Certification Pathway",
    color: "#7c6cff",
    emblem: "U",
    badge: "/badges/unity-junior.png",
    credentialId: "1aa7cb11f74fa122a4ffa55d3fa55878",
    link: "https://linkedin.com/in/lavnaruka",
    blurb:
      "Completed the Unity Junior Programmer Pathway — foundational Unity & C# game development for real-world game projects.",
    points: [
      "Building games in Unity using C#",
      "Interactive 2D & 3D gameplay features",
      "Game logic, animation & physics",
      "Debugging, prototyping & real-time problem-solving",
    ],
  },
  {
    id: "unity-vr",
    title: "Unity VR Development",
    issuer: "Unity Technologies",
    kind: "Certification Pathway",
    color: "#38bdf8",
    emblem: "VR",
    badge: "/badges/unity-vr.png",
    credentialId: "5f711619-c64b-4034-a0b4-19d302e14b98",
    link: "https://www.credly.com/earner/earned/badge/5f711619-c64b-4034-a0b4-19d302e14b98",
    blurb:
      "Completed the Unity VR Development Pathway — validates the skills to be a proficient junior developer building VR experiences with Unity's XR Interaction Toolkit.",
    points: [
      "Deploy VR projects to Unity-supported head-mounted displays (HMDs)",
      "Build common VR interactions with the XR Interaction Toolkit",
      "Program custom VR interactions to meet a project brief",
      "Optimize performance to meet headset framerate requirements",
    ],
  },
  {
    id: "python-gfg",
    title: "Python — Beginner to Advanced",
    issuer: "GeeksforGeeks",
    kind: "6-Week Intensive",
    color: "#38bdf8",
    emblem: "Py",
    badge: "/badges/python-gfg.png",
    credentialId: "ECfsOmNg",
    link: "https://linkedin.com/in/lavnaruka",
    blurb:
      "Completed an intensive Python Full Course (beginner → advanced), building a strong OOP and problem-solving foundation.",
    points: [
      "Python fundamentals & syntax",
      "Object-Oriented Programming (OOP)",
      "File handling, exceptions & debugging",
      "Problem-solving with Python",
    ],
  },
  {
    id: "gate-2025",
    title: "GATE 2025 Qualified",
    issuer: "Computer Science (CS)",
    kind: "National-Level Exam",
    color: "#a78bfa",
    emblem: "GATE",
    badge: "",
    credentialId: "",
    link: "",
    blurb:
      "Qualified GATE 2025 in Computer Science — a competitive national-level examination in India.",
    points: [],
  },
];

// kept for the small chips elsewhere
export const certifications = achievements.map((a) => ({ name: a.title, issuer: a.issuer }));

export const stats = [
  { label: "Live players", value: "15K+" },
  { label: "Multiplayer titles", value: "4" },
  { label: "FPS · low-end", value: "60" },
  { label: "Yr · Unity", value: "1+" },
];

// ── THE BENCH — small experiments that run right on the page ─────────────
//  Each one is pulled out of a real project (`from` = project id) and is
//  numbered in the same series as the projects above.
export const benchExperiments = [
  {
    no: 8,
    id: "no-instructions",
    question: "Can you play this without instructions?",
    from: "zip-puzzle",
  },
  {
    no: 9,
    id: "walls",
    question: "Does every wall make a puzzle harder?",
    from: "zip-puzzle",
  },
  {
    no: 10,
    id: "speed",
    question: "Can “fast” be felt without going any faster?",
    from: "car-racing",
  },
  {
    no: 11,
    id: "heartbeat",
    question: "Can a heartbeat set the pace of a climb?",
    from: "vr-acrophobia",
  },
  {
    no: 12,
    id: "reconnect",
    question: "Can a live match survive the player locking their phone?",
    from: "checkers-multiplayer",
  },
  {
    no: 13,
    id: "resume-run",
    question: "Can a résumé be played instead of read?",
    from: "",
  },
];

// ── BIT — the lab assistant (bottom-right companion) ─────────────────────
export const guideLines: Record<string, string> = {
  home:
    "Hi — I'm BIT, the lab assistant. Everything here is an *experiment*. Start with the puzzle: no instructions, on purpose.",
  projects:
    "The *experiment files*. Every card is a real project — open one for the full lab report: question, method, measurements.",
  bench:
    "The *bench*. Small experiments pulled out of real projects. Poke them — nothing here can break. (I checked.)",
  experience:
    "The *lab log*: shipping real-time multiplayer games at RENXO, plus a Unity internship at Caarya.",
  about:
    "The *inventor*. Engineering Physics at NIT Hamirpur, now designing and building games in Unity.",
  skills:
    "The *apparatus* — what the experiments are built with. Unity, C#, netcode, SDKs, XR… and a soldering iron.",
  achievements:
    "*Credentials*, pinned to the wall. Each one links to where it can be verified.",
  contact:
    "Got a question worth testing? File a request — Lav is *open to work* right now.",
  project:
    "A full *lab report*: the question up top, measurements on the side, and a trial you can run yourself if there is one.",
};
