import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { ContactShadows, OrbitControls, Sparkles } from '@react-three/drei'
import Avatar from './Avatar.jsx'
import FloatingShapes from './FloatingShapes.jsx'
import { profile } from '../data/profile.js'

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
        color={active ? '#f472b6' : '#a78bfa'}
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

  return (
    <header
      id="inicio"
      className="relative h-screen min-h-[640px] w-full overflow-hidden text-white"
      style={{
        background:
          'radial-gradient(ellipse at 50% 45%, #9333ea 0%, #5b21b6 30%, #2e1065 60%, #0c0319 100%)',
      }}
    >
      {/* Manchas de color difuminadas para dar profundidad */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-16 h-96 w-96 rounded-full bg-fuchsia-500/30 blur-3xl" />
        <div className="absolute right-0 top-1/4 h-[28rem] w-[28rem] rounded-full bg-violet-400/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-amber-300/20 blur-3xl" />
      </div>

      {/* Nombre gigante detrás del objeto 3D */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 z-[1] -translate-y-1/2 select-none text-center">
        <h2 className="bg-gradient-to-b from-pink-50 to-pink-200/30 bg-clip-text text-[20vw] font-extrabold leading-none tracking-tight text-transparent md:text-[17vw]">
          {profile.name.toUpperCase()}
        </h2>
      </div>

      {/* Canvas 3D (transparente, muestra el fondo) */}
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

      {/* Capa HTML superpuesta */}
      <div className="pointer-events-none relative z-[3] flex h-full flex-col justify-between px-6 py-8 md:px-14">
        {/* Navegación */}
        <nav className="pointer-events-auto flex items-center justify-between">
          <ul className="hidden gap-8 text-sm font-medium tracking-wide text-white/90 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="transition hover:text-pink-200">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <span className="text-lg font-bold tracking-tight md:hidden">{profile.name}</span>

          <div className="flex items-center gap-1 rounded-full border border-white/20 bg-white/5 p-1 text-sm backdrop-blur-md">
            <a href={profile.ctaHref} className="rounded-full bg-pink-100 px-5 py-2 font-medium text-purple-950">
              {profile.ctaLabel}
            </a>
            <a href="#contacto" className="rounded-full px-5 py-2 text-white/90 transition hover:text-pink-200">
              Contacto
            </a>
          </div>
        </nav>

        {/* Año vertical a la izquierda */}
        <div className="pointer-events-none absolute left-6 top-1/2 hidden -translate-y-1/2 md:left-10 md:block">
          <span className="block -rotate-90 text-sm tracking-[0.3em] text-white/80">{year}</span>
        </div>

        {/* Redes verticales a la derecha */}
        <ul className="pointer-events-auto absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col gap-5 text-xs tracking-wide text-white/80 md:right-10 md:flex">
          {profile.socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer" className="transition hover:text-pink-200">
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Texto inferior izquierdo */}
        <div className="pointer-events-auto absolute bottom-10 left-6 max-w-xs md:left-14">
          <div className="mb-3 flex items-center gap-3 text-sm font-medium tracking-[0.2em]">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            SOBRE MÍ
          </div>
          <p className="text-lg leading-snug text-pink-100/75">{profile.tagline}</p>
          <p className="mt-2 text-sm text-pink-100/50">{profile.title}</p>
        </div>

        {/* Botón de llamado a la acción (inferior derecho) */}
        <a
          href={profile.ctaHref}
          className="pointer-events-auto absolute bottom-28 right-6 flex items-center gap-3 rounded-lg bg-white/20 px-5 py-3 text-sm font-medium backdrop-blur-md transition hover:bg-white/30 md:right-14"
        >
          {profile.ctaLabel}
          <span className="grid h-7 w-7 place-items-center rounded-full bg-fuchsia-600 text-[10px]">▶</span>
        </a>

        {/* Botón circular: modo energía */}
        <button
          type="button"
          onClick={() => setActive((v) => !v)}
          aria-pressed={active}
          aria-label="Cambiar modo energía"
          className="pointer-events-auto absolute bottom-8 right-6 grid h-14 w-14 place-items-center rounded-full border border-white/20 bg-white/15 text-xl shadow-lg backdrop-blur-md transition hover:scale-105 md:right-14"
        >
          {active ? '◐' : '✦'}
        </button>

        <p className="pointer-events-none absolute bottom-4 left-1/2 hidden -translate-x-1/2 text-xs text-white/40 md:block">
          Arrastra para girar · Clic en el avatar para cambiar la energía
        </p>
      </div>
    </header>
  )
}