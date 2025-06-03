import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

export const metadata: Metadata = {
  title: "FranPrzDev | FullStack Web Developer",
  description:
    "Portfolio profesional de Francisco Miguel Perez, Desarrollador Web FullStack especializado en crear soluciones web robustas y escalables.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${spaceGrotesk.variable} font-sans`}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
