"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ExternalLink, Github, ChevronLeft, ChevronRight, X } from "lucide-react"

const projects = [
  {
    title: "EduSys",
    subtitle: "3er Proyecto FullStack MERN - RollingCode School",
    description:
      "Sistema de gestión educativa desarrollado con el stack MERN, implementando Context API y Custom Hooks para una experiencia de usuario fluida y escalable.",
    technologies: ["MERN", "Context", "CustomHooks"],
    githubUrl: "https://github.com/FranprzDev/EduSys",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    title: "LaburandoAndo",
    subtitle: "Proyecto Final React Avanzado - RollingCode School",
    description:
      "Plataforma de búsqueda de empleo desarrollada con React avanzado, Redux para manejo de estado global y TailwindCSS para un diseño moderno y responsive.",
    technologies: ["React", "Redux", "Axios", "TailwindCSS"],
    githubUrl: "https://github.com/FranprzDev/LaburandoAndo",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    title: "GymManagmentApp",
    subtitle: "Proyecto Freelance",
    description:
      "Aplicación de escritorio para gestión de gimnasios desarrollada con React y Electron, incluyendo sistema de webhooks y backend robusto con Nest.js.",
    technologies: ["React", "Electron", "Webhooks", "Nest.js"],
    githubUrl: "https://github.com/JoseScap/GymManagementApp",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    title: "AdHorarium",
    subtitle: "TESIS - Desarrollador Universitario",
    description:
      "Sistema de gestión de horarios académicos desarrollado como proyecto de tesis, utilizando Next.js con Supabase para backend y autenticación OAuth.",
    technologies: ["Next.js", "Supabase", "OAuth", "TypeScript"],
    githubUrl: "https://github.com/FranprzDev/AdHorarium",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    title: "HammingStepByStep",
    subtitle: "Proyecto Final Materia 'Comunicaciones'",
    description:
      "Herramienta educativa para visualizar el algoritmo de Hamming paso a paso, desarrollada con React para facilitar el aprendizaje de códigos de corrección de errores.",
    technologies: ["React", "JavaScript"],
    githubUrl: "https://github.com/FranprzDev/HammingStepByStep",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    title: "ExoGames",
    subtitle: "Proyecto Ganador NASA Space Apps 2024 Nacional - En Conjunto con IBM",
    description:
      "Juego educativo sobre exoplanetas que ganó el NASA Space Apps Challenge 2024 a nivel nacional, desarrollado en colaboración con IBM utilizando Astro para una experiencia web optimizada.",
    technologies: ["Astro", "JavaScript"],
    githubUrl: "https://github.com/FranprzDev/NASASpaceApp-Marshall-Arg",
    image: "/placeholder.svg?height=300&width=500",
  },
]

interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
  project: (typeof projects)[0] | null
}

function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && modalRef.current && contentRef.current) {
      document.body.style.overflow = "hidden"

      const tl = gsap.timeline()

      gsap.set(modalRef.current, {
        display: "flex",
        opacity: 0,
      })

      gsap.set(contentRef.current, {
        scale: 0.3,
        opacity: 0,
        y: 50,
      })

      tl.to(modalRef.current, {
        opacity: 1,
        duration: 0.2,
      }).to(
        contentRef.current,
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
        },
        0.1,
      )

      return () => {
        document.body.style.overflow = "unset"
      }
    } else {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const handleClose = () => {
    if (modalRef.current && contentRef.current) {
      const tl = gsap.timeline()

      tl.to(contentRef.current, {
        scale: 0.3,
        opacity: 0,
        y: 50,
        duration: 0.4,
        ease: "back.in(1.7)",
      }).to(
        modalRef.current,
        {
          opacity: 0,
          duration: 0.2,
          onComplete: () => {
            document.body.style.overflow = "unset"
            onClose()
          },
        },
        "-=0.1",
      )
    }
  }

  if (!isOpen || !project) return null

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm"
      style={{ display: "none" }}
      onClick={handleClose}
    >
      <div
        ref={contentRef}
        className="relative bg-gray-900/98 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-gray-700/60 w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-700/50">
          <div className="min-w-0 flex-1">
            <h3 className="text-lg sm:text-xl font-bold text-white truncate">{project.title}</h3>
            <p className="text-gray-400 text-sm truncate">{project.subtitle}</p>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 sm:p-2 hover:bg-gray-800 rounded-lg transition-colors flex-shrink-0 ml-4"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[calc(95vh-100px)] sm:max-h-[calc(90vh-140px)] overflow-y-auto p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Image */}
            <div className="space-y-4 order-2 lg:order-1">
              <div className="aspect-[4/3] bg-gray-800 rounded-lg sm:rounded-xl overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 bg-yellow-400 text-black px-3 sm:px-4 py-2 rounded-lg hover:bg-yellow-300 transition-colors font-medium text-sm sm:text-base"
              >
                <Github className="w-4 h-4" />
                <span>Ver en GitHub</span>
              </a>
            </div>

            {/* Details */}
            <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
              <div className="space-y-2">
                <h4 className="text-base sm:text-lg font-semibold text-yellow-400">Descripción</h4>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{project.description}</p>
              </div>

              <div className="space-y-2">
                <h4 className="text-base sm:text-lg font-semibold text-yellow-400">Tecnologías</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 sm:px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-xs sm:text-sm hover:bg-gray-700 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-base sm:text-lg font-semibold text-yellow-400">Tipo de Proyecto</h4>
                <p className="text-gray-300 text-sm sm:text-base">{project.subtitle}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const [currentProject, setCurrentProject] = useState(0)
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (!containerRef.current || !projectsRef.current) return

    gsap.from(projectsRef.current.children, {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    })
  }, [])

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const openModal = (project: (typeof projects)[0]) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedProject(null), 300)
  }

  return (
    <section className="relative z-10 bg-black/50 backdrop-blur-sm">
      <div ref={containerRef} className="py-8 sm:py-12 lg:py-16">
        <div className="mb-8 sm:mb-12">
          <h2 ref={headingRef} className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
            Mis <span className="text-yellow-400">Proyectos</span>
          </h2>
          <div className="w-12 sm:w-16 h-1 bg-yellow-400"></div>
        </div>

        {/* Project Carousel */}
        <div className="relative">
          <div className="overflow-hidden rounded-xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentProject * 100}%)` }}
            >
              {projects.map((project, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg border border-gray-800/50 overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
                      {/* Project Image */}
                      <div className="aspect-[4/3] bg-gray-800 rounded-lg overflow-hidden">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Project Info */}
                      <div className="flex flex-col justify-between space-y-4">
                        <div>
                          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{project.title}</h3>
                          <p className="text-yellow-400 text-sm mb-3">{project.subtitle}</p>
                          <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.technologies.map((tech, idx) => (
                              <span key={idx} className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full text-xs">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <button
                            onClick={() => openModal(project)}
                            className="flex items-center space-x-2 bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-300 transition-colors font-medium text-sm"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span>Ver Detalles</span>
                          </button>
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors font-medium text-sm"
                          >
                            <Github className="w-4 h-4" />
                            <span>GitHub</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevProject}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-900/80 hover:bg-gray-800 text-white p-2 rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextProject}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-900/80 hover:bg-gray-800 text-white p-2 rounded-full transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-6">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentProject(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentProject ? "bg-yellow-400" : "bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Modal */}
        <ProjectModal isOpen={isModalOpen} onClose={closeModal} project={selectedProject} />
      </div>
    </section>
  )
}
