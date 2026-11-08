export type BackgroundType = 'dot-grid' | 'threads' | 'static-gradient'

export interface BackgroundOption {
  id: BackgroundType
  name: string
  shortLabel: string
  description: string
  technology: string
  performanceNote: string
}

export const BACKGROUND_OPTIONS: BackgroundOption[] = [
  {
    id: 'dot-grid',
    name: 'Dot Grid',
    shortLabel: 'Dot Grid',
    description: 'Malla de puntos reactivos con física de resortes y amortiguación al cursor.',
    technology: 'Canvas 2D + Spring Physics',
    performanceNote: 'Alto rendimiento · ~60 FPS',
  },
  {
    id: 'threads',
    name: 'Threads',
    shortLabel: 'Threads',
    description: 'Ondas de líneas fluidas armónicas con deformación suave al cursor.',
    technology: 'Canvas 2D / Procedural Sine Ribbons',
    performanceNote: 'Cinematográfico · ~60 FPS',
  },
  {
    id: 'static-gradient',
    name: 'Sin animación',
    shortLabel: 'Fondo CSS',
    description: 'Gradiente radial multicapa con iluminación ambiental e impacto cero en CPU/GPU.',
    technology: 'CSS Puro (Gradients + Vignette)',
    performanceNote: 'Bajo consumo · Cero CPU',
  },
]

