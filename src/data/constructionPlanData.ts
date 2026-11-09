export interface ConstructionMilestone {
  id: 'diseno' | 'sprint-1' | 'sprint-2' | 'sprint-3'
  number: '00' | '01' | '02' | '03'
  title: string
  description: string
  /**
   * Indica si la estación representa un hito de adaptación y reprogramación,
   * destacando su marcador con el acento naranja institucional (#FE8B01).
   */
  isAdaptationMilestone?: boolean
}

export const CONSTRUCTION_PLAN_META = {
  eyebrow: '02 / PLAN DE CONSTRUCCIÓN',
  titlePrefix: 'Del diseño a una',
  titleAccent: 'solución construida',
  subtitle: 'De una propuesta inicial a la consolidación del MVP',
  footerPrimary: 'Laboratorio Abierto · Construcción',
  footerSecondary: 'Segundo de tres laboratorios',
} as const

/**
 * Estaciones de la línea temporal del Plan de construcción.
 */
export const CONSTRUCTION_MILESTONES: readonly ConstructionMilestone[] = [
  {
    id: 'diseno',
    number: '00',
    title: 'Diseño',
    description: 'Propuesta, requisitos y alcance del MVP',
  },
  {
    id: 'sprint-1',
    number: '01',
    title: 'Sprint I',
    description: 'Planificación, roles y cronograma',
  },
  {
    id: 'sprint-2',
    number: '02',
    title: 'Sprint II',
    description: 'Seguimiento y reprogramación',
    isAdaptationMilestone: true,
  },
  {
    id: 'sprint-3',
    number: '03',
    title: 'Sprint III',
    description: 'Consolidación y evidencias',
  },
] as const

