// ─────────────────────────────────────────────────────────────────────────
//  PORTFOLIO CONTENT — single source of truth.
//  Everything here is pulled straight from Lav Naruka's real résumé.
//
//  👉  REPLACING THE DUMMY MEDIA LATER:
//      Each project has `cover`, `images[]` and `video`. They currently point
//      at placeholder images (picsum.photos) and a placeholder YouTube video.
//      Swap them for your real screenshots / gameplay video:
//        - put real files in /public/projects and use "/projects/your.png"
//        - paste your real YouTube URL into `video`
//        - set real `links` (github / playStore / demo)
// ─────────────────────────────────────────────────────────────────────────

export const personalInfo = {
  name: "Lav Naruka",
  title: "Unity Game Developer",
  roles: ["Mobile Game Developer", "Gameplay Systems Engineer", "SDK & Monetization Dev", "Performance Optimizer"],
  tagline:
    "I build production-grade mobile games in Unity — scalable gameplay systems, SDK & ad-monetization integrations, and performance-tuned experiences that ship to the Play Store and App Store.",
  email: "lovenaruka514@gmail.com",
  phone: "+91-6350150676",
  linkedin: "https://linkedin.com/in/lavnaruka",
  linkedinHandle: "linkedin.com/in/lavnaruka",
  github: "https://github.com/6350150676",
  githubHandle: "github.com/6350150676",
  location: "India",
  bio:
    "I'm a Unity developer focused on real-time multiplayer mobile games. Over the past year at RENXO I've built WebSocket-based titles — Checkers, Ludo, Zip & Tango — one live with 2,000+ players — with in-game chat, Google/Apple OAuth, and ad monetization (AdMob · Unity Ads · ironSource), all tuned for a stable 60 fps on low-end Android & iOS.",
  bio2:
    "I care about clean, modular architecture and the parts that actually make a game shippable: reusable gameplay systems, object pooling, SDK & backend integration, and reliable real-time networking. My Engineering Physics background from NIT Hamirpur gives me a strong foundation in math, simulation, and systems thinking that I bring to gameplay and tooling.",
};

// "What I work on" — capability highlights for the About section
export const capabilities = [
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
    period: "Jul 2024 – Present",
    type: "Full-Time",
    color: "#7c6cff",
    stack: ["Unity", "C#", "WebSockets", "Firebase", "OAuth", "AdMob", "Unity Ads", "ironSource"],
    bullets: [
      "Built real-time multiplayer games as a Unity developer — Checkers, Ludo, Zip & Tango — one live with 2,000+ real players, the rest in final testing.",
      "Architected WebSocket-based multiplayer with backend integration, an in-game chat system, and a custom in-Unity emoji system.",
      "Implemented Firebase with Google & Apple OAuth sign-in, plus full ad monetization via Google AdMob, Unity Ads & ironSource mediation.",
      "Engineered reusable, modular gameplay & UI systems and profiled/optimized for a stable 60 fps on low-end Android & iOS.",
    ],
  },
  {
    role: "Unity Developer Intern",
    company: "Caarya",
    period: "Feb 2025 – Jul 2025",
    type: "Internship",
    color: "#5b8cff",
    stack: ["Unity", "C#", "Photon", "Ready Player Me", "Mixamo", "Cinemachine"],
    bullets: [
      "Built a real-time voice-chat system with Photon and scaled live gameplay to 10 concurrent players.",
      "Integrated Ready Player Me avatars with Mixamo animations and Cinemachine camera work.",
      "Maintained clean asset pipelines, collaborating across disciplines throughout the project lifecycle.",
    ],
  },
];

// ── PROJECT CATEGORIES (the page splits work into these groups) ───────────
export const projectCategories = [
  { key: "VR / XR", blurb: "Immersive headset & sensor-driven experiences." },
  { key: "Games", blurb: "Production mobile games & gameplay systems." },
  { key: "Hardware & Simulation", blurb: "Unity talking to real-world hardware." },
];

// No real gameplay clips yet — project pages show a "coming soon" placeholder.
// When you have a clip, set a project's `video` to its YouTube URL.
const DUMMY_VIDEO = "";
const img = (seed: string, w = 1280, h = 720) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const projects = [
  {
    id: "vr-acrophobia",
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
    video: DUMMY_VIDEO,
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
    links: { github: "https://github.com/6350150676", demo: "", playStore: "" },
  },
  {
    id: "zip-puzzle",
    title: "Zip Puzzle",
    subtitle: "Grid Path-Drawing Puzzle (inspired by LinkedIn Zip)",
    category: "Games",
    status: "Complete",
    color: "#7c6cff",
    tech: ["Unity 6", "C#", "URP", "Input System", "Mobile", "ScriptableObjects"],
    tagline: "Draw one path through every cell — with a real-time hint solver.",
    cover: img("zip-cover", 900, 560),
    description:
      "A complete, polished mobile puzzle game in Unity 6 (~11.5K LOC, 45 scripts). Players draw a single continuous path that connects numbered checkpoints in order and fills every cell exactly once — a Hamiltonian-path puzzle with walls blocking moves. 80 hand-authored levels, a real-time hint solver, and an entirely code-driven UI.",
    overview:
      "Zip Puzzle is a grid path-drawing game where you draw one continuous line that visits numbered checkpoints in order and fills every cell exactly once (a Hamiltonian path), with walls blocking certain moves. I built it end-to-end in Unity 6 / C# — gameplay, UI, audio, save system and tutorial — with a real-time hint solver and a clean, decoupled architecture. The standout piece is the solver: generating a hint means solving the puzzle from the player's current position, so a naive DFS would freeze on big grids; I added connectivity pruning (skip states that orphan cells) and a node budget to keep the main thread responsive.",
    highlights: [
      "80 hand-authored levels",
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
    video: DUMMY_VIDEO,
    process: [
      { title: "Core puzzle engine", detail: "Hamiltonian-path validation — adjacency checks, wall-blocking, checkpoint ordering, and a drag-to-backtrack mechanic returning rich move results (Success / Backtrack / Win / DeadEnd / Invalid)." },
      { title: "Hint solver", detail: "Depth-first search with connectivity pruning and a node budget so hints stay responsive on larger grids; short-circuits to the authored solution when the player is still on the optimal route." },
      { title: "Decoupled architecture", detail: "Service Locator (DI), Event Bus (pub/sub), Factory, Strategy and State Machine so gameplay, UI and audio never call each other directly." },
      { title: "Code-driven UI + config", detail: "Every panel built in code via a UIFactory with tween transitions; 200+ design values centralized in one ScriptableObject for no-code tuning." },
      { title: "Content + optional API", detail: "80 levels authored via an 'RLUD' move-string DSL; an optional provider loads levels over HTTP with HMAC-SHA256 signed requests, caching & timeout, with a local fallback (Strategy)." },
    ],
    roadmap: [
      { label: "80 levels + solver + UI complete", done: true },
      { label: "Responsive 3×3 → 8×8+ boards", done: true },
      { label: "WebGL / APK build to share", done: false },
      { label: "Deploy the optional level API", done: false },
    ],
    links: { github: "https://github.com/6350150676", demo: "", playStore: "" },
  },
  {
    id: "checkers-multiplayer",
    title: "Online Multiplayer Checkers",
    subtitle: "Real-Time Multiplayer Board Game · Android + iOS",
    category: "Games",
    status: "Shipped",
    color: "#38bdf8",
    tech: ["Unity", "C#", "WebSockets", "JWT Auth", "Firebase", "AdMob/Meta/LevelPlay", "Blender"],
    tagline: "Real-time online checkers — 23K+ lines: dual-socket netcode, matchmaking, betting & ads.",
    cover: img("checkers-cover", 900, 560),
    description:
      "A production-grade real-time multiplayer checkers game in Unity / C# (~23K lines, 57 scripts): online matchmaking, two-currency betting, chat + friends, three sign-in methods, ad monetization, and shipped Android + iOS builds. Custom 3D pieces & boards modeled in Blender.",
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
    video: DUMMY_VIDEO,
    process: [
      { title: "Game engine", detail: "Full checkers rules with multiple variants and 8 configurable rules (flying kings, forced/max capture, orthogonal moves, 8/10/12 boards) — move validation, captures, promotion, draw/resign — plus an orbit camera with 2D/3D toggle and auto-fit zoom." },
      { title: "Networking", detail: "Dual-WebSocket layer (lobby + per-match) with heartbeats, exponential-backoff reconnect, a watchdog, and persistence across app backgrounding." },
      { title: "Auth & routing", detail: "Custom JWT-authenticated WebSocket client with proactive token refresh; Google (Firebase), Apple Sign-In (native iOS) and Guest behind a pluggable abstraction; region-aware routing (NA/UK/India)." },
      { title: "Social", detail: "Real-time chat & friends (1K+ lines): DMs, in-game broadcast/targeted chat, friend requests, block states, unread badges, and private join-code 'Play with Friends' lobbies." },
      { title: "Monetization", detail: "Two-currency wallet & server-driven bet tiers with prize payouts; AdMob + Meta Audience Network + IronSource LevelPlay mediation (interstitial + rewarded)." },
      { title: "UI, tooling & 3D", detail: "~15 screens via a code-driven UI framework; custom Editor tools (emoji→TMP sprite-atlas builder, automated iOS build post-processor); all 3D pieces/boards/crowns modeled in Blender via Claude MCP." },
    ],
    roadmap: [
      { label: "Engine + dual-socket netcode", done: true },
      { label: "Android APK + iOS builds shipped", done: true },
      { label: "Ranked / tournaments", done: false },
      { label: "Live-ops & analytics dashboard", done: false },
    ],
    links: { github: "https://github.com/6350150676", demo: "", playStore: "" },
  },
  {
    id: "car-racing",
    title: "Multi-Environment Car Racing",
    subtitle: "Architecture & Optimization-Focused Racer",
    category: "Games",
    status: "In Development",
    color: "#7c6cff",
    tech: ["Unity", "C#", "WheelColliders", "Compute Shaders", "ProBuilder", "Mobile"],
    tagline: "WheelCollider physics, terrain streaming & GPU-grass compute shaders.",
    cover: img("racing-cover", 900, 560),
    description:
      "A mobile racer built as a systems & architecture showcase: a state-driven race flow, an EventBus-decoupled HUD, WheelCollider car physics with swappable keyboard/mobile/AI input, a speed-reactive chase camera, plus terrain streaming and GPU grass via compute shaders. (The 3D art is from licensed asset packs — I built all the C#, integrated the assets, and assembled the scenes with ProBuilder + splat-mapped terrain.)",
    overview:
      "A mobile racing game I built primarily as a programming and architecture showcase. Game phases run through a State system (Menu → Racing → Paused → GameOver), and systems stay decoupled through an EventBus — the race fires events while the HUD, countdown, results screen and car all simply listen. The car drives on Unity WheelColliders (steer front, power rear, brake all four), input is an abstraction so keyboard, mobile and AI drivers are interchangeable, and the chase camera widens its FOV and adds motion blur as speed climbs. On the optimization side, terrain streaming loads only the world patch around the player, and grass is drawn with GPU compute shaders. To be clear: the 3D art — cars, trees, water, roads, skyboxes — is from licensed asset packs; what's mine is the ~35 C# systems, the architecture, the optimization, the interactive garage, and the scene assembly (ProBuilder geometry + splat-mapped terrain).",
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
    video: DUMMY_VIDEO,
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
    links: { github: "https://github.com/6350150676", demo: "", playStore: "" },
  },
  {
    id: "fpv-drone",
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
    video: DUMMY_VIDEO,
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
    links: { github: "", demo: "", playStore: "" },
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
      { value: "23K+", label: "Lines of C#" },
      { value: "57", label: "Scripts" },
      { value: "2", label: "Platforms · iOS + Android" },
      { value: "15+", label: "UI screens" },
    ],
    architecture: ["Dual WebSockets", "JWT auth", "Region routing", "Pluggable auth abstraction", "Conditional compilation", "Custom Editor tooling"],
    deepDive: [
      { title: "Dual-socket networking", body: "Lobby, chat and matchmaking run on one persistent WebSocket while every match opens a second dedicated connection for gameplay. Heartbeats keep both alive; on a drop, an exponential-backoff reconnect with a watchdog restores state, and connections persist across app backgrounding — so locking the phone mid-game doesn't forfeit it." },
      { title: "JWT auth + region routing", body: "A custom JWT-authenticated WebSocket client refreshes tokens proactively before they expire, with three JWT-delivery methods for proxy compatibility. Backend routing is region-aware (NA / UK / India), auto-selecting the lowest-latency server from the device timezone." },
      { title: "Rules engine", body: "A full checkers engine supporting multiple variants and 8 configurable rules — flying kings, forced/max capture, orthogonal moves, board sizes 8/10/12 — with complete move validation, captures, promotion, and draw/resign handling. The orbit camera adds a 2D/3D toggle, board-flip animation and auto-fit zoom." },
      { title: "Social systems", body: "A 1,000+ line real-time chat & friends layer: direct messages, in-game broadcast/targeted chat, friend requests, an address book with block states, unread badges, and private join-code 'Play with Friends' lobbies." },
      { title: "Monetization", body: "A two-currency wallet with server-driven entry fees and prize payouts feeds matchmaking bet tiers. Three ad networks — Google AdMob, Meta Audience Network and IronSource LevelPlay mediation — serve interstitial + rewarded ads behind conditional-compilation guards." },
      { title: "Tooling & 3D", body: "Custom Unity Editor tools: an emoji→TMP sprite-atlas builder and an automated iOS build post-processor that patches the Xcode project (ATT, Apple Sign-In framework, Google Sign-In URL schemes). Every 3D asset — pieces, boards, crowns, frames — was modeled by me in Blender via Claude MCP." },
    ],
  },
  "zip-puzzle": {
    role: "Solo developer — puzzle engine, real-time hint solver, code-driven UI framework, content pipeline and optional backend.",
    metrics: [
      { value: "11.5K", label: "Lines of C#" },
      { value: "45", label: "Scripts" },
      { value: "80", label: "Hand-authored levels" },
      { value: "8×8+", label: "Max grid" },
    ],
    architecture: ["Service Locator (DI)", "Event Bus", "Factory", "Strategy", "State Machine"],
    deepDive: [
      { title: "The hint solver", body: "Generating a hint means solving the puzzle from the player's current position. A naive DFS freezes the game on big grids, so I added connectivity pruning (never explore states that orphan cells) and a node budget to keep the main thread responsive — and short-circuit straight to the authored solution when the player is still on the optimal route." },
      { title: "Decoupled architecture", body: "Systems never call each other directly — they communicate through a central Event Bus and resolve dependencies via a Service Locator. Audio, UI and gameplay stay independent, which made adding the optional backend level-provider trivial (Strategy pattern)." },
      { title: "Config in one place", body: "200+ tunable values — colors, sprites, audio, layout, even API config — live in a single ScriptableObject, so the whole look and feel can change without recompiling." },
      { title: "The backtrack UX detail", body: "Mid-drag I only allow a single-step rewind so you can't accidentally wipe your path; on a fresh finger-down you can jump back to any visited cell. A small detail that makes a big difference to feel." },
      { title: "Optional API provider", body: "An optional provider loads levels over HTTP with HMAC-SHA256 signed requests, caching and timeout handling — with a local provider as a seamless fallback." },
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
      { value: "~35", label: "C# scripts (mine)" },
      { value: "6", label: "Design patterns" },
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
      { title: "What's mine vs integrated art (honesty)", body: "All ~35 C# scripts, the architecture, the optimization and the UI are written by me, and I assembled the scenes with ProBuilder geometry and splat-mapped terrain (splat maps blend grass/dirt/rock textures across the ground). The 3D art itself — cars, trees, water, roads, skyboxes — is from licensed asset packs that I imported and integrated, not modeled by me." },
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
  "Engine & Language": {
    items: ["Unity Engine", "C#", "OOP", "Async / Coroutines", "URP", "Input System", "ScriptableObjects"],
    color: "#7c6cff",
  },
  "Multiplayer & Realtime": {
    items: ["WebSockets", "Photon PUN", "Authoritative Sync", "Backend / REST APIs", "JWT Auth", "Voice & In-Game Chat"],
    color: "#38bdf8",
  },
  "Monetization & SDKs": {
    items: ["Google AdMob", "Unity Ads", "ironSource (LevelPlay)", "Meta Audience Network", "Firebase", "Google / Apple OAuth"],
    color: "#a78bfa",
  },
  "Architecture & Patterns": {
    items: ["Clean Architecture", "Service Locator (DI)", "Event Bus (Pub/Sub)", "Factory · Strategy · Observer", "State Machines", "Object Pooling"],
    color: "#5b8cff",
  },
  "Graphics, Perf & Algorithms": {
    items: ["Compute Shaders (GPU)", "Performance & Memory Optimization", "LOD & Batching", "Terrain Streaming", "DFS / Pathfinding", "WheelCollider Physics"],
    color: "#7c6cff",
  },
  "UI / UX & Animation": {
    items: ["Code-Driven UI (UIFactory)", "UI/UX Systems", "Animation Systems", "Cinemachine", "DOTween", "Emoji Systems"],
    color: "#38bdf8",
  },
  "Hardware & Embedded": {
    items: ["ESP32", "BLE", "Arduino", "Embedded C", "Betaflight / PID", "Serial Comms"],
    color: "#a78bfa",
  },
  "3D, Mobile & Tools": {
    items: ["Blender (Claude MCP)", "ProBuilder", "Ready Player Me", "Mixamo", "Custom Editor Tooling", "Android & iOS", "Git & GitHub"],
    color: "#5b8cff",
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
  { label: "Live players", value: "2K+" },
  { label: "Multiplayer titles", value: "4" },
  { label: "FPS · low-end", value: "60" },
  { label: "Yr · Unity", value: "1+" },
];

// ── BIT — the NPC narrator (bottom-right companion) ───────────────────────
export const guideLines: Record<string, string> = {
  home:
    "Hey — I'm BIT, Lav's pocket guide. He ships *production mobile games* in Unity, solo, end-to-end. Scroll on, I'll narrate.",
  about:
    "ABOUT: a Unity dev who owns the whole pipeline — gameplay systems, Firebase, ad SDKs, optimization, and shipping to the stores.",
  experience:
    "EXPERIENCE: a year+ at RENXO building *real-time multiplayer* games — WebSockets, OAuth, chat, monetization, and store releases.",
  projects:
    "PROJECTS — split by *Games*, *VR/XR* and *Hardware*. Click any card for the full case study: write-up, shots, and a demo video.",
  skills:
    "SKILLS: Unity · C# · Firebase · Unity Ads · ironSource · clean architecture · object pooling. The stuff that ships games. Hover the tags.",
  contact:
    "Hiring Lav is the easy path — one email and you're done. He's actively looking right now, so maybe don't leave him on read.",
  project:
    "Deep dive! Scroll for the build steps, screenshots and a demo video. *Related work* sits at the bottom. Back arrow returns home.",
};
