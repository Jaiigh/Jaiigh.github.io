import React, { useState, useEffect } from 'react'

interface NavItem {
  label: string
  id: string
}

const NAV_ITEMS: NavItem[] = [
  { label: 'About', id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
]

const Nav: React.FC = () => {
  const [active, setActive] = useState('hero')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observers = NAV_ITEMS.map(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id)
        },
        { threshold: 0.3 },
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach((o) => o?.disconnect())
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 py-4 border-b border-border transition-all duration-300 ${
        scrolled ? 'backdrop-blur-md' : 'backdrop-blur-sm'
      }`}
      style={{ backgroundColor: 'rgba(245, 240, 232, 0.92)' }}
    >
      <button
        onClick={() => scrollTo('hero')}
        className="font-display text-accent2 text-2xl leading-none tracking-wide"
      >
        CC
      </button>
      <div className="flex items-center gap-8">
        {NAV_ITEMS.map(({ label, id }) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className={`group relative font-mono text-xs uppercase tracking-widest transition-colors duration-200 ${
              active === id ? 'text-foreground font-medium' : 'text-muted hover:text-foreground'
            }`}
          >
            {label}
            <span
              className="absolute -bottom-0.5 left-0 h-px bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
              style={{ width: '100%' }}
            />
          </button>
        ))}
      </div>
    </nav>
  )
}

export default Nav
