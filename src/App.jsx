import HeroHeader from './components/HeroHeader.jsx'
import Projects from './components/Projects.jsx'
import { profile } from './data/profile.js'

export default function App() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <HeroHeader />

      <section id="sobre-mi" className="mx-auto max-w-5xl px-6 py-24">
        <h2 className="text-3xl font-semibold">Sobre mí</h2>
        <p className="mt-3 max-w-xl text-purple-200/70">{profile.tagline}</p>
      </section>

      <Projects />

      <footer id="contacto" className="mx-auto max-w-5xl px-6 py-24">
        <h2 className="text-3xl font-semibold">Contacto</h2>
        <ul className="mt-4 flex flex-wrap gap-6 text-purple-200/80">
          {profile.socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer" className="hover:text-pink-200">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </footer>
    </main>
  )
}