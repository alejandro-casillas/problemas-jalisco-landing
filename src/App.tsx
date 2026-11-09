import { useCallback } from 'react'
import { Play } from 'lucide-react'
import { HeroSection } from './components/hero/HeroSection'
import { ConstructionPlanSection } from './components/construction/ConstructionPlanSection'
import { TechnologiesSection } from './components/technologies/TechnologiesSection'
import { DecisionsSection } from './components/decisions/DecisionsSection'
import { FeaturesShowcaseSection } from './components/showcase/FeaturesShowcaseSection'
import { TestingTransitionSection } from './components/transition/TestingTransitionSection'
import { PreviousSectionButton } from './components/layout/PreviousSectionButton'

function App() {
  const handleScrollToSection = useCallback((targetId: string) => {
    let targetEl = document.getElementById(targetId)

    // Si la sección aún no está implementada (ej. #resultados-aprendizajes),
    // navegamos suavemente a la siguiente sección implementada para evitar enlaces rotos.
    if (!targetEl) {
      if (targetId === 'resultados-aprendizajes') {
        targetEl = document.getElementById('funcionalidades')
      }
    }

    if (!targetEl) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    targetEl.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    })
  }, [])

  return (
    <main>
      {/* 01. Hero cinematográfico definitivo (Fase 1.4 + Ajustes de identidad) */}
      <HeroSection />

      {/* 02. Plan de construcción — Línea de tiempo cinematográfica (Fase 1.7) */}
      <ConstructionPlanSection />

      {/* 03. Tecnologías y arquitectura conectada (Fase 1.6 / 1.6.1) */}
      <TechnologiesSection onNavigateToSection={handleScrollToSection} />

      {/* 04. Cambios y decisiones (Fase 1.8) */}
      <DecisionsSection onNavigateToSection={handleScrollToSection} />

      {/* Anclaje de destino preparado para conectar la futura sección 05 */}
      <div id="resultados-aprendizajes" aria-hidden="true" />

      {/* 06. Carrusel cinematográfico de funcionalidades (Fase 1.5 / 1.5.1) */}
      <FeaturesShowcaseSection onNavigateToSection={handleScrollToSection} />

      {/* 07. Transición a Pruebas y equipo de desarrollo (Fase 1.9) */}
      <TestingTransitionSection onNavigateToSection={handleScrollToSection} />

      {/* 08. Sección provisional de destino de navegación (#probar) */}
      <section
        id="probar"
        className="provisional-probar-section"
        aria-labelledby="probar-section-heading"
      >
        <div className="provisional-probar-container">
          <div className="provisional-probar-badge">
            <Play size={14} aria-hidden="true" />
            <span>DEMOSTRACIÓN INTERACTIVA</span>
          </div>

          <h2 id="probar-section-heading" className="provisional-probar-title">
            Ahora es tu turno de explorar
          </h2>

          <p className="provisional-probar-description">
            Conoce Problemas Jalisco directamente en una aplicación funcional.
          </p>
        </div>
      </section>

      {/* Navegación flotante discreta para regresar a la sección anterior */}
      <PreviousSectionButton onNavigateToSection={handleScrollToSection} />
    </main>
  )
}

export default App
