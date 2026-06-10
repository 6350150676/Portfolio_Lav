PROJECT IMAGES — how to add your own
=====================================

Put your image files in THIS folder (public/projects/). Anything here is
served at the site root, so a file named "checkers-cover.jpg" becomes
"/projects/checkers-cover.jpg".

------------------------------------------------------------------
WHAT EACH PROJECT NEEDS
------------------------------------------------------------------
Per project you set two things in  src/data/index.ts :

1) cover   → ONE image (the thumbnail on the card AND the big image at the
             top of the project page).
2) images  → a LIST of gallery screenshots (shown under "Screens",
             click-to-zoom). 3–6 is the sweet spot. No hard limit, but
             keep it under ~8 so the page stays fast.

------------------------------------------------------------------
SPECS / RULES
------------------------------------------------------------------
• Format:   .jpg or .webp (best for screenshots). .png is fine but heavier.
• Cover:    landscape, 16:10 ratio  →  ~1200×750 or 1600×1000 px
• Gallery:  landscape, 16:9 ratio   →  ~1280×720 or 1600×900 px
• Size:     compress each to < ~400 KB  (use squoosh.app or tinypng.com)
• Names:    lowercase, hyphens, NO spaces.

------------------------------------------------------------------
RECOMMENDED FILE NAMES (prefix = project id)
------------------------------------------------------------------
checkers-multiplayer-cover.jpg   + checkers-multiplayer-1.jpg ... -2 ... -3
zip-puzzle-cover.jpg             + zip-puzzle-1.jpg ...
vr-acrophobia-cover.jpg          + vr-acrophobia-1.jpg ...
car-racing-cover.jpg             + car-racing-1.jpg ...
fpv-drone-cover.jpg              + fpv-drone-1.jpg ...

------------------------------------------------------------------
THEN, in src/data/index.ts, point the project at them, e.g.:
  cover: "/projects/checkers-multiplayer-cover.jpg",
  images: [
    { src: "/projects/checkers-multiplayer-1.jpg", caption: "In-game HUD" },
    { src: "/projects/checkers-multiplayer-2.jpg", caption: "Matchmaking" },
  ],

(Or just drop the files in with the names above and tell me — I'll wire them up.)
