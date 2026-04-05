import { motion } from 'framer-motion'
import { achievements } from '../../data/content'
import { useInView } from '../../hooks/useScrollReveal'

const badgeMap = { blue:'badge-blue', amber:'badge-amber', violet:'badge-violet', teal:'badge-teal' }
const accentMap = { blue:'#1B4FFF', amber:'#D97706', violet:'#7C3AED', teal:'#0D9488' }
const bgMap     = { blue:'#EEF2FF', amber:'#FFFBEB', violet:'#F5F3FF', teal:'#F0FDFA' }

export default function Achievements() {
  const [ref, vis] = useInView()
  return (
    <section id="achievements" className="py-28 bg-paper" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity:0,y:24 }} animate={vis?{opacity:1,y:0}:{}} transition={{ duration:0.6 }} className="mb-14">
          <div className="section-tag">05 — Achievements</div>
          <h2 className="display-lg text-ink" style={{ fontSize:'clamp(32px,5vw,52px)' }}>
            Recognition & <span className="text-blue">milestones.</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((a, i) => {
            const accent = accentMap[a.color] || accentMap.blue
            const bg     = bgMap[a.color] || bgMap.blue
            return (
              <motion.div key={i}
                initial={{ opacity:0,y:36 }} animate={vis?{opacity:1,y:0}:{}} transition={{ duration:0.5,delay:i*0.1 }}
                whileHover={{ y:-8, boxShadow:'0 20px 50px rgba(27,79,255,0.1)' }}
                className="card-white p-6 cursor-default relative overflow-hidden group"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background:`radial-gradient(circle at 50% 0%, ${bg} 0%, transparent 70%)` }} />

                <div className="text-3xl mb-4">{a.icon}</div>
                <span className={`badge ${badgeMap[a.color]} mb-3 inline-block`}>{a.tag}</span>
                <h4 className="font-display font-semibold text-base text-ink leading-snug mb-2">{a.title}</h4>
                <p className="text-subtle text-xs leading-relaxed mb-4">{a.desc}</p>
                <div className="font-mono text-[10px] border-t border-rule pt-3" style={{ color: accent }}>{a.year}</div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
