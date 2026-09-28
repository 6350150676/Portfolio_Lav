import { Component, lazy, Suspense, useState, type ReactNode } from 'react'
import { Finding } from './BenchCard'
import { personalInfo } from '../../data'

// The 3D controller + side-scroller is the heaviest thing in the lab
// (three.js), so it only loads when someone asks for it.
const ControllerToy = lazy(() => import('../ui/ControllerToy'))

// If WebGL is unavailable (disabled GPU, some privacy browsers, old phones)
// three.js throws while mounting — keep that contained to this card instead
// of taking the whole page down with it.
class Contained extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

export default function ResumeRun() {
  const [loaded, setLoaded] = useState(false)

  const cv = (
    <a className="link" href={personalInfo.resume} download="Lav_Naruka_Resume.pdf">CV is here</a>
  )

  if (!loaded) {
    return (
      <div className="rr">
        <div className="rr__cover">
          <div className="rr__keys" aria-hidden>
            {[['A', 'jump'], ['B', 'shoot'], ['X', 'dash'], ['Y', 'codex']].map(([k, v]) => (
              <span key={k} className="rr__key"><b data-k={k}>{k}</b>{v}</span>
            ))}
          </div>
          <p className="rr__text">
            A side-scroller where my skills are power-ups and my projects are bosses — game loop, physics, shooting,
            collision, collectibles and state — driven by a 3D gamepad I built in React Three Fiber.
          </p>
          <div className="rr__go">
            <button className="btn btn--signal" onClick={() => setLoaded(true)}>▶ Load the experiment</button>
            <span className="label">heavy apparatus · loads a 3D scene</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="rr rr--on">
      <Contained
        fallback={
          <Finding label="Experiment failed to start">
            <p>
              This one needs WebGL, and your browser has it switched off — so the 3D apparatus can't power up here. The
              rest of the bench works fine. If you'd rather read the résumé the normal way, the {cv}.
            </p>
          </Finding>
        }
      >
        <Suspense fallback={<p className="rr__loading label">warming up the apparatus…</p>}>
          <ControllerToy />
        </Suspense>
        <Finding>
          <p>
            Same systems thinking I bring to Unity — a game loop, collision and state — just pointed at a résumé. If you'd
            rather read it the normal way, the {cv}.
          </p>
        </Finding>
      </Contained>
    </div>
  )
}
