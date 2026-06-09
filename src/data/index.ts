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
    "I'm a Unity developer focused on production mobile games. For the past ~2 years I've shipped titles end-to-end as the sole developer at RENXO — architecting reusable gameplay and UI systems, integrating Firebase and ad-monetization SDKs (Unity Ads, ironSource), and optimizing for a smooth 60 fps on low-end Android and iOS devices.",
  bio2:
    "I care about clean, modular architecture and the parts that actually make a game shippable: object pooling, memory optimization, SDK and REST API integration, and a reliable build-and-publish pipeline. My Engineering Physics background from NIT Hamirpur gives me a strong foundation in math, simulation, and systems thinking that I bring to gameplay and tooling.",
};

// "What I work on" — capability highlights for the About section
export const capabilities = [
  "Touch input & gameplay interaction systems in Unity",
  "Firebase integration across Android & iOS (auth, push, remote config)",
  "Ad monetization — Unity Ads & ironSource mediation (Google AdMob in progress)",
  "Reusable, modular gameplay systems with clean architecture",
  "UI/UX systems, emoji & in-game interaction features",
  "SDK & third-party service integration",
  "Performance & memory optimization (object pooling, Addressables)",
  "Mobile publishing & deployment pipelines (Play Store / App Store)",
];

// ── WORK EXPERIENCE (résumé-accurate) ────────────────────────────────────
export const experience = [
  {
    role: "Unity Game Developer",
    company: "RENXO Technologies Pvt. Ltd.",
    period: "Jul 2024 – Present",
    type: "Full-Time",
    color: "#7c6cff",
    stack: ["Unity", "C#", "Firebase", "Unity Ads", "ironSource", "ScriptableObjects", "Android/iOS"],
    bullets: [
      "Sole Unity developer for 2+ years — shipped multiple production mobile games end-to-end across Android & iOS, owning architecture, core systems, build pipelines, and store-ready polish.",
      "Integrated Firebase (auth, push notifications, remote config) and ad-monetization SDKs — Unity Ads and ironSource mediation — to power live-ops and revenue across titles.",
      "Engineered reusable, modular gameplay and UI systems with ScriptableObjects, state machines, and object pooling; profiled and optimized memory and draw calls for a stable 60 fps on low-end devices.",
      "Built a real-time multiplayer Ludo game with OAuth login, WebSocket game-state sync, and fluid DOTween animation.",
      "Owned the full publish-and-deploy pipeline to the Google Play Store and Apple App Store.",
    ],
  },
  {
    role: "Unity Developer Intern",
    company: "Caarya",
    period: "Feb 2025 – Jul 2025",
    type: "Internship",
    color: "#5b8cff",
    stack: ["Unity", "C#", "Photon PUN", "Mixamo", "Mobile UI"],
    bullets: [
      "Integrated Photon PUN voice chat into a live multiplayer project; designed and shipped 2 gameplay levels.",
      "Built 8 rigged playable characters with custom Mixamo animations.",
      "Maintained clean asset pipelines and smooth media integration, collaborating across disciplines throughout the project lifecycle.",
    ],
  },
];

// ── PROJECT CATEGORIES (the page splits work into these groups) ───────────
export const projectCategories = [
  { key: "VR / XR", blurb: "Immersive headset & sensor-driven experiences." },
  { key: "Games", blurb: "Production mobile games & gameplay systems." },
  { key: "Hardware & Simulation", blurb: "Unity talking to real-world hardware." },
];

// Dummy placeholder video used everywhere until real gameplay clips exist
const DUMMY_VIDEO = "https://www.youtube.com/watch?v=ScMzIvxBSi4";
const img = (seed: string, w = 1280, h = 720) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const projects = [
  {
    id: "vr-acrophobia",
    title: "VR Acrophobia Therapy",
    subtitle: "Biometric-Driven Therapeutic VR",
    category: "VR / XR",
    status: "Shipped",
    color: "#a78bfa",
    tech: ["Unity", "C#", "Oculus SDK", "OpenXR", "Arduino"],
    tagline: "Your heart rate sets the difficulty. Literally.",
    cover: img("vracro-cover", 900, 560),
    description:
      "An immersive VR exposure-therapy environment for fear of heights, where difficulty adapts in real time to the patient's live physiology. An MPU-6050 and a pulse sensor feed Unity over a low-latency serial pipeline, and the full XR interaction layer is built on Oculus SDK + OpenXR.",
    overview:
      "This is the project where my physics background and game dev collide. The system reads a patient's pulse and motion (MPU-6050 + pulse sensor on an Arduino) and streams it into Unity over serial with low latency, then drives a dynamic-difficulty loop: the calmer you are, the higher you climb. The XR interaction layer is architected on Oculus SDK and OpenXR with comfort and clinical safety as first-class constraints — the kind of patient-responsive pipeline that's directly reusable for medical simulation.",
    highlights: [
      "Real-time biometric input via Arduino",
      "Dynamic difficulty from live pulse rate",
      "Low-latency sensor → Unity serial pipeline",
      "Oculus SDK + OpenXR interaction layer",
      "Comfort & clinical-safety focused",
    ],
    images: [
      { src: img("vracro-1"), caption: "The exposure scene — height scales with the patient's calm." },
      { src: img("vracro-2"), caption: "Live biometric readout driving difficulty." },
      { src: img("vracro-3"), caption: "Arduino + MPU-6050 + pulse-sensor rig." },
    ],
    video: DUMMY_VIDEO,
    process: [
      { title: "Sensor rig", detail: "Wired an MPU-6050 + pulse sensor to an Arduino and streamed clean data over serial." },
      { title: "Unity bridge", detail: "Built a low-latency serial → Unity ingestion layer for real-time physiological signals." },
      { title: "Adaptive loop", detail: "Mapped live pulse/motion to a dynamic-difficulty system that scales challenge to the patient." },
      { title: "XR layer", detail: "Architected the interaction layer on Oculus SDK + OpenXR with comfort/safety constraints." },
    ],
    roadmap: [
      { label: "Biometric pipeline working", done: true },
      { label: "Adaptive difficulty loop", done: true },
      { label: "Clinician dashboard / session logs", done: false },
      { label: "Multi-scenario therapy environments", done: false },
    ],
    links: { github: "https://github.com/6350150676", demo: "https://example.com", playStore: "" },
  },
  {
    id: "pathlock",
    title: "PathLock",
    subtitle: "Direction-Aware Grid Puzzle",
    category: "Games",
    status: "Shipped",
    color: "#7c6cff",
    tech: ["Unity 2022 LTS", "C#", "Mobile", "ScriptableObjects", "DOTween"],
    tagline: "20 hand-authored levels, 4 tile mechanics, zero hardcoded level data.",
    cover: img("pathlock-cover", 900, 560),
    description:
      "A mobile grid puzzle built from GDD to store: 20 hand-authored levels (2×2 → 6×6) with tuned difficulty curves, a touch-input path-validation state machine, and a ScriptableObject pipeline that fully decouples level data from game logic.",
    overview:
      "PathLock is a direction-aware grid puzzle where every tile constrains how a path can flow. I owned the whole thing — design, code, and UI/UX. The headline architectural win is a ScriptableObject-driven level pipeline: levels are authored as data assets, so adding or re-tuning a level never touches game logic. It ships with 3 modes (Normal / Timed / Zen), each with its own UI state, and cohesive DOTween transitions throughout.",
    highlights: [
      "20 hand-authored levels (2×2 → 6×6)",
      "4 original tile mechanics",
      "3 modes: Normal / Timed / Zen",
      "ScriptableObject level pipeline",
      "Touch path-validation state machine",
      "Full UI/UX + DOTween polish",
    ],
    images: [
      { src: img("pathlock-1"), caption: "A 5×5 level mid-solve with the path highlighted." },
      { src: img("pathlock-2"), caption: "Level-select screen with difficulty curve." },
      { src: img("pathlock-3"), caption: "ScriptableObject level asset in the Unity inspector." },
    ],
    video: DUMMY_VIDEO,
    process: [
      { title: "Design the grammar", detail: "Defined 4 tile mechanics and the rules for how a valid path can move across the grid." },
      { title: "Data-driven levels", detail: "Built a ScriptableObject pipeline so each level is an authored asset, decoupled from logic." },
      { title: "Path-validation FSM", detail: "Implemented a touch-input state machine that validates the player's path in real time." },
      { title: "Modes & UI", detail: "Added Normal / Timed / Zen modes with mode-specific UI and DOTween transitions." },
      { title: "Tuning & ship", detail: "Hand-authored and difficulty-curved all 20 levels, polished, and shipped." },
    ],
    roadmap: [
      { label: "20 levels + 3 modes shipped", done: true },
      { label: "ScriptableObject level editor", done: true },
      { label: "More tile mechanics + level packs", done: false },
      { label: "Daily-challenge mode", done: false },
    ],
    links: { github: "https://github.com/6350150676", demo: "https://example.com", playStore: "" },
  },
  {
    id: "ludo-multiplayer",
    title: "Real-Time Multiplayer Ludo",
    subtitle: "Production Mobile Game @ RENXO",
    category: "Games",
    status: "Shipped",
    color: "#38bdf8",
    tech: ["Unity", "C#", "Firebase", "WebSockets", "Unity Ads", "ironSource"],
    tagline: "Production multiplayer: OAuth, Firebase, ad monetization & authoritative sync.",
    cover: img("ludo-cover", 900, 560),
    description:
      "A production real-time multiplayer Ludo game shipped at RENXO: OAuth login, Firebase (push + remote config), WebSocket-based authoritative game-state sync, ad monetization via Unity Ads & ironSource mediation, and fluid DOTween animation — engineered for stable 60 fps on low-end devices.",
    overview:
      "A live, real-time multiplayer Ludo title built as the sole developer. Players sign in with OAuth, get re-engaged through Firebase push notifications, and play on authoritative game state synced over WebSockets so every client agrees on the board. Monetization runs through Unity Ads with ironSource mediation, the UI and piece feedback are powered by DOTween, and the whole title is profiled to hold 60 fps on low-end Android/iOS — a full production slice from architecture to store.",
    highlights: [
      "OAuth login + Firebase remote config",
      "WebSocket authoritative game-state sync",
      "Unity Ads + ironSource mediation",
      "Modular, reusable game systems",
      "60 fps on low-end devices",
    ],
    images: [
      { src: img("ludo-1"), caption: "The live multiplayer board." },
      { src: img("ludo-2"), caption: "Matchmaking & lobby flow." },
      { src: img("ludo-3"), caption: "Win screen with DOTween celebration." },
    ],
    video: DUMMY_VIDEO,
    process: [
      { title: "Auth & accounts", detail: "Integrated OAuth login and player identity." },
      { title: "Realtime layer", detail: "Built WebSocket game-state sync so all clients stay authoritative & consistent." },
      { title: "Engagement", detail: "Wired Firebase push notifications for re-engagement." },
      { title: "Game feel", detail: "Polished piece movement with DOTween and profiled to a stable 60 fps." },
    ],
    roadmap: [
      { label: "Core multiplayer loop shipped", done: true },
      { label: "Auth + push + sync live", done: true },
      { label: "Tournaments / ranked", done: false },
      { label: "Spectator mode", done: false },
    ],
    links: { github: "https://github.com/6350150676", demo: "https://example.com", playStore: "" },
  },
  {
    id: "car-racing",
    title: "Multi-Environment Car Racing",
    subtitle: "Performance-First Mobile Racer",
    category: "Games",
    status: "In Development",
    color: "#7c6cff",
    tech: ["Unity", "C#", "ProBuilder", "Mobile"],
    tagline: "Draw-call surgery for a buttery 60 fps arcade feel.",
    cover: img("racing-cover", 900, 560),
    description:
      "A mobile arcade racer engineered for performance: GPU Instancing, multi-tier LOD, and Static/Dynamic Batching slash draw calls to sustain 60 fps on mid-range hardware. Custom vehicle physics deliver a tight arcade feel across ProBuilder-authored environments.",
    overview:
      "A mobile racing game where the real opponent is the frame budget. I applied GPU Instancing, multi-tier LOD, and Static/Dynamic Batching to cut draw calls hard and hold 60 fps on mid-range phones, then tuned custom vehicle physics — handling, drift, and collision response — for a crisp arcade feel. Built on a scalable 3-environment level pipeline (ProBuilder-authored), with the first environment fully playable.",
    highlights: [
      "GPU Instancing + multi-tier LOD",
      "Static / Dynamic Batching",
      "Custom drift & handling physics",
      "ProBuilder environment pipeline",
      "60 fps on mid-range mobile",
    ],
    images: [
      { src: img("racing-1"), caption: "Environment 1 — fully playable." },
      { src: img("racing-2"), caption: "Drift physics tuning pass." },
      { src: img("racing-3"), caption: "Draw-call profiler before/after batching." },
    ],
    video: DUMMY_VIDEO,
    process: [
      { title: "Environment pipeline", detail: "Authored race environments in ProBuilder on a scalable 3-environment structure." },
      { title: "Vehicle physics", detail: "Tuned handling, drift, and collision response for a tight arcade feel." },
      { title: "Perf pass", detail: "Applied GPU Instancing, LOD, and batching to slash draw calls to 60 fps." },
    ],
    roadmap: [
      { label: "Environment 1 playable", done: true },
      { label: "Perf-optimized to 60 fps", done: true },
      { label: "Environments 2 & 3", done: false },
      { label: "Online time-trial leaderboards", done: false },
    ],
    links: { github: "https://github.com/6350150676", demo: "https://example.com", playStore: "" },
  },
  {
    id: "fpv-sim",
    title: "FPV Drone Simulator",
    subtitle: "Hardware-in-the-Loop Flight Sim",
    category: "Hardware & Simulation",
    status: "Shipped",
    color: "#5b8cff",
    tech: ["Unity", "Embedded C", "Arduino", "Betaflight", "Serial"],
    tagline: "Real sticks, real firmware, virtual drone.",
    cover: img("fpv-cover", 900, 560),
    description:
      "A real-time drone simulator that bridges Unity and physical hardware over serial. Betaflight-compatible control logic and an FPV camera-feedback loop replicate genuine flight dynamics, with a bidirectional Unity ↔ Arduino layer written in Embedded C.",
    overview:
      "A hardware-in-the-loop FPV simulator: physical control inputs run through Betaflight-compatible logic, drive a simulated drone in Unity, and feed an FPV camera loop back to the pilot — closing the loop on authentic flight feel without risking a real airframe. The bidirectional Unity ↔ Arduino communication layer (Embedded C firmware) is a reusable foundation for any XR peripheral or haptic device integration.",
    highlights: [
      "Real-time Unity ↔ hardware serial bridge",
      "Betaflight-compatible control logic",
      "FPV camera feedback loop",
      "Bidirectional Embedded C firmware",
      "Reusable for XR / haptic peripherals",
    ],
    images: [
      { src: img("fpv-1"), caption: "Simulated drone in the Unity FPV view." },
      { src: img("fpv-2"), caption: "The physical sticks + Arduino bridge." },
      { src: img("fpv-3"), caption: "Telemetry streaming over serial." },
    ],
    video: DUMMY_VIDEO,
    process: [
      { title: "Comm layer", detail: "Wrote bidirectional Unity ↔ Arduino serial firmware in Embedded C." },
      { title: "Flight model", detail: "Implemented Betaflight-compatible control logic replicating real drone dynamics." },
      { title: "FPV loop", detail: "Built the FPV camera feedback loop for an authentic first-person pilot view." },
      { title: "HIL validation", detail: "Used the rig for interactive hardware-in-the-loop navigation testing." },
    ],
    roadmap: [
      { label: "HIL bridge + flight model", done: true },
      { label: "FPV feedback loop", done: true },
      { label: "Configurable airframes / tunes", done: false },
      { label: "Replay + telemetry overlay", done: false },
    ],
    links: { github: "https://github.com/6350150676", demo: "https://example.com", playStore: "" },
  },
];

// ── SKILLS (reconciled across résumé versions) ───────────────────────────
export const skills = {
  "Engine & Language": {
    items: ["Unity Engine", "C#", "OOP", "Async Programming", "ScriptableObjects"],
    color: "#7c6cff",
  },
  "Mobile & Deployment": {
    items: ["Android & iOS", "Publishing Pipelines", "Addressables", "Performance Optimization", "Memory Optimization", "Object Pooling"],
    color: "#5b8cff",
  },
  "Monetization & SDKs": {
    items: ["Unity Ads", "ironSource Mediation", "Google AdMob", "Firebase", "SDK Integration", "REST APIs"],
    color: "#a78bfa",
  },
  "Architecture & Systems": {
    items: ["Clean Architecture", "Modular System Design", "Reusable Systems", "Gameplay Mechanics", "State Machines"],
    color: "#38bdf8",
  },
  "UI / UX & Polish": {
    items: ["UI/UX Systems", "Touch & Interaction", "Animation Systems", "VFX Integration", "DOTween"],
    color: "#7c6cff",
  },
  "Workflow & Range": {
    items: ["Git & GitHub", "Debugging & Profiling", "Multiplayer (Photon · WebSockets)", "XR (OpenXR · Oculus)"],
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

export const certifications = [
  { name: "Unity Junior Programmer Certified", issuer: "Unity Technologies" },
  { name: "GATE 2025 Qualified", issuer: "Computer Science" },
];

export const stats = [
  { label: "Yrs · Unity", value: "2+" },
  { label: "FPS · low-end", value: "60" },
  { label: "SDKs integrated", value: "4+" },
  { label: "Levels designed", value: "20+" },
];

// ── BIT — the NPC narrator (bottom-right companion) ───────────────────────
export const guideLines: Record<string, string> = {
  home:
    "Hey — I'm BIT, Lav's pocket guide. He ships *production mobile games* in Unity, solo, end-to-end. Scroll on, I'll narrate.",
  about:
    "ABOUT: a Unity dev who owns the whole pipeline — gameplay systems, Firebase, ad SDKs, optimization, and shipping to the stores.",
  experience:
    "EXPERIENCE: *sole* developer shipping production mobile games for 2+ years — architecture, monetization, and store releases. The whole team.",
  projects:
    "PROJECTS — split by *Games*, *VR/XR* and *Hardware*. Click any card for the full case study: write-up, shots, and a demo video.",
  skills:
    "SKILLS: Unity · C# · Firebase · Unity Ads · ironSource · clean architecture · object pooling. The stuff that ships games. Hover the tags.",
  contact:
    "Hiring Lav is the easy path — one email and you're done. He's actively looking right now, so maybe don't leave him on read.",
  project:
    "Deep dive! Scroll for the build steps, screenshots and a demo video. *Related work* sits at the bottom. Back arrow returns home.",
};
