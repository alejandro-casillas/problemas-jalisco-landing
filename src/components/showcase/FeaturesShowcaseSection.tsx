import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ChevronLeft, ChevronRight, Moon, Smartphone, Sparkles, Sun } from 'lucide-react'
import { PhoneMockup } from '../hero/PhoneMockup'
import { ScrollIndicator } from '../hero/ScrollIndicator'
import { ScreenshotThemeToggle } from './ScreenshotThemeToggle'
import {
  FEATURES_SHOWCASE_ITEMS,
  FEATURES_SHOWCASE_SECTION_META,
  resolveThemedScreenshot,
  SHOWCASE_TRANSITION_CONFIG,
  type FeatureShowcaseItem,
  type ScreenshotTheme,
} from '../../data/featuresShowcaseData'
import logoWebp from '../../assets/problemas-jalisco-letras-webp.webp'
import logoPng from '../../assets/problemas-jalisco-letras-png.png'

interface FeaturesShowcaseSectionProps {
  onNavigateToSection?: (targetId: string) => void
}

interface ThemedScreenLayerProps {
  item: FeatureShowcaseItem
  variant: ScreenshotTheme
  isActiveVariant: boolean
}

function ThemedScreenLayer({
  item,
  variant,
  isActiveVariant,
}: ThemedScreenLayerProps) {
  const [imageError, setImageError] = useState(false)
  const resolved = resolveThemedScreenshot(item, variant)
  const showRealImage = Boolean(resolved.src) && !imageError

  return (
    <div
      className={`showcase-theme-layer showcase-theme-layer--${variant} ${
        isActiveVariant ? 'showcase-theme-layer--visible' : ''
      }`}
      aria-hidden={!isActiveVariant}
    >
      {showRealImage ? (
        <>
          <img
            src={resolved.src}
            alt={
              item.screenshotAlt ??
              `${item.screenLabel} (${variant === 'light' ? 'Modo claro' : 'Modo oscuro'}) — ${item.title}`
            }
            className="phone-screen-image"
            loading="lazy"
            decoding="async"
            onError={() => setImageError(true)}
          />
          {resolved.isFallbackVariant && (
            <span className="showcase-fallback-variant-note">
              Vista {resolved.effectiveTheme === 'light' ? 'Light' : 'Dark'} única disponible
            </span>
          )}
        </>
      ) : (
        /* Estado visual provisional (PANTALLA 1..7) con apariencia diferenciada Light / Dark */
        <div
          className={`showcase-provisional-slide showcase-provisional-slide--${variant}`}
        >
          <div className="showcase-provisional-header">
            <span className="showcase-provisional-chip">
              <Smartphone size={11} aria-hidden="true" />
              <span>
                {item.screenNumber} / {FEATURES_SHOWCASE_SECTION_META.totalFormatted}
              </span>
              <span className="showcase-provisional-chip-sep" aria-hidden="true">
                ·
              </span>
              {variant === 'light' ? (
                <Sun size={10} aria-hidden="true" />
              ) : (
                <Moon size={10} aria-hidden="true" />
              )}
              <span>{variant === 'light' ? 'LIGHT' : 'DARK'}</span>
            </span>
          </div>

          <div className="showcase-provisional-body">
            <div className="showcase-provisional-logo-wrap">
              <picture>
                <source srcSet={logoWebp} type="image/webp" />
                <img
                  src={logoPng}
                  alt="Problemas Jalisco"
                  className="showcase-provisional-logo"
                  width={500}
                  height={300}
                />
              </picture>
            </div>

            <div className="showcase-provisional-badge-ring">
              <span className="showcase-provisional-number">
                {item.screenNumber}
              </span>
            </div>

            <p className="showcase-provisional-screen-name">
              {item.screenLabel}
            </p>
            <p className="showcase-provisional-screen-sub">{item.title}</p>
          </div>

          <div className="showcase-provisional-footer" aria-hidden="true">
            <div className="showcase-provisional-skeleton-bar" />
            <span className="phone-home-bar showcase-provisional-home-bar" />
          </div>
        </div>
      )}
    </div>
  )
}

export function FeaturesShowcaseSection({
  onNavigateToSection,
}: FeaturesShowcaseSectionProps) {
  const totalSlides = FEATURES_SHOWCASE_ITEMS.length
  const [activeIndex, setActiveIndex] = useState(0)
  const [displayedIndex, setDisplayedIndex] = useState(0)
  // Estado inicial 'light', correspondiente al tema predeterminado de la aplicación real
  const [screenshotTheme, setScreenshotTheme] = useState<ScreenshotTheme>('light')

  const sectionRef = useRef<HTMLElement | null>(null)
  const textStageRef = useRef<HTMLDivElement | null>(null)
  const screenPanelRefs = useRef<(HTMLDivElement | null)[]>([])

  const activeIndexRef = useRef(0)
  const isAnimatingRef = useRef(false)
  const isSectionVisibleRef = useRef(false)
  const pendingTextEntranceDirRef = useRef<1 | -1 | null>(null)
  const activeTimelineRef = useRef<gsap.core.Timeline | null>(null)

  // Precarga automática de ambas variantes (Light y Dark) cuando existan capturas reales
  useEffect(() => {
    FEATURES_SHOWCASE_ITEMS.forEach((item) => {
      const lightResolved = resolveThemedScreenshot(item, 'light')
      const darkResolved = resolveThemedScreenshot(item, 'dark')

      if (lightResolved.src) {
        const imgLight = new Image()
        imgLight.src = lightResolved.src
      }
      if (darkResolved.src && darkResolved.src !== lightResolved.src) {
        const imgDark = new Image()
        imgDark.src = darkResolved.src
      }
    })
  }, [])

  // Inicialización de posiciones de las 7 pantallas dentro del dispositivo
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      screenPanelRefs.current.forEach((panel, idx) => {
        if (!panel) return
        gsap.set(panel, {
          xPercent: 0,
          yPercent: 0,
          autoAlpha: idx === 0 ? 1 : 0,
          zIndex: idx === 0 ? 2 : 1,
        })
      })
    }, sectionRef)

    return () => {
      activeTimelineRef.current?.kill()
      ctx.revert()
    }
  }, [])

  // Entrada coordinada del nuevo contenido editorial tras actualizar `displayedIndex`
  useLayoutEffect(() => {
    const dir = pendingTextEntranceDirRef.current
    if (dir === null) return
    pendingTextEntranceDirRef.current = null

    const textContainer = textStageRef.current
    if (!textContainer) {
      isAnimatingRef.current = false
      return
    }

    const {
      direction,
      textEnterDuration,
      textEnterEase,
      textOffsetPx,
      tagStagger,
    } = SHOWCASE_TRANSITION_CONFIG

    const axisProp = direction === 'vertical' ? 'y' : 'x'
    const fromOffset = dir * textOffsetPx

    const counterEl = textContainer.querySelector('[data-showcase-gsap="counter"]')
    const titleEl = textContainer.querySelector('[data-showcase-gsap="title"]')
    const descEl = textContainer.querySelector('[data-showcase-gsap="description"]')
    const tagEls = textContainer.querySelectorAll('[data-showcase-gsap="tag"]')

    const enterTl = gsap.timeline({
      defaults: { ease: textEnterEase },
      onComplete: () => {
        isAnimatingRef.current = false
      },
    })

    if (counterEl) {
      gsap.set(counterEl, { [axisProp]: fromOffset * 0.55, autoAlpha: 0 })
      enterTl.to(
        counterEl,
        {
          [axisProp]: 0,
          autoAlpha: 1,
          duration: textEnterDuration * 0.85,
        },
        0,
      )
    }

    if (titleEl) {
      gsap.set(titleEl, { [axisProp]: fromOffset, autoAlpha: 0 })
      enterTl.to(
        titleEl,
        {
          [axisProp]: 0,
          autoAlpha: 1,
          duration: textEnterDuration,
        },
        0.03,
      )
    }

    if (descEl) {
      gsap.set(descEl, { [axisProp]: fromOffset * 0.85, autoAlpha: 0 })
      enterTl.to(
        descEl,
        {
          [axisProp]: 0,
          autoAlpha: 1,
          duration: textEnterDuration,
        },
        0.08,
      )
    }

    if (tagEls.length > 0) {
      gsap.set(tagEls, { [axisProp]: fromOffset * 0.65, autoAlpha: 0 })
      enterTl.to(
        tagEls,
        {
          [axisProp]: 0,
          autoAlpha: 1,
          duration: textEnterDuration * 0.85,
          stagger: tagStagger,
        },
        0.12,
      )
    }
  }, [displayedIndex])

  // Función central de cambio de pantalla (soporta salto directo o avance/retroceso)
  const goToSlide = useCallback(
    (targetIndex: number, explicitDirection?: 1 | -1) => {
      const currentIndex = activeIndexRef.current
      if (isAnimatingRef.current || targetIndex === currentIndex) return
      if (targetIndex < 0 || targetIndex >= totalSlides) return

      const stepDirection: 1 | -1 =
        explicitDirection ?? (targetIndex > currentIndex ? 1 : -1)

      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches

      const currentScreenEl = screenPanelRefs.current[currentIndex]
      const nextScreenEl = screenPanelRefs.current[targetIndex]

      activeIndexRef.current = targetIndex
      setActiveIndex(targetIndex)

      // Modo de movimiento reducido: cambio limpio e inmediato sin desplazamiento
      if (prefersReducedMotion || !currentScreenEl || !nextScreenEl) {
        screenPanelRefs.current.forEach((panel, idx) => {
          if (!panel) return
          gsap.set(panel, {
            xPercent: 0,
            yPercent: 0,
            autoAlpha: idx === targetIndex ? 1 : 0,
            zIndex: idx === targetIndex ? 2 : 1,
          })
        })
        setDisplayedIndex(targetIndex)
        return
      }

      isAnimatingRef.current = true
      activeTimelineRef.current?.kill()

      const {
        direction,
        duration,
        ease,
        screenTravelPercent,
        textExitDuration,
        textExitEase,
        textOffsetPx,
      } = SHOWCASE_TRANSITION_CONFIG

      const screenAxis = direction === 'vertical' ? 'yPercent' : 'xPercent'
      const textAxis = direction === 'vertical' ? 'y' : 'x'

      const tl = gsap.timeline()
      activeTimelineRef.current = tl

      // Preparar estado inicial de la pantalla entrante dentro del marco recortado
      gsap.set(currentScreenEl, {
        xPercent: 0,
        yPercent: 0,
        autoAlpha: 1,
        zIndex: 2,
      })

      gsap.set(nextScreenEl, {
        xPercent: 0,
        yPercent: 0,
        [screenAxis]: stepDirection * screenTravelPercent,
        autoAlpha: 0,
        zIndex: 3,
      })

      // 1. Transición de pantallas dentro del teléfono (inmóvil)
      tl.to(
        currentScreenEl,
        {
          [screenAxis]: -stepDirection * screenTravelPercent,
          autoAlpha: 0,
          duration,
          ease,
        },
        0,
      )

      tl.to(
        nextScreenEl,
        {
          [screenAxis]: 0,
          autoAlpha: 1,
          duration,
          ease,
          onComplete: () => {
            gsap.set(currentScreenEl, { xPercent: 0, yPercent: 0, zIndex: 1 })
            gsap.set(nextScreenEl, { zIndex: 2 })
          },
        },
        0,
      )

      // 2. Salida sincronizada del contenido editorial actual y conmutación a mitad de timeline
      const textContainer = textStageRef.current
      if (textContainer) {
        const counterEl = textContainer.querySelector('[data-showcase-gsap="counter"]')
        const titleEl = textContainer.querySelector('[data-showcase-gsap="title"]')
        const descEl = textContainer.querySelector('[data-showcase-gsap="description"]')
        const tagEls = textContainer.querySelectorAll('[data-showcase-gsap="tag"]')

        const exitTargets = [counterEl, titleEl, descEl, ...Array.from(tagEls)].filter(
          Boolean,
        )

        tl.to(
          exitTargets,
          {
            [textAxis]: -stepDirection * (textOffsetPx * 0.75),
            autoAlpha: 0,
            duration: textExitDuration,
            ease: textExitEase,
            stagger: 0.018,
            onComplete: () => {
              pendingTextEntranceDirRef.current = stepDirection
              setDisplayedIndex(targetIndex)
            },
          },
          0,
        )
      } else {
        setDisplayedIndex(targetIndex)
        tl.eventCallback('onComplete', () => {
          isAnimatingRef.current = false
        })
      }
    },
    [totalSlides],
  )

  const handlePrev = useCallback(() => {
    const prevIndex = (activeIndexRef.current - 1 + totalSlides) % totalSlides
    goToSlide(prevIndex, -1)
  }, [goToSlide, totalSlides])

  const handleNext = useCallback(() => {
    const nextIndex = (activeIndexRef.current + 1) % totalSlides
    goToSlide(nextIndex, 1)
  }, [goToSlide, totalSlides])

  // Detectar cuándo la sección Showcase está activa en el viewport para habilitar flechas de teclado
  useEffect(() => {
    const sectionEl = sectionRef.current
    if (!sectionEl || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => {
        isSectionVisibleRef.current = entry.isIntersecting && entry.intersectionRatio >= 0.35
      },
      { threshold: [0, 0.35, 0.7] },
    )

    observer.observe(sectionEl)
    return () => observer.disconnect()
  }, [])

  // Navegación por teclado (Flecha izquierda / Flecha derecha cuando la sección es visible)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isSectionVisibleRef.current) return

      const target = e.target as HTMLElement | null
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        return
      }

      if (e.key === 'ArrowRight') {
        e.preventDefault()
        handleNext()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        handlePrev()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleNext, handlePrev])

  const currentItem = FEATURES_SHOWCASE_ITEMS[displayedIndex] ?? FEATURES_SHOWCASE_ITEMS[0]

  return (
    <section
      ref={sectionRef}
      id="funcionalidades"
      className="showcase-section"
      aria-labelledby="showcase-active-title"
    >
      {/* Iluminación rosa ambiental sutil de fondo */}
      <div className="showcase-ambient-glow-left" aria-hidden="true" />
      <div className="showcase-ambient-glow-right" aria-hidden="true" />

      <div className="showcase-container">
        {/* COLUMNA IZQUIERDA: TELÉFONO PROTAGONISTA FRONTAL + SELECTOR LIGHT/DARK */}
        <div className="showcase-phone-column">
          <div className="showcase-phone-stage">
            <div className="showcase-phone-pink-halo" aria-hidden="true" />

            <PhoneMockup tilted={false} className="showcase-phone-mockup">
              <div className="showcase-screen-viewport">
                {FEATURES_SHOWCASE_ITEMS.map((item, idx) => (
                  <div
                    key={item.id}
                    ref={(el) => {
                      screenPanelRefs.current[idx] = el
                    }}
                    className={`showcase-screen-panel showcase-screen-panel--v-${idx + 1}`}
                    aria-hidden={activeIndex !== idx}
                  >
                    <ThemedScreenLayer
                      item={item}
                      variant="light"
                      isActiveVariant={screenshotTheme === 'light'}
                    />
                    <ThemedScreenLayer
                      item={item}
                      variant="dark"
                      isActiveVariant={screenshotTheme === 'dark'}
                    />
                  </div>
                ))}
              </div>
            </PhoneMockup>
          </div>

          {/* Selector compacto Light/Dark exclusivo para las capturas del teléfono */}
          <ScreenshotThemeToggle
            theme={screenshotTheme}
            onChange={setScreenshotTheme}
          />
        </div>

        {/* COLUMNA DERECHA: INFORMACIÓN SINCRONIZADA Y CONTROLES DEL CARRUSEL */}
        <div className="showcase-info-column">
          <div className="showcase-meta-row">
            <div className="showcase-eyebrow-badge">
              <Sparkles size={13} className="showcase-eyebrow-icon" aria-hidden="true" />
              <span>{FEATURES_SHOWCASE_SECTION_META.eyebrow}</span>
            </div>

            <div
              className="showcase-counter"
              aria-live="polite"
              aria-atomic="true"
            >
              <span
                className="showcase-counter-active"
                data-showcase-gsap="counter"
              >
                {currentItem.screenNumber}
              </span>
              <span className="showcase-counter-sep" aria-hidden="true">
                /
              </span>
              <span className="showcase-counter-total">
                {FEATURES_SHOWCASE_SECTION_META.totalFormatted}
              </span>
            </div>
          </div>

          {/* Escenario de texto sincronizado mediante GSAP */}
          <div ref={textStageRef} className="showcase-text-stage">
            <h2
              id="showcase-active-title"
              className="showcase-title"
              data-showcase-gsap="title"
            >
              {currentItem.title}
            </h2>

            <p
              className="showcase-description"
              data-showcase-gsap="description"
            >
              {currentItem.description}
            </p>

            {currentItem.tags && currentItem.tags.length > 0 && (
              <ul
                className="showcase-tags-list"
                aria-label="Características destacadas de la pantalla"
              >
                {currentItem.tags.map((tag) => (
                  <li
                    key={`${currentItem.id}-${tag}`}
                    className="showcase-tag-chip"
                    data-showcase-gsap="tag"
                  >
                    <span className="showcase-tag-dot" aria-hidden="true" />
                    <span>{tag}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Barra de navegación del carrusel: Botones Anterior/Siguiente + 7 Indicadores */}
          <div
            className="showcase-controls-bar"
            role="group"
            aria-label="Controles del carrusel de funcionalidades"
          >
            <div className="showcase-arrows-group">
              <button
                type="button"
                className="showcase-arrow-btn"
                onClick={handlePrev}
                aria-label="Pantalla anterior"
              >
                <ChevronLeft size={20} aria-hidden="true" />
              </button>

              <button
                type="button"
                className="showcase-arrow-btn"
                onClick={handleNext}
                aria-label="Siguiente pantalla"
              >
                <ChevronRight size={20} aria-hidden="true" />
              </button>
            </div>

            <div
              className="showcase-indicators"
              role="tablist"
              aria-label="Seleccionar pantalla de la aplicación"
            >
              {FEATURES_SHOWCASE_ITEMS.map((item, idx) => {
                const isSelected = activeIndex === idx
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    aria-label={`Ir a ${item.screenLabel}: ${item.title}`}
                    className={`showcase-indicator-dot ${
                      isSelected ? 'showcase-indicator-dot--active' : ''
                    }`}
                    onClick={() => goToSlide(idx)}
                  >
                    <span className="showcase-indicator-fill" />
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Parte inferior: Indicador de avance hacia Transición a Pruebas */}
      <ScrollIndicator
        targetId="transicion-pruebas"
        label="Continuar a transición a pruebas"
        ariaLabel="Continuar a la sección de transición a pruebas"
        dataGsap="showcase-scroll-indicator"
        className="showcase-scroll-indicator-wrap"
        onScrollToTarget={onNavigateToSection}
      />
    </section>
  )
}
