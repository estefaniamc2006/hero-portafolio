import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { ContactShadows, OrbitControls, Sparkles } from '@react-three/drei'
import Avatar from './Avatar.jsx'
import FloatingShapes from './FloatingShapes.jsx'
import { profile } from '../data/profile.js'

/** Escena 3D: iluminación, avatar, figuras y sombras. */
function Scene({ active, hovered, onToggle, onHover }) {
  return (
    <>
      {/* Iluminación: ambiental de relleno + direccional con sombra + puntual de acento */}
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[3, 4, 3]}
        intensity={1.6}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight
        position={[-3, 2, 2]}
        intensity={active ? 6 : 3}
        color={active ? '#f472b6' : '#38bdf8'}
        distance={10}
      />
      <spotLight position={[0, 5, 2]} angle={0.4} penumbra={0.6} intensity={0.8} />

      <Suspense fallback={null}>
        <Avatar active={active} hovered={hovered} onToggle={onToggle} onHover={onHover} />
      </Suspense>

      <FloatingShapes active={active} />

      <Sparkles count={60} scale={[6, 4, 3]} size={2} speed={0.4} color="#7dd3fc" />

      <ContactShadows position={[0, -1.1, 0]} opacity={0.5} scale={6} blur={2.5} far={3} />

      {/* Órbita restringida: sin zoom ni paneo para no romper el layout */}
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

  return (
    <header className="relative h-screen min-h-[600px] w-full overflow-hidden bg-slate-950">
      {/* Capa 3D */}
      <div className="absolute inset-0">
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ position: [0, 0.6, 4.2], fov: 40 }}
          gl={{ antialias: true }}
        >
          <Scene
            active={active}
            hovered={hovered}
            onToggle={() => setActive((v) => !v)}
            onHover={setHovered}
          />
        </Canvas>
      </div>

      {/* Degradado para legibilidad del texto */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent" />

      {/* Capa HTML superpuesta. pointer-events-none para que el arrastre llegue al canvas */}
      <div className="pointer-events-none relative z-10 flex h-full flex-col justify-between px-6 py-8 md:px-16">
        <nav className="pointer-events-auto flex items-center justify-between">
          <span className="text-lg font-semibold tracking-tight text-white">{profile.name}</span>
          <ul className="flex gap-6 text-sm text-slate-300">
            {profile.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="transition hover:text-sky-300"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="max-w-xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-sky-300">
            {profile.title}
          </p>
          <h1 className="text-5xl font-bold leading-tight text-white md:text-7xl">
            Hola, soy {profile.name}.
          </h1>
          <p className="mt-5 text-lg text-slate-300">{profile.tagline}</p>

          <div className="pointer-events-auto mt-8 flex flex-wrap items-center gap-4">
            <a
              href={profile.ctaHref}
              className="rounded-full bg-sky-400 px-6 py-3 font-semibold text-slate-950 shadow-lg shadow-sky-500/20 transition hover:-translate-y-0.5 hover:bg-sky-300"
            >
              {profile.ctaLabel}
            </a>
            <button
              type="button"
              onClick={() => setActive((v) => !v)}
              aria-pressed={active}
              className="rounded-full border border-slate-600 px-6 py-3 text-slate-200 transition hover:border-pink-400 hover:text-pink-300"
            >
              {active ? 'Modo calma' : 'Modo energía'}
            </button>
          </div>

          <p className="mt-6 text-xs text-slate-500">
            Arrastra para girar la escena · Haz clic en el avatar para cambiar la energía
          </p>
        </div>
      </div>
    </header>
  )
}
