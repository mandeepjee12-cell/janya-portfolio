import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { skills } from '../../data/content'
import { useInView } from '../../hooks/useScrollReveal'

const colorMap = {
  blue:   { dot:'#1B4FFF', tab:'badge-blue' },
  teal:   { dot:'#0D9488', tab:'badge-teal' },
  violet: { dot:'#7C3AED', tab:'badge-violet' },
  amber:  { dot:'#D97706', tab:'badge-amber' },
}

export default function Skills() {
  const cats = Object.entries(skills)
  const [active, setActive] = useState(cats[0][0])
  const [ref, vis] = useInView()

  const currentItems = skills[active]?.items || []
  const cfg = colorMap[skills[active]?.color] || colorMap.blue

  return (
    <section id="skills" className="py-28 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity:0,y:24 }} animate={vis?{opacity:1,y:0}:{}} transition={{ duration:0.6 }} className="mb-14">
          <div className="section-tag">04 — Skills</div>
          <h2 className="display-lg text-ink" style={{ fontSize:'clamp(32px,5vw,52px)' }}>
            My <span className="text-blue">toolkit.</span>
          </h2>
        </motion.div>

        {/* Category tabs */}
        <motion.div initial={{ opacity:0,y:16 }} animate={vis?{opacity:1,y:0}:{}} transition={{ delay:0.15 }}
          className="flex flex-wrap gap-2 mb-8">
          {cats.map(([cat, { color }]) => {
            const c = colorMap[color] || colorMap.blue
            return (
              <motion.button key={cat} onClick={() => setActive(cat)}
                whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }}
                className={`badge cursor-pointer transition-all py-2 px-4 text-[11px] ${active === cat ? c.tab : 'badge-gray'}`}
              >{cat}</motion.button>
            )
          })}
        </motion.div>

        {/* Animated pill grid */}
        <AnimatePresence mode="wait">
          <motion.div key={active}
            initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-12 }}
            transition={{ duration:0.3 }}
            className="flex flex-wrap gap-3 min-h-[120px]"
          >
            {currentItems.map((skill, i) => (
              <motion.span key={skill}
                initial={{ opacity:0, scale:0.85 }} animate={{ opacity:1, scale:1 }} transition={{ delay:i*0.05 }}
                className="skill-pill"
                style={{ cursor:'default' }}
              >
                <span className="dot" style={{ background: cfg.dot }} />
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Stat strip */}
        <motion.div initial={{ opacity:0 }} animate={vis?{opacity:1}:{}} transition={{ delay:0.5 }}
          className="mt-12 card-white p-5 grid grid-cols-4 gap-4 text-center"
        >
          {[['24','Skills'],['4','Domains'],['2','Certs'],['∞','Curiosity']].map(([n,l]) => (
            <div key={l}>
              <div className="font-display font-bold text-3xl text-blue">{n}</div>
              <div className="font-mono text-[10px] text-subtle mt-1 tracking-widest uppercase">{l}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
