"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"

const technologies = [
  { name: "React", icon: "/placeholder.svg?height=80&width=80" },
  { name: "Next.js", icon: "/placeholder.svg?height=80&width=80" },
  { name: "Node.js", icon: "/placeholder.svg?height=80&width=80" },
  { name: "PostgreSQL", icon: "/placeholder.svg?height=80&width=80" },
  { name: "Tailwind CSS", icon: "/placeholder.svg?height=80&width=80" },
  { name: "TypeScript", icon: "/placeholder.svg?height=80&width=80" },
]

export default function TechStack() {
  const containerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

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
  }, [])

  const addToRefs = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      itemRefs.current[index] = el
    }
  }

  return (
    <div ref={containerRef} className="grid grid-cols-3 gap-4">
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
  )
}
