import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Download } from 'lucide-react'
import { useActiveSection } from '../../hooks/useScrollReveal'

const LINKS = ['about', 'experience', 'education', 'skills', 'achievements', 'contact']

export default function Navbar({ progress }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(LINKS)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  const go = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setOpen(false) }

  return (
    <>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-[200] bg-rule no-print">
        <motion.div className="h-full" style={{ width: `${progress}%`, background: 'linear-gradient(90deg,#1B4FFF,#7C3AED)' }} />
      </div>

      <motion.nav
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] no-print
          flex items-center justify-between gap-4 px-5 py-3
          w-[calc(100%-32px)] max-w-4xl rounded-2xl
          transition-all duration-300
          ${scrolled
            ? 'bg-white/90 backdrop-blur-xl border border-rule shadow-lg shadow-black/5'
            : 'bg-white/70 backdrop-blur-md border border-rule/60'
          }`}
      >
        {/* Logo */}
        <motion.button
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2.5 flex-shrink-0"
        >
          <div className="w-8 h-8 bg-blue rounded-lg flex items-center justify-center">
            <span className="font-display font-bold text-white text-xs">JV</span>
          </div>
          <span className="font-display font-semibold text-ink text-sm hidden sm:block">Janya Vyas</span>
        </motion.button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {LINKS.map(link => (
            <motion.button
              key={link}
              onClick={() => go(link)}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              className={`nav-pill capitalize relative`}
            >
              {active === link && (
                <motion.div
                  layoutId="nav-active-bg"
                  className="absolute inset-0 bg-blue-light border border-blue-mid rounded-full"
                  style={{ zIndex: -1 }}
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.45 }}
                />
              )}
              <span className={active === link ? 'text-blue' : ''}>{link}</span>
            </motion.button>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-2 flex-shrink-0">
          <motion.button
            whileHover={{ scale: 1.04, y: -1 }} whileTap={{ scale: 0.96 }}
            onClick={() => window.print()}
            className="btn-outline-dark text-xs py-2 px-4 flex items-center gap-1.5"
          >
            <Download size={13} /> Resume
          </motion.button>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-muted hover:text-ink transition-colors p-1">
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[72px] left-4 right-4 z-50 bg-white border border-rule rounded-2xl p-3 shadow-xl no-print"
          >
            {LINKS.map((link, i) => (
              <motion.button
                key={link}
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => go(link)}
                className={`block w-full text-left px-4 py-3 rounded-xl text-sm capitalize font-medium font-mono mb-1
                  ${active === link ? 'text-blue bg-blue-light' : 'text-muted hover:text-ink hover:bg-paper'}`}
              >
                {link}
              </motion.button>
            ))}
            <div className="border-t border-rule mt-2 pt-2">
              <button onClick={() => window.print()} className="btn-blue w-full justify-center text-sm py-2.5">
                <Download size={13} /> Download Resume
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
