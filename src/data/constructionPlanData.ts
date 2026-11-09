export type MilestoneIconType = 'palette' | 'document' | 'clock' | 'dot'

export interface ConstructionMilestone {
  id: 'diseno' | 'sprint-1' | 'sprint-2' | 'sprint-3' | 'exposicion' | 'proximamente'
  dateLabel?: string
  title: string
  description?: string
  iconType: MilestoneIconType
  /**
   * Indica si la estación representa un hito de adaptación o destacado naranja (#FE8B01).
   */
  isAdaptationMilestone?: boolean
  /**
   * Indica si es un punto intermedio compacto (ej. exposición construcción).
   */
  isCompact?: boolean
  /**
   * Indica si la estación es una fase futura o próxima
   */
  isUpcoming?: boolean
}

export const CONSTRUCTION_PLAN_META = {
  eyebrow: '02 / PLAN DE CONSTRUCCIÓN',
  titlePrefix: 'Del diseño a una',
  titleAccent: 'solución construida',
  subtitle: 'De una propuesta inicial a la consolidación del MVP',
  nextPhaseTitle: 'Laboratorio Abierto · Pruebas',
  nextPhaseSubtitle: 'Tercero de tres laboratorios modulares · Validación y estabilidad del MVP',
} as const

/**
 * Estaciones de la línea temporal del Plan de construcción organizadas cronológicamente por fechas.
 */
export const CONSTRUCTION_MILESTONES: readonly ConstructionMilestone[] = [
  {
    id: 'diseno',
    dateLabel: 'ENE – JUN 2026',
    title: 'Diseño',
    description: 'Propuesta, requisitos y alcance del MVP',
    iconType: 'palette',
  },
  {
    id: 'sprint-1',
    dateLabel: 'AGO 2026',
    title: 'Sprint I',
    description: 'Planificación, roles y cronograma',
    iconType: 'document',
  },
  {
    id: 'sprint-2',
    dateLabel: 'OCT 2026',
    title: 'Sprint II',
    description: 'Seguimiento y reprogramación',
    iconType: 'document',
  },
  {
    id: 'sprint-3',
    dateLabel: 'NOV 2026',
    title: 'Sprint III',
    description: 'Consolidación y evidencias',
    iconType: 'document',
  },
  {
    id: 'exposicion',
    title: 'Exposición',
    description: 'Construcción',
    iconType: 'dot',
    isAdaptationMilestone: true,
    isCompact: true,
  },
  {
    id: 'proximamente',
    dateLabel: 'ENE 2027',
    title: 'Próximamente',
    description: 'Validación en campo y pruebas',
    iconType: 'clock',
    isUpcoming: true,
  },
] as const

