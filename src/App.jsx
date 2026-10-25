import HeroHeader from './components/HeroHeader.jsx'
import { profile } from './data/profile.js'

export default function App() {
  return (
    <main className="min-h-screen bg-slate-950">
      <HeroHeader />

      {/* Sección de proyectos: destino del botón "Ver Proyectos" */}
      <section id="proyectos" className="mx-auto max-w-5xl px-6 py-24">
        <h2 className="text-3xl font-semibold text-white">Proyectos</h2>
        <p className="mt-3 max-w-xl text-slate-400">
          Aquí irían tus proyectos destacados. Esta sección sirve como destino del botón
          "{profile.ctaLabel}" del header.
        </p>
      </section>
    </main>
  )
}
