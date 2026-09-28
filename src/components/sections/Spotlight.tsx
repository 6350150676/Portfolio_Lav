import { Link } from 'react-router-dom'
import { expNo, projectById } from '../../lib/lab'
import Reveal from '../ui/Reveal'
import Stamp from '../ui/Stamp'

// Homepage call-out for the work Lav is proudest of: Save the Cat's
// monetization design. Links straight to the diagrams on its lab report.
export const SPOTLIGHT_HREF = '/projects/save-the-cat#monetization'

const FLOW = [
  { i: '🎮', t: 'Gameplay' },
  { i: '🪙', t: 'Coins' },
  { i: '🛒', t: 'Skins' },
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
              {p.title}: <em>monetization design</em>
            </h3>
            <p className="spot__motto">Every ad is a choice, never a toll.</p>
            <div className="spot__facts">
              <span className="tag">levels 1–3 ad-free</span>
              <span className="tag">≥150 s between interstitials</span>
              <span className="tag">child-directed ads</span>
              <span className="tag">no pay-to-win</span>
            </div>
          </div>

          <div className="spot__flow" aria-label="Gameplay earns coins, coins buy skins; rewarded ads are optional; gems stay premium">
            <div className="spot__row">
              {FLOW.map((n, k) => (
                <span key={n.t} className="spot__step">
                  {k > 0 && <b aria-hidden>→</b>}
                  <span className="spot__node"><i aria-hidden>{n.i}</i>{n.t}</span>
                </span>
              ))}
            </div>
            <div className="spot__row spot__row--sub">
              <span className="spot__node spot__node--soft"><i aria-hidden>🎁</i>Rewarded ads · player chooses</span>
              <span className="spot__node spot__node--next"><i aria-hidden>💎</i>Gems · premium only</span>
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
