// Datos del portafolio: edita aquí tu información personal.
export const profile = {
  name: 'Tefa',
  fullName: 'Estefania Martínez Calvachi',
  title: 'Estudiante de Ingeniería de Sistemas',
  tagline:
    'Me gusta diseñar interfaces, programar experiencias interactivas y, en mi tiempo libre, jugar videojuegos.',
  location: 'Cali, Colombia',
  ctaLabel: 'Ver Proyectos',
  ctaHref: '#proyectos',
  education: {
    school: 'Universidad San Buenaventura Cali',
    program: 'Ingeniería de Sistemas',
    semester: 'Sexto semestre',
  },
  interests: ['Diseño de interfaces (UI/UX)', 'Videojuegos', 'Experiencias web en 3D'],
  skills: ['React', 'Vite', 'Tailwind CSS', 'Three.js / R3F', 'JavaScript', 'Figma'],
  socials: [
    {
      label: 'GitHub',
      href: 'https://github.com/estefaniamc2006',
      display: 'github.com/estefaniamc2006',
    },
    {
      label: 'Email',
      href: 'mailto:estefaniamc2006@gmail.com',
      display: 'estefaniamc2006@gmail.com',
    },
  ],
}

// Ruta del modelo FBX y de la animación (ambos en /public/models/)
export const avatarConfig = {
  modelUrl: '/models/Talking_On_Phone.fbx',
  animationUrl: '/models/Talking_On_Phone.fbx', // mismo archivo: personaje + animación
  scale: 0.01, // Mixamo exporta en centímetros
}