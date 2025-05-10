"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cursorRef.current || !cursorDotRef.current) return

    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power3.out",
      })

      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power1.out",
      })
    }

    const onMouseDown = () => {
      gsap.to(cursor, {
        scale: 0.8,
        duration: 0.2,
        ease: "power2.out",
      })
    }

    const onMouseUp = () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
      })
    }

    const onMouseEnterLink = () => {
      gsap.to(cursor, {
        scale: 1.5,
        opacity: 0.5,
        duration: 0.2,
        ease: "power2.out",
      })
    }

    const onMouseLeaveLink = () => {
      gsap.to(cursor, {
        scale: 1,
        opacity: 0.3,
        duration: 0.2,
        ease: "power2.out",
      })
    }

    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mousedown", onMouseDown)
    document.addEventListener("mouseup", onMouseUp)

    const links = document.querySelectorAll("a, button")
    links.forEach((link) => {
      link.addEventListener("mouseenter", onMouseEnterLink)
      link.addEventListener("mouseleave", onMouseLeaveLink)
    })

    return () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mousedown", onMouseDown)
      document.removeEventListener("mouseup", onMouseUp)

      links.forEach((link) => {
        link.removeEventListener("mouseenter", onMouseEnterLink)
        link.removeEventListener("mouseleave", onMouseLeaveLink)
      })
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed w-8 h-8 rounded-full border border-yellow-400 pointer-events-none opacity-30 z-50 -translate-x-1/2 -translate-y-1/2 hidden md:block"
      ></div>
      <div
        ref={cursorDotRef}
        className="fixed w-1 h-1 rounded-full bg-yellow-400 pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 hidden md:block"
      ></div>
    </>
  )
}
