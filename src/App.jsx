import { Suspense, lazy } from 'react'
import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import Cursor from './components/ui/Cursor'
import { useScrollProgress } from './hooks/useScrollReveal'
import { About } from './components/sections/About'

const Experience   = lazy(() => import('./components/sections/Experience'))
const Education    = lazy(() => import('./components/sections/Education'))
const Skills       = lazy(() => import('./components/sections/Skills'))
const Achievements = lazy(() => import('./components/sections/Achievements'))
const Contact      = lazy(() => import('./components/sections/Contact'))

const Loader = () => (
  <div className="py-32 flex items-center justify-center">
    <div className="flex items-center gap-3">
      <div className="w-5 h-5 border-2 border-blue-mid border-t-blue rounded-full animate-spin" />
      <span className="font-mono text-[11px] text-subtle tracking-widest">Loading...</span>
    </div>
  </div>
)

export default function App() {
  const progress = useScrollProgress()

  return (
    <div className="min-h-screen bg-paper">
      <Cursor />
      <Navbar progress={progress} />

      <main>
        <Hero />
        <About />

        <Suspense fallback={<Loader />}>
          <Experience />
        </Suspense>

        <Suspense fallback={<Loader />}>
          <Education />
        </Suspense>

        <Suspense fallback={<Loader />}>
          <Skills />
        </Suspense>

        <Suspense fallback={<Loader />}>
          <Achievements />
        </Suspense>

        <Suspense fallback={<Loader />}>
          <Contact />
        </Suspense>
      </main>
    </div>
  )
}
