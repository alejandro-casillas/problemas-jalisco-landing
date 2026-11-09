import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Palette, FileText, Clock, ArrowRight } from 'lucide-react'
import { ScrollIndicator } from '../hero/ScrollIndicator'
import {
  CONSTRUCTION_MILESTONES,
  CONSTRUCTION_PLAN_META,
  type MilestoneIconType,
} from '../../data/constructionPlanData'

function renderMilestoneIcon(type: MilestoneIconType) {
  switch (type) {
    case 'palette':
      return <Palette className="construction-milestone-icon" aria-hidden="true" />
    case 'document':
      return <FileText className="construction-milestone-icon" aria-hidden="true" />
    case 'clock':
      return <Clock className="construction-milestone-icon" aria-hidden="true" />
    case 'dot':
      return <span className="construction-milestone-dot-core" aria-hidden="true" />
    default:
      return null
  }
}

export function ConstructionPlanSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const hasAnimatedInRef = useRef<boolean>(false)

  useEffect(() => {
    const sectionEl = sectionRef.current
    if (!sectionEl) {
      return
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReducedMotion) {
      return
    }

    const ctx = gsap.context(() => {
      // Estado inicial con desplazamientos cortos y opacidad
      gsap.set('[data-construction-gsap="header"]', {
        autoAlpha: 0,
        y: 14,
      })

      gsap.set('[data-construction-gsap="line-horizontal"]', {
        scaleX: 0,
        transformOrigin: 'left center',
      })

      gsap.set('[data-construction-gsap="line-vertical"]', {
        scaleY: 0,
        transformOrigin: 'top center',
      })

      gsap.set('[data-construction-gsap="milestone-node"]', {
        autoAlpha: 0,
        scale: 0.6,
      })

      gsap.set('[data-construction-gsap="milestone-copy"]', {
        autoAlpha: 0,
        y: 12,
      })

      gsap.set('[data-construction-gsap="footer"]', {
        autoAlpha: 0,
        y: 10,
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
              ease: 'power2.out',
            },
          })

          // 1. Aparece la etiqueta
          tl.to('[data-construction-gsap="header"]', {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
          })

          // 2. Se dibuja la línea de tiempo de forma limpia y continua
          tl.to(
            '[data-construction-gsap="line-horizontal"]',
            {
              scaleX: 1,
              duration: 0.75,
              ease: 'power2.inOut',
            },
            '-=0.2',
          )

          tl.to(
            '[data-construction-gsap="line-vertical"]',
            {
              scaleY: 1,
              duration: 0.75,
              ease: 'power2.inOut',
            },
            '<',
          )

          // 4. Los cuatro nodos aparecen con escala suave sin rebotes
          tl.to(
            '[data-construction-gsap="milestone-node"]',
            {
              autoAlpha: 1,
              scale: 1,
              duration: 0.4,
              stagger: 0.1,
              ease: 'power2.out',
            },
            '-=0.45',
          )

          // 5. Los textos de cada hito aparecen con stagger uniforme
          tl.to(
            '[data-construction-gsap="milestone-copy"]',
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.45,
              stagger: 0.1,
            },
            '-=0.35',
          )

          // 6. Se revela el pie institucional y el indicador inferior
          tl.to(
            '[data-construction-gsap="footer"]',
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
        threshold: 0.2,
      },
    )

    observer.observe(sectionEl)

    return () => {
      observer.disconnect()
      ctx.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="plan-construccion"
      className="construction-section"
      aria-labelledby="construction-section-heading"
    >
      <div className="construction-container">
        {/* 1. Encabezado editorial sobrio */}
        <header className="construction-header">
          <div
            className="construction-eyebrow-badge"
            data-construction-gsap="header"
          >
            <h2 id="construction-section-heading" className="construction-eyebrow-title">
              {CONSTRUCTION_PLAN_META.eyebrow}
            </h2>
          </div>
        </header>

        {/* 2. Línea de tiempo abierta de 4 estaciones sin contenedores ni tarjetas */}
        <div
          className="construction-timeline"
          role="region"
          aria-label="Línea de tiempo del plan de construcción"
        >
          {/* Riel horizontal continuo y limpio (escritorio) */}
          <div className="construction-timeline-track-h" aria-hidden="true">
            <div className="construction-timeline-track-base" />
            <div
              className="construction-timeline-track-progress"
              data-construction-gsap="line-horizontal"
            />
          </div>

          {/* Riel vertical continuo y limpio (tablet y móvil) */}
          <div className="construction-timeline-track-v" aria-hidden="true">
            <div className="construction-timeline-track-v-base" />
            <div
              className="construction-timeline-track-v-progress"
              data-construction-gsap="line-vertical"
            />
          </div>

          <ol className="construction-milestones-list">
            {CONSTRUCTION_MILESTONES.map((milestone) => {
              const isAdaptation = Boolean(milestone.isAdaptationMilestone)
              const isUpcoming = Boolean(milestone.isUpcoming)
              const isCompact = Boolean(milestone.isCompact)

              return (
                <li
                  key={milestone.id}
                  className={`construction-milestone-item ${
                    isAdaptation
                      ? 'construction-milestone-item--adaptation'
                      : ''
                  } ${isUpcoming ? 'construction-milestone-item--upcoming' : ''} ${
                    isCompact ? 'construction-milestone-item--compact' : ''
                  }`}
                >
                  {/* Nodo circular estilizado con icono representativo sobre el eje */}
                  <div
                    className="construction-milestone-node-stage"
                    aria-hidden="true"
                  >
                    <div
                      className={`construction-milestone-node ${
                        milestone.id === 'diseno'
                          ? 'construction-milestone-node--diseno'
                          : ''
                      } ${
                        isAdaptation
                          ? 'construction-milestone-node--adaptation'
                          : ''
                      } ${isUpcoming ? 'construction-milestone-node--upcoming' : ''} ${
                        isCompact ? 'construction-milestone-node--compact' : ''
                      }`}
                      data-construction-gsap="milestone-node"
                    >
                      {renderMilestoneIcon(milestone.iconType)}
                    </div>
                  </div>

                  {/* Jerarquía tipográfica abierta: Fecha, Título y Descripción */}
                  <div
                    className={`construction-milestone-copy ${
                      isCompact ? 'construction-milestone-copy--compact' : ''
                    }`}
                    data-construction-gsap="milestone-copy"
                  >
                    {milestone.dateLabel && (
                      <span
                        className={`construction-milestone-date ${
                          isAdaptation
                            ? 'construction-milestone-date--adaptation'
                            : ''
                        } ${isUpcoming ? 'construction-milestone-date--upcoming' : ''}`}
                      >
                        {milestone.dateLabel}
                      </span>
                    )}
                    <h3 className="construction-milestone-title">
                      {milestone.title}
                    </h3>
                    {milestone.description && (
                      <p className="construction-milestone-description">
                        {milestone.description}
                      </p>
                    )}
                  </div>
                </li>
              )
            })}
          </ol>
        </div>

        {/* 3. Lo que sigue: Bloque visual editorial fuera de la línea de tiempo */}
        <aside
          className="construction-next-phase"
          data-construction-gsap="footer"
          aria-label="Siguiente etapa del proyecto"
        >
          <div className="construction-next-phase-content">
            <div className="construction-next-phase-info">
              <h3 className="construction-next-phase-title">
                {CONSTRUCTION_PLAN_META.nextPhaseTitle}
              </h3>
              <p className="construction-next-phase-subtitle">
                {CONSTRUCTION_PLAN_META.nextPhaseSubtitle}
              </p>
            </div>

            <div className="construction-next-phase-indicator" aria-hidden="true">
              <span className="construction-next-phase-pill">Fase 3 de 3</span>
              <ArrowRight className="construction-next-phase-arrow" />
            </div>
          </div>
        </aside>
      </div>

      {/* 4. Navegación inferior reutilizable hacia Tecnologías */}
      <ScrollIndicator
        targetId="tecnologias"
        label="Continuar a tecnologías"
        ariaLabel="Continuar a la sección de tecnologías"
        dataGsap="footer"
        className="construction-scroll-indicator-wrap"
      />
    </section>
  )
}
