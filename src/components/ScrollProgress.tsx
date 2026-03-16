import React, { useRef, useEffect } from 'react'

const ScrollProgress: React.FC = () => {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = window.scrollY / Math.max(1, maxScroll)
      bar.style.height = `${progress * 100}vh`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      ref={barRef}
      className="fixed left-0 top-0 w-[2px] bg-accent z-50 pointer-events-none"
      style={{ height: 0 }}
    />
  )
}

export default ScrollProgress
