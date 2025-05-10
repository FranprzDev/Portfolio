"use client"

import { useEffect } from "react"
import { gsap } from "gsap"

export function usePageTransition() {
  useEffect(() => {
    // Page enter animation
    const tl = gsap.timeline()

    // Hide content initially
    gsap.set("body", { opacity: 0 })

    // Reveal content with a fade in
    tl.to("body", {
      opacity: 1,
      duration: 0.5,
      ease: "power2.inOut",
    })

    // Handle page exit
    const handleExit = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest("a")

      if (anchor && anchor.href && anchor.href.startsWith(window.location.origin) && !anchor.href.includes("#")) {
        e.preventDefault()

        // Exit animation
        gsap.to("body", {
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut",
          onComplete: () => {
            window.location.href = anchor.href
          },
        })
      }
    }

    document.addEventListener("click", handleExit)

    return () => {
      document.removeEventListener("click", handleExit)
    }
  }, [])
}
