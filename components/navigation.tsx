"use client"

import { useState, useEffect, useCallback, useRef, useMemo } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { 
  ChevronDown, User, Briefcase, Trophy, Mail, 
  BookOpen, FileText, Bookmark, Rss, Menu, X, GraduationCap 
} from "lucide-react"

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

export default function Navigation() {
  const navRef = useRef<HTMLDivElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const isInitializedRef = useRef(false);
  
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY > 50;
    
    if (navRef.current) {
      gsap.to(navRef.current, {
        backgroundColor: scrolled ? "rgba(0, 0, 0, 0.8)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
        borderColor: scrolled ? "rgba(251, 191, 36, 0.3)" : "transparent",
        duration: 0.5,
        ease: "power2.out",
      });
    }

    if (containerRef.current) {
      gsap.to(containerRef.current, {
        backgroundColor: scrolled ? "rgba(17, 24, 39, 0.9)" : "rgba(17, 24, 39, 0.8)",
        borderColor: scrolled ? "rgba(251, 191, 36, 0.6)" : "rgba(75, 85, 99, 0.5)",
        scale: scrolled ? 0.95 : 1,
        y: scrolled ? 5 : 0,
        duration: 0.6,
        ease: "back.out(1.7)",
      });
    }
  }, []);

  const handleSmoothScroll = useCallback((link: string) => {
    if (link.startsWith('#')) {
      const element = document.querySelector(link);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  const handleDropdownToggle = useCallback((key: string) => {
    setActiveDropdown(currentActive => {
      const newActive = currentActive === key ? null : key;
      
      Object.entries(dropdownRefs.current).forEach(([dropdownKey, dropdown]) => {
        if (!dropdown) return;
        
        if (dropdownKey === key && newActive !== null) {
          dropdown.style.display = 'block';
          dropdown.style.zIndex = '210';
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

          const items = dropdown.querySelectorAll('.dropdown-item');
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
        } else {
          gsap.to(dropdown, {
            opacity: 0,
            y: -20,
            scale: 0.9,
            rotationX: -15,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
              dropdown.style.display = 'none';
            }
          });
        }
      });
      
      return newActive;
    });
  }, []);

  const handleMobileMenuToggle = useCallback(() => {
    setIsMobileMenuOpen(currentOpen => {
      const newOpen = !currentOpen;
      
      if (mobileNavRef.current) {
        if (newOpen) {
          gsap.fromTo(mobileNavRef.current, {
            height: 0,
            opacity: 0,
          }, {
            height: "auto",
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
          });
        } else {
          gsap.to(mobileNavRef.current, {
            height: 0,
            opacity: 0,
            duration: 0.4,
            ease: "power3.in",
          });
        }
      }
      
      return newOpen;
    });
  }, []);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    const target = event.target as Node;
    const navElement = navRef.current;
    
    if (navElement && !navElement.contains(target)) {
      const isClickOnDropdown = Object.values(dropdownRefs.current).some(
        dropdown => dropdown && dropdown.contains(target)
      );
      
      if (!isClickOnDropdown) {
        setActiveDropdown(null);
      }
    }
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setActiveDropdown(null);
      setIsMobileMenuOpen(false);
    }
  }, []);

  const handleItemClick = useCallback((item: MenuItem, event: React.MouseEvent) => {
    if (item.disabled) {
      event.preventDefault();
      return;
    }
    
    handleSmoothScroll(item.link);
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  }, [handleSmoothScroll]);

  useEffect(() => {
    if (!isInitializedRef.current && navRef.current) {
      isInitializedRef.current = true;
      
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
    }
  }, []);

  useEffect(() => {
    const scrollHandler = handleScroll;
    const clickHandler = handleClickOutside;
    const keyHandler = handleKeyDown;
    
    window.addEventListener('scroll', scrollHandler, { passive: true });
    document.addEventListener('click', clickHandler);
    document.addEventListener('keydown', keyHandler);
    
    return () => {
      window.removeEventListener('scroll', scrollHandler);
      document.removeEventListener('click', clickHandler);
      document.removeEventListener('keydown', keyHandler);
    };
  }, []);

  const menuEntries = useMemo(() => Object.entries(menuItems), []);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed w-full top-0 left-0 right-0 z-[200] hidden lg:block"
        style={{ position: 'fixed', top: 0, width: '100%' }}
      >
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div
            ref={containerRef}
            className="backdrop-blur-md rounded-full px-8 py-3 border border-gray-600/50 shadow-lg bg-gray-900/80 transition-all duration-300"
          >
            <div className="flex items-center justify-center space-x-2">
              {menuEntries.map(([key, section]) => (
                <div key={key} className="relative">
                  <button
                    onClick={() => handleDropdownToggle(key)}
                    className="interactive flex items-center space-x-2 rounded-full px-4 py-2 text-white hover:text-yellow-400 hover:bg-yellow-400/10 transition-all duration-300 hover:scale-105"
                    data-cursor-text={section.title}
                  >
                    {section.icon}
                    <span className="text-sm font-medium">{section.title}</span>
                    <ChevronDown 
                      className={`w-4 h-4 transition-transform duration-300 ${
                        activeDropdown === key ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  <div
                    ref={(el) => { dropdownRefs.current[key] = el; }}
                    className="absolute top-full left-0 mt-2 w-64 rounded-2xl shadow-2xl bg-gray-900/95 backdrop-blur-xl border border-gray-800/50 py-2"
                    style={{ display: 'none', zIndex: 210 }}
                  >
                    {section.items.map((item, index) => (
                      <Link
                        key={index}
                        href={item.link}
                        onClick={(e) => handleItemClick(item, e)}
                        className={`dropdown-item interactive flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-yellow-400 hover:bg-yellow-400/10 transition-all duration-300 ${
                          item.disabled ? 'cursor-not-allowed opacity-50' : 'hover:scale-105'
                        }`}
                        data-cursor-text={item.name}
                      >
                        {item.icon}
                        <span className="text-sm">{item.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <nav 
        className="lg:hidden fixed w-full top-0 left-0 right-0 z-[200] bg-black/80 backdrop-blur-md border-b border-gray-800/50"
        style={{ position: 'fixed', top: 0, width: '100%' }}
      >
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <Link 
              href="/" 
              className="text-xl font-bold text-yellow-400 interactive"
              data-cursor-text="Francisco Perez"
            >
              Francisco Perez
            </Link>
            <button
              onClick={handleMobileMenuToggle}
              className="interactive text-white hover:text-yellow-400 transition-colors duration-300 p-2"
              data-cursor-text={isMobileMenuOpen ? "Cerrar" : "Menú"}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          
          <div
            ref={mobileNavRef}
            className={`mt-4 rounded-2xl border border-gray-800/50 bg-gray-900/95 backdrop-blur-xl overflow-hidden ${
              isMobileMenuOpen ? 'block' : 'hidden'
            }`}
          >
            <div className="py-2">
              {menuEntries.map(([key, section]) => (
                <div key={key} className="border-b border-gray-800/30 last:border-b-0">
                  <div className="px-4 py-3 flex items-center space-x-3 text-yellow-400 font-medium">
                    {section.icon}
                    <span>{section.title}</span>
                  </div>
                  {section.items.map((item, index) => (
                    <Link
                      key={index}
                      href={item.link}
                      onClick={(e) => handleItemClick(item, e)}
                      className={`mobile-menu-item interactive flex items-center space-x-3 px-8 py-3 text-gray-300 hover:text-yellow-400 hover:bg-yellow-400/10 transition-all duration-300 ${
                        item.disabled ? 'cursor-not-allowed opacity-50' : ''
                      }`}
                      data-cursor-text={item.name}
                    >
                      {item.icon}
                      <span className="text-sm">{item.name}</span>
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
