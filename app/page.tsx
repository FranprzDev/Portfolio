"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { CircuitBoard } from "lucide-react"
import Hero from "@/components/hero"
import Navigation from "@/components/navigation"
import AboutSection from "@/components/about-section"
import ExperienceSection from "@/components/experience-section"
import ProjectsSection from "@/components/projects-section"
import ParticipationsSection from "@/components/participations-section"
import ContactSection from "@/components/contact-section"
import CustomCursor from "@/components/custom-cursor"
import PageTransition from "@/components/page-transition"
import { useTranslation } from 'next-i18next'
import { useRouter } from "next/navigation"

export default function Home() {
  const { i18n } = useTranslation()
  const mainRef = useRef<HTMLDivElement>(null)
  const sectionsRef = useRef<(HTMLElement | null)[]>([])
  const router = useRouter();
  const isInitializedRef = useRef(false);

  useEffect(() => {
    const userLang = navigator.language.split('-')[0];
    
    if (userLang !== 'es' && userLang !== 'en') {
      i18n.changeLanguage(userLang);
      router.push(`/${userLang}`);
    }
  }, [router, i18n]);

  useEffect(() => {
    if (isInitializedRef.current) return;
    isInitializedRef.current = true;
    
    gsap.registerPlugin(ScrollTrigger)

    const sections = sectionsRef.current.filter(Boolean) as HTMLElement[]

    if (sections.length > 0) {
      sections.forEach((section, index) => {
        if (index === 0) return

        gsap.set(section, {
          opacity: 0,
          y: 100,
          rotateX: 20,
          transformOrigin: "top center",
        })

        ScrollTrigger.create({
          trigger: section,
          start: "top 80%",
          end: "top 20%",
          onEnter: () => {
            gsap.to(section, {
              opacity: 1,
              y: 0,
              rotateX: 0,
              duration: 1,
              ease: "power3.out",
            })
          },
          onLeaveBack: () => {
            gsap.to(section, {
              opacity: 0,
              y: 100,
              rotateX: 20,
              duration: 1,
              ease: "power3.in",
            })
          },
        })
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
    <main ref={mainRef} className="min-h-screen bg-black text-white relative overflow-hidden perspective">
      <CustomCursor />

      <Navigation />

      <div className="fixed inset-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-40 z-10"></div>

      <PageTransition />

      <section
        ref={addToSectionRefs}
        className="relative min-h-screen flex flex-col items-center justify-center px-4 z-10"
      >
        <Hero />
      </section>

      <section id="about" ref={addToSectionRefs} className="py-24 px-4 md:px-8 max-w-6xl mx-auto relative z-10">
        <AboutSection />
      </section>
    
      <section
        id="experience"
        ref={addToSectionRefs}
        className="py-24 px-4 md:px-8 max-w-6xl mx-auto bg-gray-950 relative z-10"
      >
        <ExperienceSection />
      </section>

      <section id="projects" ref={addToSectionRefs} className="py-24 px-4 md:px-8 max-w-6xl mx-auto relative z-10">
        <ProjectsSection />
      </section>

      <section
        id="participations"
        ref={addToSectionRefs}
        className="py-24 px-4 md:px-8 max-w-6xl mx-auto bg-gray-950 relative z-10"
      >
        <ParticipationsSection />
      </section>

      <section id="contact" ref={addToSectionRefs} className="py-24 px-4 md:px-8 max-w-6xl mx-auto relative z-10">
        <ContactSection />
      </section>

      <footer className="py-8 border-t border-gray-800 text-center text-gray-400 text-sm relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <p>© {new Date().getFullYear()} FranPrzDev. Todos los derechos reservados.</p>
        </div>
      </footer>
    </main>
  )
}
