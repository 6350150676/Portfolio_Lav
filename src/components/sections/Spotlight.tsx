import { Link } from 'react-router-dom'
import { expNo, projectById } from '../../lib/lab'
import Reveal from '../ui/Reveal'
import Stamp from '../ui/Stamp'

// Homepage call-out for the work Lav is proudest of: Save the Cat's
// retention & monetization design. Links straight to its diagrams.
export const SPOTLIGHT_HREF = '/projects/save-the-cat#retention'

const FLOW = [
  { i: '📅', t: 'Daily puzzle' },
  { i: '⭐', t: 'Stars' },
  { i: '🪙', t: 'Coins' },
  { i: '🐱', t: 'New cats' },
]

export default function Spotlight() {
  const p = projectById('save-the-cat')
  if (!p) return null
  return (
    <Reveal className="spot-wrap">
      <Link to={SPOTLIGHT_HREF} className="spot sheet">
        <span className="tape tape--tl" />
        <div className="spot__head">
          <span className="label spot__kicker">★ The part I worked on most · Experiment {expNo(p.no)}</span>
          <Stamp tone="ok" rotate={-6}>Profitable</Stamp>
        </div>

        <div className="spot__body">
          <div>
            <h3 className="display spot__title">
              {p.title}: <em>retention &amp; monetization</em>
            </h3>
            <p className="spot__motto">A reason to come back every day, and ads players choose.</p>
            <div className="spot__facts">
              <span className="tag">daily puzzle + global rank</span>
              <span className="tag">cats to collect</span>
              <span className="tag">first-week coin pace</span>
              <span className="tag">levels 1–3 ad-free</span>
            </div>
          </div>

          <div className="spot__flow" aria-label="Daily puzzle and stars earn coins, coins unlock new cats: Ginger around day 2, King around day 7">
            <div className="spot__row">
              {FLOW.map((n, k) => (
                <span key={n.t} className="spot__step">
                  {k > 0 && <b aria-hidden>→</b>}
                  <span className="spot__node"><i aria-hidden>{n.i}</i>{n.t}</span>
                </span>
              ))}
            </div>
            <div className="spot__row spot__row--sub">
              <span className="spot__node spot__node--soft"><i aria-hidden>🐱</i>Ginger ≈ day 2</span>
              <span className="spot__node spot__node--soft"><i aria-hidden>👑</i>King ≈ day 7</span>
              <span className="spot__node spot__node--next"><i aria-hidden>🎁</i>Ads · player chooses</span>
            </div>
          </div>
        </div>

        <div className="spot__foot">
          <span className="hand">live 1.0 — paced ads + coin shop — made it profitable</span>
          <span className="xcard__open">See the diagrams <span aria-hidden>→</span></span>
        </div>
      </Link>
    </Reveal>
  )
}
