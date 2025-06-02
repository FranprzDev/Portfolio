"use client"

import type React from "react"

import { useState, useEffect, useCallback, useRef } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import {
  ChevronDown,
  User,
  Briefcase,
  Trophy,
  Mail,
  BookOpen,
  FileText,
  Bookmark,
  Rss,
  Menu,
  X,
  GraduationCap,
  Globe,
} from "lucide-react"

interface MenuItem {
  name: string
  link: string
  disabled?: boolean
  icon?: React.ReactNode
}

interface MenuSection {
  title: string
  items: MenuItem[]
  icon: React.ReactNode
}

export default function Navigation() {
  const navRef = useRef<HTMLDivElement>(null)
  const mobileNavRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  const [language, setLanguage] = useState<"en" | "es">("es")
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const menuItems: Record<string, MenuSection> = {
    portfolio: {
      title: language === "en" ? "Portfolio" : "Portfolio",
      icon: <Briefcase className="w-4 h-4" />,
      items: [
        {
          name: language === "en" ? "Featured Participations" : "Participaciones Destacadas",
          link: "#participations",
          icon: <Trophy className="w-4 h-4" />,
        },
        {
          name: language === "en" ? "Professional Experience" : "Experiencia Profesional",
          link: "#experience",
          icon: <Briefcase className="w-4 h-4" />,
        },
        {
          name: language === "en" ? "Education" : "Educación",
          link: "#studies",
          icon: <GraduationCap className="w-4 h-4" />,
        },
        { name: language === "en" ? "About Me" : "Acerca de mí", link: "#about", icon: <User className="w-4 h-4" /> },
        {
          name: language === "en" ? "Projects" : "Mis Proyectos",
          link: "#projects",
          icon: <Briefcase className="w-4 h-4" />,
        },
        { name: language === "en" ? "Contact" : "Contacto", link: "#contact", icon: <Mail className="w-4 h-4" /> },
      ],
    },
    facultad: {
      title: language === "en" ? "Faculty" : "Facultad",
      icon: <BookOpen className="w-4 h-4" />,
      items: [
        {
          name: language === "en" ? "Faculty Files" : "Archivos de la Facultad",
          link: "#faculty-files",
          icon: <FileText className="w-4 h-4" />,
        },
        {
          name: language === "en" ? "Study Subscriptions" : "Suscripciones por estudiar",
          link: "#subscriptions",
          icon: <Bookmark className="w-4 h-4" />,
        },
      ],
    },
    blog: {
      title: "Blog",
      icon: <Rss className="w-4 h-4" />,
      items: [
        {
          name: language === "en" ? "Coming Soon" : "Próximamente",
          link: "#",
          disabled: true,
          icon: <Rss className="w-4 h-4 opacity-50" />,
        },
      ],
    },
  }

  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY > 100
    setIsScrolled(scrolled)

    if (navRef.current && containerRef.current) {
      gsap.to(navRef.current, {
        backgroundColor: scrolled ? "rgba(0, 0, 0, 0.95)" : "rgba(0, 0, 0, 0.8)",
        backdropFilter: scrolled ? "blur(20px)" : "blur(10px)",
        borderBottom: scrolled ? "1px solid rgba(251, 191, 36, 0.3)" : "1px solid transparent",
        duration: 0.4,
        ease: "power2.out",
      })

      gsap.to(containerRef.current, {
        backgroundColor: scrolled ? "rgba(17, 24, 39, 0.98)" : "rgba(17, 24, 39, 0.9)",
        borderColor: scrolled ? "rgba(251, 191, 36, 0.8)" : "rgba(75, 85, 99, 0.6)",
        scale: scrolled ? 0.96 : 1,
        y: scrolled ? 3 : 0,
        boxShadow: scrolled
          ? "0 25px 50px -12px rgba(251, 191, 36, 0.15), 0 0 0 1px rgba(251, 191, 36, 0.1)"
          : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        duration: 0.5,
        ease: "back.out(1.7)",
      })
    }
  }, [])

  const handleSmoothScroll = useCallback((link: string) => {
    if (link.startsWith("#")) {
      const element = document.querySelector(link)
      if (element) {
        const navHeight = 100 // Account for fixed navbar
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - navHeight
        window.scrollTo({
          top: elementPosition,
          behavior: "smooth",
        })
      }
    }
  }, [])

  const handleDropdownToggle = useCallback(
    (key: string) => {
      if (openDropdown === key) {
        setOpenDropdown(null)
      } else {
        setOpenDropdown(key)
      }
    },
    [openDropdown],
  )

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "es" : "en")
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdown && !navRef.current?.contains(event.target as Node)) {
        setOpenDropdown(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [openDropdown])

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        {
          y: -100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "back.out(1.7)",
          delay: 0.5,
        },
      )
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  useEffect(() => {
    if (openDropdown && dropdownRefs.current[openDropdown]) {
      const dropdown = dropdownRefs.current[openDropdown]
      const items = dropdown.querySelectorAll(".dropdown-item")

      gsap.fromTo(
        dropdown,
        {
          opacity: 0,
          y: -20,
          scale: 0.9,
          rotationX: -15,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
      )

      gsap.fromTo(
        items,
        {
          opacity: 0,
          x: -20,
          rotationY: -15,
        },
        {
          opacity: 1,
          x: 0,
          rotationY: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: "back.out(1.7)",
          delay: 0.2,
        },
      )
    }
  }, [openDropdown])

  useEffect(() => {
    if (isMobileMenuOpen && mobileNavRef.current) {
      gsap.fromTo(
        mobileNavRef.current,
        {
          height: 0,
          opacity: 0,
        },
        {
          height: "auto",
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
        },
      )
    }
  }, [isMobileMenuOpen])

  return (
    <nav
      ref={navRef}
      className="fixed w-full top-0 z-[100] transition-all duration-300 bg-black/80 backdrop-blur-md border-b border-transparent"
    >
      {/* Blur overlay for sides when scrolled */}
      {isScrolled && (
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-black/90 via-black/60 to-transparent backdrop-blur-lg"></div>
          <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-black/90 via-black/60 to-transparent backdrop-blur-lg"></div>
        </div>
      )}

      {/* Desktop Navigation */}
      <div className="hidden lg:block relative z-10">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div
            ref={containerRef}
            className={`backdrop-blur-md rounded-full px-8 py-3 border shadow-lg transition-all duration-300 ${
              isScrolled
                ? "bg-gray-900/98 border-yellow-400/80 shadow-yellow-400/25"
                : "bg-gray-900/90 border-gray-600/60"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                {Object.entries(menuItems).map(([key, section]) => (
                  <div key={key} className="relative group">
                    <button
                      onClick={() => handleDropdownToggle(key)}
                      className="flex items-center space-x-2 text-gray-300 hover:text-yellow-400 transition-colors duration-300 rounded-full px-4 py-2 hover:bg-yellow-400/10 interactive"
                      data-cursor-text={section.title}
                    >
                      {section.icon}
                      <span className="font-medium">{section.title}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${openDropdown === key ? "rotate-180" : ""}`}
                      />
                    </button>

                    {openDropdown === key && (
                      <div
                        ref={(el) => (dropdownRefs.current[key] = el)}
                        className="absolute top-full left-0 mt-2 w-64 rounded-2xl shadow-2xl bg-gray-900/98 backdrop-blur-xl border border-gray-700/60 overflow-hidden z-50"
                      >
                        <div className="p-2">
                          {section.items.map((item, index) => (
                            <Link
                              key={index}
                              href={item.link}
                              onClick={(e) => {
                                if (item.disabled) {
                                  e.preventDefault()
                                  return
                                }
                                handleSmoothScroll(item.link)
                                setOpenDropdown(null)
                              }}
                              className={`dropdown-item flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                                item.disabled
                                  ? "text-gray-500 cursor-not-allowed"
                                  : "text-gray-300 hover:text-yellow-400 hover:bg-yellow-400/10 interactive"
                              }`}
                              data-cursor-text={item.disabled ? "Próximamente" : item.name}
                            >
                              {item.icon}
                              <span className="font-medium">{item.name}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition-colors bg-gray-800/60 px-4 py-2 rounded-full interactive"
                data-cursor-text="Cambiar idioma"
              >
                <Globe size={16} />
                <span className="uppercase font-bold">{language}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden relative z-10">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between bg-gray-900/95 backdrop-blur-md rounded-2xl px-6 py-4 border border-gray-800/60">
            <div className="text-white font-bold text-lg">Francisco Perez</div>

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1 text-gray-400 hover:text-yellow-400 transition-colors"
              >
                <Globe size={16} />
                <span className="uppercase font-bold text-sm">{language}</span>
              </button>

              <button onClick={toggleMobileMenu} className="text-gray-300 hover:text-yellow-400 transition-colors">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div
              ref={mobileNavRef}
              className="mt-4 bg-gray-900/98 backdrop-blur-xl rounded-2xl border border-gray-800/60 overflow-hidden"
            >
              <div className="p-4 space-y-4">
                {Object.entries(menuItems).map(([key, section]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex items-center space-x-2 text-yellow-400 font-semibold px-2">
                      {section.icon}
                      <span>{section.title}</span>
                    </div>
                    <div className="space-y-1 pl-6">
                      {section.items.map((item, index) => (
                        <Link
                          key={index}
                          href={item.link}
                          onClick={(e) => {
                            if (item.disabled) {
                              e.preventDefault()
                              return
                            }
                            handleSmoothScroll(item.link)
                            setIsMobileMenuOpen(false)
                          }}
                          className={`mobile-menu-item flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-300 ${
                            item.disabled
                              ? "text-gray-500 cursor-not-allowed"
                              : "text-gray-300 hover:text-yellow-400 hover:bg-yellow-400/10"
                          }`}
                        >
                          {item.icon}
                          <span>{item.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
