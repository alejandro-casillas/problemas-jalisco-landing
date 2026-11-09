import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollIndicator } from '../hero/ScrollIndicator'
import {
  CONSTRUCTION_MILESTONES,
  CONSTRUCTION_PLAN_META,
} from '../../data/constructionPlanData'

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
      // Estado inicial antes de revelar al entrar en el viewport
      gsap.set('[data-construction-gsap="header"]', {
        autoAlpha: 0,
        y: 22,
      })

      gsap.set('[data-construction-gsap="subtitle"]', {
        autoAlpha: 0,
        y: 16,
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
        scale: 0.45,
      })

      gsap.set('[data-construction-gsap="milestone-copy"]', {
        autoAlpha: 0,
        y: 18,
      })

      gsap.set('[data-construction-gsap="footer"]', {
        autoAlpha: 0,
        y: 12,
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

          // 1. Aparecen la etiqueta y el título principal con fade + translateY
          tl.to('[data-construction-gsap="header"]', {
            autoAlpha: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.1,
          })

          // 2. Entra el subtítulo
          tl.to(
            '[data-construction-gsap="subtitle"]',
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.55,
            },
            '-=0.38',
          )

          // 3. Se dibuja la línea de tiempo de izquierda a derecha (y vertical en móvil)
          tl.to(
            '[data-construction-gsap="line-horizontal"]',
            {
              scaleX: 1,
              duration: 0.9,
              ease: 'power2.inOut',
            },
            '-=0.25',
          )

          tl.to(
            '[data-construction-gsap="line-vertical"]',
            {
              scaleY: 1,
              duration: 0.9,
              ease: 'power2.inOut',
            },
            '<',
          )

          // 4. Los cuatro nodos circulares se iluminan progresivamente
          tl.to(
            '[data-construction-gsap="milestone-node"]',
            {
              autoAlpha: 1,
              scale: 1,
              duration: 0.5,
              stagger: 0.14,
              ease: 'back.out(1.7)',
            },
            '-=0.62',
          )

          // 5. Los números, títulos y descripciones aparecen con stagger suave
          tl.to(
            '[data-construction-gsap="milestone-copy"]',
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.58,
              stagger: 0.14,
            },
            '-=0.48',
          )

          // 6. Se revela el pie institucional discreto e indicador inferior
          tl.to(
            '[data-construction-gsap="footer"]',
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.08,
            },
            '-=0.25',
          )
        })

        observer.disconnect()
      },
      {
        threshold: 0.22,
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
      {/* Resplandor ambiental discreto centrado detrás de la línea de tiempo */}
      <div className="construction-ambient-glow" aria-hidden="true" />

      <div className="construction-container">
        {/* 1. Encabezado editorial centrado */}
        <header className="construction-header">
          <div
            className="construction-eyebrow-badge"
            data-construction-gsap="header"
          >
            <span className="badge-dot" aria-hidden="true" />
            <span>{CONSTRUCTION_PLAN_META.eyebrow}</span>
          </div>

          <h2
            id="construction-section-heading"
            className="construction-title"
            data-construction-gsap="header"
          >
            {CONSTRUCTION_PLAN_META.titlePrefix}{' '}
            <span className="construction-title-accent">
              {CONSTRUCTION_PLAN_META.titleAccent}
            </span>
          </h2>

          <p
            className="construction-subtitle"
            data-construction-gsap="subtitle"
          >
            {CONSTRUCTION_PLAN_META.subtitle}
          </p>
        </header>

        {/* 2. Línea de tiempo de 4 estaciones flotantes sin tarjetas rectangulares */}
        <div
          className="construction-timeline"
          role="region"
          aria-label="Línea de tiempo del plan de construcción"
        >
          {/* Riel horizontal continuo (escritorio) */}
          <div className="construction-timeline-track-h" aria-hidden="true">
            <div className="construction-timeline-track-base" />
            <div
              className="construction-timeline-track-progress"
              data-construction-gsap="line-horizontal"
            />
          </div>

          {/* Riel vertical continuo (tablet y móvil) */}
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

              return (
                <li
                  key={milestone.id}
                  className={`construction-milestone-item ${
                    isAdaptation
                      ? 'construction-milestone-item--adaptation'
                      : ''
                  }`}
                >
                  {/* Nodo circular luminoso sobre el eje de la línea */}
                  <div
                    className="construction-milestone-node-stage"
                    aria-hidden="true"
                  >
                    <div
                      className={`construction-milestone-node ${
                        isAdaptation
                          ? 'construction-milestone-node--adaptation'
                          : ''
                      }`}
                      data-construction-gsap="milestone-node"
                    >
                      <span className="construction-milestone-node-halo" />
                      <span className="construction-milestone-node-core" />
                    </div>
                  </div>

                  {/* Jerarquía tipográfica flotante: 1. Número, 2. Nombre, 3. Descripción */}
                  <div
                    className="construction-milestone-copy"
                    data-construction-gsap="milestone-copy"
                  >
                    <span
                      className={`construction-milestone-number ${
                        isAdaptation
                          ? 'construction-milestone-number--adaptation'
                          : ''
                      }`}
                    >
                      {milestone.number}
                    </span>
                    <h3 className="construction-milestone-title">
                      {milestone.title}
                    </h3>
                    <p className="construction-milestone-description">
                      {milestone.description}
                    </p>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>

        {/* 3. Pie discreto de contexto académico */}
        <footer
          className="construction-context-footer"
          data-construction-gsap="footer"
          aria-label="Contexto académico de la etapa"
        >
          <span className="construction-context-primary">
            {CONSTRUCTION_PLAN_META.footerPrimary}
          </span>
          <span className="construction-context-sep" aria-hidden="true">
            ·
          </span>
          <span className="construction-context-secondary">
            {CONSTRUCTION_PLAN_META.footerSecondary}
          </span>
        </footer>
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

