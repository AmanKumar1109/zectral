import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import bgVideo from '../assets/bg3.mp4'
import logoSvg from '../assets/Zectral.svg'

gsap.registerPlugin(ScrollTrigger)

/* ─── Data ─────────────────────────────────────── */
const navLinks = ['FUTURE', 'INNOVATION', 'COLLABORATION', 'EXCELLENCE', 'PURPOSE', 'LEGACY']
  .map((label, i) => ({ label, active: i === 1 }))

const stats = [
  { number: '99.99%', label: 'Uptime SLA Guarantee' },
  { number: '<12ms', label: 'Global Edge Latency' },
  { number: '150K+', label: 'Deploys Per Day' },
  { number: '10x', label: 'Faster Release Cycles' },
]

const testimonials = [
  {
    quote: 'Zectral completely consolidated our cloud workflow. Our deployment speeds went from 20 minutes to under 30 seconds. The developer ergonomics are incredible.',
    name: 'Sarah Mitchell', role: 'VP of Engineering, Vercel', initials: 'SM',
  },
  {
    quote: 'Building and scaling complex microservices has never been this simple. Highly recommended for modern engineering teams.',
    name: 'James Anderson', role: 'Lead Architect, Stripe', initials: 'JA',
  },
  {
    quote: 'The real-time collaboration feature alone saved us hundreds of meeting hours. It’s like Google Docs but for deployment infrastructure.',
    name: 'Priya Sharma', role: 'Head of Infrastructure, Supabase', initials: 'PS',
  },
]

const clients = [
  { name: 'Gita Classes', desc: 'Fee Management System' },
  { name: 'Gym Desk', desc: 'Fees & Management Desk' },
  { name: 'SmartSpire', desc: 'Enterprise ERP Application' },
  { name: 'Provenance 6.0', desc: 'RVS College Jamshedpur Website' },
]

const footerCols = [
  { heading: 'Product', links: ['Features', 'Pricing', 'Security', 'Roadmap'] },
  { heading: 'Developers', links: ['Documentation', 'API Reference', 'SDKs', 'Changelog'] },
  { heading: 'Company', links: ['About Us', 'Careers', 'Blog', 'Contact'] },
]

/* ─── Shared inline style tokens ───────────────── */
const T = {
  label: { fontFamily: "'Space Grotesk', sans-serif", fontSize: 9, letterSpacing: '0.35em', color: '#ffffff', textTransform: 'uppercase', fontWeight: 600 },
  heading: { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: '#fff', letterSpacing: '0.04em', lineHeight: 1.2, textTransform: 'uppercase', margin: 0 },
  body: { fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, lineHeight: 1.9, color: '#ffffff' },
  card: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.22)',
    borderRadius: 14,
    backdropFilter: 'blur(16px)',
    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
  },
}

/* ─── Sub-components ───────────────────────────── */
function SectionLabel({ text, center = false }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: center ? 'center' : 'flex-start', marginBottom: 16 }}>
      <span style={{ width: 24, height: 1, background: '#ffffff' }} />
      <span style={T.label}>{text}</span>
      {center && <span style={{ width: 24, height: 1, background: '#ffffff' }} />}
    </div>
  )
}

/* ═══════════════════════════════════════════════ */
export default function LandingPage() {
  const [muted, setMuted] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [formStatus, setFormStatus] = useState('idle') // idle | sending | success | error
  const videoRef = useRef(null)

  /* Hero refs */
  const logoRef = useRef(null)
  const navBtnsRef = useRef(null)
  const sideNavRef = useRef(null)
  const eyebrowRef = useRef(null)
  const headlineRef = useRef(null)
  const dividerRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctaBtnRef = useRef(null)
  const footerBarRef = useRef(null)

  /* Menu refs */
  const menuOverlayRef = useRef(null)
  const menuItemsRef = useRef([])

  /* Section refs */
  const aboutRef = useRef(null)
  const aboutBody = useRef(null)
  const statsRef = useRef([])
  const testiRef = useRef(null)
  const testiCards = useRef([])
  const clientsRef = useRef(null)
  const clientItems = useRef([])
  const contactRef = useRef(null)
  const contactBody = useRef(null)

  /* ── Hero entrance ── */
  useEffect(() => {
    // NOTE: No will-change here — setting will-change:transform on any ancestor
    // of a position:fixed element breaks fixedness. Portal approach handles GPU.
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out', force3D: true } })

      tl.fromTo([logoRef.current, navBtnsRef.current],
        { y: -18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, stagger: 0.08 })

      tl.fromTo(sideNavRef.current.children,
        { x: -14, opacity: 0 }, { x: 0, opacity: 1, duration: 0.38, stagger: 0.045 }, '-=0.3')

      tl.fromTo(
        [eyebrowRef.current, headlineRef.current, dividerRef.current, subtitleRef.current],
        { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.42, stagger: 0.07 }, '-=0.25')

      tl.fromTo([ctaBtnRef.current, footerBarRef.current],
        { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.38, stagger: 0.06 }, '-=0.25')

      gsap.to(headlineRef.current, {
        y: -5, duration: 3.5, ease: 'sine.inOut', repeat: -1, yoyo: true,
        delay: tl.duration() + 0.2, force3D: true,
      })
      gsap.to('#hero-glow-dot', {
        boxShadow: '0 0 16px 5px rgba(255,255,255,0.85)',
        duration: 1.0, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: tl.duration(),
      })
    })
    return () => ctx.revert()
  }, [])

  /* ── ScrollTrigger for sections ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. About Section (The Platform) Animations
      if (aboutRef.current) {
        const title = aboutRef.current.querySelector('h2')
        const contents = aboutRef.current.querySelectorAll('p, button')

        // Title curtain reveal with clipPath
        gsap.fromTo(title,
          { opacity: 0, y: 55, clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' },
          {
            opacity: 1, y: 0, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            duration: 0.95, ease: 'power4.out',
            scrollTrigger: { trigger: aboutRef.current, start: 'top 85%', toggleActions: 'play reverse play reverse' }
          }
        )
        // Content staggered 3D fade up
        gsap.fromTo(contents,
          { opacity: 0, y: 40, rotationX: -10, transformPerspective: 1000 },
          {
            opacity: 1, y: 0, rotationX: 0,
            duration: 0.8, stagger: 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: aboutRef.current, start: 'top 82%', toggleActions: 'play reverse play reverse' }
          }
        )
        // Stats 3D stagger reveal
        gsap.fromTo(statsRef.current,
          { opacity: 0, y: 60, scale: 0.85, rotationY: -15, transformPerspective: 1000 },
          {
            opacity: 1, y: 0, scale: 1, rotationY: 0,
            duration: 0.75, stagger: 0.06, ease: 'power3.out',
            scrollTrigger: { trigger: aboutRef.current, start: 'top 78%', toggleActions: 'play reverse play reverse' }
          }
        )
      }

      // 2. Testimonials Animations
      if (testiRef.current) {
        const title = testiRef.current.querySelector('h2')

        gsap.fromTo(title,
          { opacity: 0, y: 55, clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' },
          {
            opacity: 1, y: 0, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            duration: 0.95, ease: 'power4.out',
            scrollTrigger: { trigger: testiRef.current, start: 'top 85%', toggleActions: 'play reverse play reverse' }
          }
        )
        gsap.fromTo(testiCards.current,
          { opacity: 0, y: 70, scale: 0.9, rotationX: -15, transformPerspective: 1000 },
          {
            opacity: 1, y: 0, scale: 1, rotationX: 0,
            duration: 0.85, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: testiRef.current, start: 'top 80%', toggleActions: 'play reverse play reverse' }
          }
        )
      }

      // 3. Integrations Section Animations
      if (clientsRef.current) {
        const title = clientsRef.current.querySelector('h2')

        gsap.fromTo(title,
          { opacity: 0, y: 55, clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' },
          {
            opacity: 1, y: 0, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            duration: 0.95, ease: 'power4.out',
            scrollTrigger: { trigger: clientsRef.current, start: 'top 85%', toggleActions: 'play reverse play reverse' }
          }
        )
        gsap.fromTo(clientItems.current,
          { opacity: 0, scale: 0.8, y: 30, rotationY: 20, transformPerspective: 1000 },
          {
            opacity: 1, scale: 1, y: 0, rotationY: 0,
            duration: 0.6, stagger: 0.04, ease: 'power2.out',
            scrollTrigger: { trigger: clientsRef.current, start: 'top 80%', toggleActions: 'play reverse play reverse' }
          }
        )
      }

      // 4. Contact Section Animations
      if (contactRef.current) {
        const title = contactRef.current.querySelector('h2')
        const infoItems = contactRef.current.querySelectorAll('p, div[style*="display: flex"]')
        const formFields = contactRef.current.querySelectorAll('form > div, form > button')

        gsap.fromTo(title,
          { opacity: 0, y: 55, clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' },
          {
            opacity: 1, y: 0, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            duration: 0.95, ease: 'power4.out',
            scrollTrigger: { trigger: contactRef.current, start: 'top 85%', toggleActions: 'play reverse play reverse' }
          }
        )
        gsap.fromTo(infoItems,
          { opacity: 0, x: -30 },
          {
            opacity: 1, x: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: contactRef.current, start: 'top 82%', toggleActions: 'play reverse play reverse' }
          }
        )
        gsap.fromTo(formFields,
          { opacity: 0, y: 40, rotationX: -10, transformPerspective: 1000 },
          {
            opacity: 1, y: 0, rotationX: 0,
            duration: 0.85, stagger: 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: contactRef.current, start: 'top 80%', toggleActions: 'play reverse play reverse' }
          }
        )
      }
    })
    return () => ctx.revert()
  }, [])

  /* ── Menu animation ── */
  useEffect(() => {
    if (menuOpen) {
      gsap.fromTo(menuOverlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.28, ease: 'power2.out' })
      gsap.fromTo(menuItemsRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, stagger: 0.055, ease: 'power2.out', delay: 0.1, force3D: true })
    } else {
      if (menuOverlayRef.current)
        gsap.to(menuOverlayRef.current, { opacity: 0, duration: 0.22, ease: 'power2.in' })
    }
  }, [menuOpen])

  const toggleSound = () =>
    setMuted(prev => { if (videoRef.current) videoRef.current.muted = !prev; return !prev })

  const fieldStyle = {
    width: '100%', padding: '14px 18px', boxSizing: 'border-box',
    background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.25)',
    borderRadius: 8, color: '#fff', fontSize: 13, outline: 'none',
    letterSpacing: '0.03em', fontFamily: 'inherit',
    transition: 'all 0.3s ease',
  }
  const onFocus = e => (e.target.style.borderColor = '#ffffff')
  const onBlur = e => (e.target.style.borderColor = 'rgba(255,255,255,0.25)')

  /* ══════════ RENDER ══════════════════════════════ */
  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* ── Video + Overlays via Portal → direct body children
           This is the ONLY way to guarantee position:fixed works
           regardless of what GSAP or any ancestor CSS does ── */}
      {createPortal(
        <>
          <video
            ref={videoRef}
            src={bgVideo}
            autoPlay loop muted playsInline
            style={{
              position: 'fixed', top: 0, left: 0,
              width: '100vw', height: '100vh',
              objectFit: 'cover', zIndex: 0,
              pointerEvents: 'none',
            }}
          />
          <div style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1, pointerEvents: 'none',
            background: 'linear-gradient(to bottom,rgba(0,5,20,.62) 0%,rgba(0,5,20,.08) 40%,rgba(0,5,20,.66) 75%,rgba(0,5,20,.93) 100%)'
          }} />
          <div style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1, pointerEvents: 'none',
            background: 'radial-gradient(ellipse at center,transparent 45%,rgba(0,5,20,.55) 100%)'
          }} />
        </>,
        document.body
      )}

      {/* ════════════════════════════════════════
           SECTION 1 — HERO (full-screen)
      ════════════════════════════════════════ */}
      <section style={{ position: 'relative', height: '100vh', zIndex: 10 }}>

        {/* Navbar + footer-bar column */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', padding: 'clamp(16px,3vw,24px) clamp(16px,4vw,32px)' }}>

          {/* Navbar */}
          <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
            <div ref={logoRef} style={{ display: 'flex', alignItems: 'center', opacity: 0 }}>
              <img src={logoSvg} alt="ZECTRAL" style={{ height: 70, width: 'auto' }} />
            </div>
            <div ref={navBtnsRef} style={{ display: 'flex', alignItems: 'center', gap: 12, opacity: 0 }}>
              {['PROJECTS', 'MENU'].map(label => (
                <button key={label} id={`${label.toLowerCase()}-btn`}
                  onClick={label === 'MENU' ? () => setMenuOpen(true) : undefined}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 10, letterSpacing: '0.2em', color: '#ffffff', padding: '8px 18px', border: '1px solid rgba(255,255,255,.3)', background: 'rgba(255,255,255,.1)', backdropFilter: 'blur(12px)', borderRadius: 4, cursor: 'pointer', textTransform: 'uppercase' }}
                  onMouseEnter={e => gsap.to(e.currentTarget, { background: 'rgba(255,255,255,.2)', color: '#fff', duration: .2 })}
                  onMouseLeave={e => gsap.to(e.currentTarget, { background: 'rgba(255,255,255,.1)', color: '#ffffff', duration: .2 })}
                >
                  {label === 'PROJECTS' ? <span style={{ color: '#fff', fontSize: 9 }}>✦</span>
                    : <svg style={{ width: 11, height: 11, opacity: 1 }} viewBox="0 0 24 24" fill="currentColor"><path d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" /></svg>}
                  {label}
                </button>
              ))}
            </div>
          </header>

          <div style={{ flex: 1 }} />

          {/* Bottom bar */}
          <footer ref={footerBarRef} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0, opacity: 0 }}>
            <button id="sound-btn" onClick={toggleSound}
              style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#ffffff', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', background: 'transparent', border: 'none', cursor: 'pointer' }}
              onMouseEnter={e => gsap.to(e.currentTarget, { color: '#ffffff', textShadow: '0 0 8px rgba(255,255,255,0.6)', duration: .2 })}
              onMouseLeave={e => gsap.to(e.currentTarget, { color: '#ffffff', textShadow: 'none', duration: .2 })}
            >
              <svg style={{ width: 13, height: 13 }} viewBox="0 0 24 24" fill="currentColor">
                {muted
                  ? <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                  : <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                }
              </svg>
              SOUND {muted ? 'OFF' : 'ON'}
            </button>
            <a href="#" id="chat-btn"
              style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#ffffff', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none' }}
              onMouseEnter={e => gsap.to(e.currentTarget, { color: '#ffffff', textShadow: '0 0 8px rgba(255,255,255,0.6)', duration: .2 })}
              onMouseLeave={e => gsap.to(e.currentTarget, { color: '#ffffff', textShadow: 'none', duration: .2 })}
            >
              CHAT WITH US
              <svg style={{ width: 13, height: 13 }} viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
              </svg>
            </a>
          </footer>
        </div>

        {/* Side Nav — hidden below md */}
        <aside ref={sideNavRef}
          className="hidden md:flex"
          style={{ position: 'absolute', left: 32, top: '50%', transform: 'translateY(-50%)', zIndex: 20, flexDirection: 'column', gap: 8 }}
        >
          {navLinks.map(({ label, active }) => (
            <a key={label} href="#" id={`side-nav-${label.toLowerCase()}`}
              style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: active ? '#ffffff' : 'rgba(255,255,255,.7)', fontWeight: active ? 600 : 400, textDecoration: 'none', opacity: 0 }}
              onMouseEnter={e => !active && gsap.to(e.currentTarget, { color: '#ffffff', x: 3, duration: .2 })}
              onMouseLeave={e => !active && gsap.to(e.currentTarget, { color: 'rgba(255,255,255,.7)', x: 0, duration: .2 })}
            >
              {active
                ? <span id="hero-glow-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff', flexShrink: 0, boxShadow: '0 0 8px 3px rgba(255,255,255,.55)' }} />
                : <span style={{ width: 1, height: 12, background: 'rgba(255,255,255,.3)', flexShrink: 0 }} />
              }
              {label}
            </a>
          ))}
        </aside>

        {/* Hero CTA */}
        <div style={{ position: 'absolute', left: '50%', top: '52%', transform: 'translate(-50%,-50%)', width: '100%', maxWidth: 560, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 18, padding: '0 16px', boxSizing: 'border-box' }}>
          <div ref={eyebrowRef} style={{ display: 'flex', alignItems: 'center', gap: 12, opacity: 0 }}>
            <span style={{ width: 32, height: 1, background: 'rgba(255,255,255,.6)' }} />
            <span style={{ fontSize: 9, letterSpacing: '0.35em', color: '#ffffff', textTransform: 'uppercase' }}>Est. 2024 · Enterprise Cloud Platform</span>
            <span style={{ width: 32, height: 1, background: 'rgba(255,255,255,.6)' }} />
          </div>

          <h1 ref={headlineRef} style={{ ...T.heading, fontSize: 'clamp(26px,4.5vw,48px)', textShadow: '0 0 60px rgba(255,255,255,.15),0 2px 20px rgba(0,0,0,.6)', opacity: 0 }}>
            ORCHESTRATE YOUR<br />
            <span style={{ color: '#ffffff' }}>CLOUD INFRASTRUCTURE</span>
          </h1>

          <div ref={dividerRef} style={{ width: 40, height: 1, background: 'rgba(255,255,255,.6)', opacity: 0 }} />

          <p ref={subtitleRef} style={{ ...T.body, fontSize: 11, maxWidth: 380, opacity: 0 }}>
            Zectral is the unified developer platform for modern tech organizations. Deploy, monitor, and automate cloud operations globally with a single click.
          </p>

          <button ref={ctaBtnRef} id="discover-btn"
            style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 10, letterSpacing: '0.25em', color: '#ffffff', textTransform: 'uppercase', padding: '11px 28px', border: '1px solid rgba(255,255,255,.35)', background: 'rgba(255,255,255,.1)', backdropFilter: 'blur(12px)', borderRadius: 3, cursor: 'pointer', marginTop: 4, opacity: 0 }}
            onMouseEnter={e => gsap.to(e.currentTarget, { background: 'rgba(255,255,255,.18)', scale: 1.03, duration: .25 })}
            onMouseLeave={e => gsap.to(e.currentTarget, { background: 'rgba(255,255,255,.1)', scale: 1, duration: .25 })}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff', boxShadow: '0 0 8px 2px rgba(255,255,255,.6)' }} />
            GET STARTED
            <svg style={{ width: 12, height: 12, opacity: .5 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>

      {/* ════════════════════════════════════════
           SECTION 2 — ABOUT
      ════════════════════════════════════════ */}
      <section ref={aboutRef} id="about" style={{ position: 'relative', zIndex: 10, background: 'transparent', padding: 'clamp(64px,10vw,96px) 0' }}>
        <div ref={aboutBody} style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(16px,5vw,48px)' }}>
          <SectionLabel text="THE PLATFORM" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 'clamp(40px,6vw,72px)', alignItems: 'center' }}>

            {/* Text */}
            <div>
              <h2 style={{ ...T.heading, fontSize: 'clamp(22px,3.5vw,42px)', marginBottom: 24 }}>
                Deploy at the speed<br /><span style={{ color: '#ffffff' }}>of thought</span>
              </h2>
              <p style={{ ...T.body, marginBottom: 16, maxWidth: 480 }}>
                We provide a fully integrated suite of tools for engineering teams. Automated CI/CD, smart cache layers, global serverless edge functions, and advanced log observability come fully standard.
              </p>
              <p style={{ ...T.body, maxWidth: 480 }}>
                No server provisioning, no complex configuration files, no headache. Just push your code to your repository and we take care of the rest.
              </p>
              <button style={{ marginTop: 32, display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 10, letterSpacing: '0.22em', color: '#fff', textTransform: 'uppercase', padding: '10px 24px', border: '1px solid rgba(255,255,255,.5)', background: 'rgba(255,255,255,.1)', borderRadius: 3, cursor: 'pointer' }}
                onMouseEnter={e => gsap.to(e.currentTarget, { background: 'rgba(255,255,255,.2)', borderColor: '#ffffff', duration: .2 })}
                onMouseLeave={e => gsap.to(e.currentTarget, { background: 'rgba(255,255,255,.1)', borderColor: 'rgba(255,255,255,.5)', duration: .2 })}
              >
                EXPLORE FEATURES
                <svg style={{ width: 12, height: 12 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
            </div>

            {/* Stats grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 16 }}>
              {stats.map((s, i) => (
                <div key={s.label} ref={el => statsRef.current[i] = el}
                  style={{
                    padding: 'clamp(20px,3vw,32px) 24px',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
                    border: '1px solid rgba(255,255,255,.2)',
                    borderRadius: 12,
                    backdropFilter: 'blur(12px)',
                    transition: 'all 0.3s ease',
                    cursor: 'default',
                    opacity: 0
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; e.currentTarget.style.background = 'rgba(255,255,255,0.14)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)' }}
                >
                  <div style={{ fontSize: 'clamp(26px,4vw,40px)', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: 8, fontFamily: "'Space Grotesk', sans-serif" }}>{s.number}</div>
                  <div style={{ fontSize: 10, letterSpacing: '0.18em', color: '#ffffff', textTransform: 'uppercase', fontWeight: 500 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
           SECTION 3 — TESTIMONIALS
      ════════════════════════════════════════ */}
      <section ref={testiRef} id="testimonials" style={{ position: 'relative', zIndex: 10, background: 'transparent', padding: 'clamp(64px,10vw,96px) 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(16px,5vw,48px)' }}>
          <SectionLabel text="DEVELOPER LOVE" />
          <h2 style={{ ...T.heading, fontSize: 'clamp(20px,3vw,36px)', marginBottom: 'clamp(32px,5vw,56px)' }}>What Engineering Leaders Say</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(270px,1fr))', gap: 24 }}>
            {testimonials.map((t, i) => (
              <div key={t.name} ref={el => testiCards.current[i] = el}
                style={{ ...T.card, padding: 'clamp(24px,4vw,32px)', opacity: 0, cursor: 'default' }}
                onMouseEnter={e => gsap.to(e.currentTarget, { y: -6, background: 'rgba(255,255,255,.16)', borderColor: 'rgba(255,255,255,.4)', boxShadow: '0 12px 40px rgba(255,255,255,0.03)', duration: .35, ease: 'power2.out' })}
                onMouseLeave={e => gsap.to(e.currentTarget, { y: 0, background: 'rgba(255,255,255,.08)', borderColor: 'rgba(255,255,255,.22)', boxShadow: 'none', duration: .35, ease: 'power2.out' })}
              >
                <div style={{ fontSize: 44, color: '#ffffff', opacity: .4, lineHeight: 1, marginBottom: 4, fontFamily: 'Georgia,serif' }}>"</div>
                <p style={{ ...T.body, marginBottom: 28, fontSize: 13.5, lineHeight: 1.8 }}>{t.quote}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: 18 }}>
                  <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(255,255,255,.15)', border: '1px solid rgba(255,255,255,.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600, color: '#ffffff', letterSpacing: '0.05em', flexShrink: 0 }}>
                    {t.initials}
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#fff', letterSpacing: '0.05em' }}>{t.name}</div>
                    <div style={{ fontSize: 10, color: '#ffffff', letterSpacing: '0.08em', marginTop: 3 }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
           SECTION 4 — PROJECTS
      ════════════════════════════════════════ */}
      <section ref={clientsRef} id="clients" style={{ position: 'relative', zIndex: 10, background: 'transparent', padding: 'clamp(56px,8vw,80px) 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(16px,5vw,48px)' }}>
          <SectionLabel text="OUR WORK" center />
          <h2 style={{ ...T.heading, fontSize: 'clamp(20px,3vw,36px)', textAlign: 'center', marginBottom: 'clamp(32px,5vw,52px)' }}>Featured Software & Deliveries</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16 }}>
            {clients.map((c, i) => (
              <div key={c.name} ref={el => clientItems.current[i] = el}
                style={{
                  padding: 'clamp(20px,3vw,28px) 20px',
                  textAlign: 'left',
                  border: '1px solid rgba(255,255,255,.2)',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
                  borderRadius: 12,
                  backdropFilter: 'blur(12px)',
                  cursor: 'default',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  opacity: 0
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,.14)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.4)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.2)' }}
              >
                <div style={{ fontSize: 15, fontWeight: 700, color: '#ffffff', letterSpacing: '0.03em', marginBottom: 6, fontFamily: "'Space Grotesk', sans-serif" }}>{c.name}</div>
                <div style={{ fontSize: 12, color: '#ffffff', lineHeight: 1.4, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
           SECTION 5 — CONTACT
      ════════════════════════════════════════ */}
      <section ref={contactRef} id="contact" style={{ position: 'relative', zIndex: 10, background: 'transparent', padding: 'clamp(64px,10vw,96px) 0' }}>
        <div ref={contactBody} style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(16px,5vw,48px)' }}>
          <SectionLabel text="GET IN TOUCH" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 'clamp(40px,6vw,72px)' }}>

            {/* Info */}
            <div>
              <h2 style={{ ...T.heading, fontSize: 'clamp(20px,3vw,38px)', marginBottom: 20 }}>
                Scale Your<br /><span style={{ color: '#ffffff' }}>Infrastructure</span>
              </h2>
              <p style={{ ...T.body, marginBottom: 36, maxWidth: 380 }}>
                Ready to upgrade your deployment stack? Contact our solutions engineering team for a personalized demo, custom SLA options, and migration assistance.
              </p>
              {[
                { icon: '✉', label: 'EMAIL US', value: 'workspace.zectral@gmail.com' },
                { icon: '📞', label: 'PHONE NUMBER', value: '+91 62069 39304 / +91 62070 36484' },
                { icon: '📍', label: 'LOCATION', value: 'Gamharia, Jamshedpur, Jharkhand' },
              ].map(item => (
                <div key={item.label} style={{ marginBottom: 24, display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <span style={{ fontSize: 15, marginTop: 1 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: 9, letterSpacing: '0.2em', color: '#ffffff', marginBottom: 4, textTransform: 'uppercase' }}>{item.label}</div>
                    <div style={{ fontSize: 13, color: '#ffffff', letterSpacing: '0.03em' }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <form
              onSubmit={async e => {
                e.preventDefault()
                setFormStatus('sending')
                try {
                  const res = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                    body: JSON.stringify({
                      access_key: '90283c65-bc39-4af5-a3d8-50df4bc1201e',
                      subject: 'New Demo Request — Zectral',
                      from_name: 'Zectral Website',
                      name: form.name,
                      email: form.email,
                      message: form.message,
                      botcheck: '',
                    }),
                  })
                  const data = await res.json()
                  if (data.success) {
                    setFormStatus('success')
                    setForm({ name: '', email: '', message: '' })
                  } else {
                    setFormStatus('error')
                  }
                } catch {
                  setFormStatus('error')
                }
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
            >
              {/* Web3Forms hidden botcheck */}
              <input type="checkbox" name="botcheck" style={{ display: 'none' }} />

              {[{ name: 'name', label: 'YOUR NAME', type: 'text', placeholder: 'Jane Doe' },
              { name: 'email', label: 'WORK EMAIL ADDRESS', type: 'email', placeholder: 'jane@company.com' }].map(f => (
                <div key={f.name}>
                  <label style={{ display: 'block', fontSize: 9, letterSpacing: '0.2em', color: '#ffffff', marginBottom: 8, textTransform: 'uppercase' }}>{f.label}</label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    value={form[f.name]}
                    required
                    disabled={formStatus === 'sending' || formStatus === 'success'}
                    onChange={e => setForm(p => ({ ...p, [f.name]: e.target.value }))}
                    style={{ ...fieldStyle, opacity: (formStatus === 'sending' || formStatus === 'success') ? 0.5 : 1 }}
                    onFocus={onFocus} onBlur={onBlur}
                  />
                </div>
              ))}

              <div>
                <label style={{ display: 'block', fontSize: 9, letterSpacing: '0.2em', color: '#ffffff', marginBottom: 8, textTransform: 'uppercase' }}>YOUR TEAM AND WORKFLOW</label>
                <textarea
                  rows={5}
                  placeholder="Tell us about your team's current cloud provider and infrastructure needs..."
                  value={form.message}
                  required
                  disabled={formStatus === 'sending' || formStatus === 'success'}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  style={{ ...fieldStyle, resize: 'vertical', opacity: (formStatus === 'sending' || formStatus === 'success') ? 0.5 : 1 }}
                  onFocus={onFocus} onBlur={onBlur}
                />
              </div>

              {/* Status banners */}
              {formStatus === 'success' && (
                <div style={{
                  padding: '12px 16px', borderRadius: 6, fontSize: 11, letterSpacing: '0.1em',
                  background: 'rgba(100,255,150,0.12)', border: '1px solid rgba(100,255,150,0.35)',
                  color: '#a0ffb8', display: 'flex', alignItems: 'center', gap: 10
                }}>
                  <span style={{ fontSize: 16 }}>✓</span>
                  MESSAGE SENT! WE'LL BE IN TOUCH SHORTLY.
                </div>
              )}
              {formStatus === 'error' && (
                <div style={{
                  padding: '12px 16px', borderRadius: 6, fontSize: 11, letterSpacing: '0.1em',
                  background: 'rgba(255,80,80,0.12)', border: '1px solid rgba(255,80,80,0.35)',
                  color: '#ffaaaa', display: 'flex', alignItems: 'center', gap: 10
                }}>
                  <span style={{ fontSize: 16 }}>✕</span>
                  SOMETHING WENT WRONG. PLEASE TRY AGAIN.
                  <button
                    type="button"
                    onClick={() => setFormStatus('idle')}
                    style={{ marginLeft: 'auto', background: 'transparent', border: 'none', color: '#ffaaaa', cursor: 'pointer', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase' }}
                  >RETRY</button>
                </div>
              )}

              {formStatus !== 'success' && (
                <button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  style={{
                    marginTop: 8, padding: '13px 0', width: '100%',
                    background: formStatus === 'sending' ? 'rgba(255,255,255,.06)' : 'rgba(255,255,255,.1)',
                    border: '1px solid rgba(255,255,255,.5)', borderRadius: 3, color: '#ffffff',
                    fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase',
                    cursor: formStatus === 'sending' ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={e => { if (formStatus !== 'sending') gsap.to(e.currentTarget, { background: 'rgba(255,255,255,.2)', borderColor: '#ffffff', duration: .2 }) }}
                  onMouseLeave={e => gsap.to(e.currentTarget, { background: formStatus === 'sending' ? 'rgba(255,255,255,.06)' : 'rgba(255,255,255,.1)', borderColor: 'rgba(255,255,255,.5)', duration: .2 })}
                >
                  {formStatus === 'sending' ? (
                    <>
                      <svg style={{ width: 13, height: 13, animation: 'spin 1s linear infinite' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                      </svg>
                      SENDING...
                    </>
                  ) : (
                    <>
                      REQUEST DEMO
                      <svg style={{ width: 12, height: 12 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </>
                  )}
                </button>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
           FOOTER
      ════════════════════════════════════════ */}
      <footer id="footer" style={{ position: 'relative', zIndex: 10, background: 'transparent', padding: 'clamp(48px,8vw,72px) clamp(16px,5vw,48px) clamp(24px,4vw,36px)', borderTop: '1px solid rgba(255,255,255,.06)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 'clamp(32px,5vw,48px)', marginBottom: 'clamp(40px,6vw,64px)' }}>

            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
                <img src={logoSvg} alt="ZECTRAL" style={{ height: 44, width: 'auto' }} />
              </div>
              <p style={{ fontSize: 12, lineHeight: 1.8, color: '#ffffff', maxWidth: 220 }}>
                Building the future of real estate through innovation, excellence, and uncompromising quality.
              </p>
            </div>

            {/* Link columns */}
            {footerCols.map(col => (
              <div key={col.heading}>
                <div style={{ fontSize: 9, letterSpacing: '0.25em', color: '#ffffff', textTransform: 'uppercase', marginBottom: 18 }}>{col.heading}</div>
                {col.links.map(link => (
                  <a key={link} href="#"
                    style={{ display: 'block', fontSize: 12, color: '#ffffff', textDecoration: 'none', marginBottom: 10, letterSpacing: '0.03em' }}
                    onMouseEnter={e => gsap.to(e.currentTarget, { color: '#fff', x: 3, duration: .2 })}
                    onMouseLeave={e => gsap.to(e.currentTarget, { color: '#ffffff', x: 0, duration: .2 })}
                  >{link}</a>
                ))}
              </div>
            ))}
          </div>

          {/* Bottom row */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,.06)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.8)', letterSpacing: '0.12em' }}>© 2024 ZECTRAL. ALL RIGHTS RESERVED.</span>
            <div style={{ display: 'flex', gap: 24 }}>
              {['Twitter', 'LinkedIn', 'Instagram'].map(s => (
                <a key={s} href="#"
                  style={{ fontSize: 10, color: '#ffffff', textDecoration: 'none', letterSpacing: '0.12em', textTransform: 'uppercase' }}
                  onMouseEnter={e => gsap.to(e.currentTarget, { color: '#fff', duration: .2 })}
                  onMouseLeave={e => gsap.to(e.currentTarget, { color: '#ffffff', duration: .2 })}
                >{s}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ════════════════════════════════════════
           MENU OVERLAY
      ════════════════════════════════════════ */}
      <div ref={menuOverlayRef}
        style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,5,20,.97)', backdropFilter: 'blur(20px)', opacity: 0, pointerEvents: menuOpen ? 'auto' : 'none' }}
      >
        <button onClick={() => setMenuOpen(false)}
          style={{ position: 'absolute', top: 32, right: 32, display: 'flex', alignItems: 'center', gap: 8, fontSize: 10, letterSpacing: '0.2em', color: '#ffffff', background: 'transparent', border: 'none', cursor: 'pointer', textTransform: 'uppercase' }}
          onMouseEnter={e => gsap.to(e.currentTarget, { color: '#fff', duration: .2 })}
          onMouseLeave={e => gsap.to(e.currentTarget, { color: '#ffffff', duration: .2 })}
        >✕ CLOSE</button>

        <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          {['HOME', 'PROJECTS', 'ABOUT US', 'CONTACT', 'CAREERS'].map((item, i) => (
            <a key={item} ref={el => menuItemsRef.current[i] = el} href="#"
              onClick={() => setMenuOpen(false)}
              style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 700, letterSpacing: '0.15em', color: '#ffffff', textTransform: 'uppercase', textDecoration: 'none', opacity: 0 }}
              onMouseEnter={e => gsap.to(e.currentTarget, { color: '#fff', x: 10, duration: .25 })}
              onMouseLeave={e => gsap.to(e.currentTarget, { color: '#ffffff', x: 0, duration: .25 })}
            >{item}</a>
          ))}
        </nav>

        <div style={{ position: 'absolute', bottom: 32, display: 'flex', gap: 16, color: '#ffffff', fontSize: 9, letterSpacing: '0.2em' }}>
          <span>© 2024 ZECTRAL</span>
          <span style={{ width: 1, height: 10, background: 'rgba(255,255,255,.5)' }} />
          <span>ALL RIGHTS RESERVED</span>
        </div>
      </div>

    </div>
  )
}
