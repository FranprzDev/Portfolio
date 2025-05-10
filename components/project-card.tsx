"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { gsap } from "gsap"
import { Github } from "lucide-react"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  demoUrl: string
  githubUrl: string
  technologies: string[]
}

export default function ProjectCard({ title, description, image, demoUrl, githubUrl, technologies }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current) return

    // Hover effect
    const card = cardRef.current

    card.addEventListener("mouseenter", () => {
      gsap.to(card.querySelector(".card-image"), {
        scale: 1.05,
        duration: 0.4,
        ease: "power2.out",
      })

      gsap.to(card.querySelector(".card-overlay"), {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      })
    })

    card.addEventListener("mouseleave", () => {
      gsap.to(card.querySelector(".card-image"), {
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      })

      gsap.to(card.querySelector(".card-overlay"), {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      })
    })

    return () => {
      card.removeEventListener("mouseenter", () => {})
      card.removeEventListener("mouseleave", () => {})
    }
  }, [])

  return (
    <div ref={cardRef} className="bg-gray-900 rounded-lg overflow-hidden group hover:bg-gray-800 transition-colors">
      <div className="aspect-video bg-gray-800 relative overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          width={500}
          height={300}
          className="card-image object-cover w-full h-full transition-transform duration-500"
        />
        <div className="card-overlay absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 transition-opacity flex items-end">
          <div className="p-4 w-full">
            <div className="flex justify-between items-center">
              <Link href={demoUrl} className="text-white hover:text-yellow-400 transition-colors">
                Ver demo
              </Link>
              <Link href={githubUrl} className="text-white hover:text-yellow-400 transition-colors">
                <Github size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-gray-400 text-sm mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span key={tech} className="px-2 py-1 bg-gray-800 text-xs rounded-full text-gray-300">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
