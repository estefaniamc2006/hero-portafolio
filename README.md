# Header interactivo con React Three Fiber

Header (`HeroHeader`) para un portafolio profesional, construido con React + Vite, React Three Fiber, `@react-three/drei` y Tailwind CSS.

## Qué incluye

| Requisito | Dónde |
|---|---|
| `<Canvas>` de R3F ocupando la pantalla de bienvenida | `src/components/HeroHeader.jsx` |
| Órbita restringida (sin zoom ni paneo) | `OrbitControls` en `HeroHeader.jsx` |
| Modelo `.fbx` con animación (`useAnimations`) | `src/components/Avatar.jsx` |
| Iluminación: ambiental, direccional con sombras y puntual de acento | `Scene` en `HeroHeader.jsx` |
| Formas flotantes y rotación con `useFrame` | `src/components/FloatingShapes.jsx`, `Avatar.jsx` |
| Interacción: `onClick` y `onPointerOver/Out` cambian el estado de React | `active` y `hovered` en `HeroHeader.jsx` |
| Capa HTML/Tailwind superpuesta (nombre, título, CTA, redes) | `HeroHeader.jsx` |

## Ejecutar en local

```bash
npm install
npm run dev
```

## Modelo 3D

Coloca tu `.fbx` en `public/models/` y ajusta las rutas en `src/data/profile.js`. Consulta `public/models/LEEME.md` para exportarlo desde Mixamo o Blender.

## Personalizar

Edita `src/data/profile.js` para cambiar nombre, título, redes y la ruta del modelo.

## Publicar en Vercel

1. Sube el proyecto a un repositorio público de GitHub.
2. En [vercel.com](https://vercel.com), importa el repositorio. Vercel detecta Vite automáticamente (`npm run build`, salida `dist`).
3. Despliega y comparte el enlace generado.
