import HeroHeader from './components/HeroHeader.jsx'
import Projects from './components/Projects.jsx'
import { profile } from './data/profile.js'

const ACCENT = '#d4ff3a'

export default function App() {
  return (
    <main className="min-h-screen bg-[#0b0712] text-white">
      <HeroHeader />

      <section id="sobre-mi" className="mx-auto max-w-6xl px-6 py-24">
        <p className="text-xs font-bold tracking-[0.3em]" style={{ color: ACCENT }}>
          SOBRE MÍ
        </p>
        <h2 className="mt-3 text-4xl font-black italic md:text-5xl">
          Estudio sistemas y me apasiona crear experiencias.
        </h2>
        <p className="mt-4 max-w-2xl text-white/70">{profile.tagline}</p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="font-bold" style={{ color: ACCENT }}>Formación</h3>
            <p className="mt-3 font-semibold">{profile.education.program}</p>
            <p className="mt-1 text-sm text-white/60">{profile.education.school}</p>
            <p className="mt-1 text-sm text-white/60">{profile.education.semester}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="font-bold" style={{ color: ACCENT }}>Intereses</h3>
            <ul className="mt-3 space-y-2 text-sm text-white/80">
              {profile.interests.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="font-bold" style={{ color: ACCENT }}>Herramientas</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <li key={skill} className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/90">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Projects />

      <footer id="contacto" className="mx-auto max-w-6xl px-6 py-24">
        <p className="text-xs font-bold tracking-[0.3em]" style={{ color: ACCENT }}>
          CONTACTO
        </p>
        <h2 className="mt-3 text-4xl font-black italic md:text-5xl">¿Hablamos?</h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {profile.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-white/10 bg-white/5 p-8 transition hover:-translate-y-1 hover:border-[#d4ff3a]/60"
            >
              <p className="text-xs font-bold tracking-[0.25em]" style={{ color: ACCENT }}>
                {s.label.toUpperCase()}
              </p>
              <p className="mt-3 break-all text-xl font-semibold">{s.display}</p>
            </a>
          ))}
        </div>
      </footer>
    </main>
  )
}