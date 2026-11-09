import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ArrowRight, Compass } from 'lucide-react'
import { BackgroundStage } from '../backgrounds/BackgroundStage'
import { SiteHeader } from '../layout/SiteHeader'
import { PhoneMockup } from './PhoneMockup'
import { HeroMascotPlaceholder } from './HeroMascotPlaceholder'
import { ScrollIndicator } from './ScrollIndicator'

interface HeroSectionProps {
  onNavigateToSection?: (targetId: string) => void
}

export function HeroSection({ onNavigateToSection }: HeroSectionProps) {
  const heroRootRef = useRef<HTMLDivElement | null>(null)

  const handleScrollTo = (targetId: string) => {
    if (onNavigateToSection) {
      onNavigateToSection(targetId)
      return
    }
    const targetEl = document.getElementById(targetId)
    if (!targetEl) return

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    targetEl.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  useEffect(() => {
    const rootEl = heroRootRef.current
    if (!rootEl) return

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      return
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: 'power3.out',
        },
      })

      // 1. Aparición del encabezado superior (0.00s -> 0.45s)
      tl.fromTo(
        '[data-gsap="site-header"]',
        { y: -20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.45 },
        0,
      )

      // 2. Entrada de la etiqueta institucional (0.18s -> 0.58s)
      tl.fromTo(
        '[data-gsap="hero-badge"]',
        { y: 14, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.4 },
        0.18,
      )

      // 3. Revelación del titular por bloques de línea (0.30s -> 0.95s)
      tl.fromTo(
        '[data-gsap="title-line"]',
        { y: 28, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.52,
          stagger: 0.11,
        },
        0.3,
      )

      // 4. Aparición de descripción y botones de acción (0.68s -> 1.22s)
      tl.fromTo(
        '[data-gsap="hero-description"]',
        { y: 18, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.44 },
        0.68,
      )

      tl.fromTo(
        '[data-gsap="hero-actions"]',
        { y: 16, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.42 },
        0.8,
      )

      // 5. Entrada del teléfono mediante opacidad, desplazamiento y escala (0.52s -> 1.32s)
      tl.fromTo(
        '[data-gsap="phone-entry"]',
        { y: 34, scale: 0.94, autoAlpha: 0 },
        {
          y: 0,
          scale: 1,
          autoAlpha: 1,
          duration: 0.8,
          ease: 'power2.out',
        },
        0.52,
      )

      // 6. Aparición del símbolo temporal protagonista (1.05s -> 1.55s)
      tl.fromTo(
        '[data-gsap="hero-mascot"]',
        { y: 20, scale: 0.88, autoAlpha: 0 },
        {
          y: 0,
          scale: 1,
          autoAlpha: 1,
          duration: 0.5,
          ease: 'power2.out',
        },
        1.05,
      )

      // 7. Inicio de flotación ambiental discreta del dispositivo y símbolo (a partir de ~1.35s)
      tl.add(() => {
        gsap.to('[data-gsap="phone-float"]', {
          y: -10,
          duration: 3.4,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        })

        gsap.to('.hero-mascot-placeholder', {
          y: 7,
          duration: 3.8,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        })
      }, 1.35)

      // 8. Activación del indicador inferior de scroll (1.38s -> 1.80s)
      tl.fromTo(
        '[data-gsap="scroll-indicator"]',
        { y: 12, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.42,
          onComplete: () => {
            gsap.to('.hero-scroll-arrow-icon', {
              y: 4,
              duration: 1.25,
              ease: 'sine.inOut',
              repeat: -1,
              yoyo: true,
            })
          },
        },
        1.38,
      )
    }, rootEl)

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <div ref={heroRootRef} className="hero-root-wrapper">
      {/* Encabezado flotante translúcido */}
      <SiteHeader onNavigate={handleScrollTo} />

      {/* Escenario principal del Hero (100vh / 100dvh) */}
      <section
        id="inicio"
        className="hero-section"
        aria-labelledby="hero-main-heading"
      >
        {/* Fondo animado principal aprobado: Threads (con fallback CSS en movimiento reducido) */}
        <BackgroundStage activeBackground="threads" />

        {/* Iluminación rosa ambiental adicional detrás de la composición derecha */}
        <div className="hero-ambient-stage-glow" aria-hidden="true" />

        <div className="hero-container">
          {/* Columna Izquierda: Narrativa editorial y llamadas a la acción */}
          <div className="hero-editorial-column">
            <div className="hero-badge" data-gsap="hero-badge">
              <span className="badge-dot" aria-hidden="true" />
              <span>PLATAFORMA CIUDADANA · JALISCO</span>
            </div>

            <h1 id="hero-main-heading" className="hero-title">
              <span className="hero-title-line" data-gsap="title-line">
                Los problemas
              </span>{' '}
              <span className="hero-title-line" data-gsap="title-line">
                de Jalisco merecen
              </span>{' '}
              <span className="hero-title-line" data-gsap="title-line">
                ser <span className="hero-title-accent">visibles</span>
              </span>
            </h1>

            <p className="hero-description" data-gsap="hero-description">
              Reporta problemáticas, participa y descubre lo que sucede en tu
              entorno.
            </p>

            <div className="hero-actions" data-gsap="hero-actions">
              <button
                type="button"
                className="btn-primary hero-btn-primary"
                onClick={() => handleScrollTo('funcionalidades')}
              >
                <span>Explorar funcionalidades</span>
                <ArrowRight size={17} aria-hidden="true" />
              </button>

              <button
                type="button"
                className="btn-secondary hero-btn-secondary"
                onClick={() => handleScrollTo('plan-construccion')}
              >
                <Compass size={17} aria-hidden="true" />
                <span>Conoce el proyecto</span>
              </button>
            </div>
          </div>

          {/* Columna Derecha: Composición protagonista (Teléfono 3D + Símbolo/Mascota provisional) */}
          <div className="hero-visual-column">
            <div className="hero-visual-stage">
              {/* Resplandor ambiental rosa focalizado */}
              <div className="hero-device-pink-aura" aria-hidden="true" />

              {/* Dispositivo móvil con inclinación 3D */}
              <PhoneMockup tilted />

              {/* Elemento temporal de mascota / símbolo protagonista */}
              <HeroMascotPlaceholder className="hero-mascot-positioned" />
            </div>
          </div>
        </div>

        {/* Parte inferior: Indicador animado de scroll */}
        <ScrollIndicator
          targetId="plan-construccion"
          onScrollToTarget={handleScrollTo}
        />
      </section>
    </div>
  )
}

