import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, MapPin, Linkedin, Github, Copy, Check, Send, Clock } from 'lucide-react'
import { personal } from '../../data/content'
import { useInView } from '../../hooks/useScrollReveal'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const [form, setForm] = useState({ name:'', email:'', message:'' })
  const [sent, setSent] = useState(false)
  const [ref, vis] = useInView()

  const copyEmail = () => {
    navigator.clipboard.writeText(personal.email)
    setCopied(true); setTimeout(() => setCopied(false), 2200)
  }
  const handleSubmit = (e) => {
    e.preventDefault(); setSent(true)
    setForm({ name:'', email:'', message:'' })
    setTimeout(() => setSent(false), 3500)
  }

  return (
    <section id="contact" className="py-28 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity:0,y:24 }} animate={vis?{opacity:1,y:0}:{}} transition={{ duration:0.6 }} className="mb-14">
          <div className="section-tag">06 — Contact</div>
          <h2 className="display-lg text-ink" style={{ fontSize:'clamp(32px,5vw,52px)' }}>
            Let's <span className="text-blue">connect.</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-5">
          {/* Col 1 */}
          <motion.div initial={{ opacity:0,y:24 }} animate={vis?{opacity:1,y:0}:{}} transition={{ duration:0.55 }} className="space-y-3">
            <div className="card-white p-5">
              <p className="font-mono text-[9px] text-subtle tracking-widest uppercase mb-3">Email</p>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <Mail size={12} className="text-blue flex-shrink-0" />
                  <span className="font-mono text-[11px] text-ink truncate">{personal.email}</span>
                </div>
                <motion.button whileHover={{ scale:1.1 }} whileTap={{ scale:0.9 }} onClick={copyEmail}
                  className="w-8 h-8 rounded-lg border border-rule flex items-center justify-center text-muted hover:text-blue hover:border-blue-mid transition-all flex-shrink-0">
                  <AnimatePresence mode="wait">
                    {copied
                      ? <motion.span key="y" initial={{scale:0}} animate={{scale:1}} exit={{scale:0}}><Check size={12} className="text-green" /></motion.span>
                      : <motion.span key="n" initial={{scale:0}} animate={{scale:1}} exit={{scale:0}}><Copy size={12} /></motion.span>}
                  </AnimatePresence>
                </motion.button>
              </div>
              <AnimatePresence>
                {copied && <motion.p initial={{opacity:0,y:-4}} animate={{opacity:1,y:0}} exit={{opacity:0}}
                  className="font-mono text-[9px] text-green mt-2">✓ Copied!</motion.p>}
              </AnimatePresence>
            </div>

            <div className="card-white p-5">
              <p className="font-mono text-[9px] text-subtle tracking-widest uppercase mb-3">Location</p>
              <div className="flex items-center gap-2">
                <MapPin size={12} className="text-blue" />
                <span className="font-mono text-[11px] text-ink">{personal.location}</span>
              </div>
            </div>

            <div className="card-white p-5">
              <p className="font-mono text-[9px] text-subtle tracking-widest uppercase mb-3">Status</p>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
                <span className="font-mono text-[11px] text-green font-semibold">Open to Internships</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={11} className="text-subtle" />
                <span className="font-mono text-[10px] text-subtle">Response: ~24 hours</span>
              </div>
            </div>
          </motion.div>

          {/* Col 2 — Socials */}
          <motion.div initial={{ opacity:0,y:24 }} animate={vis?{opacity:1,y:0}:{}} transition={{ duration:0.55,delay:0.1 }}>
            <div className="card-white p-5 h-full flex flex-col gap-3">
              <p className="font-mono text-[9px] text-subtle tracking-widest uppercase">Socials</p>
              <motion.a href={personal.linkedin} target="_blank" rel="noopener noreferrer"
                whileHover={{ x:4 }}
                className="flex items-center gap-4 p-4 rounded-xl border border-rule hover:border-blue-mid hover:bg-blue-light transition-all group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-blue-light border border-blue-mid flex items-center justify-center flex-shrink-0">
                  <Linkedin size={16} className="text-blue" />
                </div>
                <div>
                  <div className="font-display font-semibold text-sm text-ink">LinkedIn</div>
                  <div className="font-mono text-[10px] text-subtle">in/janya-vyas-a02812375</div>
                </div>
                <div className="ml-auto text-subtle group-hover:text-blue transition-colors font-mono text-sm">→</div>
              </motion.a>

              <motion.a href={personal.github} target="_blank" rel="noopener noreferrer"
                whileHover={{ x:4 }}
                className="flex items-center gap-4 p-4 rounded-xl border border-rule hover:border-rule-2 hover:bg-paper transition-all group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-paper border border-rule flex items-center justify-center flex-shrink-0">
                  <Github size={16} className="text-ink-3" />
                </div>
                <div>
                  <div className="font-display font-semibold text-sm text-ink">GitHub</div>
                  <div className="font-mono text-[10px] text-subtle">github.com/janyavyas</div>
                </div>
                <div className="ml-auto text-subtle group-hover:text-ink transition-colors font-mono text-sm">→</div>
              </motion.a>

              <motion.a href={`mailto:${personal.email}`}
                whileHover={{ scale:1.02, y:-2 }} whileTap={{ scale:0.98 }}
                className="btn-blue justify-center mt-auto">
                <Mail size={14} /> Send Email
              </motion.a>
            </div>
          </motion.div>

          {/* Col 3 — Form */}
          <motion.div initial={{ opacity:0,y:24 }} animate={vis?{opacity:1,y:0}:{}} transition={{ duration:0.55,delay:0.2 }}>
            <div className="card-white p-5 h-full flex flex-col gap-3">
              <p className="font-mono text-[9px] text-subtle tracking-widest uppercase">Quick Message</p>
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 flex-1">
                {['name','email'].map(field => (
                  <div key={field}>
                    <label className="font-mono text-[9px] text-subtle block mb-1.5 uppercase tracking-wider">{field}</label>
                    <input type={field === 'email' ? 'email' : 'text'} required
                      placeholder={field === 'email' ? 'your@email.com' : 'Your name'}
                      value={form[field]} onChange={e => setForm(f => ({ ...f, [field]:e.target.value }))}
                      className="w-full bg-paper border border-rule rounded-xl px-4 py-2.5 text-sm text-ink font-sans placeholder:text-subtle focus:outline-none focus:border-blue-mid focus:ring-2 focus:ring-blue/10 transition-all"
                    />
                  </div>
                ))}
                <div className="flex-1 flex flex-col">
                  <label className="font-mono text-[9px] text-subtle block mb-1.5 uppercase tracking-wider">Message</label>
                  <textarea required placeholder="What's on your mind?" rows={4}
                    value={form.message} onChange={e => setForm(f => ({ ...f, message:e.target.value }))}
                    className="flex-1 w-full bg-paper border border-rule rounded-xl px-4 py-2.5 text-sm text-ink font-sans placeholder:text-subtle focus:outline-none focus:border-blue-mid focus:ring-2 focus:ring-blue/10 transition-all resize-none"
                  />
                </div>
                <AnimatePresence mode="wait">
                  {sent
                    ? <motion.div key="sent" initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} exit={{opacity:0}}
                        className="flex items-center justify-center gap-2 py-3 rounded-xl bg-green-light border border-green/30 font-sans text-sm text-green font-medium">
                        <Check size={14} /> Message sent!
                      </motion.div>
                    : <motion.button key="btn" type="submit" whileHover={{scale:1.02,y:-1}} whileTap={{scale:0.98}} className="btn-blue justify-center">
                        <Send size={13} /> Send Message
                      </motion.button>
                  }
                </AnimatePresence>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div initial={{ opacity:0 }} animate={vis?{opacity:1}:{}} transition={{ delay:0.4 }}
          className="mt-16 pt-8 border-t border-rule flex flex-wrap items-center justify-between gap-4">
          <span className="font-mono text-[11px] text-subtle">© 2026 Janya Vyas · All rights reserved</span>
          <span className="font-mono text-[11px] text-subtle">
            Built with <span className="text-blue">React</span> + <span className="text-violet">Three.js</span> + <span className="text-teal">Framer Motion</span>
          </span>
        </motion.div>
      </div>
    </section>
  )
}
