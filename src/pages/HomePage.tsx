import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import Experience from '../components/sections/Experience'
import Projects from '../components/sections/Projects'
import Bench from '../components/sections/Bench'
import Skills from '../components/sections/Skills'
import Achievements from '../components/sections/Achievements'
import Contact from '../components/sections/Contact'

export default function HomePage() {
  const { hash } = useLocation()

  // arriving from another page with /#section → scroll there once mounted
  useEffect(() => {
    if (!hash) return
    const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }), 80)
    return () => clearTimeout(t)
  }, [hash])

  return (
    <main>
      <Hero />
      <Projects />
      <Bench />
      <Experience />
      <About />
      <Skills />
      <Achievements />
      <Contact />
    </main>
  )
}
