import { benchExperiments } from '../../data'
import SectionHead from '../ui/SectionHead'
import Reveal from '../ui/Reveal'
import BenchCard from '../bench/BenchCard'
import WallsToy from '../bench/WallsToy'
import SpeedToy from '../bench/SpeedToy'
import HeartToy from '../bench/HeartToy'
import ReconnectToy from '../bench/ReconnectToy'
import ResumeRun from '../bench/ResumeRun'
import { expNo } from '../../lib/lab'

const exp = (id: string) => benchExperiments.find((b) => b.id === id)!
const heroExp = exp('no-instructions')
const rest = benchExperiments.filter((b) => b !== heroExp).map((b) => b.no)

export default function Bench() {
  return (
    <section id="bench" className="bench section-pad">
      <div className="bench__ruler" aria-hidden />
      <div className="container">
        <SectionHead
          className="shead--mat"
          no="02"
          kicker="The bench"
          title={<>Don't read about it — <em>run&nbsp;it.</em></>}
          lead="Small experiments pulled out of real projects. Each one isolates a single idea from something I built, so you can poke at it yourself — and each links back to where it came from."
          note={<>{expNo(heroExp.no)} is the puzzle at the very top — these are {expNo(Math.min(...rest))} to {expNo(Math.max(...rest))}</>}
        />

        <div className="bench__grid">
          <Reveal><BenchCard exp={exp('walls')}><WallsToy /></BenchCard></Reveal>
          <Reveal delay={80}><BenchCard exp={exp('speed')}><SpeedToy /></BenchCard></Reveal>
          <Reveal><BenchCard exp={exp('heartbeat')}><HeartToy /></BenchCard></Reveal>
          <Reveal delay={80}><BenchCard exp={exp('reconnect')}><ReconnectToy /></BenchCard></Reveal>
        </div>

        <Reveal style={{ marginTop: '2rem' }}>
          <BenchCard exp={exp('resume-run')} wide><ResumeRun /></BenchCard>
        </Reveal>
      </div>
    </section>
  )
}
