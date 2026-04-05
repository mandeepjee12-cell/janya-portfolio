import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const smooth = useRef({ x: 0, y: 0 })
  const raf = useRef(null)

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dot.current) {
        dot.current.style.left = e.clientX + 'px'
        dot.current.style.top = e.clientY + 'px'
      }
    }
    const onDown = () => ring.current?.classList.add('clicking')
    const onUp = () => ring.current?.classList.remove('clicking')

    const loop = () => {
      smooth.current.x += (pos.current.x - smooth.current.x) * 0.1
      smooth.current.y += (pos.current.y - smooth.current.y) * 0.1
      if (ring.current) {
        ring.current.style.left = smooth.current.x + 'px'
        ring.current.style.top = smooth.current.y + 'px'
      }
      raf.current = requestAnimationFrame(loop)
    }
    raf.current = requestAnimationFrame(loop)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)

    const addHov = () => {
      document.querySelectorAll('a,button,[data-hover]').forEach(el => {
        el.addEventListener('mouseenter', () => ring.current?.classList.add('hov'))
        el.addEventListener('mouseleave', () => ring.current?.classList.remove('hov'))
      })
    }
    addHov()
    const mo = new MutationObserver(addHov)
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      cancelAnimationFrame(raf.current)
      mo.disconnect()
    }
  }, [])

  return (
    <div className="no-print">
      <div ref={dot} className="cur-dot" />
      <div ref={ring} className="cur-ring" />
    </div>
  )
}
