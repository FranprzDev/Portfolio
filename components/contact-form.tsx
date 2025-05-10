"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function ContactForm() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean
    message?: string
  } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setSubmitStatus({
      success: true,
      message: "¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto.",
    })

    setIsSubmitting(false)
  }

  return (
    <div className="bg-gray-900 p-6 rounded-lg">
      <h3 className="text-xl font-bold mb-6">Envíame un mensaje</h3>

      {submitStatus && (
        <div
          className={`mb-6 p-3 rounded-md ${
            submitStatus.success ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-sm text-gray-400 mb-1">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            value={formState.name}
            onChange={handleChange}
            required
            className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm text-gray-400 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formState.email}
            onChange={handleChange}
            required
            className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm text-gray-400 mb-1">
            Mensaje
          </label>
          <textarea
            id="message"
            rows={4}
            value={formState.message}
            onChange={handleChange}
            required
            className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          ></textarea>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-yellow-400 text-black font-medium py-2 rounded-md hover:bg-yellow-300 transition-colors disabled:opacity-70"
        >
          {isSubmitting ? "Enviando..." : "Enviar mensaje"}
        </Button>
      </form>
    </div>
  )
}
