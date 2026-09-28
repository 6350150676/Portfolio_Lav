// Shared "lab notebook" helpers — experiment numbers, status stamps,
// category tabs and the homepage tally. Everything is derived from
// src/data so the counts can never drift from the real content.
import { projects, benchExperiments } from '../data'

export type Project = (typeof projects)[number]
export type Tone = 'ok' | 'signal' | 'blue' | 'mute'

export const expNo = (n: number) => '#' + String(n).padStart(3, '0')

export const categoryShort: Record<string, string> = {
  Games: 'Games',
  'VR / XR': 'VR / XR',
  'Hardware & Simulation': 'Hardware',
}

export const categoryTone: Record<string, Tone> = {
  Games: 'signal',
  'VR / XR': 'blue',
  'Hardware & Simulation': 'ok',
}

const isShipped = (s: string) => /live|shipped/i.test(s)
const isRunning = (s: string) => /develop|progress|running/i.test(s)
const isAbandoned = (s: string) => /abandon|shelved/i.test(s)

export function statusTone(status: string): Tone {
  if (isShipped(status)) return 'ok'
  if (isRunning(status)) return 'signal'
  if (isAbandoned(status)) return 'mute'
  return 'blue'
}

export const tally = {
  experiments: projects.length + benchExperiments.length,
  playable: benchExperiments.length,
  shipped: projects.filter((p) => isShipped(p.status)).length,
  running: projects.filter((p) => isRunning(p.status)).length,
  abandoned: projects.filter((p) => isAbandoned(p.status)).length,
}

// What's on the bench right now — the first unfinished roadmap step of an
// in-progress project.
export function onTheBench() {
  const p = projects.find((x) => isRunning(x.status))
  if (!p) return null
  const next = p.roadmap.find((r) => !r.done)
  return { project: p, next: next?.label ?? '' }
}

export function projectById(id: string) {
  return projects.find((p) => p.id === id)
}

export function benchFor(projectId: string) {
  return benchExperiments.filter((b) => b.from === projectId)
}
