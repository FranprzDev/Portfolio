"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { gsap } from "gsap"

export default function Navigation({ mode = "fixed" }: { mode?: "fixed" | "absolute" }) {
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.from(navRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.8,
      delay: 1,
      ease: "power3.out",
    })
  }, [])

  return (
    <nav
      ref={navRef}
      className={
        mode === "fixed"
          ? "absolute bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md shadow-2xl border-t border-gray-800"
          : "absolute top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md shadow-2xl border-b border-gray-800"
      }
    >
      <ul className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm font-medium px-4">
        <li>
          <Link href="#about" className="text-gray-400 hover:text-yellow-400 transition-colors relative group">
            Acerca de Mí
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </li>
        <li>
          <Link href="#experience" className="text-gray-400 hover:text-yellow-400 transition-colors relative group">
            Experiencia
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </li>
        <li>
          <Link href="#projects" className="text-gray-400 hover:text-yellow-400 transition-colors relative group">
            Proyectos
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </li>
        <li>
          <Link href="#participations" className="text-gray-400 hover:text-yellow-400 transition-colors relative group">
            Participaciones
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </li>
        <li>
          <Link href="#contact" className="text-gray-400 hover:text-yellow-400 transition-colors relative group">
            Contacto
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </li>
      </ul>

      {/* Scroll indicator */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 animate-bounce mt-8">
        <div className="w-6 h-10 rounded-full border-2 border-gray-600 flex justify-center pt-1">
          <div className="w-1 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
        </div>
      </div>
    </nav>
  )
}
