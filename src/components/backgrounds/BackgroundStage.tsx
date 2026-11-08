import { useSyncExternalStore } from 'react'
import type { BackgroundType } from './types'
import { DotGridBackground } from './DotGridBackground'
import { ThreadsBackground } from './ThreadsBackground'
import { StaticGradientBackground } from './StaticGradientBackground'

interface BackgroundStageProps {
  activeBackground: BackgroundType
  className?: string
}

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return () => {}
  }
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  mediaQuery.addEventListener('change', callback)
  return () => mediaQuery.removeEventListener('change', callback)
}

function getReducedMotionSnapshot() {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return false
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function hasCanvas2DSupport() {
  if (typeof document === 'undefined') return true
  try {
    const testCanvas = document.createElement('canvas')
    return Boolean(testCanvas.getContext && testCanvas.getContext('2d'))
  } catch {
    return false
  }
}

const canvasSupported = hasCanvas2DSupport()

export function BackgroundStage({
  activeBackground,
  className = '',
}: BackgroundStageProps) {
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false,
  )

  // Si el usuario tiene activo 'prefers-reduced-motion' o el navegador carece de soporte gráfico Canvas 2D,
  // se fuerza el renderizado de la alternativa estática CSS por accesibilidad y resiliencia
  const effectiveBackground: BackgroundType =
    (prefersReducedMotion || !canvasSupported) && activeBackground !== 'static-gradient'
      ? 'static-gradient'
      : activeBackground

  return (
    <div className={`background-stage ${className}`} aria-hidden="true">
      {/* Fondo base oscuro permanente */}
      <div className="background-base-fill" />

      {/* Renderizado condicional exclusivo: SOLO se monta el efecto activo,
          garantizando que el efecto anterior libere su rAF, canvas y memoria */}
      {effectiveBackground === 'dot-grid' && <DotGridBackground />}
      {effectiveBackground === 'threads' && <ThreadsBackground />}
      {effectiveBackground === 'static-gradient' && <StaticGradientBackground />}

      {/* Overlay translúcido sutil para proteger la legibilidad de la tipografía */}
      <div className="background-readability-overlay" />
    </div>
  )
}
