import type { CSSProperties, ReactNode } from 'react'
import Stamp from '../ui/Stamp'

/* Save the Cat — monetization design, drawn as diagrams.
 * "live" = in the released 1.0 build (commit 34bf19f); "next" = designed for
 * the next update (gems, IAP, crates… are NOT in the release). Keep it that way. */

type Status = 'live' | 'next'

function Tag({ s }: { s: Status }) {
  return <span className={`etag etag--${s}`}>{s === 'live' ? 'Live · 1.0' : 'Next update'}</span>
}

function Node({ area, title, sub, s, icon }: { area: string; title: string; sub?: ReactNode; s: Status; icon?: string }) {
  return (
    <div className={`enode enode--${s}`} style={{ gridArea: area } as CSSProperties}>
      <span className="enode__t">{icon && <i aria-hidden>{icon}</i>}{title}</span>
      {sub && <span className="enode__s">{sub}</span>}
      <Tag s={s} />
    </div>
  )
}

function Conn({ area, children, dir = 'down' }: { area: string; children?: ReactNode; dir?: 'down' | 'left' | 'right' | 'dl' | 'dr' }) {
  const glyph = { down: '↓', left: '←', right: '→', dl: '↙', dr: '↘' }[dir]
  return (
    <div className={`elink elink--${dir}`} style={{ gridArea: area }} aria-hidden>
      <b>{glyph}</b>
      {children && <span>{children}</span>}
    </div>
  )
}

const PLACEMENTS: { what: string; type: 'Rewarded' | 'Interstitial' | 'Banner' | 'IAP'; when: string; s: Status }[] = [
  { what: 'Hint', type: 'Rewarded', when: 'player chooses', s: 'live' },
  { what: 'Full solution (2nd ad)', type: 'Rewarded', when: 'player chooses', s: 'next' },
  { what: '2× level coins', type: 'Rewarded', when: 'player chooses', s: 'next' },
  { what: 'Shop coin bonus', type: 'Rewarded', when: 'capped per day', s: 'next' },
  { what: 'Daily free crate', type: 'Rewarded', when: '3 ads · once a day', s: 'next' },
  { what: 'Level break', type: 'Interstitial', when: '≥150 s · every 3–5 wins', s: 'live' },
  { what: 'Screen banner', type: 'Banner', when: 'one slot', s: 'live' },
  { what: 'Remove ads · gem packs · bundles', type: 'IAP', when: 'optional', s: 'next' },
]

const LADDER: { tier: string; cur: 'coins' | 'gems'; h: number }[] = [
  { tier: 'Standard', cur: 'coins', h: 28 },
  { tier: 'Rare', cur: 'coins', h: 42 },
  { tier: 'Elite', cur: 'coins', h: 56 },
  { tier: 'Supreme', cur: 'coins', h: 70 },
  { tier: 'Premium', cur: 'gems', h: 92 },
]

export default function SaveTheCatEconomy() {
  return (
    <div className="econ">
      <div className="econ__top">
        <p className="display econ__motto">Every ad is a <em>choice</em>, never a toll.</p>
        <div className="econ__legend">
          <Tag s="live" />
          <Tag s="next" />
        </div>
        <div className="econ__profit">
          <Stamp tone="ok" rotate={-7} large>Profitable</Stamp>
          <span className="hand">the live 1.0 setup — paced ads + coin shop — made the game profitable</span>
        </div>
      </div>

      {/* A — the economy */}
      <figure className="efig sheet">
        <figcaption className="label efig__cap">Fig. A — The economy</figcaption>
        <div className="eflow">
          <Node area="play" title="Gameplay" icon="🎮" sub="win · replay · daily puzzle" s="live" />
          <Conn area="l1" dir="dl">earns</Conn>
          <Conn area="l2" dir="dr">optional</Conn>
          <Node area="coins" title="Coins" icon="🪙" sub="+10 new star · +2 replay · +25 daily" s="live" />
          <Conn area="l3" dir="left">bonus coins</Conn>
          <Node area="ads" title="Rewarded ads" icon="🎁" sub="hint now — 2× coins, shop bonus & daily crate next" s="live" />
          <Conn area="l4">spend</Conn>
          <Node area="shop" title="Coin shop" icon="🛒" sub="cat skins now — crates next" s="live" />
          <div className="ewall" style={{ gridArea: 'wall' }}><span className="label">premium line — coins can't casually cross it</span></div>
          <Node area="xchg" title="Slow exchange" icon="⚖️" sub="5,000 coins → 50 gems · weekly cap" s="next" />
          <Node area="gems" title="Gems" icon="💎" sub="premium currency" s="next" />
          <Node area="iap" title="In-app purchase" icon="💳" sub="gem packs · starter pack · remove ads" s="next" />
          <Conn area="l5" dir="right" />
          <Conn area="l6" dir="left" />
          <Conn area="l7">unlock</Conn>
          <Node area="prem" title="Premium skins" icon="✨" sub="trails · particles · victory animations — cosmetic only" s="next" />
        </div>
      </figure>

      <div className="econ__row">
        {/* B — interstitial gate */}
        <figure className="efig sheet">
          <figcaption className="label efig__cap">Fig. B — When an interstitial may show</figcaption>
          <div className="egate">
            <span className="gstep">WIN</span>
            <b className="garr">→</b>
            <span className="gstep">Results</span>
            <b className="garr">→</b>
            <span className="gstep">tap NEXT</span>
            <b className="garr">→</b>
            <span className="gdiamond"><span>≥150 s since last ad<br />&amp; 3–5 wins?</span></span>
            <div className="gbranch">
              <span className="gyes"><b>yes →</b> <span className="gstep gstep--ad">AD</span> → next level</span>
              <span className="gno"><b>no →</b> next level</span>
            </div>
          </div>
          <div className="gnotes">
            <span className="tag">never mid-level</span>
            <span className="tag">levels 1–3 ad-free</span>
            <span className="tag">after losses: every 7–10</span>
            <Tag s="live" />
          </div>
        </figure>

        {/* C — skin ladder */}
        <figure className="efig sheet">
          <figcaption className="label efig__cap">Fig. C — Skin tiers</figcaption>
          <div className="eladder" aria-label="Standard, Rare, Elite and Supreme skins cost coins; Premium skins cost gems">
            {LADDER.map((t) => (
              <div key={t.tier} className={`erung erung--${t.cur}`}>
                <span className="erung__bar" style={{ height: t.h }} />
                <span className="erung__t">{t.tier}</span>
                <span className="erung__c">{t.cur === 'coins' ? '🪙' : '💎'}</span>
              </div>
            ))}
          </div>
          <p className="eladder__live">
            <Tag s="live" /> Sunny <b>free</b> · Ginger <b>250</b> · King <b>600</b> coins
          </p>
        </figure>
      </div>

      {/* D — where ads go */}
      <figure className="efig sheet">
        <figcaption className="label efig__cap">Fig. D — Every placement</figcaption>
        <div className="eplace" role="table" aria-label="Ad and purchase placements">
          {PLACEMENTS.map((p) => (
            <div key={p.what} className="eplace__row" role="row">
              <span className="eplace__what" role="cell">{p.what}</span>
              <span className={`eplace__type eplace__type--${p.type.toLowerCase()}`} role="cell">{p.type}</span>
              <span className="eplace__when" role="cell">{p.when}</span>
              <span role="cell"><Tag s={p.s} /></span>
            </div>
          ))}
        </div>
      </figure>

      {/* E — three kinds of player */}
      <figure className="efig sheet">
        <figcaption className="label efig__cap">Fig. E — One game, three kinds of player</figcaption>
        <div className="eplayers">
          <div><span className="eplayers__i">🙂</span><b>Never watches ads</b><span>still plays everything</span></div>
          <b className="garr">·</b>
          <div><span className="eplayers__i">🎁</span><b>Likes free stuff</b><span>watches a few — by choice</span></div>
          <b className="garr">·</b>
          <div><span className="eplayers__i">💎</span><b>Loves the game</b><span>buys cosmetics</span></div>
        </div>
        <div className="gnotes">
          <Stamp tone="blue" rotate={-3}>Child-directed ads (Families)</Stamp>
          <Stamp tone="signal" rotate={2}>No pay-to-win</Stamp>
          <Stamp tone="ok" rotate={-2}>Gems stay premium</Stamp>
        </div>
      </figure>
    </div>
  )
}
