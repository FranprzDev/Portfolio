"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"

const technologies = [
  { name: "React", icon: "/placeholder.svg?height=80&width=80" },
  { name: "Next.js", icon: "/placeholder.svg?height=80&width=80" },
  { name: "Node.js", icon: "/placeholder.svg?height=80&width=80" },
  { name: "PostgreSQL", icon: "/placeholder.svg?height=80&width=80" },
  { name: "Tailwind CSS", icon: "/placeholder.svg?height=80&width=80" },
  { name: "TypeScript", icon: "/placeholder.svg?height=80&width=80" },
]

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const techItemRefs = useRef<(HTMLDivElement | null)[]>([])

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

  return (
    <div ref={containerRef}>
      <div className="mb-12">
        <h2 ref={headingRef} className="text-3xl font-bold mb-2">
          Acerca de <span className="text-yellow-400">Mí</span>
        </h2>
        <div className="w-16 h-1 bg-yellow-400"></div>
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

        <div className="grid grid-cols-3 gap-4">
          {technologies.map((tech, index) => (
            <div
              key={tech.name}
              ref={(el) => addToRefs(el, index)}
              className="aspect-square bg-gray-900 rounded-lg flex flex-col items-center justify-center p-4 hover:bg-gray-800 transition-colors group"
            >
              <Image
                src={tech.icon || "/placeholder.svg"}
                alt={tech.name}
                width={80}
                height={80}
                className="opacity-70 group-hover:opacity-100 transition-opacity mb-2"
              />
              <span className="text-sm text-gray-400 group-hover:text-yellow-400 transition-colors">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
