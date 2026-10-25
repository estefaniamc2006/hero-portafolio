// Datos del portafolio: edita aquí tu información personal.
export const profile = {
  name: 'Tefa',
  title: 'Desarrolladora Frontend · UI/UX',
  tagline: 'Construyo interfaces web con diseño cuidado, interacción y movimiento.',
  ctaLabel: 'Ver Proyectos',
  ctaHref: '#proyectos',
  socials: [
    { label: 'GitHub', href: 'https://github.com/estefaniamc2006' },
    { label: 'Email', href: 'mailto:estefaniamc2006@gmail.com' },
  ],
}

// Ruta del modelo FBX y de la animación (ambos en /public/models/)
export const avatarConfig = {
  modelUrl: '/models/Talking_On_Phone.fbx',
  animationUrl: '/models/Talking_On_Phone.fbx', // mismo archivo: personaje + animación
  scale: 0.01, // Mixamo exporta en centímetros
}