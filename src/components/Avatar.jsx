import { Component, Suspense, useEffect, useRef } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { useAnimations } from '@react-three/drei'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { MathUtils } from 'three'
import { avatarConfig } from '../data/profile.js'

/**
 * Avatar que carga un .fbx (Mixamo / Blender) y reproduce su animación con useAnimations.
 * - Hover: el avatar se agranda suavemente (useFrame).
 * - Click: alterna el modo "energía" (acelera la animación y se propaga al estado de React).
 */
function FBXAvatar({ active, hovered, onToggle, onHover }) {
  const groupRef = useRef()

  // Cargamos modelo y animación en una sola llamada (cachea por URL).
  const [model, animSource] = useLoader(FBXLoader, [
    avatarConfig.modelUrl,
    avatarConfig.animationUrl,
  ])

  const { actions, names } = useAnimations(animSource.animations, groupRef)
  const clipName = names[0]

  // Sombras en todas las mallas del modelo.
  useEffect(() => {
    model.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }, [model])

  // Reproducir la animación incorporada (idle / saludo / ciclo).
  useEffect(() => {
    if (!clipName || !actions[clipName]) return
    actions[clipName].reset().fadeIn(0.4).play()
    return () => actions[clipName]?.fadeOut(0.2)
  }, [actions, clipName])

  // Estado React -> velocidad de la animación.
  useEffect(() => {
    if (!clipName || !actions[clipName]) return
    actions[clipName].timeScale = active ? 2 : 1
  }, [active, actions, clipName])

  useFrame((state) => {
    const group = groupRef.current
    if (!group) return
    // Mira ligeramente hacia el puntero.
    const targetY = state.pointer.x * 0.35
    group.rotation.y = MathUtils.lerp(group.rotation.y, targetY, 0.08)
    // Escala suave al hacer hover.
    const targetScale = hovered ? 1.06 : 1
    group.scale.setScalar(MathUtils.lerp(group.scale.x, targetScale, 0.1))
  })

  return (
    <group
      ref={groupRef}
      onClick={(e) => {
        e.stopPropagation()
        onToggle()
      }}
      onPointerOver={(e) => {
        e.stopPropagation()
        onHover(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        onHover(false)
        document.body.style.cursor = 'auto'
      }}
    >
      <primitive object={model} scale={avatarConfig.scale} position={[0, -1.1, 0]} />
    </group>
  )
}

/** Avatar de respaldo (primitivas) si el .fbx aún no está en /public/models. */
function FallbackAvatar({ active, hovered, onToggle, onHover }) {
  const groupRef = useRef()
  const bodyRef = useRef()

  useFrame((state, delta) => {
    const group = groupRef.current
    if (!group) return
    group.rotation.y = MathUtils.lerp(group.rotation.y, state.pointer.x * 0.35, 0.08)
    group.scale.setScalar(MathUtils.lerp(group.scale.x, hovered ? 1.06 : 1, 0.1))
    if (bodyRef.current) {
      bodyRef.current.rotation.y += delta * (active ? 2.5 : 0.6)
    }
  })

  const color = active ? '#f472b6' : '#38bdf8'

  return (
    <group
      ref={groupRef}
      position={[0, -0.2, 0]}
      onClick={(e) => {
        e.stopPropagation()
        onToggle()
      }}
      onPointerOver={(e) => {
        e.stopPropagation()
        onHover(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        onHover(false)
        document.body.style.cursor = 'auto'
      }}
    >
      <mesh position={[0, 0.9, 0]} castShadow>
        <sphereGeometry args={[0.35, 48, 48]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.4} />
      </mesh>
      <mesh ref={bodyRef} position={[0, 0.1, 0]} castShadow>
        <capsuleGeometry args={[0.35, 0.8, 16, 32]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.35} />
      </mesh>
    </group>
  )
}

/** Si el FBX falla al cargar (no existe, ruta incorrecta), mostramos el respaldo en vez de romper la app. */
class ModelErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { failed: false }
  }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch(error) {
    console.warn('[Avatar] No se pudo cargar el FBX, se usa el respaldo:', error?.message)
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

export default function Avatar(props) {
  return (
    <ModelErrorBoundary fallback={<FallbackAvatar {...props} />}>
      <Suspense fallback={null}>
        <FBXAvatar {...props} />
      </Suspense>
    </ModelErrorBoundary>
  )
}
