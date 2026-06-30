import type { IconType } from 'react-icons'
import {
  SiUnity, SiSharp, SiFirebase, SiBlender, SiMeta, SiOculus, SiArduino,
  SiSocketdotio, SiThreedotjs,
} from 'react-icons/si'
import {
  LuBox, LuBoxes, LuCpu, LuWifi, LuArrowLeftRight, LuKeyRound, LuRadio,
  LuGamepad2, LuSmartphone, LuLayers, LuWind, LuZap, LuPencilRuler, LuActivity,
  LuCircuitBoard, LuMap, LuMegaphone, LuFileCode, LuMountain,
} from 'react-icons/lu'

// Map a tech / skill label to an icon. Brand logos where they exist,
// a meaningful generic icon otherwise. Matching is case-insensitive and
// substring-based so "Unity 6" and "Unity" both resolve.
const RULES: { match: string[]; icon: IconType }[] = [
  { match: ['unity'], icon: SiUnity },
  { match: ['c#', 'csharp', 'c sharp', 'embedded c'], icon: SiSharp },
  { match: ['firebase'], icon: SiFirebase },
  { match: ['blender'], icon: SiBlender },
  { match: ['oculus'], icon: SiOculus },
  { match: ['meta', 'openxr', 'xr interaction', 'xr /', 'vr '], icon: SiMeta },
  { match: ['arduino', 'esp32', 'speedybee', 'serial'], icon: SiArduino },
  { match: ['websocket', 'socket'], icon: SiSocketdotio },
  { match: ['three', '3d spatial', '3d,'], icon: SiThreedotjs },

  { match: ['jwt', 'oauth', 'auth'], icon: LuKeyRound },
  { match: ['ble', 'bluetooth'], icon: LuRadio },
  { match: ['pulse sensor', 'blackbox', 'pid', 'authoritative sync'], icon: LuActivity },
  { match: ['compute shader', 'gpu', 'grass', 'lod'], icon: LuZap },
  { match: ['wheelcollider', 'physics'], icon: LuGamepad2 },
  { match: ['mobile', 'android', 'ios', 'hmd'], icon: LuSmartphone },
  { match: ['scriptableobject', 'object pooling', 'event bus', 'service locator', 'state machine', 'factory', 'architecture', 'patterns'], icon: LuBoxes },
  { match: ['input system', 'controller', 'interactor', 'ergonomic', 'diegetic', 'ui'], icon: LuGamepad2 },
  { match: ['line renderer', 'urp', 'animation', 'cinemachine', 'dotween'], icon: LuPencilRuler },
  { match: ['probuilder', 'terrain', 'mountain'], icon: LuMountain },
  { match: ['esc', 'dshot', 'soldering', 'betaflight', 'circuit', 'hardware', 'embedded'], icon: LuCircuitBoard },
  { match: ['admob', 'levelplay', 'ironsource', 'audience network', 'ads', 'monetization', 'sdk'], icon: LuMegaphone },
  { match: ['region', 'routing', 'rest', 'backend', 'api'], icon: LuWifi },
  { match: ['dfs', 'pathfinding', 'async', 'coroutine'], icon: LuFileCode },
  { match: ['streaming', 'wind', 'voice', 'chat'], icon: LuArrowLeftRight },
  { match: ['ready player', 'mixamo', 'avatar', 'spatial'], icon: LuLayers },
  { match: ['cpu', 'optimization', 'memory', 'performance'], icon: LuCpu },
  { match: ['probuilder', 'map'], icon: LuMap },
  { match: ['wind', 'air'], icon: LuWind },
]

function pickIcon(name: string): IconType {
  const n = name.toLowerCase()
  for (const r of RULES) {
    if (r.match.some((m) => n.includes(m))) return r.icon
  }
  return LuBox
}

export default function TechIcon({ name, size = 13 }: { name: string; size?: number }) {
  const Icon = pickIcon(name)
  return <Icon size={size} style={{ flexShrink: 0 }} aria-hidden />
}
