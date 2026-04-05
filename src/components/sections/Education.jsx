import { motion } from 'framer-motion'
import { education } from '../../data/content'
import { useInView } from '../../hooks/useScrollReveal'

const colorMap = {
  blue:   { badge:'badge-blue',   accent:'#1B4FFF', bg:'#EEF2FF' },
  violet: { badge:'badge-violet', accent:'#7C3AED', bg:'#F5F3FF' },
  teal:   { badge:'badge-teal',   accent:'#0D9488', bg:'#F0FDFA' },
}

export default function Education() {
  const [ref, vis] = useInView()
  return (
    <section id="education" className="py-28 bg-paper" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity:0,y:24 }} animate={vis?{opacity:1,y:0}:{}} transition={{ duration:0.6 }} className="mb-14">
          <div className="section-tag">03 — Education</div>
          <h2 className="display-lg text-ink" style={{ fontSize:'clamp(32px,5vw,52px)' }}>
            Where I <span className="text-blue">learned.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {education.map((edu, i) => {
            const cfg = colorMap[edu.color] || colorMap.blue
            return (
              <motion.div key={i}
                initial={{ opacity:0,y:30 }} animate={vis?{opacity:1,y:0}:{}} transition={{ duration:0.55,delay:i*0.12 }}
                whileHover={{ y:-6 }}
                className="card-white p-6 cursor-default relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `radial-gradient(circle, ${cfg.bg} 0%, transparent 70%)`, transform:'translate(40%,-40%)' }} />

                <div className="font-mono text-2xl mb-5" style={{ color: cfg.accent }}>{edu.icon}</div>
                <span className={`badge ${cfg.badge} mb-4 inline-block`}>{edu.year}</span>
                <h3 className="font-display font-bold text-lg text-ink leading-snug mb-1">{edu.institution}</h3>
                <p className="font-mono text-[11px] text-subtle mb-3">{edu.degree}</p>
                <p className="text-muted text-xs leading-relaxed mb-5">{edu.desc}</p>

                <div className="border-t border-rule pt-4">
                  <p className="font-mono text-[9px] text-subtle tracking-widest uppercase mb-3">Key Modules</p>
                  <div className="flex flex-wrap gap-1.5">
                    {edu.courses.map(c => (
                      <motion.span key={c} whileHover={{ scale:1.06, borderColor:cfg.accent, color:cfg.accent }}
                        className="badge badge-gray cursor-default transition-all text-[9px]">{c}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
