import { Download } from 'lucide-react'
import { HeroSection } from './components/hero/HeroSection'
import { FeaturesShowcaseSection } from './components/showcase/FeaturesShowcaseSection'
import { TechnologiesSection } from './components/technologies/TechnologiesSection'
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

      {/* 3. ARQUITECTURA CONECTADA Y TECNOLOGÍAS (FASE 1.6) */}
      <TechnologiesSection onNavigateToSection={scrollToSection} />

      {/* 4. SECCIÓN PROVISIONAL DE DESCARGA (DESTINO DE NAVEGACIÓN) */}
      <section
        id="descargar"
        className="provisional-download-section"
        aria-labelledby="provisional-download-heading"
      >
        <div className="provisional-download-container">
          <div className="provisional-download-badge">
            <Download size={14} aria-hidden="true" />
            <span>ACCESO CIUDADANO · PRÓXIMA FASE</span>
          </div>

          <h2
            id="provisional-download-heading"
            className="provisional-download-title"
          >
            Descarga Problemas Jalisco
          </h2>

          <p className="provisional-download-description">
            Sección provisional preparada como destino de navegación. Aquí se
            integrará el llamado final a la acción y los enlaces de descarga en
            la siguiente etapa.
          </p>
        </div>
      </section>

      {/* CONTROL DISCRETO FLOTANTE: REGRESO A LA SECCIÓN ANTERIOR */}
      <PreviousSectionButton onNavigateToSection={scrollToSection} />
    </div>
  )
}

export default App
