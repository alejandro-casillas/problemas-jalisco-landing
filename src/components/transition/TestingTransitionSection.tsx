import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ArrowRight } from 'lucide-react'
import { ScrollIndicator } from '../hero/ScrollIndicator'
import { TransitionTopicCard } from './TransitionTopicCard'
import { TeamMemberCard } from './TeamMemberCard'
import {
  TRANSITION_SECTION_META,
  TRANSITION_TOPICS,
  TEAM_MEMBERS,
} from '../../data/testingTransitionData'

interface TestingTransitionSectionProps {
  onNavigateToSection?: (targetId: string) => void
}

export function TestingTransitionSection({
  onNavigateToSection,
}: TestingTransitionSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const hasAnimatedInRef = useRef<boolean>(false)

  useEffect(() => {
    const sectionEl = sectionRef.current
    if (!sectionEl) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // Estado inicial antes de revelar
      gsap.set('[data-transition-gsap="eyebrow"]', {
        autoAlpha: 0,
        y: 18,
      })

      gsap.set('[data-transition-gsap="topic-card"]', {
        autoAlpha: 0,
        y: 24,
        scale: 0.97,
      })

      gsap.set('[data-transition-gsap="separator"]', {
        scaleX: 0,
        transformOrigin: 'center center',
      })

      gsap.set('[data-transition-gsap="team-label"]', {
        autoAlpha: 0,
        y: 12,
      })

      gsap.set('[data-transition-gsap="team-member"]', {
        autoAlpha: 0,
        y: 20,
        scale: 0.95,
      })

      gsap.set('[data-transition-gsap="academic-indicator"]', {
        autoAlpha: 0,
        y: 14,
      })

      gsap.set('[data-transition-gsap="scroll-indicator"]', {
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
          tl.to('[data-transition-gsap="eyebrow"]', {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
          })

          // 2. Tres bloques de temas
          tl.to(
            '[data-transition-gsap="topic-card"]',
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.55,
              stagger: 0.12,
            },
            '-=0.2',
          )

          // 5. Separador
          tl.to(
            '[data-transition-gsap="separator"]',
            {
              scaleX: 1,
              duration: 0.7,
              ease: 'power2.inOut',
            },
            '-=0.25',
          )

          // 6. Etiqueta del equipo
          tl.to(
            '[data-transition-gsap="team-label"]',
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.45,
            },
            '-=0.4',
          )

          // 7. Tres integrantes del equipo
          tl.to(
            '[data-transition-gsap="team-member"]',
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.5,
              stagger: 0.12,
            },
            '-=0.3',
          )

          // 8. Indicador académico y scroll indicator
          tl.to(
            '[data-transition-gsap="academic-indicator"]',
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.5,
            },
            '-=0.25',
          )

          tl.to(
            '[data-transition-gsap="scroll-indicator"]',
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.45,
            },
            '-=0.3',
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

  return (
    <section
      ref={sectionRef}
      id="transicion-pruebas"
      className="transition-section"
      aria-labelledby="transition-section-heading"
    >
      {/* Iluminación ambiental sutil de fondo */}
      <div className="transition-ambient-glow" aria-hidden="true" />

      <div className="transition-container">
        {/* 1. Zona superior: Encabezado editorial */}
        <header className="transition-header">
          <div
            className="transition-eyebrow-badge"
            data-transition-gsap="eyebrow"
          >
            <h2 id="transition-section-heading" className="transition-eyebrow-title">
              {TRANSITION_SECTION_META.eyebrow}
            </h2>
          </div>
        </header>

        {/* 2. Zona central: Tres bloques temáticos horizontales */}
        <div
          className="transition-topics-grid"
          role="region"
          aria-label="Ejes principales de la transición a pruebas"
        >
          {TRANSITION_TOPICS.map((topic) => (
            <TransitionTopicCard key={topic.id} topic={topic} />
          ))}
        </div>

        {/* 3. Separador discreto */}
        <div
          className="transition-divider"
          data-transition-gsap="separator"
          aria-hidden="true"
        />

        {/* 4. Zona inferior: Equipo de desarrollo */}
        <div
          className="transition-team-block"
          role="region"
          aria-label="Equipo de desarrollo del proyecto"
        >
          <div
            className="transition-team-label-wrap"
            data-transition-gsap="team-label"
          >
            <span className="transition-team-label">
              {TRANSITION_SECTION_META.teamSectionLabel}
            </span>
          </div>

          <div className="transition-team-list">
            {TEAM_MEMBERS.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>

        {/* 5. Pie: Indicador académico de continuidad de etapas */}
        <div
          className="transition-academic-flow"
          data-transition-gsap="academic-indicator"
          aria-label="Continuidad académica entre laboratorios"
        >
          <span className="transition-flow-step transition-flow-step--from">
            {TRANSITION_SECTION_META.transitionFrom}
          </span>
          <span className="transition-flow-arrow" aria-hidden="true">
            <ArrowRight size={15} />
          </span>
          <span className="transition-flow-step transition-flow-step--to">
            {TRANSITION_SECTION_META.transitionTo}
          </span>
        </div>
      </div>

      {/* 6. Indicador inferior reutilizable ("Continuar a demostración" hacia #probar) */}
      <ScrollIndicator
        targetId="probar"
        label="Continuar a demostración"
        ariaLabel="Continuar a la sección de demostración"
        dataGsap="scroll-indicator"
        className="transition-scroll-indicator-wrap"
        onScrollToTarget={onNavigateToSection}
      />
    </section>
  )
}

