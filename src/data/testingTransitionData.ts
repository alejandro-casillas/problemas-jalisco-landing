export interface TransitionTopic {
  id: 'pendientes' | 'riesgos' | 'siguiente-laboratorio'
  title: string
  description: string
  iconName: 'Wrench' | 'ShieldAlert' | 'ClipboardCheck'
  accent: 'blue' | 'orange' | 'pink'
  /** Desafíos y aspectos técnicos secundarios */
  subitems?: string[]
}

export interface TeamMember {
  id: 'alejandro-casillas' | 'andre-solorzano' | 'javier-valdivia'
  name: string
  role: string
  initials: string
  accent: 'pink' | 'blue' | 'orange'
  /**
   * Ruta opcional para la fotografía real del integrante (ej. /src/assets/team/alejandro.webp).
   * Si no está definida, el componente renderiza el avatar elegante con iniciales y UserRound.
   */
  photoSrc?: string
}

export const TRANSITION_SECTION_META = {
  eyebrow: '07 / TRANSICIÓN A PRUEBAS',
  titlePrefix: 'Construimos el MVP. Ahora toca',
  titleAccent: 'validarlo',
  subtitle: 'Nuestro siguiente paso hacia una solución estable y confiable.',
  teamSectionLabel: 'TRABAJO REALIZADO POR',
  transitionFrom: 'LABORATORIO DE CONSTRUCCIÓN',
  transitionTo: 'LABORATORIO DE PRUEBAS',
} as const

export const TRANSITION_TOPICS: readonly TransitionTopic[] = [
  {
    id: 'pendientes',
    title: 'Pendientes',
    description:
      'Pruebas integrales, seguridad, rendimiento y experiencia de usuario.',
    iconName: 'Wrench',
    accent: 'blue',
    subitems: [
      'Pruebas integrales',
      'Seguridad y sesiones',
      'Optimización de rendimiento',
      'Experiencia de usuario',
    ],
  },
  {
    id: 'riesgos',
    title: 'Riesgos',
    description:
      'Despliegue de servicios, persistencia de datos y compatibilidad entre dispositivos.',
    iconName: 'ShieldAlert',
    accent: 'orange',
    subitems: [
      'Alojamiento API ASP.NET Core',
      'Disponibilidad PostgreSQL',
      'Persistencia de fotografías',
      'Conectividad de servicios',
    ],
  },
  {
    id: 'siguiente-laboratorio',
    title: 'Siguiente laboratorio',
    description:
      'Casos de prueba, evaluación con usuarios, correcciones y validación del MVP.',
    iconName: 'ClipboardCheck',
    accent: 'pink',
    subitems: [
      'Casos de prueba formales',
      'Evaluación con usuarios',
      'Correcciones y ajustes',
      'Validación final del MVP',
    ],
  },
] as const

/**
 * Los tres integrantes del equipo de desarrollo en el orden especificado:
 * 1. Alejandro Casillas
 * 2. André Solórzano
 * 3. Javier Valdivia
 */
export const TEAM_MEMBERS: readonly TeamMember[] = [
  {
    id: 'alejandro-casillas',
    name: 'Alejandro Casillas',
    role: 'Frontend · UI/UX',
    initials: 'AC',
    accent: 'pink',
    // photoSrc: undefined -> preparado para asignar url/import al agregar alejandro.webp
  },
  {
    id: 'andre-solorzano',
    name: 'André Solórzano',
    role: 'QA · Tester',
    initials: 'AS',
    accent: 'blue',
    // photoSrc: undefined -> preparado para asignar url/import al agregar andre.webp
  },
  {
    id: 'javier-valdivia',
    name: 'Javier Valdivia',
    role: 'Backend · API',
    initials: 'JV',
    accent: 'orange',
    // photoSrc: undefined -> preparado para asignar url/import al agregar javier.webp
  },
] as const

