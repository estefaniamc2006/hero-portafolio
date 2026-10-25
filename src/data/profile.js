// Datos del portafolio: edita aquí tu información personal.
export const profile = {
  name: 'Tefa',
  title: 'Desarrolladora Frontend · UI/UX',
  tagline: 'Construyo interfaces web con diseño cuidado, interacción y movimiento.',
  ctaLabel: 'Ver Proyectos',
  ctaHref: '#proyectos',
  socials: [
    { label: 'GitHub', href: 'https://github.com/TU_USUARIO' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/TU_USUARIO' },
    { label: 'Email', href: 'mailto:estefaniamc2006@gmail.com' },
  ],
}

// Ruta del modelo FBX (colócalo en /public/models/) y de la animación.
// Si el modelo con animación integrada es el mismo archivo, usa la misma ruta en ambos.
export const avatarConfig = {
  modelUrl: '/models/tu-modelo.fbx',
  animationUrl: '/models/tu-modelo.fbx',
  scale: 0.01, // Mixamo exporta en centímetros
}
