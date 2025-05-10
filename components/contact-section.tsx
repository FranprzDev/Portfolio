"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Code, Linkedin, Mail, MapPin } from "lucide-react"
import ContactForm from "./contact-form"

export default function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return

    gsap.from(contentRef.current.children, {
      opacity: 0,
      y: 30,
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
          <span className="text-yellow-400">Contacto</span>
        </h2>
        <div className="w-16 h-1 bg-yellow-400"></div>
      </div>

      <div ref={contentRef} className="grid md:grid-cols-2 gap-12">
        <div>
          <p className="text-gray-300 mb-8">
            ¿Interesado en trabajar juntos? Contáctame a través de cualquiera de estos canales.
          </p>

          <div className="space-y-4">
            <a
              href="mailto:franciscoperezdeveloper@gmail.com"
              className="flex items-center gap-4 text-gray-300 hover:text-yellow-400 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center">
                <Mail size={20} />
              </div>
              <div>
                <div className="text-sm text-gray-400">Email</div>
                <div>franciscoperezdeveloper@gmail.com</div>
              </div>
            </a>

            <a
              href="https://linkedin.com/in/franprzdev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-gray-300 hover:text-yellow-400 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center">
                <Linkedin size={20} />
              </div>
              <div>
                <div className="text-sm text-gray-400">LinkedIn</div>
                <div>linkedin.com/in/franprzdev</div>
              </div>
            </a>

            <div className="flex items-center gap-4 text-gray-300">
              <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center">
                <MapPin size={20} />
              </div>
              <div>
                <div className="text-sm text-gray-400">Ubicación</div>
                <div>Cruz Alta - Tucumán, Argentina (GMT-3)</div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-gray-300">
              <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center">
                <Code size={20} />
              </div>
              <div>
                <div className="text-sm text-gray-400">Teléfono</div>
                <div>(+54) 9 381 541-2480</div>
              </div>
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  )
}
