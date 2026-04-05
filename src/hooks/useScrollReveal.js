import { useEffect, useRef, useState, useCallback } from 'react'

export function useTypewriter(words, speed = 72) {
  const [display, setDisplay] = useState('')
  const [wi, setWi] = useState(0)
  const [ci, setCi] = useState(0)
  const [del, setDel] = useState(false)
  useEffect(() => {
    const w = words[wi]
    const t = setTimeout(() => {
      if (!del) {
        if (ci < w.length) { setDisplay(w.slice(0, ci + 1)); setCi(c => c + 1) }
        else setTimeout(() => setDel(true), 2200)
      } else {
        if (ci > 0) { setDisplay(w.slice(0, ci - 1)); setCi(c => c - 1) }
        else { setDel(false); setWi(i => (i + 1) % words.length) }
      }
    }, del ? speed / 2 : speed)
    return () => clearTimeout(t)
  }, [ci, del, wi, words, speed])
  return display
}

export function useScrollProgress() {
  const [p, setP] = useState(0)
  useEffect(() => {
    const h = () => { const t = document.documentElement.scrollHeight - window.innerHeight; setP(t > 0 ? (window.scrollY / t) * 100 : 0) }
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])
  return p
}

export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const h = () => {
      const y = window.scrollY + 130
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i])
        if (el && el.offsetTop <= y) { setActive(ids[i]); return }
      }
    }
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [ids])
  return active
}

export function useInView(options = {}) {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.unobserve(e.target) } },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px', ...options }
    )
    if (ref.current) obs.observe(ref.current)
    return () => { if (ref.current) obs.unobserve(ref.current) }
  }, [])
  return [ref, vis]
}

export function useMagneticEffect() {
  const ref = useRef(null)
  const handleMove = useCallback((e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) * 0.28
    const dy = (e.clientY - cy) * 0.28
    ref.current.style.transform = `translate(${dx}px, ${dy}px)`
  }, [])
  const handleLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = 'translate(0,0)'
  }, [])
  return { ref, handleMove, handleLeave }
}
