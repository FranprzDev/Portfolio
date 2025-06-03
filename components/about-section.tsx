"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiNestjs,
  SiPython,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiTailwindcss,
  SiTypescript,
  SiCplusplus,
  SiAstro,
  SiDocker,
  SiSupabase,
  SiAmazon,
} from "react-icons/si"
import {
  FaJava,
  FaUserCheck,
  FaProjectDiagram,
  FaPeopleArrows,
  FaExpand,
  FaCompress,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa"

const technologies = [
  { name: "React", icon: <SiReact size={40} className="text-cyan-400" /> },
  { name: "Next.js", icon: <SiNextdotjs size={40} className="text-white" /> },
  { name: "Node.js", icon: <SiNodedotjs size={40} className="text-green-500" /> },
  { name: "Nest.js", icon: <SiNestjs size={40} className="text-red-500" /> },
  { name: "Python", icon: <SiPython size={40} className="text-blue-400" /> },
  { name: "Java", icon: <FaJava size={40} className="text-orange-500" /> },
  { name: "MongoDB", icon: <SiMongodb size={40} className="text-green-600" /> },
  { name: "PostgreSQL", icon: <SiPostgresql size={40} className="text-blue-500" /> },
  { name: "MySQL", icon: <SiMysql size={40} className="text-blue-400" /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss size={40} className="text-cyan-300" /> },
  { name: "TypeScript", icon: <SiTypescript size={40} className="text-blue-400" /> },
  { name: "C++", icon: <SiCplusplus size={40} className="text-blue-700" /> },
  { name: "Astro", icon: <SiAstro size={40} className="text-orange-400" /> },
  { name: "Docker", icon: <SiDocker size={40} className="text-blue-300" /> },
  { name: "Supabase", icon: <SiSupabase size={40} className="text-green-400" /> },
  { name: "AWS", icon: <SiAmazon size={40} className="text-yellow-400" /> },
  { name: "Análisis Funcional", icon: <FaUserCheck size={40} className="text-purple-400" /> },
  { name: "UML", icon: <FaProjectDiagram size={40} className="text-pink-400" /> },
  { name: "Scrum", icon: <FaPeopleArrows size={40} className="text-green-400" /> },
]

const techDescriptions = {
  React:
    "He desarrollado aplicaciones rápidas y eficientes, utilizando principalmente un enfoque funcional. React ha sido fundamental en mis primeros pasos y sigue siendo una herramienta clave en mi stack.",
  "Next.js":
    "Es el framework que más utilizo en mi etapa profesional, destacando por su versatilidad y las múltiples opciones que ofrece. Es mi framework preferido para proyectos modernos y escalables; de hecho, este portafolio está construido con Next.js.",
  "Node.js":
    "Uso constante tanto en proyectos personales como profesionales, especialmente en combinación con Next.js. También lo he empleado en otros entornos para construir APIs y servicios backend robustos.",
  "Nest.js":
    "Mi framework de backend favorito por su arquitectura modular, escalabilidad y la amplia gama de funcionalidades que ofrece. Ha sido clave en el desarrollo de APIs profesionales y mantenibles.",
  Python:
    "Utilizado extensamente en el ámbito académico y para el desarrollo de APIs con FastAPI. Es una herramienta versátil que me ha permitido abordar desde scripts hasta soluciones completas de backend.",
  Java: "Uno de los lenguajes que menos me agrada, pero por la facultad lo conozco y manejo bastante bien. He realizado proyectos académicos y prácticos con Java, lo que me permite desenvolverme con soltura en este lenguaje.",
  PostgreSQL:
    "Mi base de datos SQL preferida y la que más utilizo. Destaco su robustez, rendimiento y flexibilidad para proyectos de cualquier escala.",
  MongoDB:
    "Fue la base de datos con la que inicié en el mundo NoSQL. Aunque actualmente prefiero SQL, valoro su flexibilidad y facilidad de uso para prototipos y proyectos ágiles.",
  MySQL:
    "He utilizado MySQL en proyectos académicos y profesionales, destacando su estabilidad y amplia adopción en la industria.",
  "Tailwind CSS":
    "Mi framework de estilos favorito por su productividad y capacidad para crear interfaces modernas y personalizables de manera eficiente.",
  TypeScript:
    "Mi lenguaje de programación favorito, que utilizo de forma constante para asegurar la calidad, escalabilidad y mantenibilidad del código en todos mis proyectos.",
  "C++":
    "Lenguaje aprendido en la universidad, donde alcancé un dominio avanzado. Incluso he impartido cursos sobre C++ y lo considero fundamental para comprender conceptos de bajo nivel y optimización.",
  Astro:
    "Utilizado en proyectos destacados como el de la NASA. Me impresionó su enfoque innovador para el desarrollo web, aunque aún no he tenido la oportunidad de emplearlo en más proyectos.",
  Docker:
    "Herramienta esencial en mi etapa profesional para la creación, despliegue y gestión de entornos de desarrollo y producción de manera eficiente y reproducible.",
  Supabase:
    "Utilizado en proyectos personales para implementar soluciones backend rápidas y funcionales, aprovechando su integración con bases de datos y autenticación.",
  AWS: "Experiencia en el uso de servicios de Amazon Web Services en proyectos profesionales, especialmente para el despliegue, almacenamiento y escalabilidad de aplicaciones.",
  "Análisis Funcional":
    "Experiencia en el relevamiento de requerimientos, análisis de procesos y documentación funcional para asegurar que las soluciones tecnológicas respondan a las necesidades del negocio.",
  UML: "Capacidad para plasmar conocimientos y requerimientos en diagramas UML, facilitando la comunicación y el diseño estructurado de sistemas.",
  Scrum:
    "Manejo de la metodología Scrum a la perfección, junto a otras metodologías ágiles. Experiencia en la gestión de equipos, planificación de sprints y mejora continua.",
} as const

type TechName = keyof typeof techDescriptions

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const [expanded, setExpanded] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [selectedTech, setSelectedTech] = useState<string | null>(null)

  // Responsive items per slide
  const getItemsPerSlide = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) return 6 // lg
      if (window.innerWidth >= 768) return 4 // md
      if (window.innerWidth >= 640) return 3 // sm
      return 2 // mobile
    }
    return 6
  }

  const [itemsPerSlide, setItemsPerSlide] = useState(6)

  useEffect(() => {
    const handleResize = () => {
      setItemsPerSlide(getItemsPerSlide())
      setCurrentSlide(0) // Reset slide on resize
    }

    handleResize() // Set initial value
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const totalSlides = Math.ceil(technologies.length / itemsPerSlide)

  useEffect(() => {
    if (!containerRef.current) return

    gsap.from(containerRef.current.children, {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.6,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    })
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const getCurrentSlideItems = () => {
    const startIndex = currentSlide * itemsPerSlide
    return technologies.slice(startIndex, startIndex + itemsPerSlide)
  }

  return (
    <div ref={containerRef} className="animate-on-scroll">
      <div className="mb-12 flex items-center justify-between">
        <div>
          <h2 ref={headingRef} className="text-2xl sm:text-3xl font-bold mb-2">
            Acerca de <span className="text-yellow-400">Mí</span>
          </h2>
          <div className="w-16 h-1 bg-yellow-400"></div>
        </div>
        <button
          className="p-2 rounded-full bg-gray-800 hover:bg-yellow-400 hover:text-black text-yellow-400 transition-colors border border-yellow-400"
          onClick={() => setExpanded(!expanded)}
          aria-label={expanded ? "Cerrar vista expandida" : "Expandir tecnologías"}
          aria-expanded={expanded}
        >
          {expanded ? <FaCompress size={20} /> : <FaExpand size={20} />}
        </button>
      </div>

      <div ref={contentRef} className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        <div className="order-2 lg:order-1">
          <p className="text-gray-300 mb-6 leading-relaxed text-sm sm:text-base">
            Estudiante de Ingeniería en Sistemas de Información con experiencia en la industria, especializado en la
            creación de código limpio, documentado, robusto y escalable, con un enfoque particular en la optimización.
          </p>
          <p className="text-gray-300 leading-relaxed mb-8 text-sm sm:text-base">
            En mi trayectoria profesional, he demostrado habilidades sólidas en el diseño de soluciones óptimas, más
            allá del código.
          </p>

          <Button className="bg-yellow-400 text-black hover:bg-yellow-300 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3">
            Descargar CV
          </Button>
        </div>

        <div className="order-1 lg:order-2">
          {/* Expanded View Modal */}
          {expanded && (
            <div className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4">
              <div className="bg-gray-900 rounded-lg p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-yellow-400">Todas mis Tecnologías</h3>
                  <button
                    onClick={() => setExpanded(false)}
                    className="p-2 rounded-full bg-gray-800 hover:bg-yellow-400 hover:text-black text-yellow-400 transition-colors border border-yellow-400"
                    aria-label="Cerrar vista expandida"
                  >
                    <FaCompress size={20} />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {technologies.map((tech, index) => (
                    <Dialog key={tech.name}>
                      <DialogTrigger asChild>
                        <div
                          className="aspect-square bg-gray-800 rounded-lg flex flex-col items-center justify-center p-3 hover:bg-gray-700 transition-all duration-300 group cursor-pointer border border-gray-700 hover:border-yellow-400 hover:shadow-lg"
                          onClick={() => setSelectedTech(tech.name)}
                          role="button"
                          tabIndex={0}
                          aria-label={`Ver detalles de ${tech.name}`}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              setSelectedTech(tech.name)
                            }
                          }}
                        >
                          <div className="mb-2 transform transition-transform group-hover:scale-110">{tech.icon}</div>
                          <span className="text-xs text-gray-400 group-hover:text-yellow-400 transition-colors text-center font-medium">
                            {tech.name}
                          </span>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md bg-gray-900 border border-gray-700">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-3 text-xl">
                            <span className="text-yellow-400">{tech.icon}</span>
                            <span className="text-white">{tech.name}</span>
                          </DialogTitle>
                        </DialogHeader>
                        <div className="mt-4 text-gray-300 text-sm leading-relaxed">
                          <p>{techDescriptions[tech.name as TechName]}</p>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Slider View */}
          {!expanded && (
            <div className="relative">
              <div className="overflow-hidden" ref={sliderRef}>
                <div
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                    <div key={slideIndex} className="w-full flex-shrink-0">
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4">
                        {technologies
                          .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                          .map((tech, index) => (
                            <Dialog key={tech.name}>
                              <DialogTrigger asChild>
                                <div
                                  className="aspect-square bg-gray-900 rounded-lg flex flex-col items-center justify-center p-3 sm:p-4 hover:bg-gray-800 transition-all duration-300 group cursor-pointer border border-gray-800 hover:border-yellow-400 hover:shadow-lg"
                                  onClick={() => setSelectedTech(tech.name)}
                                  role="button"
                                  tabIndex={0}
                                  aria-label={`Ver detalles de ${tech.name}`}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                      setSelectedTech(tech.name)
                                    }
                                  }}
                                >
                                  <div className="mb-2 sm:mb-3 transform transition-transform group-hover:scale-110">
                                    {tech.icon}
                                  </div>
                                  <span className="text-xs sm:text-sm text-gray-400 group-hover:text-yellow-400 transition-colors text-center font-medium">
                                    {tech.name}
                                  </span>
                                </div>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-md bg-gray-900 border border-gray-700">
                                <DialogHeader>
                                  <DialogTitle className="flex items-center gap-3 text-xl">
                                    <span className="text-yellow-400">{tech.icon}</span>
                                    <span className="text-white">{tech.name}</span>
                                  </DialogTitle>
                                </DialogHeader>
                                <div className="mt-4 text-gray-300 text-sm leading-relaxed">
                                  <p>{techDescriptions[tech.name as TechName]}</p>
                                </div>
                              </DialogContent>
                            </Dialog>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrows */}
              {totalSlides > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 p-2 rounded-full bg-gray-800 hover:bg-yellow-400 hover:text-black text-yellow-400 transition-colors border border-yellow-400 z-10"
                    aria-label="Tecnologías anteriores"
                    disabled={currentSlide === 0}
                  >
                    <FaChevronLeft size={16} />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 p-2 rounded-full bg-gray-800 hover:bg-yellow-400 hover:text-black text-yellow-400 transition-colors border border-yellow-400 z-10"
                    aria-label="Siguientes tecnologías"
                    disabled={currentSlide === totalSlides - 1}
                  >
                    <FaChevronRight size={16} />
                  </button>
                </>
              )}

              {/* Slide Indicators */}
              {totalSlides > 1 && (
                <div className="flex justify-center mt-4 space-x-2">
                  {Array.from({ length: totalSlides }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentSlide ? "bg-yellow-400" : "bg-gray-600 hover:bg-gray-500"
                      }`}
                      aria-label={`Ir a la página ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
