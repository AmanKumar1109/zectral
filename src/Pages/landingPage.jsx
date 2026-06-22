import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import bgVideo from '../assets/bg.mp4'

const navLinks = [
  { label: 'FUTURE', active: false },
  { label: 'INNOVATION', active: true },
  { label: 'COLLABORATION', active: false },
  { label: 'EXCELLENCE', active: false },
  { label: 'PURPOSE', active: false },
  { label: 'LEGACY', active: false },
]

export default function LandingPage() {
  const [muted, setMuted] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const videoRef = useRef(null)

  // Refs for GSAP targets
  const logoRef = useRef(null)
  const navBtnsRef = useRef(null)
  const sideNavRef = useRef(null)
  const eyebrowRef = useRef(null)
  const headlineRef = useRef(null)
  const dividerRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctaBtnRef = useRef(null)
  const footerRef = useRef(null)
  const menuOverlayRef = useRef(null)
  const menuItemsRef = useRef([])

  const toggleSound = () => {
    setMuted(prev => {
      if (videoRef.current) videoRef.current.muted = !prev
      return !prev
    })
  }

  // ── Entrance Animation Timeline ──
  useEffect(() => {
    // Set will-change for GPU compositing upfront
    const gpuEls = [
      logoRef.current, navBtnsRef.current, eyebrowRef.current,
      headlineRef.current, dividerRef.current, subtitleRef.current,
      ctaBtnRef.current, footerRef.current,
    ]
    gpuEls.forEach(el => el && (el.style.willChange = 'transform, opacity'))
    if (sideNavRef.current) {
      Array.from(sideNavRef.current.children).forEach(el => (el.style.willChange = 'transform, opacity'))
    }

    const ctx = gsap.context(() => {
      // Single fast timeline — everything overlaps heavily
      const tl = gsap.timeline({
        defaults: { ease: 'power2.out', force3D: true },
      })

      // Navbar — fast drop
      tl.fromTo(
        [logoRef.current, navBtnsRef.current],
        { y: -18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, stagger: 0.08 }
      )

      // Side nav stagger — slides from left while navbar still moving
      tl.fromTo(
        sideNavRef.current.children,
        { x: -14, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.38, stagger: 0.045, force3D: true },
        '-=0.3'
      )

      // Hero block — all 4 elements animate together in a tight stagger
      tl.fromTo(
        [eyebrowRef.current, headlineRef.current, dividerRef.current, subtitleRef.current],
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.42, stagger: 0.07, force3D: true },
        '-=0.25'
      )

      // CTA + footer simultaneously
      tl.fromTo(
        [ctaBtnRef.current, footerRef.current],
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.38, stagger: 0.06, force3D: true },
        '-=0.25'
      )

      // Cleanup will-change after animation ends (frees GPU memory)
      tl.call(() => {
        gpuEls.forEach(el => el && (el.style.willChange = 'auto'))
        if (sideNavRef.current) {
          Array.from(sideNavRef.current.children).forEach(el => (el.style.willChange = 'auto'))
        }
      })

      // Gentle headline float — starts after entrance, very subtle
      gsap.to(headlineRef.current, {
        y: -5,
        duration: 3.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: tl.duration() + 0.2,
        force3D: true,
      })

      // Cyan glow pulse
      gsap.to('#cta-glow-dot', {
        boxShadow: '0 0 16px 5px rgba(34,211,238,0.85)',
        duration: 1.0,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: tl.duration(),
      })
    })

    return () => ctx.revert()
  }, [])

  // ── Menu Open/Close Animation ──
  useEffect(() => {
    if (menuOpen) {
      gsap.fromTo(menuOverlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.28, ease: 'power2.out' }
      )
      gsap.fromTo(
        menuItemsRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, stagger: 0.055, ease: 'power2.out', delay: 0.1, force3D: true }
      )
    } else {
      gsap.to(menuOverlayRef.current, { opacity: 0, duration: 0.22, ease: 'power2.in' })
    }
  }, [menuOpen])

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── Video Background ── */}
      <video
        ref={videoRef}
        src={bgVideo}
        autoPlay loop muted playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* ── Gradient Overlays ── */}
      <div className="absolute inset-0 z-10" style={{
        background: 'linear-gradient(to bottom, rgba(0,5,20,0.6) 0%, rgba(0,5,20,0.1) 40%, rgba(0,5,20,0.65) 75%, rgba(0,5,20,0.92) 100%)'
      }} />
      <div className="absolute inset-0 z-10" style={{
        background: 'radial-gradient(ellipse at center, transparent 45%, rgba(0,5,20,0.55) 100%)'
      }} />

      {/* ══ MAIN LAYOUT ══ */}
      <div className="absolute inset-0 z-20 flex flex-col" style={{ padding: '24px 32px' }}>

        {/* ── Navbar ── */}
        <header className="flex items-center justify-between w-full flex-shrink-0">
          <div
            ref={logoRef}
            className="flex items-center gap-2.5 text-white font-bold uppercase"
            style={{ letterSpacing: '0.28em', fontSize: 13, opacity: 0 }}
          >
            <span className="flex items-center justify-center text-white font-black" style={{
              width: 22, height: 22, fontSize: 9,
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.22)',
              borderRadius: 3,
            }}>Z</span>
            ZECTRAL
          </div>

          <div ref={navBtnsRef} className="flex items-center gap-3" style={{ opacity: 0 }}>
            {['PROJECTS', 'MENU'].map(label => (
              <button
                key={label}
                id={`${label.toLowerCase()}-btn`}
                onClick={label === 'MENU' ? () => setMenuOpen(true) : undefined}
                className="flex items-center gap-2 text-white/75 hover:text-white transition-all duration-300"
                style={{
                  fontSize: 10, letterSpacing: '0.2em',
                  padding: '8px 18px',
                  border: '1px solid rgba(255,255,255,0.18)',
                  background: 'rgba(255,255,255,0.04)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: 4, cursor: 'pointer',
                }}
                onMouseEnter={e => gsap.to(e.currentTarget, { background: 'rgba(255,255,255,0.1)', duration: 0.25 })}
                onMouseLeave={e => gsap.to(e.currentTarget, { background: 'rgba(255,255,255,0.04)', duration: 0.25 })}
              >
                {label === 'PROJECTS'
                  ? <span style={{ color: '#93c5fd', fontSize: 9 }}>✦</span>
                  : <svg style={{ width: 11, height: 11, opacity: 0.7 }} viewBox="0 0 24 24" fill="currentColor"><path d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" /></svg>
                }
                {label}
              </button>
            ))}
          </div>
        </header>

        {/* ── Spacer ── */}
        <div className="flex-1" />

        {/* ── Footer ── */}
        <footer ref={footerRef} className="flex items-center justify-between w-full flex-shrink-0" style={{ opacity: 0 }}>
          <button
            id="sound-btn"
            onClick={toggleSound}
            className="flex items-center gap-2 transition-colors duration-300 bg-transparent border-none cursor-pointer"
            style={{ color: 'rgba(255,255,255,0.38)', fontSize: 10, letterSpacing: '0.18em' }}
            onMouseEnter={e => gsap.to(e.currentTarget, { color: 'rgba(255,255,255,0.8)', duration: 0.2 })}
            onMouseLeave={e => gsap.to(e.currentTarget, { color: 'rgba(255,255,255,0.38)', duration: 0.2 })}
          >
            <svg style={{ width: 13, height: 13 }} viewBox="0 0 24 24" fill="currentColor">
              {muted
                ? <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                : <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              }
            </svg>
            SOUND {muted ? 'OFF' : 'ON'}
          </button>

          <a
            href="#"
            id="chat-btn"
            className="flex items-center gap-2 no-underline transition-colors duration-300"
            style={{ color: 'rgba(255,255,255,0.38)', fontSize: 10, letterSpacing: '0.18em' }}
            onMouseEnter={e => gsap.to(e.currentTarget, { color: 'rgba(255,255,255,0.8)', duration: 0.2 })}
            onMouseLeave={e => gsap.to(e.currentTarget, { color: 'rgba(255,255,255,0.38)', duration: 0.2 })}
          >
            CHAT WITH US
            <svg style={{ width: 13, height: 13 }} viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
            </svg>
          </a>
        </footer>
      </div>

      {/* ── LEFT SIDE NAV ── */}
      <aside
        ref={sideNavRef}
        className="absolute z-20 flex flex-col"
        style={{ left: 32, top: '50%', transform: 'translateY(-50%)', gap: 8 }}
      >
        {navLinks.map(({ label, active }) => (
          <a
            key={label}
            href="#"
            id={`side-nav-${label.toLowerCase()}`}
            className="flex items-center no-underline transition-all duration-300"
            style={{
              gap: 8, fontSize: 9, letterSpacing: '0.22em',
              color: active ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.3)',
              fontWeight: active ? 600 : 400,
              textTransform: 'uppercase',
              opacity: 0,
            }}
            onMouseEnter={e => !active && gsap.to(e.currentTarget, { color: 'rgba(255,255,255,0.65)', x: 3, duration: 0.2 })}
            onMouseLeave={e => !active && gsap.to(e.currentTarget, { color: 'rgba(255,255,255,0.3)', x: 0, duration: 0.2 })}
          >
            {active
              ? <span id="cta-glow-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#22d3ee', flexShrink: 0, boxShadow: '0 0 8px 3px rgba(34,211,238,0.55)' }} />
              : <span style={{ width: 1, height: 12, background: 'rgba(255,255,255,0.18)', flexShrink: 0 }} />
            }
            {label}
          </a>
        ))}
      </aside>

      {/* ── HERO CTA ── */}
      <div
        className="absolute z-20 flex flex-col items-center text-center"
        style={{ left: '50%', top: '52%', transform: 'translate(-50%, -50%)', width: '100%', maxWidth: 560, gap: 18 }}
      >
        {/* Eyebrow */}
        <div ref={eyebrowRef} className="flex items-center" style={{ gap: 12, opacity: 0 }}>
          <span style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.25)' }} />
          <span style={{ fontSize: 9, letterSpacing: '0.35em', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase' }}>
            Est. 2024 · Premium Development
          </span>
          <span style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.25)' }} />
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="text-white font-bold uppercase"
          style={{
            fontSize: 'clamp(28px, 4.5vw, 48px)',
            letterSpacing: '0.12em',
            lineHeight: 1.2,
            margin: 0,
            textShadow: '0 0 60px rgba(100,180,255,0.25), 0 2px 20px rgba(0,0,0,0.6)',
            opacity: 0,
          }}
        >
          WE BUILD THE FUTURE<br />
          <span style={{ color: 'rgba(190,225,255,0.88)' }}>OF REAL ESTATE</span>
        </h1>

        {/* Divider */}
        <div
          ref={dividerRef}
          style={{ width: 40, height: 1, background: 'rgba(255,255,255,0.2)', opacity: 0 }}
        />

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          style={{
            fontSize: 11, letterSpacing: '0.05em', lineHeight: 1.9,
            color: 'rgba(255,255,255,0.48)', margin: 0, maxWidth: 340, opacity: 0,
          }}
        >
          We work with experts from all over the world, because there is always something to learn.
          We are higher, dream bigger and create better.
        </p>

        {/* CTA Button */}
        <button
          ref={ctaBtnRef}
          id="discover-btn"
          className="group flex items-center"
          style={{
            gap: 10, fontSize: 10, letterSpacing: '0.25em',
            color: 'rgba(255,255,255,0.88)', textTransform: 'uppercase',
            padding: '11px 28px',
            border: '1px solid rgba(255,255,255,0.22)',
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(12px)',
            borderRadius: 3, cursor: 'pointer', marginTop: 4,
            opacity: 0,
          }}
          onMouseEnter={e => gsap.to(e.currentTarget, {
            background: 'rgba(255,255,255,0.1)',
            borderColor: 'rgba(255,255,255,0.4)',
            scale: 1.03,
            duration: 0.25,
          })}
          onMouseLeave={e => gsap.to(e.currentTarget, {
            background: 'rgba(255,255,255,0.05)',
            borderColor: 'rgba(255,255,255,0.22)',
            scale: 1,
            duration: 0.25,
          })}
        >
          <span style={{
            width: 6, height: 6, borderRadius: '50%',
            background: '#22d3ee', boxShadow: '0 0 8px 2px rgba(34,211,238,0.6)',
          }} />
          DISCOVER MORE
          <svg style={{ width: 12, height: 12, opacity: 0.5 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* ── MENU OVERLAY ── */}
      <div
        ref={menuOverlayRef}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center"
        style={{
          background: 'rgba(0,5,20,0.97)',
          backdropFilter: 'blur(20px)',
          opacity: 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute flex items-center gap-2 text-white/40 hover:text-white transition-colors duration-200 bg-transparent border-none cursor-pointer"
          style={{ top: 32, right: 32, fontSize: 10, letterSpacing: '0.2em' }}
          onMouseEnter={e => gsap.to(e.currentTarget, { color: 'rgba(255,255,255,1)', duration: 0.2 })}
          onMouseLeave={e => gsap.to(e.currentTarget, { color: 'rgba(255,255,255,0.4)', duration: 0.2 })}
        >
          ✕ CLOSE
        </button>

        <nav className="flex flex-col items-center" style={{ gap: 28 }}>
          {['HOME', 'PROJECTS', 'ABOUT US', 'CONTACT', 'CAREERS'].map((item, i) => (
            <a
              key={item}
              ref={el => menuItemsRef.current[i] = el}
              href="#"
              onClick={() => setMenuOpen(false)}
              className="no-underline font-bold uppercase"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                letterSpacing: '0.15em',
                color: 'rgba(255,255,255,0.65)',
                opacity: 0,
              }}
              onMouseEnter={e => gsap.to(e.currentTarget, { color: '#fff', x: 8, duration: 0.25 })}
              onMouseLeave={e => gsap.to(e.currentTarget, { color: 'rgba(255,255,255,0.65)', x: 0, duration: 0.25 })}
            >
              {item}
            </a>
          ))}
        </nav>

        <div
          className="absolute bottom-8 flex items-center"
          style={{ gap: 16, color: 'rgba(255,255,255,0.18)', fontSize: 9, letterSpacing: '0.2em' }}
        >
          <span>© 2024 ZECTRAL</span>
          <span style={{ width: 1, height: 10, background: 'rgba(255,255,255,0.2)' }} />
          <span>ALL RIGHTS RESERVED</span>
        </div>
      </div>

    </div>
  )
}
