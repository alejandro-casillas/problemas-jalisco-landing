import { ArrowUp, Layers } from 'lucide-react'
import { HeroSection } from './components/hero/HeroSection'

function App() {
  const scrollToSection = (targetId: string) => {
    const element = document.getElementById(targetId)
    if (!element) return

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    element.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  return (
    <div className="showcase-app">
      {/* 1. SECCIÓN PRINCIPAL: HERO CINEMATOGRÁFICO DEFINITIVO (FASE 1.4) */}
      <HeroSection onNavigateToSection={scrollToSection} />

      {/* 2. SECCIÓN PROVISIONAL DE FUNCIONALIDADES (DESTINO DE NAVEGACIÓN SUAVE) */}
      <section
        id="funcionalidades"
        className="provisional-features-section"
        aria-labelledby="provisional-features-heading"
      >
        <div className="provisional-features-container">
          <div className="provisional-features-card">
            <div className="provisional-features-badge">
              <Layers size={14} aria-hidden="true" />
              <span>SECCIÓN EN PREPARACIÓN · PRÓXIMA FASE</span>
            </div>

            <h2
              id="provisional-features-heading"
              className="provisional-features-title"
            >
              Showcase interactivo de funcionalidades
            </h2>

            <p className="provisional-features-description">
              Este espacio alojará el recorrido visual por las pantallas y
              capacidades clave de Problemas Jalisco en la siguiente etapa
              de desarrollo.
            </p>

            <button
              type="button"
              className="btn-secondary provisional-back-btn"
              onClick={() => scrollToSection('inicio')}
            >
              <ArrowUp size={16} aria-hidden="true" />
              <span>Volver al inicio</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
