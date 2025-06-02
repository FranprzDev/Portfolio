"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Mail, MapPin } from "lucide-react"

export default function Hero() {
  const logoRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initial animations
    const tl = gsap.timeline()

    tl.from(logoRef.current, {
      y: 50,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
    })
      .from(
        taglineRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.8",
      )
      .from(
        infoRef.current,
        {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5",
      )
  }, [])

  return (
    <div className="text-center">
      <div ref={logoRef} className="mb-6 relative">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter">
          <span className="text-white">Fran</span>
          <span className="text-yellow-400">Prz</span>
          <span className="text-white">Dev</span>
        </h1>
        <div className="absolute inset-0 blur-xl opacity-30 bg-yellow-400 rounded-full -z-10"></div>
      </div>

      <div ref={taglineRef}>
        <h2 className="text-xl md:text-3xl font-medium mb-8 text-gray-300">
          <span className="text-yellow-400 font-bold">FullStack</span> Web Developer
        </h2>

        <p className="max-w-md mx-auto text-gray-400 mb-12">
          Creating robust and scalable web solutions with clean, optimized code
        </p>
      </div>

      <div ref={infoRef} className="flex items-center justify-center gap-4 text-sm text-gray-400">
        <div className="flex items-center gap-1">
          <MapPin size={16} className="text-yellow-400" />
          <span>Cruz Alta, Tucumán, Argentina</span>
        </div>
        <div className="h-4 w-px bg-gray-700"></div>
        <div className="flex items-center gap-1">
          <Mail size={16} className="text-yellow-400" />
          <span>franciscoperezdeveloper@gmail.com</span>
        </div>
      </div>
    </div>
  )
}
