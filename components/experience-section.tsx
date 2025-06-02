"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

const experiences = [
  {
    title: "FullStack Developer",
    company: "Rolling Code Studio",
    period: "Octubre 2024 – Presente",
    description:
      "Durante mi tiempo aquí, desarrollé proyectos web completos, desde el frontend hasta la integración del backend. Fortalecí mi trabajo con Scrum y Git Flow, optimicé la calidad del código aplicando buenas prácticas y trabajé en equipo para resolver desafíos técnicos y garantizar la entrega de soluciones funcionales y escalables.",
    technologies: [
      "React",
      "Zustand",
      "Redux",
      "Next.js",
      "TailwindCSS",
      "ShadCN",
      "Ant Design",
      "PostgreSQL",
      "PrismaORM",
    ],
  },
  {
    title: "Freelance Developer",
    company: "",
    period: "Agosto 2024 – Septiembre 2024",
    description:
      "Cree una solución particular basada en requerimientos funcionales de un sistema para un cliente propio.",
    technologies: ["React", "Nest.js", "PostgreSQL", "TypeORM"],
  },
  {
    title: "Tutor Desarrollo Web & BackEnd Avanzado",
    company: "Rolling Code School",
    period: "Noviembre 2023 – Agosto 2024",
    description: "Apoye durante las clases compartiendo experiencias y fomentando el aprendizaje de los alumnos.",
    technologies: ["HTML", "CSS", "Bootstrap", "Node.js", "Express", "MySQL", "Jest", "Docker", "Git", "Github"],
  },
  {
    title: "BackEnd Developer",
    company: "No Country",
    period: "Octubre 2023 – Noviembre 2023",
    description:
      "Desarrollé una API escalable utilizando BFFs y bases de datos relacionales, fortaleciendo habilidades en autonomía y prevención de deuda técnica.",
    technologies: ["Node.js", "PostgreSQL", "Sequalize", "Jest"],
  },
]

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (!containerRef.current) return

    const items = itemRefs.current.filter(Boolean)

    // Animate the timeline line
    gsap.from(".timeline-line", {
      height: 0,
      duration: 1.5,
      ease: "power3.inOut",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    })

    // Animate the timeline items
    gsap.from(items, {
      opacity: 0,
      x: -50,
      stagger: 0.2,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    })

    // Animate the timeline dots
    gsap.from(".timeline-dot", {
      scale: 0,
      stagger: 0.2,
      duration: 0.5,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    })
  }, [])

  const addToRefs = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      itemRefs.current[index] = el
    }
  }

  return (
    <div ref={containerRef}>
      <div className="mb-12">
        <h2 ref={headingRef} className="text-3xl font-bold mb-2">
          <span className="text-yellow-400">Experiencia</span> Profesional
        </h2>
        <div className="w-16 h-1 bg-yellow-400"></div>
      </div>

      <div ref={timelineRef} className="space-y-12 relative">
        {/* Timeline line */}
        <div className="timeline-line absolute left-4 top-0 bottom-0 w-0.5 bg-gray-800"></div>

        {experiences.map((exp, index) => (
          <div key={index} ref={(el) => addToRefs(el, index)} className="relative pl-12">
            {/* Timeline dot */}
            <div className="timeline-dot absolute w-4 h-4 bg-yellow-400 rounded-full left-2.5 top-2 -translate-x-1/2"></div>

            <div className="mb-2">
              <h3 className="text-xl font-bold">{exp.title}</h3>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                {exp.company && (
                  <>
                    <span className="text-yellow-400">{exp.company}</span>
                    <span>•</span>
                  </>
                )}
                <span>{exp.period}</span>
              </div>
            </div>

            <p className="text-gray-300 mb-4">{exp.description}</p>

            <div className="flex flex-wrap gap-2">
              {exp.technologies.map((tech) => (
                <span key={tech} className="px-2 py-1 bg-gray-900 text-xs rounded-full text-gray-300">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
