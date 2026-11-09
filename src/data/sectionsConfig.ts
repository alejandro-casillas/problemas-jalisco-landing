export type SectionId = 'inicio' | 'funcionalidades' | 'tecnologias' | 'descargar'

export interface SectionDefinition {
  id: SectionId
  label: string
  isImplemented: boolean
}

/**
 * Estructura centralizada de las secciones del showroom Problemas Jalisco.
 * Define el orden jerárquico utilizado por la barra de navegación superior,
 * los indicadores inferiores de avance y el botón flotante de regreso a la sección anterior.
 */
export const SHOWCASE_SECTIONS: SectionDefinition[] = [
  { id: 'inicio', label: 'Inicio', isImplemented: true },
  { id: 'funcionalidades', label: 'Funcionalidades', isImplemented: true },
  { id: 'tecnologias', label: 'Tecnologías', isImplemented: true },
  { id: 'descargar', label: 'Descargar', isImplemented: true },
]

export const IMPLEMENTED_SECTION_IDS: SectionId[] = SHOWCASE_SECTIONS.filter(
  (sec) => sec.isImplemented,
).map((sec) => sec.id)

/**
 * Devuelve el identificador de la sección inmediatamente anterior según el orden del documento,
 * o `null` si el usuario se encuentra en la primera sección (Hero).
 */
export function getPreviousSectionId(currentId: SectionId): SectionId | null {
  const index = IMPLEMENTED_SECTION_IDS.indexOf(currentId)
  if (index <= 0) return null
  return IMPLEMENTED_SECTION_IDS[index - 1] ?? null
}

