"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { SiReact, SiNextdotjs, SiNodedotjs, SiPostgresql, SiTailwindcss, SiTypescript, SiNestjs, SiPython, SiMongodb, SiCplusplus, SiAstro, SiMysql, SiDocker, SiSupabase, SiAmazon } from "react-icons/si"
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { FaExpand, FaCompress, FaUserCheck, FaProjectDiagram, FaJava, FaPeopleArrows } from "react-icons/fa"

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
  "React": "He desarrollado aplicaciones rápidas y eficientes, utilizando principalmente un enfoque funcional. React ha sido fundamental en mis primeros pasos y sigue siendo una herramienta clave en mi stack.",
  "Next.js": "Es el framework que más utilizo en mi etapa profesional, destacando por su versatilidad y las múltiples opciones que ofrece. Es mi framework preferido para proyectos modernos y escalables; de hecho, este portafolio está construido con Next.js.",
  "Node.js": "Uso constante tanto en proyectos personales como profesionales, especialmente en combinación con Next.js. También lo he empleado en otros entornos para construir APIs y servicios backend robustos.",
  "Nest.js": "Mi framework de backend favorito por su arquitectura modular, escalabilidad y la amplia gama de funcionalidades que ofrece. Ha sido clave en el desarrollo de APIs profesionales y mantenibles.",
  "Python": "Utilizado extensamente en el ámbito académico y para el desarrollo de APIs con FastAPI. Es una herramienta versátil que me ha permitido abordar desde scripts hasta soluciones completas de backend.",
  "Java": "Uno de los lenguajes que menos me agrada, pero por la facultad lo conozco y manejo bastante bien. He realizado proyectos académicos y prácticos con Java, lo que me permite desenvolverme con soltura en este lenguaje.",
  "PostgreSQL": "Mi base de datos SQL preferida y la que más utilizo. Destaco su robustez, rendimiento y flexibilidad para proyectos de cualquier escala.",
  "MongoDB": "Fue la base de datos con la que inicié en el mundo NoSQL. Aunque actualmente prefiero SQL, valoro su flexibilidad y facilidad de uso para prototipos y proyectos ágiles.",
  "MySQL": "He utilizado MySQL en proyectos académicos y profesionales, destacando su estabilidad y amplia adopción en la industria.",
  "Tailwind CSS": "Mi framework de estilos favorito por su productividad y capacidad para crear interfaces modernas y personalizables de manera eficiente.",
  "TypeScript": "Mi lenguaje de programación favorito, que utilizo de forma constante para asegurar la calidad, escalabilidad y mantenibilidad del código en todos mis proyectos.",
  "C++": "Lenguaje aprendido en la universidad, donde alcancé un dominio avanzado. Incluso he impartido cursos sobre C++ y lo considero fundamental para comprender conceptos de bajo nivel y optimización.",
  "Astro": "Utilizado en proyectos destacados como el de la NASA. Me impresionó su enfoque innovador para el desarrollo web, aunque aún no he tenido la oportunidad de emplearlo en más proyectos.",
  "Docker": "Herramienta esencial en mi etapa profesional para la creación, despliegue y gestión de entornos de desarrollo y producción de manera eficiente y reproducible.",
  "Supabase": "Utilizado en proyectos personales para implementar soluciones backend rápidas y funcionales, aprovechando su integración con bases de datos y autenticación.",
  "AWS": "Experiencia en el uso de servicios de Amazon Web Services en proyectos profesionales, especialmente para el despliegue, almacenamiento y escalabilidad de aplicaciones.",
  "Análisis Funcional": "Experiencia en el relevamiento de requerimientos, análisis de procesos y documentación funcional para asegurar que las soluciones tecnológicas respondan a las necesidades del negocio.",
  "UML": "Capacidad para plasmar conocimientos y requerimientos en diagramas UML, facilitando la comunicación y el diseño estructurado de sistemas.",
  "Scrum": "Manejo de la metodología Scrum a la perfección, junto a otras metodologías ágiles. Experiencia en la gestión de equipos, planificación de sprints y mejora continua."
} as const;

type TechName = keyof typeof techDescriptions;

const ITEMS_PER_ROW = Math.ceil(technologies.length / 2);

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const techItemRefs = useRef<(HTMLDivElement | null)[]>([])
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return

    const techItems = techItemRefs.current.filter(Boolean)

    gsap.from(techItems, {
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

  const addToRefs = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      techItemRefs.current[index] = el
    }
  }

  // Mostrar solo dos filas
  const row1 = technologies.slice(0, ITEMS_PER_ROW);
  const row2 = technologies.slice(ITEMS_PER_ROW, ITEMS_PER_ROW * 2);

  return (
    <div ref={containerRef}>
      <div className="mb-12 flex items-center justify-between">
        <div>
          <h2 ref={headingRef} className="text-3xl font-bold mb-2">
            Acerca de <span className="text-yellow-400">Mí</span>
          </h2>
          <div className="w-16 h-1 bg-yellow-400"></div>
        </div>
        <button
          className="ml-4 p-2 rounded-full bg-gray-800 hover:bg-yellow-400 hover:text-black text-yellow-400 transition-colors border border-yellow-400"
          onClick={() => setExpanded((e) => !e)}
          aria-label={expanded ? "Cerrar tecnologías" : "Expandir tecnologías"}
        >
          {expanded ? <FaCompress size={22} /> : <FaExpand size={22} />}
        </button>
      </div>

      <div ref={contentRef} className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Estudiante de Ingeniería en Sistemas de Información con experiencia en la industria, especializado en la
            creación de código limpio, documentado, robusto y escalable, con un enfoque particular en la optimización.
          </p>
          <p className="text-gray-300 leading-relaxed">
            En mi trayectoria profesional, he demostrado habilidades sólidas en el diseño de soluciones óptimas, más
            allá del código.
          </p>

          <Button className="mt-8 bg-yellow-400 text-black hover:bg-yellow-300">Descargar CV</Button>
        </div>

        <TooltipProvider>
          <div
            className={`transition-all duration-500 ${expanded ? "fixed inset-0 bg-black/95 z-[100] flex items-center justify-center" : ""}`}
            style={expanded ? { minHeight: "100vh" } : {}}
          >
            <div
              className={expanded
                ? "grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 p-4 sm:p-6 md:p-8 items-center justify-center"
                : "flex flex-col gap-4 items-center w-full"
              }
              style={expanded ? { maxWidth: '1200px', margin: '0 auto', width: '100%' } : { maxWidth: '100%', margin: '0 auto' }}
            >
              {expanded
                ? technologies.map((tech, index) => (
                    <Tooltip key={tech.name}>
                      <TooltipTrigger asChild>
                        <div
                          ref={(el) => addToRefs(el, index)}
                          className="w-24 h-24 sm:w-28 sm:h-28 bg-gray-900 rounded-xl flex flex-col items-center justify-center p-2 sm:p-4 group cursor-pointer border border-gray-800 shadow-lg transition-all duration-300 hover:border-yellow-400 hover:shadow-[0_0_16px_4px_rgba(250,204,21,0.5)] hover:bg-yellow-400/10 scale-110"
                        >
                          <div className="mb-2 opacity-80 group-hover:opacity-100 transition-opacity text-3xl sm:text-4xl">
                            {tech.icon}
                          </div>
                          <span className="text-xs sm:text-sm text-gray-400 group-hover:text-yellow-400 transition-colors font-semibold text-center">
                            {tech.name}
                          </span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-xs text-xs text-gray-200 bg-gray-900 border border-yellow-400 shadow-xl">
                        {techDescriptions[tech.name as TechName]}
                      </TooltipContent>
                    </Tooltip>
                  ))
                : <>
                    <div className="flex flex-row justify-center gap-2 sm:gap-4 w-full overflow-hidden">
                      {row1.map((tech, index) => (
                        <Tooltip key={tech.name}>
                          <TooltipTrigger asChild>
                            <div
                              ref={(el) => addToRefs(el, index)}
                              className="w-24 h-24 sm:w-28 sm:h-28 bg-gray-900 rounded-xl flex flex-col items-center justify-center p-2 sm:p-4 group cursor-pointer border border-gray-800 shadow-lg transition-all duration-300 hover:border-yellow-400 hover:shadow-[0_0_16px_4px_rgba(250,204,21,0.5)] hover:bg-yellow-400/10"
                            >
                              <div className="mb-2 opacity-80 group-hover:opacity-100 transition-opacity text-3xl sm:text-4xl">
                                {tech.icon}
                              </div>
                              <span className="text-xs sm:text-sm text-gray-400 group-hover:text-yellow-400 transition-colors font-semibold text-center">
                                {tech.name}
                              </span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="max-w-xs text-xs text-gray-200 bg-gray-900 border border-yellow-400 shadow-xl">
                            {techDescriptions[tech.name as TechName]}
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                    <div className="flex flex-row justify-center gap-2 sm:gap-4 w-full overflow-hidden">
                      {row2.map((tech, index) => (
                        <Tooltip key={tech.name}>
                          <TooltipTrigger asChild>
                            <div
                              ref={(el) => addToRefs(el, index + row1.length)}
                              className="w-24 h-24 sm:w-28 sm:h-28 bg-gray-900 rounded-xl flex flex-col items-center justify-center p-2 sm:p-4 group cursor-pointer border border-gray-800 shadow-lg transition-all duration-300 hover:border-yellow-400 hover:shadow-[0_0_16px_4px_rgba(250,204,21,0.5)] hover:bg-yellow-400/10"
                            >
                              <div className="mb-2 opacity-80 group-hover:opacity-100 transition-opacity text-3xl sm:text-4xl">
                                {tech.icon}
                              </div>
                              <span className="text-xs sm:text-sm text-gray-400 group-hover:text-yellow-400 transition-colors font-semibold text-center">
                                {tech.name}
                              </span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="max-w-xs text-xs text-gray-200 bg-gray-900 border border-yellow-400 shadow-xl">
                            {techDescriptions[tech.name as TechName]}
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                  </>
              }
            </div>
            {expanded && (
              <button
                className="absolute top-6 right-6 p-2 rounded-full bg-gray-800 hover:bg-yellow-400 hover:text-black text-yellow-400 transition-colors border border-yellow-400 z-[101]"
                onClick={() => setExpanded(false)}
                aria-label="Cerrar tecnologías"
              >
                <FaCompress size={22} />
              </button>
            )}
          </div>
        </TooltipProvider>
      </div>
    </div>
  )
}
