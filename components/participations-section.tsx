"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { Trophy } from "lucide-react"

const participations = [
  {
    title: "NASA Space Apps",
    description: "Hackathon en Buenos Aires (Participación Virtual)",
    year: "2024",
    achievement: "Winner",
    logo: "/placeholder.svg?height=100&width=100",
  },
  {
    title: "Huawei ICT Competition",
    description: "Competencia Virtual",
    year: "2025",
    achievement: "Participant",
    logo: "/placeholder.svg?height=100&width=100",
  },
]

export default function ParticipationsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !itemsRef.current) return

    gsap.from(itemsRef.current.children, {
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

  return (
    <div ref={containerRef}>
      <div className="mb-12">
        <h2 ref={headingRef} className="text-3xl font-bold mb-2">
          <span className="text-yellow-400">Participaciones</span> Destacadas
        </h2>
        <div className="w-16 h-1 bg-yellow-400"></div>
      </div>

      <div ref={itemsRef} className="grid md:grid-cols-2 gap-6">
        {participations.map((item, index) => (
          <div key={index} className="bg-gray-900 rounded-lg p-6 hover:bg-gray-800 transition-colors">
            <div className="flex items-start gap-4">
              <div className="bg-gray-800 p-3 rounded-lg">
                <Image
                  src={item.logo || "/placeholder.svg"}
                  alt={item.title}
                  width={60}
                  height={60}
                  className="rounded"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                <p className="text-gray-400 text-sm mb-2">{item.description}</p>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-sm">{item.year}</span>
                  {item.achievement === "Winner" && (
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Trophy size={14} />
                      <span className="text-sm font-medium">Winner</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
