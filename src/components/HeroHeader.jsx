import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { ContactShadows, OrbitControls, Sparkles } from '@react-three/drei'
import Avatar from './Avatar.jsx'
import FloatingShapes from './FloatingShapes.jsx'
import { profile } from '../data/profile.js'

const ACCENT = '#d4ff3a'

const NAV_LINKS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Sobre mí', href: '#sobre-mi' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Contacto', href: '#contacto' },
]

/** Escena 3D: iluminación, avatar, figuras y sombras. */
function Scene({ active, hovered, onToggle, onHover }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 3]} intensity={1.6} castShadow shadow-mapSize={[1024, 1024]} />
      <pointLight
        position={[-3, 2, 2]}
        intensity={active ? 6 : 3}
        color={active ? '#f472b6' : ACCENT}
        distance={10}
      />
      <spotLight position={[0, 5, 2]} angle={0.4} penumbra={0.6} intensity={0.8} />

      <Suspense fallback={null}>
        <Avatar active={active} hovered={hovered} onToggle={onToggle} onHover={onHover} />
      </Suspense>

      <FloatingShapes active={active} />

      <Sparkles count={60} scale={[6, 4, 3]} size={2} speed={0.4} color="#f5d0fe" />

      <ContactShadows position={[0, -1.1, 0]} opacity={0.5} scale={6} blur={2.5} far={3} />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        minPolarAngle={Math.PI / 2.4}
        maxPolarAngle={Math.PI / 2.1}
        minAzimuthAngle={-0.6}
        maxAzimuthAngle={0.6}
      />
    </>
  )
}

export default function HeroHeader() {
  const [active, setActive] = useState(false)
  const [hovered, setHovered] = useState(false)
  const year = new Date().getFullYear()

  const infoCards = [
    {
      label: 'Formación',
      value: profile.education.program,
      sub: `${profile.education.school} · ${profile.education.semester}`,
    },
    { label: 'Me gusta', value: 'Diseñar interfaces', sub: 'UI/UX y experiencias 3D' },
    { label: 'Tiempo libre', value: 'Videojuegos', sub: 'Jugar y descubrir mecánicas' },
  ]

  return (
    <header
      id="inicio"
      className="relative h-screen min-h-[720px] w-full overflow-hidden bg-[#0b0712] text-white"
    >
      {/* Fondo con degradado y manchas de color */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#3b0a63] via-[#160828] to-[#050309]" />
        <div className="absolute -right-40 top-0 h-[36rem] w-[36rem] rounded-full bg-fuchsia-600/30 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-violet-500/30 blur-3xl" />
      </div>

      {/* Canvas 3D (fondo transparente) */}
      <div className="absolute inset-0 z-[2]">
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0.6, 4.2], fov: 40 }} gl={{ antialias: true }}>
          <Scene
            active={active}
            hovered={hovered}
            onToggle={() => setActive((v) => !v)}
            onHover={setHovered}
          />
        </Canvas>
      </div>

      {/* Capa HTML: nav arriba, bloque central, tarjetas abajo */}
      <div className="pointer-events-none relative z-[4] flex h-full flex-col px-6 py-8 md:px-14">
        {/* Navegación */}
        <nav className="pointer-events-auto flex items-center justify-between">
          <span className="text-xl font-black italic tracking-tight">
            {profile.name.toUpperCase()}
            <span style={{ color: ACCENT }}>*</span>
          </span>

          <ul className="hidden gap-8 text-xs font-semibold tracking-[0.2em] text-white/80 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="transition hover:text-white">
                  {link.label.toUpperCase()}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contacto"
            className="rounded-full px-5 py-2 text-xs font-bold text-black transition hover:scale-105"
            style={{ backgroundColor: ACCENT }}
          >
            CONTACTAR
          </a>
        </nav>

        {/* Bloque central: título, texto y botones en flujo normal (sin encimarse) */}
        <div className="flex flex-1 flex-col justify-center">
          <p className="text-xs tracking-[0.3em] text-white/60">
            {profile.fullName.toUpperCase()} · {profile.location.toUpperCase()} · {year}
          </p>

          <h1 className="mt-4 text-[16vw] font-black italic leading-[0.9] tracking-tight md:text-[7.5vw]">
            <span className="block text-white">DISEÑO</span>
            <span className="block" style={{ color: ACCENT }}>
              &amp; JUEGO
            </span>
          </h1>

          <p className="mt-6 max-w-md text-lg leading-snug text-white/80">{profile.tagline}</p>

          <div className="pointer-events-auto mt-6 flex flex-wrap items-center gap-4">
            <a
              href={profile.ctaHref}
              className="rounded-full px-6 py-3 text-sm font-bold text-black transition hover:-translate-y-0.5"
              style={{ backgroundColor: ACCENT }}
            >
              {profile.ctaLabel}
            </a>
            <button
              type="button"
              onClick={() => setActive((v) => !v)}
              aria-pressed={active}
              className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white"
            >
              {active ? 'Modo calma' : 'Modo energía'}
            </button>
          </div>
        </div>

        {/* Tarjetas de información */}
        <div className="pointer-events-auto grid gap-4 sm:grid-cols-3">
          {infoCards.map((card) => (
            <div
              key={card.label}
              className="rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-md transition hover:border-white/40"
            >
              <p className="text-[10px] font-bold tracking-[0.25em]" style={{ color: ACCENT }}>
                {card.label.toUpperCase()}
              </p>
              <p className="mt-2 text-sm font-semibold">{card.value}</p>
              <p className="mt-1 text-xs text-white/60">{card.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Redes verticales a la derecha */}
      <ul className="pointer-events-auto absolute right-6 top-1/2 z-[4] hidden -translate-y-1/2 flex-col gap-4 text-xs tracking-wide text-white/70 md:right-10 md:flex">
        {profile.socials.map((s) => (
          <li key={s.label}>
            <a href={s.href} target="_blank" rel="noreferrer" className="transition hover:text-white">
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </header>
  )
}