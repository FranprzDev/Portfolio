# 🧭 Prompt Perfecto para Navegación Épica con GSAP

## 📋 ESPECIFICACIONES TÉCNICAS

Crea un componente de navegación `Navigation.tsx` para Next.js 15 + TypeScript con las siguientes características exactas:

### 🎯 FUNCIONALIDADES PRINCIPALES

1. **Navegación dual**: Desktop (hidden lg:block) y Mobile (lg:hidden)
2. **Scroll detection**: Cambia estilo al hacer scroll > 50px
3. **Dropdowns interactivos**: 3 secciones principales con submenús
4. **Smooth scrolling**: Para enlaces internos con #
5. **Estado activo**: Dropdown abierto/cerrado con animaciones

### 🎨 ESTRUCTURA DE DATOS

\`\`\`typescript
interface MenuItem {
  name: string;
  link: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
  icon: React.ReactNode;
}

const menuItems: Record<string, MenuSection> = {
  portfolio: {
    title: "Portfolio",
    icon: <Briefcase className="w-4 h-4" />,
    items: [
      { name: "Participaciones Destacadas", link: "#participations", icon: <Trophy className="w-4 h-4" /> },
      { name: "Experiencia Profesional", link: "#experience", icon: <Briefcase className="w-4 h-4" /> },
      { name: "Educación", link: "#studies", icon: <GraduationCap className="w-4 h-4" /> },
      { name: "Acerca de mí", link: "#about", icon: <User className="w-4 h-4" /> },
      { name: "Contacto", link: "#contact", icon: <Mail className="w-4 h-4" /> },
    ]
  },
  facultad: {
    title: "Facultad",
    icon: <BookOpen className="w-4 h-4" />,
    items: [
      { name: "Archivos de la Facultad", link: "#faculty-files", icon: <FileText className="w-4 h-4" /> },
      { name: "Suscripciones por estudiar", link: "#subscriptions", icon: <Bookmark className="w-4 h-4" /> },
    ]
  },
  blog: {
    title: "Blog",
    icon: <Rss className="w-4 h-4" />,
    items: [
      { name: "Próximamente", link: "#", disabled: true, icon: <Rss className="w-4 h-4 opacity-50" /> },
    ]
  }
};
\`\`\`

### 🎬 ANIMACIONES GSAP OBLIGATORIAS

#### **1. Entrada inicial del nav:**
\`\`\`javascript
gsap.fromTo(navRef.current, {
  y: -100,
  opacity: 0,
}, {
  y: 0,
  opacity: 1,
  duration: 1.2,
  ease: "back.out(1.7)",
  delay: 0.5,
});
\`\`\`

#### **2. Animaciones de scroll:**
\`\`\`javascript
const handleScroll = useCallback(() => {
  const scrolled = window.scrollY > 50;
  
  gsap.to(navRef.current, {
    backgroundColor: scrolled ? "rgba(0, 0, 0, 0.8)" : "transparent",
    backdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
    borderColor: scrolled ? "rgba(251, 191, 36, 0.3)" : "transparent",
    duration: 0.5,
    ease: "power2.out",
  });

  gsap.to(containerRef.current, {
    backgroundColor: scrolled ? "rgba(17, 24, 39, 0.9)" : "rgba(17, 24, 39, 0.8)",
    borderColor: scrolled ? "rgba(251, 191, 36, 0.6)" : "rgba(75, 85, 99, 0.5)",
    scale: scrolled ? 0.95 : 1,
    y: scrolled ? 5 : 0,
    duration: 0.6,
    ease: "back.out(1.7)",
  });
}, []);
\`\`\`

#### **3. Dropdowns con efecto 3D:**
\`\`\`javascript
// Apertura
gsap.fromTo(dropdown, {
  opacity: 0,
  y: -20,
  scale: 0.9,
  rotationX: -15,
}, {
  opacity: 1,
  y: 0,
  scale: 1,
  rotationX: 0,
  duration: 0.5,
  ease: "back.out(1.7)",
});

// Items stagger
gsap.fromTo(items, {
  opacity: 0,
  x: -20,
  rotationY: -15,
}, {
  opacity: 1,
  x: 0,
  rotationY: 0,
  duration: 0.4,
  stagger: 0.1,
  ease: "back.out(1.7)",
  delay: 0.2,
});
\`\`\`

#### **4. Mobile menu:**
\`\`\`javascript
gsap.fromTo(mobileNavRef.current, {
  height: 0,
  opacity: 0,
}, {
  height: "auto",
  opacity: 1,
  duration: 0.6,
  ease: "power3.out",
});
\`\`\`

### 🎨 ESTILOS EXACTOS

#### **Desktop Navigation:**
- **Posición**: `fixed w-full top-0 z-[100]`
- **Container**: `max-w-4xl mx-auto px-6 py-4`
- **Pill container**: `backdrop-blur-md rounded-full px-8 py-3 border shadow-lg`
- **Botones**: `rounded-full px-4 py-2` con hover effects
- **Dropdowns**: `w-64 rounded-2xl shadow-2xl bg-gray-900/95 backdrop-blur-xl`

#### **Mobile Navigation:**
- **Header**: Logo "Francisco Perez" + botón hamburguesa
- **Menu expandible**: `rounded-2xl border border-gray-800/50`
- **Clase especial**: `.mobile-menu-item` para animaciones

### 🔧 COMPORTAMIENTOS ESPECÍFICOS

1. **Links disabled**: Prevenir default, mostrar cursor not-allowed
2. **Smooth scroll**: `element.scrollIntoView({ behavior: 'smooth' })`
3. **Click fuera**: Cerrar dropdowns
4. **Escape key**: Cerrar mobile menu
5. **Data attributes**: `data-cursor-text` para cursor personalizado

### 🎯 REFS OBLIGATORIOS

\`\`\`typescript
const navRef = useRef<HTMLDivElement>(null);
const mobileNavRef = useRef<HTMLDivElement>(null);
const containerRef = useRef<HTMLDivElement>(null);
const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
\`\`\`

### 📱 RESPONSIVE DESIGN

- **Desktop**: `hidden lg:block` - Pill navigation centrada
- **Mobile**: `lg:hidden` - Header con hamburguesa + menu expandible
- **Breakpoints**: Usar sm, md, lg de Tailwind
- **Hover states**: Solo en desktop

### 🎨 PALETA DE COLORES

- **Primary**: `text-yellow-400`, `border-yellow-400`
- **Backgrounds**: `bg-gray-900/95`, `bg-gray-800/50`
- **Text**: `text-white`, `text-gray-300`, `text-gray-400`
- **Hover**: `hover:text-yellow-400`, `hover:bg-yellow-400/10`

### 🚀 IMPORTS NECESARIOS

\`\`\`typescript
import { useState, useEffect, useCallback, useRef } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { 
  ChevronDown, User, Briefcase, Trophy, Mail, 
  BookOpen, FileText, Bookmark, Rss, Menu, X, GraduationCap 
} from "lucide-react"
\`\`\`

### ⚡ OPTIMIZACIONES

- **useCallback**: Para todos los handlers
- **Passive listeners**: `{ passive: true }`
- **Cleanup**: Remover listeners en useEffect return
- **Performance**: Evitar re-renders innecesarios

### 🎭 CLASES ESPECIALES

- **Interactive elements**: Clase `interactive` para cursor personalizado
- **Transitions**: `transition-all duration-300`
- **Hover effects**: `hover:scale-105`, `hover:rotate-12`
- **Active states**: `scale-105` para elementos activos

**RESULTADO ESPERADO**: Navegación fluida, animada y moderna que se adapta perfectamente al scroll, con dropdowns 3D y versión mobile completa.
