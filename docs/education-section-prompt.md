# 🎓 Prompt Perfecto para Sección de Educación con Modal de Certificaciones

## 📋 ESPECIFICACIONES TÉCNICAS

Crea un componente `StudiesSection.tsx` para Next.js 15 + TypeScript que incluya estudios universitarios y certificaciones clickeables con modal épico.

### 🎯 FUNCIONALIDADES PRINCIPALES

1. **Estudios universitarios**: Card principal con información académica
2. **Grid de certificaciones**: Cards clickeables con estados (completado/en curso)
3. **Modal épico**: Apertura con animaciones GSAP y fondo transparente
4. **Estados interactivos**: Hover effects y cursor personalizado
5. **Responsive design**: Adaptación completa mobile/desktop

### 🎨 ESTRUCTURA DE DATOS OBLIGATORIA

\`\`\`typescript
interface Certification {
  title: string
  institution: string
  period: string
  tech: string
  status: 'completed' | 'in-progress'
  certificateUrl?: string
}

const studies = [
  {
    degree: "Ingeniería en Sistemas de Información",
    institution: "Universidad Tecnológica Nacional",
    period: "2022 - En Curso",
    location: "Cruz Alta, Tucumán, Argentina",
    status: "En curso",
    description: "Estudiante de 4to año de Ingeniería en Sistemas de Información con enfoque en desarrollo de software, bases de datos y sistemas de información empresariales.",
    achievements: [
      "Especialización en desarrollo de código limpio y documentado",
      "Enfoque en soluciones robustas y escalables",
      "Capacidad de adaptación a distintos contextos y necesidades"
    ]
  }
]

const certifications: Certification[] = [
  {
    title: "FullStack Developer",
    institution: "RollingCode School",
    period: "Noviembre 2022 - Septiembre 2023",
    tech: "MongoDB, Express, React, Node (MERN)",
    status: 'completed'
  },
  {
    title: "React Avanzado",
    institution: "RollingCode School",
    period: "Mayo 2024 - Septiembre 2024",
    tech: "React, React-Hooks, Redux Toolkit, Zustand, Jest",
    status: 'completed'
  },
  {
    title: "React 4.0",
    institution: "RollingCode School",
    period: "Junio 2025 - En curso",
    tech: "Next.js, SSR, Auth.js, Server & Client Side, Server actions, Cookies",
    status: 'in-progress'
  },
  {
    title: "Data Engineer",
    institution: "RollingCode School",
    period: "Junio 2025 - En curso",
    tech: "Sistemas OLAP, Orquestación con Airflow, Airbyte, Data Warehousing, DBT, Apache Superset, Deploy",
    status: 'in-progress'
  }
]
\`\`\`

### 🎬 ESTRUCTURA DEL COMPONENTE

#### **1. Header de sección:**
\`\`\`jsx
<div className="text-center space-y-4">
  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
    <span className="text-yellow-400">Educación</span>
  </h2>
  <div className="w-16 sm:w-20 h-1 bg-yellow-400 mx-auto rounded-full"></div>
  <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto px-4">
    Mi formación académica y certificaciones profesionales en el campo de la tecnología
  </p>
</div>
\`\`\`

#### **2. Card de estudios universitarios:**
- **Layout**: `flex flex-col sm:flex-row gap-4 sm:gap-6`
- **Icono**: `w-12 h-12 sm:w-16 sm:h-16 bg-yellow-400/20 rounded-full` con `GraduationCap`
- **Badge de estado**: `bg-blue-400/20 text-blue-400 border border-blue-400/30`
- **Achievements**: Grid con bullets de `w-1.5 h-1.5 bg-yellow-400 rounded-full`

#### **3. Grid de certificaciones:**
\`\`\`jsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
  {certifications.map((cert, index) => (
    <div
      key={index}
      onClick={() => handleCertificationClick(cert)}
      className="cert-card group bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4 sm:p-6 hover:border-yellow-400/30 cursor-pointer hover:shadow-lg hover:shadow-yellow-400/10 hover:-translate-y-1 transition-all duration-300 interactive"
      data-cursor-text={`Ver ${cert.title}`}
    >
\`\`\`

### 🎭 MODAL DE CERTIFICACIONES

#### **Estructura del Modal:**
\`\`\`typescript
interface CertificationModalProps {
  isOpen: boolean
  onClose: () => void
  certification: Certification | null
}
\`\`\`

#### **Layout del Modal:**
- **Contenedor**: `fixed inset-0 z-[9999] h-[95vh]` con fondo transparente
- **Header**: Título, institución, icono de estado y botón cerrar
- **Grid principal**: `grid lg:grid-cols-2 gap-8` (imagen + detalles)
- **Área de scroll**: `h-[calc(95vh-140px)] overflow-y-auto`

#### **Gestión de imágenes:**
\`\`\`typescript
const getCertificateImage = useCallback(() => {
  if (!certification) return '/racoon_working.svg'
  
  if (certification.status === 'in-progress') {
    return '/racoon_working.svg'
  }

  switch (certification.title) {
    case 'FullStack Developer':
      return 'https://certs.rollingcodeschool.com//ZnJhbnV0bjIzQGdtYWlsLmNvbQ==-1696267420833-1.png'
    case 'React Avanzado':
      return 'https://certs.rollingcodeschool.com/ZnJhbnV0bjIzQGdtYWlsLmNvbQ==-1726843385401-1.png'
    default:
      return '/racoon_working.svg'
  }
}, [certification])
\`\`\`

### 🎬 ANIMACIONES GSAP DEL MODAL

#### **Apertura del modal:**
\`\`\`javascript
const tl = gsap.timeline()

gsap.set(modalRef.current, { 
  display: 'flex',
  opacity: 0,
})

gsap.set(contentRef.current, {
  scale: 0.3,
  opacity: 0,
  rotationY: -45,
  transformOrigin: 'center center',
})

tl.to(modalRef.current, {
  opacity: 1,
  duration: 0.1,
})
.to(contentRef.current, {
  scale: 1,
  opacity: 1,
  rotationY: 0,
  duration: 0.8,
  ease: "back.out(1.7)",
}, 0.2)
\`\`\`

#### **Animación de imagen:**
\`\`\`javascript
gsap.fromTo(imageRef.current, {
  scale: 0.8,
  opacity: 0,
  rotationX: 45,
}, {
  scale: 1,
  opacity: 1,
  rotationX: 0,
  duration: 1,
  ease: "back.out(1.7)",
  delay: 0.5,
})
\`\`\`

#### **Stagger de detalles:**
\`\`\`javascript
gsap.fromTo(detailElements, {
  x: 50,
  opacity: 0,
  rotationY: 15,
}, {
  x: 0,
  opacity: 1,
  rotationY: 0,
  duration: 0.8,
  stagger: 0.1,
  ease: "back.out(1.7)",
  delay: 0.8,
})
\`\`\`

#### **Partículas flotantes:**
\`\`\`javascript
const particles = Array.from({ length: 20 }, (_, i) => {
  const particle = document.createElement('div')
  particle.className = 'absolute w-2 h-2 bg-yellow-400 rounded-full opacity-20'
  particle.style.left = `${Math.random() * 100}%`
  particle.style.top = `${Math.random() * 100}%`
  contentRef.current?.appendChild(particle)

  gsap.fromTo(particle, {
    scale: 0,
    rotation: 0,
  }, {
    scale: Math.random() * 0.8 + 0.2,
    rotation: 360,
    duration: 2 + Math.random() * 2,
    ease: "power2.out",
    delay: Math.random() * 1,
    repeat: -1,
    yoyo: true,
  })
  
  return particle
})
\`\`\`

### 🎨 ESTILOS ESPECÍFICOS

#### **Cards de certificación:**
- **Background**: `bg-gray-800/30 backdrop-blur-sm`
- **Border**: `border-gray-700/50 hover:border-yellow-400/30`
- **Hover**: `hover:shadow-lg hover:shadow-yellow-400/10 hover:-translate-y-1`
- **Status badge**: Dinámico según completed/in-progress

#### **Modal styling:**
- **Backdrop**: `bg-transparent` (sin fondo oscuro)
- **Content**: `bg-gray-900/95 backdrop-blur-xl rounded-2xl`
- **Z-index**: `z-[9999]` (debajo del cursor que es z-[10000])

### 🔧 COMPORTAMIENTOS ESPECÍFICOS

1. **Click en certificación**: Abre modal con animación
2. **ESC key**: Cierra modal
3. **Click fuera**: Cierra modal
4. **Certificados completados**: Botón para abrir imagen original
5. **En progreso**: Muestra racoon_working.svg

### 🎯 HANDLERS OBLIGATORIOS

\`\`\`typescript
const handleCertificationClick = useCallback((certification: Certification) => {
  setSelectedCertification(certification)
  setIsModalOpen(true)
}, [])

const handleCloseModal = useCallback(() => {
  setIsModalOpen(false)
  setTimeout(() => setSelectedCertification(null), 300)
}, [])
\`\`\`

### 🎨 PALETA DE COLORES

- **Yellow accents**: `text-yellow-400`, `bg-yellow-400/20`
- **Status colors**: 
  - Completado: `bg-green-400/20 text-green-400`
  - En curso: `bg-blue-400/20 text-blue-400`
- **Grays**: `text-gray-300`, `text-gray-400`, `bg-gray-800/30`

### 📱 RESPONSIVE BREAKPOINTS

- **sm**: `sm:text-4xl`, `sm:space-y-8`, `sm:gap-6`
- **md**: `md:grid-cols-2` para certificaciones
- **lg**: `lg:grid-cols-2` para modal, `lg:text-5xl`

### 🚀 IMPORTS NECESARIOS

\`\`\`typescript
import { useState, useCallback, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { 
  GraduationCap, Calendar, MapPin, Award, 
  Eye, MousePointer, X, ExternalLink, BookOpen 
} from "lucide-react"
\`\`\`

### 🎭 CLASES ESPECIALES

- **cert-card**: Para animaciones GSAP
- **interactive**: Para cursor personalizado
- **detail-item**: Para stagger animations
- **tech-tag**: Para hover effects en tecnologías

### ⚡ OPTIMIZACIONES

- **useCallback**: Para todos los handlers
- **Lazy loading**: Modal solo se renderiza cuando está abierto
- **Memory cleanup**: Remover partículas en cleanup
- **Error handling**: onError para imágenes

**RESULTADO ESPERADO**: Sección completa de educación con grid interactivo de certificaciones y modal cinematográfico que muestra certificados reales o mapache trabajando.
