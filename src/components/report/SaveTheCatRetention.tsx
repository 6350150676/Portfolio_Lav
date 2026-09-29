import Stamp from '../ui/Stamp'

/* Save the Cat — retention design, drawn as diagrams.
 * "live" = in the released 1.0 build (commit 34bf19f); "next" = designed for
 * the next update. 1.0 ships no analytics, so no retention % is claimed —
 * the coin pace below is a worked example from the real economy numbers. */

type Status = 'live' | 'next'

function Tag({ s }: { s: Status }) {
  return <span className={`etag etag--${s}`}>{s === 'live' ? 'Live · 1.0' : 'Next update'}</span>
}

// real 1.0 economy
const PER_NEW_STAR = 10
const DAILY = 25
const GINGER = 250
const KING = 600
// worked example: 5 new levels a day at 2★ average, plus the daily puzzle
const PER_DAY = 5 * 2 * PER_NEW_STAR + DAILY // 125

const WEEK: { day: string; hook: string; s: Status; cat?: string }[] = [
  { day: 'Day 1', hook: 'First pack, first stars. Sunny is free. Hints show up after repeated fails, so nobody quits stuck.', s: 'live' },
  { day: 'Day 2', hook: 'A new daily puzzle: same for everyone, one try, a global rank.', s: 'live', cat: 'Ginger' },
  { day: 'Day 3', hook: 'Replays for the missing 3★ start paying.', s: 'live' },
  { day: 'Day 4', hook: 'Daily free crate: 3 optional ads a day.', s: 'next' },
  { day: 'Day 5', hook: 'Pack 1 (25 levels) done at this pace. Pack 2 starts.', s: 'live' },
  { day: 'Day 6', hook: 'A "coming soon" cat in the shop becomes buyable.', s: 'next' },
  { day: 'Day 7', hook: 'The King cat, at this pace.', s: 'live', cat: 'King' },
  { day: 'Day 7+', hook: 'A 7-day streak reward and new cats dropping into the shop.', s: 'next' },
]

export default function SaveTheCatRetention() {
  // cumulative coin balance, spending on Ginger the day it's affordable
  let bal = 0
  let gingerDay = 0
  let kingDay = 0
  const days = Array.from({ length: 7 }, (_, i) => {
    bal += PER_DAY
    let bought = ''
    if (!gingerDay && bal >= GINGER) { gingerDay = i + 1; bal -= GINGER; bought = 'Ginger' }
    else if (gingerDay && !kingDay && bal >= KING) { kingDay = i + 1; bal -= KING; bought = 'King' }
    return { d: i + 1, bal: bought ? bal + (bought === 'Ginger' ? GINGER : KING) : bal, bought }
  })
  const max = Math.max(KING, ...days.map((x) => x.bal))

  return (
    <div className="econ">
      <div className="econ__top">
        <p className="display econ__motto">Give them a reason to <em>come back tomorrow.</em></p>
        <div className="econ__legend">
          <Tag s="live" />
          <Tag s="next" />
        </div>
      </div>

      {/* R1 — first week */}
      <figure className="efig sheet">
        <figcaption className="label efig__cap">Fig. R1 — The first 7 days</figcaption>
        <ol className="week">
          {WEEK.map((w) => (
            <li key={w.day} className={`week__day week__day--${w.s}`}>
              <span className="week__n">{w.day}</span>
              <span className="week__hook">{w.hook}</span>
              {w.cat && <span className="week__cat">🐱 {w.cat}</span>}
              <Tag s={w.s} />
            </li>
          ))}
        </ol>
      </figure>

      <div className="econ__row">
        {/* R2 — coin pace */}
        <figure className="efig sheet">
          <figcaption className="label efig__cap">Fig. R2 — Coins pace the cats</figcaption>
          <div className="pace" aria-label={`Coins by day: Ginger affordable on day ${gingerDay}, King on day ${kingDay}`}>
            {days.map((x) => (
              <div key={x.d} className="pace__col">
                <span className={`pace__bar ${x.bought ? 'is-buy' : ''}`} style={{ height: `${(x.bal / max) * 100}%` }} title={x.bought ? `${x.bought} bought` : undefined} />
                <span className="pace__d">D{x.d}</span>
              </div>
            ))}
            <span className="pace__line" style={{ bottom: `${(KING / max) * 100}%` }}><b>King · {KING}</b></span>
            <span className="pace__line pace__line--g" style={{ bottom: `${(GINGER / max) * 100}%` }}><b>Ginger · {GINGER}</b></span>
          </div>
          <p className="pace__note">
            <span className="pace__key" aria-hidden /> green = the day a cat is bought
          </p>
          <p className="pace__note">
            <Tag s="live" /> +{PER_NEW_STAR} per new star · +2 replay · +{DAILY} daily
          </p>
          <p className="pace__note pace__note--hand hand">example: 5 new levels a day at 2★, plus the daily puzzle = {PER_DAY} coins a day</p>
        </figure>

        {/* R3 — three loops */}
        <figure className="efig sheet">
          <figcaption className="label efig__cap">Fig. R3 — Three reasons to return</figcaption>
          <div className="loops">
            <div className="loop">
              <b>📅 Daily</b>
              <span>new puzzle → one try → global rank → tomorrow</span>
              <Tag s="live" />
            </div>
            <div className="loop">
              <b>🐱 Collection</b>
              <span>stars → coins → cats → "coming soon" cats</span>
              <Tag s="live" />
            </div>
            <div className="loop">
              <b>⭐ Mastery</b>
              <span>replay for 3★ → endless levels after the campaign</span>
              <Tag s="live" />
            </div>
          </div>
        </figure>
      </div>

      {/* R4 — measuring it */}
      <figure className="efig sheet">
        <figcaption className="label efig__cap">Fig. R4 — Measuring it</figcaption>
        <div className="measure">
          <div className="loop">
            <b>📊 Firebase Analytics</b>
            <span>tutorial → level start / end / quit → stars · ink · attempts → coins earned &amp; spent → cats unlocked → ads</span>
            <span className="measure__out">→ D1 / D7 retention · where players drop off</span>
            <Tag s="next" />
          </div>
          <div className="loop">
            <b>🧯 Crashlytics breadcrumbs</b>
            <span>level staged (seed · archetype · variant) → stroke released → ad opened → app backgrounded</span>
            <span className="measure__out">→ keys: level · mode · attempt — enough to replay the crash</span>
            <Tag s="next" />
          </div>
        </div>
        <p className="hand measure__note">built — ships with the next update</p>
      </figure>

      <div className="gnotes">
        <Stamp tone="blue" rotate={-3}>Protect day 1</Stamp>
        <span className="tag">levels 1–3 ad-free</span>
        <span className="tag">hint after repeated fails</span>
      </div>
    </div>
  )
}
