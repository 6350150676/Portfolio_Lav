// Guard so a mailto can't fire repeatedly (double-clicks, OS re-prompts, etc.)
let last = 0

export function openMail(href: string) {
  const now = Date.now()
  if (now - last < 2500) return // ignore repeat triggers within 2.5s
  last = now
  window.location.href = href
}

// Copy text to clipboard; resolves true on success.
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}
