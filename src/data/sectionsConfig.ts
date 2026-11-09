export type SectionId =
  | 'inicio'
  | 'plan-construccion'
  | 'tecnologias'
  | 'cambios-decisiones'
  | 'resultados-aprendizajes'
  | 'funcionalidades'
  | 'transicion-pruebas'
  | 'probar'

export interface SectionItem {
  id: SectionId
  label: string
  href: `#${SectionId}`
  isImplemented: boolean
}

/**
 * Orden cronológico completo de Problemas Jalisco Showcase
 * para la exposición del Laboratorio Abierto: Construcción.
 *
 * Las secciones con `isImplemented: true` están activas en el DOM actual
 * y participan automáticamente en la cadena de retorno de PreviousSectionButton.
 */
export const SHOWCASE_SECTIONS: readonly SectionItem[] = [
  {
    id: 'inicio',
    label: 'Inicio',
    href: '#inicio',
    isImplemented: true,
  },
  {
    id: 'plan-construccion',
    label: 'Plan de construcción',
    href: '#plan-construccion',
    isImplemented: true,
  },
  {
    id: 'tecnologias',
    label: 'Tecnologías',
    href: '#tecnologias',
    isImplemented: true,
  },
  {
    id: 'cambios-decisiones',
    label: 'Cambios y decisiones',
    href: '#cambios-decisiones',
    isImplemented: true,
  },
  {
    id: 'resultados-aprendizajes',
    label: 'Resultados y aprendizajes',
    href: '#resultados-aprendizajes',
    isImplemented: false,
  },
  {
    id: 'funcionalidades',
    label: 'Funcionalidades',
    href: '#funcionalidades',
    isImplemented: true,
  },
  {
    id: 'transicion-pruebas',
    label: 'Transición a Pruebas',
    href: '#transicion-pruebas',
    isImplemented: true,
  },
  {
    id: 'probar',
    label: 'Probar',
    href: '#probar',
    isImplemented: true,
  },
] as const

/**
 * Identificadores ordenados de las secciones implementadas en el DOM.
 */
export const IMPLEMENTED_SECTION_IDS: readonly SectionId[] = SHOWCASE_SECTIONS.filter(
  (section) => section.isImplemented,
).map((section) => section.id)

/**
 * Devuelve el id de la sección implementada inmediatamente anterior,
 * o null si la sección activa es la primera (Hero / #inicio).
 */
export function getPreviousSectionId(currentId: SectionId): SectionId | null {
  const index = IMPLEMENTED_SECTION_IDS.indexOf(currentId)
  if (index <= 0) {
    return null
  }
  return IMPLEMENTED_SECTION_IDS[index - 1]
}

/**
 * Devuelve el título legible de una sección a partir de su identificador.
 */
export function getSectionLabelById(id: SectionId): string {
  const found = SHOWCASE_SECTIONS.find((section) => section.id === id)
  return found ? found.label : id
}
