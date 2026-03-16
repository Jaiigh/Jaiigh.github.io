import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'

const PageReveal: React.FC = () => {
  const overlayRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const overlay = overlayRef.current
    const line = lineRef.current
    if (!overlay || !line) return

    if (sessionStorage.getItem('intro-played') === 'true') {
      overlay.style.display = 'none'
      return
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          overlay.style.display = 'none'
          sessionStorage.setItem('intro-played', 'true')
        },
      })
      tl.fromTo(line, { width: 0 }, { width: '100vw', duration: 0.6, ease: 'power2.inOut' })
        .to(line, { opacity: 0, duration: 0.25, ease: 'power1.in' })
        .to(overlay, { opacity: 0, duration: 0.5, ease: 'power2.inOut' })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-bg z-[9950] flex items-center justify-center pointer-events-none"
    >
      <div ref={lineRef} className="h-px bg-accent" style={{ width: 0 }} />
    </div>
  )
}

export default PageReveal
