"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import ProjectCard from "./project-card"

const projects = [
  {
    title: "E-commerce Platform",
    description: "A full-featured e-commerce platform with payment integration",
    image: "/placeholder.svg?height=300&width=500",
    demoUrl: "#",
    githubUrl: "#",
    technologies: ["React", "Node.js", "PostgreSQL"],
  },
  {
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates",
    image: "/placeholder.svg?height=300&width=500",
    demoUrl: "#",
    githubUrl: "#",
    technologies: ["Next.js", "Prisma", "Socket.io"],
  },
  {
    title: "Portfolio Website",
    description: "A modern portfolio website with GSAP animations",
    image: "/placeholder.svg?height=300&width=500",
    demoUrl: "#",
    githubUrl: "#",
    technologies: ["React", "GSAP", "Tailwind CSS"],
  },
]

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !projectsRef.current) return

    gsap.from(projectsRef.current.children, {
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
          Mis <span className="text-yellow-400">Proyectos</span>
        </h2>
        <div className="w-16 h-1 bg-yellow-400"></div>
      </div>

      <div ref={projectsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </div>
  )
}
