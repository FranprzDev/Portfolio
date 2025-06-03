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
    logo: "/logos/nasa-logo.png",
  },
  {
    title: "Huawei ICT Competition",
    description: "Competencia Virtual",
    year: "2025",
    achievement: "Participant",
    logo: "/logos/huawei-logo.png",
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
    <section className="relative z-10 bg-black/50 backdrop-blur-sm">
      <div ref={containerRef} className="py-8 sm:py-12 lg:py-16">
        <div className="mb-8 sm:mb-12">
          <h2 ref={headingRef} className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
            <span className="text-yellow-400">Participaciones</span> Destacadas
          </h2>
          <div className="w-12 sm:w-16 h-1 bg-yellow-400"></div>
        </div>

        <div ref={itemsRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {participations.map((item, index) => (
            <div
              key={index}
              className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-4 sm:p-6 hover:bg-gray-800/80 transition-all duration-300 border border-gray-800/50 hover:border-yellow-400/30"
            >
              <div className="flex items-start gap-4">
                <div className="bg-gray-800/50 p-3 rounded-lg flex-shrink-0">
                  <Image
                    src={item.logo || "/placeholder.svg"}
                    alt={`${item.title} logo`}
                    width={60}
                    height={60}
                    className="rounded object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/placeholder.svg?height=60&width=60"
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold mb-1 text-white">{item.title}</h3>
                  <p className="text-gray-400 text-sm mb-2">{item.description}</p>
                  <div className="flex items-center gap-2 flex-wrap">
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
    </section>
  )
}
