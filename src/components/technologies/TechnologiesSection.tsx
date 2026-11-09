import { Fragment, useEffect, useRef } from 'react'
import gsap from 'gsap'
import {
  ArrowLeftRight,
  Code2,
  Cpu,
  GitBranch,
  Layers,
  Route,
} from 'lucide-react'
import { ScrollIndicator } from '../hero/ScrollIndicator'
import {
  ARCHITECTURE_CONNECTIONS,
  ARCHITECTURE_MODULES,
  COMPLEMENTARY_TECHNOLOGIES,
  TECHNOLOGIES_SECTION_META,
  type ArchitectureModuleItem,
} from '../../data/technologiesData'

interface TechnologiesSectionProps {
  onNavigateToSection?: (targetId: string) => void
}

function renderComplementaryIcon(id: string) {
  switch (id) {
    case 'typescript':
      return <Code2 size={14} aria-hidden="true" />
    case 'expo-router':
      return <Route size={14} aria-hidden="true" />
    case 'zustand':
      return <Layers size={14} aria-hidden="true" />
    case 'git-github':
      return <GitBranch size={14} aria-hidden="true" />
    default:
      return <Cpu size={14} aria-hidden="true" />
  }
}

interface ArchitectureNodeGroupProps {
  module: ArchitectureModuleItem
}

function ArchitectureNodeGroup({ module }: ArchitectureNodeGroupProps) {
  const isDualLogo = module.logos.length > 1

  return (
    <article
      className={`tech-node-group tech-node-group--${module.id}`}
      data-tech-gsap="module"
    >
      {/* 1. Protagonista visual: Logos oficiales flotantes sin tarjetas ni contenedores */}
      <div
        className={`tech-node-logos-stage ${
          isDualLogo ? 'tech-node-logos-stage--dual' : ''
        }`}
      >
        <div className="tech-node-ambient-aura" aria-hidden="true" />

        {module.logos.map((logo) => (
          <img
            key={logo.key}
            src={logo.src}
            alt={logo.alt}
            className={`tech-official-logo tech-official-logo--${logo.key}`}
            loading="lazy"
            decoding="async"
          />
        ))}
      </div>

      {/* 2. Jerarquía tipográfica debajo de cada grupo */}
      <div className="tech-node-copy">
        <span className="tech-node-layer">{module.layerLabel}</span>
        <h3 className="tech-node-name">{module.technology}</h3>
        <p className="tech-node-description">{module.description}</p>
      </div>
    </article>
  )
}

export function TechnologiesSection({
  onNavigateToSection,
}: TechnologiesSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const hasPlayedEntranceRef = useRef(false)
  const entranceTimelineRef = useRef<gsap.core.Timeline | null>(null)
  const pulseTimelineRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    const sectionEl = sectionRef.current
    if (!sectionEl) return

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      return
    }

    const ctx = gsap.context(() => {
      // Estado inicial antes de que la sección entre en el viewport
      gsap.set('[data-tech-gsap="header"]', { y: 22, autoAlpha: 0 })
      gsap.set('[data-tech-gsap="module"]', { y: 28, scale: 0.96, autoAlpha: 0 })
      gsap.set('[data-tech-gsap="connector"]', { autoAlpha: 0 })
      gsap.set('[data-tech-gsap="conn-line-h"]', {
        strokeDasharray: 164,
        strokeDashoffset: 164,
      })
      gsap.set('[data-tech-gsap="conn-line-v"]', {
        strokeDasharray: 76,
        strokeDashoffset: 76,
      })
      gsap.set('[data-tech-gsap^="pulse-"]', { autoAlpha: 0 })
      gsap.set('[data-tech-gsap="complementary"]', { y: 16, autoAlpha: 0 })
      gsap.set('[data-gsap="tech-scroll-indicator"]', { y: 12, autoAlpha: 0 })

      // Timeline ambiental de pulsos (pausada hasta completar la entrada)
      const pulseTl = gsap.timeline({
        repeat: -1,
        paused: true,
      })

      // Flujo horizontal de ida (Naranja #FE8B01): React Native + Expo -> .NET -> PostgreSQL
      pulseTl.fromTo(
        '[data-tech-gsap="pulse-h-fwd-0"]',
        { attr: { cx: 10 }, autoAlpha: 0 },
        {
          attr: { cx: 170 },
          autoAlpha: 1,
          duration: 1.35,
          ease: 'sine.inOut',
        },
        0,
      )
      pulseTl.to(
        '[data-tech-gsap="pulse-h-fwd-0"]',
        { autoAlpha: 0, duration: 0.25 },
        1.15,
      )

      pulseTl.fromTo(
        '[data-tech-gsap="pulse-h-fwd-1"]',
        { attr: { cx: 10 }, autoAlpha: 0 },
        {
          attr: { cx: 170 },
          autoAlpha: 1,
          duration: 1.35,
          ease: 'sine.inOut',
        },
        1.05,
      )
      pulseTl.to(
        '[data-tech-gsap="pulse-h-fwd-1"]',
        { autoAlpha: 0, duration: 0.25 },
        2.2,
      )

      // Flujo horizontal de retorno (Azul #58C3E3): PostgreSQL -> .NET -> React Native + Expo
      pulseTl.fromTo(
        '[data-tech-gsap="pulse-h-bwd-1"]',
        { attr: { cx: 170 }, autoAlpha: 0 },
        {
          attr: { cx: 10 },
          autoAlpha: 1,
          duration: 1.35,
          ease: 'sine.inOut',
        },
        2.15,
      )
      pulseTl.to(
        '[data-tech-gsap="pulse-h-bwd-1"]',
        { autoAlpha: 0, duration: 0.25 },
        3.3,
      )

      pulseTl.fromTo(
        '[data-tech-gsap="pulse-h-bwd-0"]',
        { attr: { cx: 170 }, autoAlpha: 0 },
        {
          attr: { cx: 10 },
          autoAlpha: 1,
          duration: 1.35,
          ease: 'sine.inOut',
        },
        3.2,
      )
      pulseTl.to(
        '[data-tech-gsap="pulse-h-bwd-0"]',
        { autoAlpha: 0, duration: 0.25 },
        4.35,
      )

      // Flujo vertical (móvil/tablet): ida (#FE8B01) y retorno (#58C3E3) sincronizados
      pulseTl.fromTo(
        '[data-tech-gsap="pulse-v-fwd-0"]',
        { attr: { cy: 8 }, autoAlpha: 0 },
        { attr: { cy: 68 }, autoAlpha: 1, duration: 1.2, ease: 'sine.inOut' },
        0,
      )
      pulseTl.to(
        '[data-tech-gsap="pulse-v-fwd-0"]',
        { autoAlpha: 0, duration: 0.22 },
        1.0,
      )

      pulseTl.fromTo(
        '[data-tech-gsap="pulse-v-fwd-1"]',
        { attr: { cy: 8 }, autoAlpha: 0 },
        { attr: { cy: 68 }, autoAlpha: 1, duration: 1.2, ease: 'sine.inOut' },
        1.05,
      )
      pulseTl.to(
        '[data-tech-gsap="pulse-v-fwd-1"]',
        { autoAlpha: 0, duration: 0.22 },
        2.05,
      )

      pulseTl.fromTo(
        '[data-tech-gsap="pulse-v-bwd-1"]',
        { attr: { cy: 68 }, autoAlpha: 0 },
        { attr: { cy: 8 }, autoAlpha: 1, duration: 1.2, ease: 'sine.inOut' },
        2.15,
      )
      pulseTl.to(
        '[data-tech-gsap="pulse-v-bwd-1"]',
        { autoAlpha: 0, duration: 0.22 },
        3.15,
      )

      pulseTl.fromTo(
        '[data-tech-gsap="pulse-v-bwd-0"]',
        { attr: { cy: 68 }, autoAlpha: 0 },
        { attr: { cy: 8 }, autoAlpha: 1, duration: 1.2, ease: 'sine.inOut' },
        3.2,
      )
      pulseTl.to(
        '[data-tech-gsap="pulse-v-bwd-0"]',
        { autoAlpha: 0, duration: 0.22 },
        4.2,
      )

      pulseTimelineRef.current = pulseTl
    }, sectionEl)

    const playEntranceSequence = () => {
      if (hasPlayedEntranceRef.current) return
      hasPlayedEntranceRef.current = true

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          pulseTimelineRef.current?.play()
        },
      })

      entranceTimelineRef.current = tl

      // 1. Aparición del encabezado
      tl.to(
        '[data-tech-gsap="header"]',
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.52,
        },
        0,
      )

      // 2. Entrada escalonada de los 3 grupos de arquitectura flotante
      tl.to(
        '[data-tech-gsap="module"]',
        {
          y: 0,
          scale: 1,
          autoAlpha: 1,
          duration: 0.56,
          stagger: 0.14,
        },
        0.24,
      )

      // 3. Dibujo de las conexiones SVG entre los logos protagonistas
      tl.to(
        '[data-tech-gsap="connector"]',
        {
          autoAlpha: 1,
          duration: 0.3,
          stagger: 0.12,
        },
        0.58,
      )

      tl.to(
        '[data-tech-gsap="conn-line-h"], [data-tech-gsap="conn-line-v"]',
        {
          strokeDashoffset: 0,
          duration: 0.55,
          ease: 'power2.inOut',
          stagger: 0.08,
        },
        0.62,
      )

      // 4. Aparición de tecnologías complementarias e indicador inferior
      tl.to(
        '[data-tech-gsap="complementary"]',
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.45,
        },
        0.92,
      )

      tl.to(
        '[data-gsap="tech-scroll-indicator"]',
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.4,
        },
        1.05,
      )
    }

    if (typeof IntersectionObserver === 'undefined') {
      playEntranceSequence()
      return () => ctx.revert()
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!hasPlayedEntranceRef.current) {
            playEntranceSequence()
          } else {
            pulseTimelineRef.current?.play()
          }
        } else {
          pulseTimelineRef.current?.pause()
        }
      },
      { threshold: 0.22 },
    )

    observer.observe(sectionEl)

    return () => {
      observer.disconnect()
      entranceTimelineRef.current?.kill()
      pulseTimelineRef.current?.kill()
      ctx.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="tecnologias"
      className="tech-section"
      aria-labelledby="tech-section-heading"
    >
      {/* Iluminación ambiental discreta */}
      <div className="tech-ambient-glow-center" aria-hidden="true" />

      <div className="tech-container">
        {/* 1. ENCABEZADO DE LA SECCIÓN */}
        <header className="tech-header" data-tech-gsap="header">
          <div className="tech-eyebrow-badge">
            <Cpu size={13} className="tech-eyebrow-icon" aria-hidden="true" />
            <span>{TECHNOLOGIES_SECTION_META.eyebrow}</span>
          </div>

          <h2 id="tech-section-heading" className="tech-title">
            {TECHNOLOGIES_SECTION_META.titlePrefix}{' '}
            <span className="tech-title-accent">
              {TECHNOLOGIES_SECTION_META.titleAccent}
            </span>
          </h2>

          <p className="tech-description">
            {TECHNOLOGIES_SECTION_META.description}
          </p>
        </header>

        {/* 2. COMPOSICIÓN FLOTANTE DE LOGOS PROTAGONISTAS (React Native + Expo <-> .NET <-> PostgreSQL) */}
        <div
          className="tech-architecture-diagram"
          role="region"
          aria-label="Flujo de arquitectura conectada: Aplicación móvil React Native y Expo con API REST .NET y Base de datos PostgreSQL"
        >
          {ARCHITECTURE_MODULES.map((module, idx) => {
            const connection = ARCHITECTURE_CONNECTIONS[idx]
            return (
              <Fragment key={module.id}>
                <ArchitectureNodeGroup module={module} />

                {connection && (
                  <div
                    className="tech-connector-bridge"
                    data-tech-gsap="connector"
                    aria-hidden="true"
                  >
                    {/* SVG Horizontal para escritorio: Línea superior naranja (#FE8B01) e inferior azul (#58C3E3) */}
                    <svg
                      className="tech-connector-svg tech-connector-svg--horizontal"
                      viewBox="0 0 180 56"
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      {/* Guías base permanentes en reposo */}
                      <line
                        x1="6"
                        y1="19"
                        x2="174"
                        y2="19"
                        className="tech-conn-guide-line tech-conn-guide-line--upper"
                      />
                      <line
                        x1="6"
                        y1="37"
                        x2="174"
                        y2="37"
                        className="tech-conn-guide-line tech-conn-guide-line--lower"
                      />

                      {/* Línea superior activa (Naranja institucional #FE8B01) */}
                      <line
                        x1="8"
                        y1="19"
                        x2="172"
                        y2="19"
                        className="tech-conn-active-line tech-conn-active-line--upper"
                        data-tech-gsap="conn-line-h"
                      />
                      {/* Línea inferior activa (Azul informativo #58C3E3) */}
                      <line
                        x1="172"
                        y1="37"
                        x2="8"
                        y2="37"
                        className="tech-conn-active-line tech-conn-active-line--lower"
                        data-tech-gsap="conn-line-h"
                      />

                      {/* Terminales de la línea superior (#FE8B01) */}
                      <circle
                        cx="6"
                        cy="19"
                        r="3"
                        className="tech-conn-node tech-conn-node--upper"
                      />
                      <circle
                        cx="174"
                        cy="19"
                        r="3"
                        className="tech-conn-node tech-conn-node--upper"
                      />

                      {/* Terminales de la línea inferior (#58C3E3) */}
                      <circle
                        cx="6"
                        cy="37"
                        r="3"
                        className="tech-conn-node tech-conn-node--lower"
                      />
                      <circle
                        cx="174"
                        cy="37"
                        r="3"
                        className="tech-conn-node tech-conn-node--lower"
                      />

                      {/* Pulso superior (#FE8B01) y pulso inferior (#58C3E3) */}
                      <circle
                        cx="10"
                        cy="19"
                        r="4"
                        className="tech-conn-pulse-dot tech-conn-pulse-dot--upper"
                        data-tech-gsap={`pulse-h-fwd-${idx}`}
                      />
                      <circle
                        cx="170"
                        cy="37"
                        r="4"
                        className="tech-conn-pulse-dot tech-conn-pulse-dot--lower"
                        data-tech-gsap={`pulse-h-bwd-${idx}`}
                      />
                    </svg>

                    {/* SVG Vertical para tablet y móvil */}
                    <svg
                      className="tech-connector-svg tech-connector-svg--vertical"
                      viewBox="0 0 56 76"
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      <line
                        x1="19"
                        y1="6"
                        x2="19"
                        y2="70"
                        className="tech-conn-guide-line tech-conn-guide-line--upper"
                      />
                      <line
                        x1="37"
                        y1="6"
                        x2="37"
                        y2="70"
                        className="tech-conn-guide-line tech-conn-guide-line--lower"
                      />

                      <line
                        x1="19"
                        y1="8"
                        x2="19"
                        y2="68"
                        className="tech-conn-active-line tech-conn-active-line--upper"
                        data-tech-gsap="conn-line-v"
                      />
                      <line
                        x1="37"
                        y1="68"
                        x2="37"
                        y2="8"
                        className="tech-conn-active-line tech-conn-active-line--lower"
                        data-tech-gsap="conn-line-v"
                      />

                      <circle
                        cx="19"
                        cy="6"
                        r="3"
                        className="tech-conn-node tech-conn-node--upper"
                      />
                      <circle
                        cx="19"
                        cy="70"
                        r="3"
                        className="tech-conn-node tech-conn-node--upper"
                      />
                      <circle
                        cx="37"
                        cy="6"
                        r="3"
                        className="tech-conn-node tech-conn-node--lower"
                      />
                      <circle
                        cx="37"
                        cy="70"
                        r="3"
                        className="tech-conn-node tech-conn-node--lower"
                      />

                      <circle
                        cx="19"
                        cy="8"
                        r="4"
                        className="tech-conn-pulse-dot tech-conn-pulse-dot--upper"
                        data-tech-gsap={`pulse-v-fwd-${idx}`}
                      />
                      <circle
                        cx="37"
                        cy="68"
                        r="4"
                        className="tech-conn-pulse-dot tech-conn-pulse-dot--lower"
                        data-tech-gsap={`pulse-v-bwd-${idx}`}
                      />
                    </svg>

                    {/* Insignia central bidireccional */}
                    <div className="tech-connector-badge">
                      <ArrowLeftRight size={12} aria-hidden="true" />
                    </div>
                  </div>
                )}
              </Fragment>
            )
          })}
        </div>

        {/* 3. FILA DISCRETA DE TECNOLOGÍAS COMPLEMENTARIAS */}
        <div
          className="tech-complementary-block"
          data-tech-gsap="complementary"
        >
          <span className="tech-complementary-label">
            {TECHNOLOGIES_SECTION_META.complementaryLabel}
          </span>

          <ul
            className="tech-complementary-list"
            aria-label="Tecnologías complementarias utilizadas en el desarrollo"
          >
            {COMPLEMENTARY_TECHNOLOGIES.map((tech) => (
              <li key={tech.id} className="tech-complementary-pill">
                <span className="tech-complementary-icon">
                  {renderComplementaryIcon(tech.id)}
                </span>
                <span className="tech-complementary-name">{tech.name}</span>
                <span className="tech-complementary-sep" aria-hidden="true">
                  ·
                </span>
                <span className="tech-complementary-role">{tech.role}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 4. INDICADOR INFERIOR REUTILIZADO ("Continuar a cambios y decisiones") */}
      <ScrollIndicator
        targetId="cambios-decisiones"
        label="Continuar a cambios y decisiones"
        ariaLabel="Continuar a la sección de cambios y decisiones"
        dataGsap="tech-scroll-indicator"
        className="tech-scroll-indicator-wrap"
        onScrollToTarget={onNavigateToSection}
      />
    </section>
  )
}
