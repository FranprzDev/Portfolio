"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

const experiences = [
  {
    title: "FullStack Developer",
    company: "Rolling Code Studio",
    period: "2023 – Present",
    description:
      "Developed complete web projects, from frontend to backend integration. Strengthened my work with Scrum and Git Flow, optimized code quality by applying best practices, and worked in a team to solve technical challenges and ensure the delivery of functional and scalable solutions.",
    technologies: ["React", "Next.js", "TailwindCSS", "Node.js", "PostgreSQL", "PrismaORM"],
  },
  {
    title: "Freelance Developer",
    company: "",
    period: "2023",
    description: "Created custom solutions based on functional requirements for private clients.",
    technologies: ["React", "Node.js", "PostgreSQL"],
  },
  {
    title: "Tutor Web Development & Advanced Backend",
    company: "Rolling Code School",
    period: "2022 – 2023",
    description: "Supported during classes by sharing experiences and encouraging student learning.",
    technologies: ["HTML", "CSS", "Bootstrap", "Node.js", "Express", "MySQL", "Git", "Github"],
  },
  {
    title: "Backend Developer",
    company: "No Country",
    period: "2022",
    description:
      "Developed a scalable API using BFFs and relational databases, strengthening skills in autonomy and prevention of technical debt.",
    technologies: ["Node.js", "PostgreSQL", "Sequelize", "Jest"],
  },
]

export default function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (!containerRef.current) return

    const items = itemRefs.current.filter(Boolean)

    gsap.from(items, {
      opacity: 0,
      x: -50,
      stagger: 0.2,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    })

    // Animate the timeline line
    gsap.from(".timeline-line", {
      height: 0,
      duration: 1.5,
      ease: "power3.inOut",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    })

    // Animate the timeline dots
    gsap.from(".timeline-dot", {
      scale: 0,
      stagger: 0.2,
      duration: 0.5,
      ease: "back.out(1.7)",
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
    <div ref={containerRef} className="space-y-8 sm:space-y-12 relative">
      {/* Timeline line - Responsive positioning */}
      <div className="timeline-line absolute left-3 sm:left-4 top-0 bottom-0 w-0.5 bg-gray-800"></div>

      {experiences.map((exp, index) => (
        <div key={index} ref={(el) => addToRefs(el, index)} className="relative pl-8 sm:pl-12">
          {/* Timeline dot - Fixed positioning */}
          <div className="timeline-dot absolute w-3 h-3 sm:w-4 sm:h-4 bg-yellow-400 rounded-full left-2 sm:left-2.5 top-1 sm:top-2 transform -translate-x-1/2"></div>

          <div className="mb-3 sm:mb-2">
            <h3 className="text-lg sm:text-xl font-bold text-white">{exp.title}</h3>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-gray-400 text-sm">
              {exp.company && (
                <>
                  <span className="text-yellow-400 font-medium">{exp.company}</span>
                  <span className="hidden sm:inline">•</span>
                </>
              )}
              <span>{exp.period}</span>
            </div>
          </div>

          <p className="text-gray-300 mb-4 text-sm sm:text-base leading-relaxed">{exp.description}</p>

          <div className="flex flex-wrap gap-2">
            {exp.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-gray-900 text-xs rounded-full text-gray-300 border border-gray-700"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
