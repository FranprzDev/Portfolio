"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export default function ContactForm() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formState,
          to: "franciscoperezdeveloper@gmail.com",
        }),
      })

      if (response.ok) {
        toast({
          title: "¡Mensaje enviado!",
          description: "Tu mensaje ha sido enviado correctamente. Me pondré en contacto contigo pronto.",
          duration: 5000,
        })

        // Reset form
        setFormState({
          name: "",
          email: "",
          message: "",
        })
      } else {
        throw new Error("Error al enviar el mensaje")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al enviar tu mensaje. Por favor, intenta nuevamente.",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm p-4 sm:p-6 rounded-lg sm:rounded-xl border border-gray-700/50">
      <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-white">Envíame un mensaje</h3>

      <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-sm text-gray-400 mb-2">
            Nombre *
          </label>
          <input
            type="text"
            id="name"
            value={formState.name}
            onChange={handleChange}
            required
            className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 sm:px-4 py-2 sm:py-3 text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
            placeholder="Tu nombre completo"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm text-gray-400 mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            value={formState.email}
            onChange={handleChange}
            required
            className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 sm:px-4 py-2 sm:py-3 text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
            placeholder="tu@email.com"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm text-gray-400 mb-2">
            Mensaje *
          </label>
          <textarea
            id="message"
            rows={4}
            value={formState.message}
            onChange={handleChange}
            required
            className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 sm:px-4 py-2 sm:py-3 text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all resize-none"
            placeholder="Cuéntame sobre tu proyecto o consulta..."
          ></textarea>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-yellow-400 text-black font-medium py-2 sm:py-3 rounded-md hover:bg-yellow-300 transition-colors disabled:opacity-70 disabled:cursor-not-allowed text-sm sm:text-base"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              <span>Enviando...</span>
            </div>
          ) : (
            "Enviar mensaje"
          )}
        </Button>
      </form>
    </div>
  )
}
