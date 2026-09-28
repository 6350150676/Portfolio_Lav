// The lab's mark: an Erlenmeyer flask, half full, quietly bubbling.
const GLASS = 'M13 3.5 V11.7 L5.2 25.6 a2.4 2.4 0 0 0 2.1 3.6 h17.4 a2.4 2.4 0 0 0 2.1 -3.6 L19 11.7 V3.5'

export default function Logo({ size = 32 }: { size?: number }) {
  return (
    <svg className="logo" width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <path className="logo__glass" d={GLASS} style={{ stroke: 'none' }} />
      <path className="logo__liquid" d="M9.13 18.6 L5.2 25.6 a2.4 2.4 0 0 0 2.1 3.6 h17.4 a2.4 2.4 0 0 0 2.1 -3.6 L22.87 18.6 z" />
      <g>
        <circle className="logo__b" cx="14" cy="17" r="1.3" />
        <circle className="logo__b" cx="17.5" cy="15.5" r="1" />
        <circle className="logo__b" cx="15.8" cy="13" r="0.8" />
      </g>
      <path className="logo__glass" d={GLASS} style={{ fill: 'none' }} />
      <path className="logo__rim" d="M11 3.5 h10" fill="none" />
    </svg>
  )
}
