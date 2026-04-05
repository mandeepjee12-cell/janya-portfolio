import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, MapPin, Mail } from 'lucide-react'
import { personal, stats } from '../../data/content'
import { useTypewriter, useMagneticEffect } from '../../hooks/useScrollReveal'

const HeroScene = lazy(() => import('../ui/HeroScene'))

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.4 } },
}
const up = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
}

function MagneticBtn({ children, className, onClick, href }) {
  const { ref, handleMove, handleLeave } = useMagneticEffect()
  const Tag = href ? 'a' : 'button'
  return (
    <Tag
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      href={href}
      className={className}
      style={{ transition: 'transform 0.3s cubic-bezier(0.23,1,0.32,1), box-shadow 0.2s, background 0.2s' }}
    >
      {children}
    </Tag>
  )
}

export default function Hero() {
  const typed = useTypewriter(personal.titles, 68)

  return (
    <section id="about" className="relative min-h-screen flex items-center overflow-hidden bg-paper">
      {/* Three.js — right side, light geometric */}
      <div className="hero-canvas opacity-70">
        <Suspense fallback={null}><HeroScene /></Suspense>
      </div>

      {/* Subtle mesh gradient bg */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 70% 40%, rgba(238,242,255,0.7) 0%, transparent 55%), radial-gradient(ellipse at 20% 70%, rgba(245,243,255,0.5) 0%, transparent 50%)'
      }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full pt-28 pb-16">
        <motion.div variants={stagger} initial="hidden" animate="show">

          {/* Status chip */}
          <motion.div variants={up} className="mb-8">
            <span className="inline-flex items-center gap-2 bg-white border border-rule rounded-full px-4 py-2 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
              <span className="font-mono text-[11px] text-muted tracking-wider">{personal.availability} · Summer 2025</span>
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.div variants={up} className="mb-5 overflow-hidden">
            <h1 className="display-xl text-ink" style={{ fontSize: 'clamp(56px, 11vw, 130px)' }}>
              Janya<br />
              <span style={{ color: '#1B4FFF' }}>Vyas.</span>
            </h1>
          </motion.div>

          {/* Typewriter */}
          <motion.div variants={up} className="mb-6 flex items-center gap-2 h-8">
            <span className="font-mono text-[11px] text-subtle">›</span>
            <span className="font-mono text-sm text-muted">{typed}</span>
            <span className="font-mono text-sm text-blue animate-pulse">|</span>
          </motion.div>

          {/* Location + subtitle */}
          <motion.div variants={up} className="flex flex-wrap items-center gap-4 mb-8">
            <span className="flex items-center gap-1.5 font-mono text-[11px] text-subtle">
              <MapPin size={11} className="text-blue" /> {personal.location}
            </span>
            <span className="w-px h-3 bg-rule-2" />
            <span className="font-mono text-[11px] text-subtle">{personal.subtitle}</span>
          </motion.div>

          {/* Bio */}
          <motion.p variants={up} className="text-muted text-[15px] leading-loose max-w-xl mb-10">
            {personal.bio}
          </motion.p>

          {/* CTAs — magnetic buttons */}
          <motion.div variants={up} className="flex flex-wrap gap-3 mb-16">
            <MagneticBtn
              className="btn-blue"
              onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Experience <ArrowRight size={14} />
            </MagneticBtn>
            <MagneticBtn href={`mailto:${personal.email}`} className="btn-outline-dark">
              <Mail size={14} /> Get In Touch
            </MagneticBtn>
          </motion.div>

          {/* Interactive stats */}
          <motion.div variants={up} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5, boxShadow: '0 12px 32px rgba(27,79,255,0.12)' }}
                whileTap={{ scale: 0.97 }}
                className="stat-box cursor-default"
              >
                <div className="font-display font-bold text-2xl text-blue leading-none mb-1">{s.val}</div>
                <div className="font-sans font-semibold text-sm text-ink mb-0.5">{s.label}</div>
                <div className="font-mono text-[10px] text-subtle">{s.sub}</div>
              </motion.div>
            ))}
          </motion.div>

        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 no-print z-10"
      >
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}
          className="w-5 h-8 rounded-full border-2 border-rule-2 flex justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-blue" />
        </motion.div>
      </motion.div>
    </section>
  )
}
