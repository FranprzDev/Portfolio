"use client"

import { useState, useRef, useEffect } from "react"
import { gsap } from "gsap"
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
import { FaJava, FaUserCheck, FaProjectDiagram, FaPeopleArrows, FaChevronDown, FaChevronUp } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

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

export default function TechStack() {
  const [expanded, setExpanded] = useState(false)
  const [selectedTech, setSelectedTech] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  // Number of technologies to show when collapsed
  const visibleTechCount = 6

  useEffect(() => {
    if (!containerRef.current) return

    const items = itemRefs.current.filter(Boolean)

    gsap.from(items, {
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
  }, [expanded])

  const addToRefs = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      itemRefs.current[index] = el
    }
  }

  const displayedTechnologies = expanded ? technologies : technologies.slice(0, visibleTechCount)

  return (
    <div className="space-y-6">
      <div ref={containerRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {displayedTechnologies.map((tech, index) => (
          <Dialog key={tech.name}>
            <DialogTrigger asChild>
              <div
                ref={(el) => addToRefs(el, index)}
                className="aspect-square bg-gray-900 rounded-lg flex flex-col items-center justify-center p-4 hover:bg-gray-800 transition-colors group cursor-pointer border border-gray-800 hover:border-yellow-500"
                onClick={() => setSelectedTech(tech.name)}
              >
                <div className="mb-4 transform transition-transform group-hover:scale-110">{tech.icon}</div>
                <span className="text-sm text-gray-400 group-hover:text-yellow-400 transition-colors text-center">
                  {tech.name}
                </span>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-gray-900 border border-gray-800">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3 text-xl">
                  <span className="text-yellow-400">{tech.icon}</span>
                  <span>{tech.name}</span>
                </DialogTitle>
              </DialogHeader>
              <div className="mt-4 text-gray-300">
                <p>{techDescriptions[tech.name as keyof typeof techDescriptions]}</p>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>

      {technologies.length > visibleTechCount && (
        <div className="flex justify-center mt-6">
          <Button
            variant="outline"
            onClick={() => setExpanded(!expanded)}
            className="border border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black transition-colors"
          >
            {expanded ? (
              <>
                <FaChevronUp className="mr-2" /> Mostrar menos
              </>
            ) : (
              <>
                <FaChevronDown className="mr-2" /> Ver todas las tecnologías
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  )
}
