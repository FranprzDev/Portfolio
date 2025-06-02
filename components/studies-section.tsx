"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import {
  GraduationCap,
  Calendar,
  MapPin,
  Award,
  Eye,
  X,
  ExternalLink,
  BookOpen,
  CheckCircle,
  Clock,
} from "lucide-react"

interface Certification {
  title: string
  institution: string
  period: string
  tech: string
  status: "completed" | "in-progress"
  certificateUrl?: string
}

interface CertificationModalProps {
  isOpen: boolean
  onClose: () => void
  certification: Certification | null
}

const studies = [
  {
    degree: "Ingeniería en Sistemas de Información",
    institution: "Universidad Tecnológica Nacional",
    period: "2022 - En Curso",
    location: "Cruz Alta, Tucumán, Argentina",
    status: "En curso",
    description:
      "Estudiante de 4to año de Ingeniería en Sistemas de Información con enfoque en desarrollo de software, bases de datos y sistemas de información empresariales.",
    achievements: [
      "Especialización en desarrollo de código limpio y documentado",
      "Enfoque en soluciones robustas y escalables",
      "Capacidad de adaptación a distintos contextos y necesidades",
    ],
  },
]

const certifications: Certification[] = [
  {
    title: "FullStack Developer",
    institution: "RollingCode School",
    period: "Noviembre 2022 - Septiembre 2023",
    tech: "MongoDB, Express, React, Node (MERN)",
    status: "completed",
    certificateUrl: "https://certs.rollingcodeschool.com//ZnJhbnV0bjIzQGdtYWlsLmNvbQ==-1696267420833-1.png",
  },
  {
    title: "React Avanzado",
    institution: "RollingCode School",
    period: "Mayo 2024 - Septiembre 2024",
    tech: "React, React-Hooks, Redux Toolkit, Zustand, Jest",
    status: "completed",
    certificateUrl: "https://certs.rollingcodeschool.com/ZnJhbnV0bjIzQGdtYWlsLmNvbQ==-1726843385401-1.png",
  },
  {
    title: "React 4.0",
    institution: "RollingCode School",
    period: "Junio 2025 - En curso",
    tech: "Next.js, SSR, Auth.js, Server & Client Side, Server actions, Cookies",
    status: "in-progress",
  },
  {
    title: "Data Engineer",
    institution: "RollingCode School",
    period: "Junio 2025 - En curso",
    tech: "Sistemas OLAP, Orquestación con Airflow, Airbyte, Data Warehousing, DBT, Apache Superset, Deploy",
    status: "in-progress",
  },
]

function CertificationModal({ isOpen, onClose, certification }: CertificationModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  const getCertificateImage = useCallback(() => {
    if (!certification) return "/placeholder.svg?height=400&width=600"

    if (certification.status === "in-progress") {
      return "/placeholder.svg?height=400&width=600"
    }

    return certification.certificateUrl || "/placeholder.svg?height=400&width=600"
  }, [certification])

  useEffect(() => {
    if (isOpen && modalRef.current && contentRef.current) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden"

      const tl = gsap.timeline()

      gsap.set(modalRef.current, {
        display: "flex",
        opacity: 0,
      })

      gsap.set(contentRef.current, {
        scale: 0.3,
        opacity: 0,
        rotationY: -45,
        transformOrigin: "center center",
      })

      tl.to(modalRef.current, {
        opacity: 1,
        duration: 0.1,
      }).to(
        contentRef.current,
        {
          scale: 1,
          opacity: 1,
          rotationY: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
        },
        0.2,
      )

      // Animate image
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          {
            scale: 0.8,
            opacity: 0,
            rotationX: 45,
          },
          {
            scale: 1,
            opacity: 1,
            rotationX: 0,
            duration: 1,
            ease: "back.out(1.7)",
            delay: 0.5,
          },
        )
      }

      // Animate details
      const detailElements = contentRef.current.querySelectorAll(".detail-item")
      gsap.fromTo(
        detailElements,
        {
          x: 50,
          opacity: 0,
          rotationY: 15,
        },
        {
          x: 0,
          opacity: 1,
          rotationY: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
          delay: 0.8,
        },
      )

      // Create floating particles
      const particles = Array.from({ length: 20 }, (_, i) => {
        const particle = document.createElement("div")
        particle.className = "absolute w-2 h-2 bg-yellow-400 rounded-full opacity-20"
        particle.style.left = `${Math.random() * 100}%`
        particle.style.top = `${Math.random() * 100}%`
        contentRef.current?.appendChild(particle)

        gsap.fromTo(
          particle,
          {
            scale: 0,
            rotation: 0,
          },
          {
            scale: Math.random() * 0.8 + 0.2,
            rotation: 360,
            duration: 2 + Math.random() * 2,
            ease: "power2.out",
            delay: Math.random() * 1,
            repeat: -1,
            yoyo: true,
          },
        )

        return particle
      })

      return () => {
        particles.forEach((particle) => particle.remove())
        document.body.style.overflow = "unset"
      }
    } else {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const handleClose = useCallback(() => {
    if (modalRef.current && contentRef.current) {
      const tl = gsap.timeline()

      tl.to(contentRef.current, {
        scale: 0.3,
        opacity: 0,
        rotationY: 45,
        duration: 0.5,
        ease: "back.in(1.7)",
      }).to(
        modalRef.current,
        {
          opacity: 0,
          duration: 0.2,
          onComplete: () => {
            document.body.style.overflow = "unset"
            onClose()
          },
        },
        "-=0.2",
      )
    }
  }, [onClose])

  if (!isOpen || !certification) return null

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      style={{ display: "none" }}
      onClick={handleClose}
    >
      <div
        ref={contentRef}
        className="relative bg-gray-900/98 backdrop-blur-xl rounded-2xl border border-gray-700/60 max-w-4xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <div className="flex items-center space-x-3">
            <div
              className={`p-2 rounded-lg ${certification.status === "completed" ? "bg-green-400/20" : "bg-blue-400/20"}`}
            >
              {certification.status === "completed" ? (
                <CheckCircle className="w-6 h-6 text-green-400" />
              ) : (
                <Clock className="w-6 h-6 text-blue-400" />
              )}
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{certification.title}</h3>
              <p className="text-gray-400">{certification.institution}</p>
            </div>
          </div>
          <button onClick={handleClose} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[calc(90vh-140px)] overflow-y-auto p-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Image */}
            <div ref={imageRef} className="space-y-4">
              <div className="aspect-[4/3] bg-gray-800 rounded-xl overflow-hidden">
                <Image
                  src={getCertificateImage() || "/placeholder.svg"}
                  alt={certification.title}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "/placeholder.svg?height=400&width=600"
                  }}
                />
              </div>
              {certification.status === "completed" && certification.certificateUrl && (
                <a
                  href={certification.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-300 transition-colors font-medium"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Ver Certificado Original</span>
                </a>
              )}
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div className="detail-item space-y-2">
                <h4 className="text-lg font-semibold text-yellow-400 flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>Período</span>
                </h4>
                <p className="text-gray-300">{certification.period}</p>
              </div>

              <div className="detail-item space-y-2">
                <h4 className="text-lg font-semibold text-yellow-400 flex items-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span>Tecnologías</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {certification.tech.split(", ").map((tech, index) => (
                    <span
                      key={index}
                      className="tech-tag px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm hover:bg-gray-700 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="detail-item space-y-2">
                <h4 className="text-lg font-semibold text-yellow-400 flex items-center space-x-2">
                  <Award className="w-5 h-5" />
                  <span>Estado</span>
                </h4>
                <div
                  className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${
                    certification.status === "completed"
                      ? "bg-green-400/20 text-green-400 border border-green-400/30"
                      : "bg-blue-400/20 text-blue-400 border border-blue-400/30"
                  }`}
                >
                  {certification.status === "completed" ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Completado</span>
                    </>
                  ) : (
                    <>
                      <Clock className="w-4 h-4" />
                      <span>En Progreso</span>
                    </>
                  )}
                </div>
              </div>

              {certification.status === "in-progress" && (
                <div className="detail-item bg-blue-400/10 border border-blue-400/30 rounded-lg p-4">
                  <p className="text-blue-400 text-sm">
                    🦝 Actualmente trabajando en esta certificación. ¡Pronto estará disponible!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function StudiesSection() {
  const [selectedCertification, setSelectedCertification] = useState<Certification | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCertificationClick = useCallback((certification: Certification) => {
    setSelectedCertification(certification)
    setIsModalOpen(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedCertification(null), 300)
  }, [])

  return (
    <div className="space-y-12 sm:space-y-16 text-left">
      {/* Header - Left aligned */}
      <div className="text-left space-y-4">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
          <span className="text-yellow-400">Educación</span> y Certificaciones
        </h2>
        <div className="w-16 sm:w-20 h-1 bg-yellow-400 rounded-full"></div>
        <p className="text-gray-400 text-base sm:text-lg max-w-2xl">
          Mi formación académica y certificaciones profesionales en el campo de la tecnología
        </p>
      </div>

      {/* University Studies */}
      <div className="space-y-8">
        <h3 className="text-2xl font-bold text-white flex items-center space-x-2">
          <GraduationCap className="w-8 h-8 text-yellow-400" />
          <span>Estudios Universitarios</span>
        </h3>

        {studies.map((study, index) => (
          <div key={index} className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-400/20 rounded-full flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <h4 className="text-xl sm:text-2xl font-bold text-white">{study.degree}</h4>
                  <span className="bg-blue-400/20 text-blue-400 border border-blue-400/30 px-3 py-1 rounded-full text-sm font-medium w-fit">
                    {study.status}
                  </span>
                </div>

                <div className="space-y-2 text-gray-300">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 text-yellow-400" />
                    <span className="font-medium">{study.institution}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-yellow-400" />
                    <span>{study.period}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-yellow-400" />
                    <span>{study.location}</span>
                  </div>
                </div>

                <p className="text-gray-400 leading-relaxed">{study.description}</p>

                <div className="space-y-3">
                  <h5 className="text-lg font-semibold text-yellow-400">Logros Destacados</h5>
                  <div className="grid gap-2">
                    {study.achievements.map((achievement, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-300">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Certifications */}
      <div className="space-y-8">
        <h3 className="text-2xl font-bold text-white flex items-center space-x-2">
          <Award className="w-8 h-8 text-yellow-400" />
          <span>Certificaciones</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {certifications.map((cert, index) => (
            <div
              key={index}
              onClick={() => handleCertificationClick(cert)}
              className="cert-card group bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4 sm:p-6 hover:border-yellow-400/30 cursor-pointer hover:shadow-lg hover:shadow-yellow-400/10 hover:-translate-y-1 transition-all duration-300 interactive"
              data-cursor-text={`Ver ${cert.title}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-2 rounded-lg ${cert.status === "completed" ? "bg-green-400/20" : "bg-blue-400/20"}`}>
                  {cert.status === "completed" ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <Clock className="w-5 h-5 text-blue-400" />
                  )}
                </div>
                <Eye className="w-5 h-5 text-gray-400 group-hover:text-yellow-400 transition-colors" />
              </div>

              <div className="space-y-3">
                <h4 className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors">
                  {cert.title}
                </h4>
                <p className="text-gray-400 text-sm">{cert.institution}</p>
                <p className="text-gray-500 text-sm">{cert.period}</p>

                <div className="flex flex-wrap gap-1">
                  {cert.tech
                    .split(", ")
                    .slice(0, 3)
                    .map((tech, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-700/50 text-gray-400 rounded text-xs">
                        {tech}
                      </span>
                    ))}
                  {cert.tech.split(", ").length > 3 && (
                    <span className="px-2 py-1 bg-gray-700/50 text-gray-400 rounded text-xs">
                      +{cert.tech.split(", ").length - 3}
                    </span>
                  )}
                </div>

                <div
                  className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                    cert.status === "completed" ? "bg-green-400/20 text-green-400" : "bg-blue-400/20 text-blue-400"
                  }`}
                >
                  {cert.status === "completed" ? (
                    <>
                      <CheckCircle className="w-3 h-3" />
                      <span>Completado</span>
                    </>
                  ) : (
                    <>
                      <Clock className="w-3 h-3" />
                      <span>En Progreso</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <CertificationModal isOpen={isModalOpen} onClose={handleCloseModal} certification={selectedCertification} />
    </div>
  )
}
