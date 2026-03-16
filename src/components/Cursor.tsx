import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'

const Cursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    const text = textRef.current
    if (!dot || !ring || !text) return

    const xDot = gsap.quickTo(dot, 'x', { duration: 0.05, ease: 'power3.out' })
    const yDot = gsap.quickTo(dot, 'y', { duration: 0.05, ease: 'power3.out' })
    const xRing = gsap.quickTo(ring, 'x', { duration: 0.12, ease: 'power3.out' })
    const yRing = gsap.quickTo(ring, 'y', { duration: 0.12, ease: 'power3.out' })

    const onMove = (e: MouseEvent) => {
      xDot(e.clientX); yDot(e.clientY)
      xRing(e.clientX); yRing(e.clientY)
    }

    const expandRing = () =>
      gsap.to(ring, { scale: 1.71, backgroundColor: 'rgba(230,57,70,0.15)', duration: 0.25, ease: 'power2.out' })

    const onEnterInteractive = () => expandRing()

    const onEnterView = () => {
      expandRing()
      gsap.to(text, { opacity: 1, duration: 0.2, ease: 'power2.out' })
    }

    const onLeave = () => {
      gsap.to(text, { opacity: 0, duration: 0.15, ease: 'power2.in' })
      gsap.to(ring, { scale: 1, backgroundColor: 'rgba(0,0,0,0)', duration: 0.25, ease: 'power2.out' })
    }

    const attached = new WeakSet<HTMLElement>()

    const attachListeners = () => {
      // View cards first — they override generic interactive
      document.querySelectorAll<HTMLElement>('[data-cursor="view"]').forEach((el) => {
        if (attached.has(el)) return
        attached.add(el)
        el.addEventListener('mouseenter', onEnterView)
        el.addEventListener('mouseleave', onLeave)
      })
      document.querySelectorAll<HTMLElement>('a, button').forEach((el) => {
        if (attached.has(el)) return
        attached.add(el)
        el.addEventListener('mouseenter', onEnterInteractive)
        el.addEventListener('mouseleave', onLeave)
      })
    }

    attachListeners()
    window.addEventListener('mousemove', onMove)
    const observer = new MutationObserver(attachListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] w-1 h-1 rounded-full bg-accent"
        style={{ marginLeft: '-2px', marginTop: '-2px' }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] w-7 h-7 rounded-full border border-accent flex items-center justify-center"
        style={{ marginLeft: '-14px', marginTop: '-14px' }}
      >
        <span
          ref={textRef}
          className="font-mono text-[8px] tracking-widest text-accent uppercase"
          style={{ opacity: 0 }}
        >
          VIEW
        </span>
      </div>
    </>
  )
}

export default Cursor
