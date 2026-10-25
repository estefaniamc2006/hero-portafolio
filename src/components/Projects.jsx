import { projects } from '../data/projects.js'

export default function Projects() {
  return (
    <section id="proyectos" className="mx-auto max-w-6xl px-6 py-24">
      <h2 className="text-3xl font-semibold text-white">Proyectos</h2>
      <p className="mt-2 text-purple-200/70">Trabajos seleccionados desde mi GitHub.</p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <article
            key={project.title}
            className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:-translate-y-1 hover:border-pink-300/40"
          >
            <h3 className="text-xl font-semibold text-white">{project.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-purple-100/70">
              {project.description}
            </p>

            <ul className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-purple-500/20 px-3 py-1 text-xs text-pink-100"
                >
                  {tag}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-3 text-sm font-medium">
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/20 px-4 py-2 text-white/90 transition hover:border-pink-200 hover:text-pink-200"
                >
                  Código en GitHub
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-pink-100 px-4 py-2 text-purple-950 transition hover:bg-white"
                >
                  Ver demo
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}