import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, MapPin } from 'lucide-react'
import { experience } from '../../data/content'
import { useInView } from '../../hooks/useScrollReveal'

export default function Experience() {
  const [open, setOpen] = useState(0)
  const [ref, vis] = useInView()

  return (
    <section id="experience" className="py-28 bg-white relative" ref={ref}>
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={vis ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="mb-14"
        >
          <div className="section-tag">02 — Experience</div>
          <h2 className="display-lg text-ink" style={{ fontSize: 'clamp(32px,5vw,52px)' }}>
            What I've <span className="text-blue">built.</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {experience.map((exp, i) => {
            const isOpen = open === i
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={vis ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.09 }}
              >
                <div
                  className={`exp-card ${isOpen ? 'open' : ''}`}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  {/* Header row — always visible */}
                  <div className="flex items-center gap-4 p-5 sm:p-6">
                    {/* Number */}
                    <span className="font-mono text-[11px] text-subtle flex-shrink-0 w-6">{exp.id}</span>

                    {/* Color dot */}
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ background: exp.accentColor, boxShadow: `0 0 0 3px ${exp.accentBg}` }} />

                    {/* Main text */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-0.5">
                        <h3 className="font-display font-semibold text-base sm:text-lg text-ink leading-tight">{exp.role}</h3>
                        <span className={`badge ${exp.colorBadge}`}>{exp.type}</span>
                      </div>
                      <p className="font-mono text-[11px] text-subtle">{exp.company}</p>
                    </div>

                    {/* Date + chevron */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="font-mono text-[11px] text-subtle hidden sm:block bg-paper border border-rule rounded-full px-3 py-1">{exp.date}</span>
                      <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.28 }}>
                        <ChevronDown size={16} className="text-subtle" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Expandable body */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.38, ease: [0.04, 0.62, 0.23, 0.98] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div className="px-5 sm:px-6 pb-6 border-t border-rule pt-5">
                          <ul className="space-y-3 mb-6">
                            {exp.achievements.map((a, j) => (
                              <motion.li
                                key={j}
                                initial={{ opacity: 0, x: -12 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: j * 0.07 }}
                                className="flex items-start gap-3 text-[13.5px] text-muted leading-relaxed"
                              >
                                <span className="mt-[6px] w-1.5 h-1.5 rounded-full flex-shrink-0"
                                  style={{ background: exp.accentColor }} />
                                {a}
                              </motion.li>
                            ))}
                          </ul>

                          {/* Tools */}
                          <div className="flex flex-wrap gap-2">
                            {exp.tools.map(t => (
                              <motion.span
                                key={t}
                                whileHover={{ scale: 1.06, y: -1 }}
                                className="skill-pill text-xs py-1 px-3"
                                style={{ cursor: 'default' }}
                              >
                                {t}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
