import type { IconType } from 'react-icons'
import { LuGamepad2, LuNetwork, LuGauge, LuGlasses, LuBrain, LuWrench, LuDices } from 'react-icons/lu'
import { skills } from '../../data'
import SectionHead from '../ui/SectionHead'
import Reveal from '../ui/Reveal'

const CATEGORY_ICON: Record<string, IconType> = {
  'Game Design': LuDices,
  Gameplay: LuGamepad2,
  Networking: LuNetwork,
  Optimization: LuGauge,
  XR: LuGlasses,
  AI: LuBrain,
  Tools: LuWrench,
}

// every third drawer gets a coloured label tape, like a real shelf
const DYMO_TONE = ['', 'dymo--signal', '', 'dymo--blue']

export default function Skills() {
  return (
    <section id="skills" className="section-pad">
      <div className="container">
        <SectionHead
          no="05"
          kicker="Apparatus"
          title={<>What the experiments <em>are built with.</em></>}
          lead="The full kit — from rulesets and difficulty curves to netcode, GPU optimisation, XR and game AI. Sorted into drawers, labelled, mostly tidy."
        />

        <div className="drawers">
          {Object.entries(skills).map(([category, { items, blurb }], idx) => {
            const Icon = CATEGORY_ICON[category] ?? LuWrench
            return (
              <Reveal key={category} delay={(idx % 3) * 70} className="drawer-wrap">
                <div className="drawer sheet">
                  <div className="drawer__front">
                    <span className="drawer__icon" aria-hidden><Icon size={18} /></span>
                    <h3 className={`dymo ${DYMO_TONE[idx % DYMO_TONE.length]}`} style={{ ['--dymo-r' as string]: `${idx % 2 ? 1 : -1.3}deg` }}>
                      {category}
                    </h3>
                    <span className="drawer__count label">{String(items.length).padStart(2, '0')} items</span>
                  </div>
                  {blurb && <p className="drawer__blurb">{blurb}</p>}
                  <div className="drawer__items">
                    {items.map((skill) => <span key={skill} className="tag">{skill}</span>)}
                  </div>
                  <span className="drawer__pull" aria-hidden />
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
