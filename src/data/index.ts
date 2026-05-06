export const personalInfo = {
  name: "Lav Naruka",
  title: "Unity Game Developer",
  subtitle: "Level Designer & XR Engineer",
  tagline: "Shipping production games. Crafting player experiences. Building worlds.",
  email: "lovenaruka514@gmail.com",
  phone: "+91-6350150676",
  linkedin: "https://linkedin.com/in/lavnaruka",
  github: "https://github.com/6350150676",
  location: "India",
  bio: "Unity Game Developer with 1.5+ years shipping production mobile games end-to-end — gameplay systems, level design, puzzle mechanics, progression, UI/HUD, multiplayer, and AR/VR. I don't just build games; I craft player experiences that feel inevitable.",
};

export const experience = [
  {
    role: "Unity Game Developer",
    company: "RENXO Technologies Pvt. Ltd.",
    period: "Jul 2023 – Present",
    type: "Full-Time",
    color: "#00e5ff",
    bullets: [
      "Shipped multiple production mobile games end-to-end as sole game developer",
      "Hand-authored 20+ levels iterating on player flow, difficulty curves, and decision-making",
      "Built modular Unity components cutting delivery time across projects",
      "Designed gameplay systems: puzzle mechanics, turn-based logic, RNG, and progression",
    ],
  },
  {
    role: "Unity Developer Intern",
    company: "Caarya",
    period: "Feb – Jul 2023",
    type: "Internship",
    color: "#ff6b35",
    bullets: [
      "Built real-time multiplayer systems using Photon PUN",
      "Implemented player controllers and animation state machines",
      "Optimized 8+ characters via Mixamo pipeline and profiling",
      "Developed mobile UI systems for cross-platform deployment",
    ],
  },
  {
    role: "AR/VR Developer – Core Team",
    company: "Vibhav Club, NIT Hamirpur",
    period: "2021 – 2025",
    type: "Club",
    color: "#7c3aed",
    bullets: [
      "Developed AR/VR games with AR Foundation and Oculus SDK",
      "Created interactive installations experienced by 100+ live participants",
      "Pioneered XR experiences for college tech festivals",
    ],
  },
];

export const projects = [
  {
    title: "PathLock",
    subtitle: "Direction-Aware Grid Puzzle Game",
    tech: ["Unity 2022 LTS", "C#", "Mobile"],
    status: "In Development",
    color: "#00e5ff",
    description:
      "Designed and built from GDD to implementation: 20 hand-authored levels across 2×2 to 6×6 grids, each with documented design intent and iteration history. Created 4 original tile mechanics — one-way arrows, switch-bridge cause-and-effect pairs, fire hazards, ice slides — with full difficulty curve integration and 3 game modes.",
    highlights: [
      "20 hand-authored levels",
      "4 original tile mechanics",
      "3 game modes: Normal / Timed / Zen",
      "ScriptableObject-based level data",
      "Touch input path-validation state machine",
      "Accessibility-first Zen mode",
    ],
    icon: "🎮",
  },
  {
    title: "VR Acrophobia Therapy",
    subtitle: "Biometric-Driven Therapeutic VR",
    tech: ["Unity", "C#", "Oculus SDK", "Arduino"],
    status: "Shipped",
    color: "#7c3aed",
    description:
      "Therapeutic VR environment with real-time biometric-driven dynamic difficulty. MPU-6050 and pulse sensor integrated via Arduino into Unity gameplay loop for acrophobia (fear of heights) exposure therapy.",
    highlights: [
      "Real-time biometric input via Arduino",
      "Dynamic difficulty based on pulse rate",
      "Oculus SDK integration",
      "Therapeutic exposure therapy design",
    ],
    icon: "🥽",
  },
  {
    title: "A* Pathfinding Visualizer",
    subtitle: "Interactive Algorithm Visualization",
    tech: ["Unity", "C#"],
    status: "Shipped",
    color: "#ff6b35",
    description:
      "Interactive tool with procedural maze generation and real-time A* traversal on modular, reusable architecture. Built for both education and game AI research.",
    highlights: [
      "Procedural maze generation",
      "Real-time A* traversal",
      "Modular reusable architecture",
      "Interactive step-through mode",
    ],
    icon: "🗺️",
  },
];

export const skills = {
  "Engines & Languages": {
    items: ["Unity 3D", "C#", "C++", "Python", "Unreal Engine 5"],
    color: "#00e5ff",
  },
  "Gameplay & Design": {
    items: [
      "Level Design",
      "Puzzle Mechanics",
      "Difficulty Curves",
      "Progression Systems",
      "Player Controllers",
      "Turn-Based Logic",
      "RNG Systems",
      "UI/HUD",
      "Animation State Machines",
    ],
    color: "#ff6b35",
  },
  "Networking & XR": {
    items: [
      "Photon PUN",
      "WebSockets",
      "Netcode for GameObjects",
      "AR Foundation",
      "OpenXR",
      "Oculus SDK",
    ],
    color: "#7c3aed",
  },
  "Tools & Pipeline": {
    items: ["Git", "Blender", "Shader Graph", "Figma", "Mixamo", "ScriptableObjects", "Agile/Scrum"],
    color: "#22c55e",
  },
};

export const education = [
  {
    degree: "B.Tech – Engineering Physics",
    school: "NIT Hamirpur",
    period: "2021 – 2025",
    note: "National Institute of Technology",
  },
];

export const certifications = [
  { name: "Unity Junior Programmer Certification", issuer: "Unity Technologies" },
  { name: "GATE 2025 Qualified", issuer: "Computer Science" },
];

export const stats = [
  { label: "Games Shipped", value: "5+", icon: "🚀" },
  { label: "Levels Designed", value: "20+", icon: "🗺️" },
  { label: "Years Experience", value: "1.5+", icon: "⚡" },
  { label: "Live Participants", value: "100+", icon: "👾" },
];
