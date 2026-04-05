// About.jsx
import { motion } from 'framer-motion'
import { personal } from '../../data/content'
import { useInView } from '../../hooks/useScrollReveal'

const highlights = [
  { icon: '📈', label: 'Finance First', text: 'Building valuation, capital markets, and strategy expertise from day one at IIM Bangalore.' },
  { icon: '🌐', label: 'Digital Native', text: 'Specialising in GTM, digital business, and the intersection of tech and commerce.' },
  { icon: '🎭', label: 'Kathak Trained', text: '6 years of classical dance — precision, pattern recognition, the discipline that sets me apart.' },
  { icon: '✦', label: 'Creative Edge', text: 'I don\'t just crunch numbers — I craft narratives. Every analysis tells a story.' },
]

export function About() {
  const [ref, vis] = useInView()
  return (
    <section className="py-28 bg-paper relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity:0, y:24 }} animate={vis ? {opacity:1,y:0} : {}} transition={{ duration:0.6 }} className="mb-14">
          <div className="section-tag">01 — About</div>
          <h2 className="display-lg text-ink" style={{ fontSize:'clamp(32px,5vw,52px)' }}>
            Where finance meets <span className="text-blue">creativity.</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-14 items-start">
          <motion.div initial={{ opacity:0,x:-24 }} animate={vis?{opacity:1,x:0}:{}} transition={{ duration:0.7,delay:0.1 }}>
            <p className="text-muted text-[15px] leading-loose mb-6">{personal.bio}</p>
            <p className="text-muted text-[15px] leading-loose mb-8">
              At IIM Bangalore's BBA in Digital Business & Entrepreneurship, I'm building the analytical rigour and strategic vision to navigate modern business. My IIM Ahmedabad executive certification and J.P. Morgan virtual internship have cemented finance as my craft.
            </p>
            <div className="card-white p-6 border-l-4" style={{ borderLeftColor:'#1B4FFF' }}>
              <p className="font-display text-xl font-semibold text-ink italic leading-snug">"{personal.quote}"</p>
              <p className="font-mono text-[10px] text-subtle mt-3 tracking-widest">— JANYA VYAS</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-3">
            {highlights.map((h,i) => (
              <motion.div key={h.label}
                initial={{ opacity:0,y:24 }} animate={vis?{opacity:1,y:0}:{}} transition={{ duration:0.5,delay:0.15+i*0.09 }}
                whileHover={{ y:-5 }} className="card-white p-5 cursor-default"
              >
                <div className="text-2xl mb-3">{h.icon}</div>
                <div className="font-display font-semibold text-sm text-ink mb-2">{h.label}</div>
                <div className="text-muted text-xs leading-relaxed">{h.text}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
