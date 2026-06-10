// Auto-loads project images from per-project folders:
//   src/assets/projects/<project-id>/*.{jpg,png,webp,...}
//
// Rules:
//  • A file named  cover.*  becomes the thumbnail/hero cover.
//    (If there's no cover.*, the first image alphabetically is used.)
//  • Every OTHER image becomes a gallery "screen", in filename order.
//  • The filename becomes the caption (e.g. "01-in-game-hud.jpg" → "In-game hud").
//  • No images in a folder  →  nothing is shown for that project.

const files = import.meta.glob(
  '../assets/projects/**/*.{png,jpg,jpeg,webp,gif,PNG,JPG,JPEG,WEBP,GIF}',
  { eager: true, query: '?url', import: 'default' }
) as Record<string, string>

export type ProjectMedia = { cover: string | null; gallery: { src: string; caption: string }[] }

const byProject: Record<string, { name: string; url: string }[]> = {}
for (const path in files) {
  const m = path.match(/projects\/([^/]+)\/([^/]+)$/)
  if (!m) continue
  const [, id, name] = m
  ;(byProject[id] ||= []).push({ name, url: files[path] })
}

function caption(file: string): string {
  const base = file
    .replace(/\.[^.]+$/, '')      // drop extension
    .replace(/^\d+[-_\s]*/, '')   // drop leading "01-" / "1_" ordering prefix
    .replace(/[-_]+/g, ' ')       // hyphens/underscores → spaces
    .trim()
  return base ? base.charAt(0).toUpperCase() + base.slice(1) : ''
}

export function getMedia(id: string): ProjectMedia {
  const list = (byProject[id] || [])
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }))
  if (!list.length) return { cover: null, gallery: [] }

  const coverIdx = list.findIndex((f) => /^cover\./i.test(f.name))
  const ci = coverIdx >= 0 ? coverIdx : 0
  const cover = list[ci].url
  const gallery = list
    .filter((_, i) => i !== ci)
    .map((f) => ({ src: f.url, caption: caption(f.name) }))
  return { cover, gallery }
}
