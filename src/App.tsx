import { Cpu } from 'lucide-react'
import { HeroSection } from './components/hero/HeroSection'
import { FeaturesShowcaseSection } from './components/showcase/FeaturesShowcaseSection'
import { PreviousSectionButton } from './components/layout/PreviousSectionButton'

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
      {/* 1. SECCIÓN PRINCIPAL: HERO CINEMATOGRÁFICO (FASE 1.4) */}
      <HeroSection onNavigateToSection={scrollToSection} />

      {/* 2. CARRUSEL CINEMATOGRÁFICO DE FUNCIONALIDADES (FASE 1.5 / 1.5.1) */}
      <FeaturesShowcaseSection onNavigateToSection={scrollToSection} />

      {/* 3. SECCIÓN PROVISIONAL DE TECNOLOGÍAS (DESTINO DE NAVEGACIÓN) */}
      <section
        id="tecnologias"
        className="provisional-tech-section"
        aria-labelledby="provisional-tech-heading"
      >
        <div className="provisional-tech-container">
          <div className="provisional-tech-badge">
            <Cpu size={14} aria-hidden="true" />
            <span>ARQUITECTURA Y STACK · PRÓXIMA FASE</span>
          </div>

          <h2 id="provisional-tech-heading" className="provisional-tech-title">
            Tecnologías que impulsan Problemas Jalisco
          </h2>

          <p className="provisional-tech-description">
            Sección provisional preparada como destino de navegación. Aquí se
            presentará la infraestructura técnica del proyecto en la siguiente
            fase.
          </p>
        </div>
      </section>

      {/* CONTROL DISCRETO FLOTANTE: REGRESO A LA SECCIÓN ANTERIOR */}
      <PreviousSectionButton onNavigateToSection={scrollToSection} />
    </div>
  )
}

export default App
