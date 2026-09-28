import { useState, type FormEvent } from 'react'
import { LuGamepad2, LuGlasses, LuGlobe } from 'react-icons/lu'
import { SiUnity } from 'react-icons/si'
import { personalInfo } from '../../data'
import { openMail, copyToClipboard } from '../../lib/mail'
import SectionHead from '../ui/SectionHead'
import Reveal from '../ui/Reveal'
import Stamp from '../ui/Stamp'

const LOOKING_FOR = [
  { icon: LuGamepad2, label: 'Gameplay programming' },
  { icon: SiUnity, label: 'Unity development' },
  { icon: LuGlasses, label: 'XR development' },
  { icon: LuGlobe, label: 'Remote / relocation' },
]

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const [name, setName] = useState('')
  const [from, setFrom] = useState('')
  const [idea, setIdea] = useState('')

  const copyEmail = async () => {
    if (await copyToClipboard(personalInfo.email)) {
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    }
  }

  // No backend: the form writes the email for you and opens your mail app.
  const submit = (e: FormEvent) => {
    e.preventDefault()
    const subject = `Collaboration request${name ? ` from ${name}` : ''}`
    const body = [idea || '(what are you building?)', '', name && `— ${name}`, from && from].filter(Boolean).join('\n')
    openMail(`mailto:${personalInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`)
  }

  const directory = [
    { k: 'Email', v: personalInfo.email, href: `mailto:${personalInfo.email}` },
    { k: 'Phone', v: personalInfo.phone, href: `tel:${personalInfo.phone.replace(/[^+\d]/g, '')}` },
    { k: 'LinkedIn', v: personalInfo.linkedinHandle, href: personalInfo.linkedin },
    { k: 'GitHub', v: personalInfo.githubHandle, href: personalInfo.github },
  ]

  return (
    <section id="contact" className="section-pad contact">
      <div className="container">
        <SectionHead
          no="07"
          kicker="Requests"
          title={<>Got a question <em>worth testing?</em></>}
          lead="I'm looking for game development roles — full-time, freelance or contract. If you're building a mobile game, an XR experience, or need a Unity developer who ships, file a request."
        />

        <div className="contact__grid">
          <Reveal>
            <form className="slip sheet" onSubmit={submit}>
              <div className="slip__head">
                <div>
                  <p className="label">Form LN-07</p>
                  <p className="display slip__title">Request for collaboration</p>
                </div>
                <Stamp tone="ok" rotate={-8} large>Open to work</Stamp>
              </div>

              <label className="slip__field">
                <span className="label">01 · Your name</span>
                <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder="Ada Lovelace" />
              </label>
              <label className="slip__field">
                <span className="label">02 · Reply-to email</span>
                <input type="email" value={from} onChange={(e) => setFrom(e.target.value)} autoComplete="email" placeholder="ada@studio.com" />
              </label>
              <label className="slip__field">
                <span className="label">03 · Hypothesis — what are you building?</span>
                <textarea value={idea} onChange={(e) => setIdea(e.target.value)} rows={5} placeholder="A co-op puzzle game where…" />
              </label>

              <div className="slip__foot">
                <button type="submit" className="btn btn--signal">File the request →</button>
                <span className="hand slip__note">opens your mail app, pre-filled</span>
              </div>
            </form>
          </Reveal>

          <Reveal delay={100} className="contact__side">
            <p className="label">Or reach the lab directly</p>
            <ul className="directory">
              {directory.map((d) => (
                <li key={d.k}>
                  <span className="label directory__k">{d.k}</span>
                  <a
                    href={d.href}
                    target={d.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    onClick={(e) => { if (d.href.startsWith('mailto:')) { e.preventDefault(); openMail(d.href) } }}
                    className="directory__v"
                  >
                    {d.v}
                  </a>
                </li>
              ))}
            </ul>
            <button onClick={copyEmail} className="btn btn--sm contact__copy">{copied ? '✓ Copied to clipboard' : 'Copy email address'}</button>

            <p className="label contact__lf">Looking for</p>
            <div className="contact__chips">
              {LOOKING_FOR.map(({ icon: Icon, label }) => (
                <span key={label} className="tag">
                  <Icon size={13} aria-hidden />
                  {label}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
