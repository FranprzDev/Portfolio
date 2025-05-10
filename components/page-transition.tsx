"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function PageTransition() {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!overlayRef.current) return

    // Initial page load animation
    const tl = gsap.timeline()

    tl.set(overlayRef.current, {
      y: 0,
    })
      .to(overlayRef.current, {
        y: "-100%",
        duration: 1,
        ease: "power4.inOut",
      })
      .set(overlayRef.current, {
        y: "100%",
      })

    // Handle link clicks for page transitions
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest("a")

      if (
        link &&
        link.href &&
        link.href.startsWith(window.location.origin) &&
        !link.href.includes("#") &&
        !e.ctrlKey &&
        !e.metaKey
      ) {
        e.preventDefault()

        // Page exit animation
        gsap.to(overlayRef.current, {
          y: 0,
          duration: 0.5,
          ease: "power4.inOut",
          onComplete: () => {
            window.location.href = link.href
          },
        })
      }
    }

    document.addEventListener("click", handleLinkClick)

    return () => {
      document.removeEventListener("click", handleLinkClick)
    }
  }, [])

  return (
    <div ref={overlayRef} className="fixed inset-0 bg-black z-50 transform translate-y-full pointer-events-none"></div>
  )
}
