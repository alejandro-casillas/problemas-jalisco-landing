import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollIndicator } from '../hero/ScrollIndicator'
import { DecisionCard } from './DecisionCard'
import { DecisionDetail } from './DecisionDetail'
import {
  DECISIONS_DATA,
  DECISIONS_SECTION_META,
  getDecisionById,
  type DecisionItem,
} from '../../data/decisionsData'

interface DecisionsSectionProps {
  onNavigateToSection?: (targetId: string) => void
}

export function DecisionsSection({
  onNavigateToSection,
}: DecisionsSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const hasAnimatedInRef = useRef<boolean>(false)

  // Estado para la decisión activa seleccionada (null = cuadrícula 2x2)
  const [selectedDecisionId, setSelectedDecisionId] = useState<
    DecisionItem['id'] | null
  >(null)

  // Animación GSAP de entrada de la sección
  useEffect(() => {
    const sectionEl = sectionRef.current
    if (!sectionEl) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // Estado inicial oculto antes de la intersección con el viewport
      gsap.set('[data-decisions-gsap="eyebrow"]', {
        autoAlpha: 0,
        y: 18,
      })

      gsap.set('[data-decisions-gsap="title"]', {
        autoAlpha: 0,
        y: 22,
      })

      gsap.set('[data-decisions-gsap="subtitle"]', {
        autoAlpha: 0,
        y: 16,
      })

      gsap.set('[data-decisions-gsap="card"]', {
        autoAlpha: 0,
        y: 28,
        scale: 0.96,
      })

      gsap.set('[data-decisions-gsap="footer-scroll"]', {
        autoAlpha: 0,
        y: 14,
      })
    }, sectionEl)

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry || !entry.isIntersecting || hasAnimatedInRef.current) {
          return
        }

        hasAnimatedInRef.current = true

        ctx.add(() => {
          const tl = gsap.timeline({
            defaults: {
              ease: 'power3.out',
            },
          })

          // 1. Etiqueta
          tl.to('[data-decisions-gsap="eyebrow"]', {
            autoAlpha: 1,
            y: 0,
            duration: 0.55,
          })

          // 2. Encabezado principal
          tl.to(
            '[data-decisions-gsap="title"]',
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.65,
            },
            '-=0.38',
          )

          // 3. Subtítulo
          tl.to(
            '[data-decisions-gsap="subtitle"]',
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.5,
            },
            '-=0.4',
          )

          // 4. Las cuatro tarjetas entran en stagger
          tl.to(
            '[data-decisions-gsap="card"]',
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              stagger: 0.12,
            },
            '-=0.3',
          )

          // 5. Indicador inferior
          tl.to(
            '[data-decisions-gsap="footer-scroll"]',
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.45,
            },
            '-=0.2',
          )
        })

        observer.disconnect()
      },
      {
        threshold: 0.18,
      },
    )

    observer.observe(sectionEl)

    return () => {
      observer.disconnect()
      ctx.revert()
    }
  }, [])

  // Animación de transición cuando se selecciona o deselecciona una decisión
  useEffect(() => {
    const sectionEl = sectionRef.current
    if (!sectionEl) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReducedMotion) return

    if (selectedDecisionId) {
      // Entra la vista de detalle
      gsap.fromTo(
        '[data-decisions-gsap="detail-view"]',
        { autoAlpha: 0, y: 16, scale: 0.98 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.4, ease: 'power2.out' },
      )
    } else {
      // Regresa a la cuadrícula de tarjetas
      gsap.fromTo(
        '[data-decisions-gsap="card"]',
        { autoAlpha: 0, y: 12 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.35,
          stagger: 0.06,
          ease: 'power2.out',
        },
      )
    }
  }, [selectedDecisionId])

  const selectedDecision = selectedDecisionId
    ? getDecisionById(selectedDecisionId)
    : undefined

  const handleSelectDecision = (id: DecisionItem['id']) => {
    setSelectedDecisionId(id)
  }

  const handleBackToGrid = () => {
    setSelectedDecisionId(null)
  }

  return (
    <section
      ref={sectionRef}
      id="cambios-decisiones"
      className="decisions-section"
      aria-labelledby="decisions-section-heading"
    >
      {/* Iluminación ambiental cinematográfica sutil */}
      <div className="decisions-ambient-glow" aria-hidden="true" />

      <div className="decisions-container">
        {/* 1. Encabezado editorial centrado */}
        <header className="decisions-header">
          <div
            className="decisions-eyebrow-badge"
            data-decisions-gsap="eyebrow"
          >
            <span className="badge-dot" aria-hidden="true" />
            <span>{DECISIONS_SECTION_META.eyebrow}</span>
          </div>

          <h2
            id="decisions-section-heading"
            className="decisions-title"
            data-decisions-gsap="title"
          >
            {DECISIONS_SECTION_META.titlePrefix}{' '}
            <span className="decisions-title-accent">
              {DECISIONS_SECTION_META.titleAccent}
            </span>
          </h2>

          <p className="decisions-subtitle" data-decisions-gsap="subtitle">
            {DECISIONS_SECTION_META.subtitle}
          </p>
        </header>

        {/* 2. Escenario interactivo: Cuadrícula 2x2 o Detalle ampliado */}
        <div className="decisions-stage">
          {selectedDecision ? (
            <DecisionDetail
              decision={selectedDecision}
              onBack={handleBackToGrid}
              onSelectDecision={handleSelectDecision}
            />
          ) : (
            <div
              className="decisions-grid-2x2"
              role="region"
              aria-label="Cuadrícula de decisiones tomadas"
            >
              {DECISIONS_DATA.map((decision, index) => (
                <DecisionCard
                  key={decision.id}
                  decision={decision}
                  isSelected={false}
                  onSelect={handleSelectDecision}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 3. Indicador inferior reutilizable ("Continuar a resultados") */}
      <ScrollIndicator
        targetId="resultados-aprendizajes"
        label="Continuar a resultados"
        ariaLabel="Continuar a la sección de resultados y aprendizajes"
        dataGsap="decisions-footer-scroll"
        className="decisions-scroll-indicator-wrap"
        onScrollToTarget={onNavigateToSection}
      />
    </section>
  )
}

