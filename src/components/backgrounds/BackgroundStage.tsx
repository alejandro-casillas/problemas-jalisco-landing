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

export function BackgroundStage({
  activeBackground,
  className = '',
}: BackgroundStageProps) {
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false,
  )

  // Si el usuario tiene activo 'prefers-reduced-motion' y seleccionó un fondo animado,
  // se fuerza el renderizado del fondo estático por accesibilidad
  const effectiveBackground: BackgroundType =
    prefersReducedMotion && activeBackground !== 'static-gradient'
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
