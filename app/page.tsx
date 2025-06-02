"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Hero from "@/components/hero"
import Navigation from "@/components/navigation"
import AboutSection from "@/components/about-section"
import ExperienceSection from "@/components/experience-section"
import ProjectsSection from "@/components/projects-section"
import ParticipationsSection from "@/components/participations-section"
import ContactSection from "@/components/contact-section"
import CustomCursor from "@/components/custom-cursor"
import PageTransition from "@/components/page-transition"
import StudiesSection from "@/components/studies-section"

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null)
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Initialize scroll animations for ALL sections
    const sections = sectionsRef.current.filter(Boolean) as HTMLElement[]

    if (sections.length > 0) {
      sections.forEach((section, index) => {
        // Set initial state for all sections
        gsap.set(section, {
          opacity: index === 0 ? 1 : 0, // Hero starts visible
          y: index === 0 ? 0 : 100,
          rotateX: index === 0 ? 0 : 20,
          transformOrigin: "top center",
        })

        // Apply scroll triggers to all sections except hero
        if (index > 0) {
          ScrollTrigger.create({
            trigger: section,
            start: "top 85%",
            end: "top 15%",
            onEnter: () => {
              gsap.to(section, {
                opacity: 1,
                y: 0,
                rotateX: 0,
                duration: 1.2,
                ease: "power3.out",
              })
            },
            onLeaveBack: () => {
              gsap.to(section, {
                opacity: 0,
                y: 100,
                rotateX: 20,
                duration: 0.8,
                ease: "power3.in",
              })
            },
          })
        }

        // Add stagger animation for section content
        const sectionContent = section.querySelectorAll(".animate-on-scroll")
        if (sectionContent.length > 0 && index > 0) {
          gsap.set(sectionContent, {
            opacity: 0,
            y: 50,
          })

          ScrollTrigger.create({
            trigger: section,
            start: "top 75%",
            onEnter: () => {
              gsap.to(sectionContent, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
                delay: 0.3,
              })
            },
          })
        }
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const addToSectionRefs = (el: HTMLElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el)
    }
  }

  return (
    <main ref={mainRef} className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Custom cursor */}
      <CustomCursor />

      {/* Removed background image - now using solid gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 z-0"></div>

      {/* Page transition overlay */}
      <PageTransition />

      {/* Navigation - Always visible */}
      <Navigation />

      {/* Hero Section */}
      <section
        ref={addToSectionRefs}
        className="relative min-h-screen flex flex-col items-center justify-center px-4 z-10 pt-20"
      >
        <Hero />
      </section>

      {/* 1. Participations Section - FIRST */}
      <section
        id="participations"
        ref={addToSectionRefs}
        className="py-24 px-4 md:px-8 max-w-6xl mx-auto relative z-10"
      >
        <div className="animate-on-scroll">
          <ParticipationsSection />
        </div>
      </section>

      {/* 2. Experience Section - SECOND */}
      <section
        id="experience"
        ref={addToSectionRefs}
        className="py-24 px-4 md:px-8 max-w-6xl mx-auto bg-gray-950/50 relative z-10"
      >
        <div className="animate-on-scroll">
          <ExperienceSection />
        </div>
      </section>

      {/* 3. Studies Section - THIRD */}
      <section id="studies" ref={addToSectionRefs} className="py-24 px-4 md:px-8 max-w-6xl mx-auto relative z-10">
        <div className="animate-on-scroll">
          <StudiesSection />
        </div>
      </section>

      {/* 4. About Section - FOURTH */}
      <section
        id="about"
        ref={addToSectionRefs}
        className="py-24 px-4 md:px-8 max-w-6xl mx-auto bg-gray-950/50 relative z-10"
      >
        <div className="animate-on-scroll">
          <AboutSection />
        </div>
      </section>

      {/* 5. Projects Section - FIFTH */}
      <section id="projects" ref={addToSectionRefs} className="py-24 px-4 md:px-8 max-w-6xl mx-auto relative z-10">
        <div className="animate-on-scroll">
          <ProjectsSection />
        </div>
      </section>

      {/* 6. Contact Section - SIXTH */}
      <section
        id="contact"
        ref={addToSectionRefs}
        className="py-24 px-4 md:px-8 max-w-6xl mx-auto bg-gray-950/50 relative z-10"
      >
        <div className="animate-on-scroll">
          <ContactSection />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-800 text-center text-gray-400 text-sm relative z-10 animate-on-scroll">
        <div className="max-w-6xl mx-auto px-4">
          <p>© {new Date().getFullYear()} FranPrzDev. Todos los derechos reservados.</p>
        </div>
      </footer>
    </main>
  )
}
