import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { MathUtils } from 'three'

const SHAPES = [
  { position: [-2.2, 1.4, -1], geometry: 'icosahedron', scale: 0.35 },
  { position: [2.4, 1.1, -0.5], geometry: 'octahedron', scale: 0.3 },
  { position: [2.1, -1.2, 0.5], geometry: 'torus', scale: 0.4 },
  { position: [-2.4, -0.9, 0.2], geometry: 'box', scale: 0.3 },
]

function Shape({ position, geometry, scale, active, index }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state, delta) => {
    const mesh = meshRef.current
    if (!mesh) return
    // Rotación continua; más rápida en modo activo.
    const speed = active ? 1.6 : 0.4
    mesh.rotation.x += delta * speed
    mesh.rotation.y += delta * speed * 0.7
    // Flotación vertical basada en el tiempo.
    mesh.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * 1.2 + index) * 0.15
    // Escala reactiva al hover.
    const target = hovered ? scale * 1.4 : scale
    mesh.scale.setScalar(MathUtils.lerp(mesh.scale.x, target, 0.12))
  })

  const color = active ? '#f472b6' : '#38bdf8'

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={scale}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
      }}
      onPointerOut={() => setHovered(false)}
      castShadow
    >
      {geometry === 'icosahedron' && <icosahedronGeometry args={[1, 0]} />}
      {geometry === 'octahedron' && <octahedronGeometry args={[1, 0]} />}
      {geometry === 'torus' && <torusGeometry args={[0.8, 0.25, 16, 48]} />}
      {geometry === 'box' && <boxGeometry args={[1, 1, 1]} />}
      <meshStandardMaterial color={color} metalness={0.5} roughness={0.25} wireframe={index % 2 === 1} />
    </mesh>
  )
}

/** Formas geométricas complementarias que reaccionan al estado `active`. */
export default function FloatingShapes({ active }) {
  return (
    <group>
      {SHAPES.map((shape, i) => (
        <Shape key={i} index={i} active={active} {...shape} />
      ))}
    </group>
  )
}
