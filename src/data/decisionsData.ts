export interface VisualAlternative {
  name: string
  label: string
  description: string
  placeholderLabel: string
  isSelected?: boolean
  badgeText?: string
  /**
   * Ruta opcional para captura de pantalla real.
   * Si no se define, se renderiza el wireframe placeholder elegante.
   */
  screenshotSrc?: string
}

export interface DecisionItem {
  id: 'arquitectura-datos' | 'componentes-propios' | 'ia-desarrollo' | 'identidad-interfaz'
  number: '01' | '02' | '03' | '04'
  title: string
  iconName: 'Database' | 'Blocks' | 'Bot' | 'PanelsTopLeft'
  accentColor: 'blue' | 'pink' | 'orange'
  summary: string
  situation: string
  alternativesSummary: string
  decision: string
  result: string
  tags: string[]
  /** Componentes extraídos como evidencia (Decisión 02) */
  extractedComponents?: string[]
  /** Nota de supervisión técnica (Decisión 03) */
  supervisionNote?: string
  /** Comparativa visual especial (Decisión 04) */
  visualComparison?: {
    alternativeA: VisualAlternative
    alternativeB: VisualAlternative
  }
}

export const DECISIONS_SECTION_META = {
  eyebrow: '04 / CAMBIOS Y DECISIONES',
  titlePrefix: 'Adaptarnos también fue parte de',
  titleAccent: 'construir',
  subtitle: 'Cuatro decisiones que definieron la evolución del proyecto',
} as const

export const DECISIONS_DATA: readonly DecisionItem[] = [
  {
    id: 'arquitectura-datos',
    number: '01',
    title: 'Arquitectura y datos',
    iconName: 'Database',
    accentColor: 'blue',
    summary:
      'ASP.NET Core, PostgreSQL y reorganización de entornos para trabajar en paralelo.',
    situation:
      'Necesitábamos concretar una arquitectura funcional y facilitar el desarrollo simultáneo del equipo.',
    alternativesSummary:
      'Tecnologías inicialmente contempladas durante Diseño y distintas formas de organizar los entornos de base de datos.',
    decision:
      'Utilizar ASP.NET Core con C#, PostgreSQL y reorganizar el trabajo mediante esquemas y entornos de desarrollo.',
    result:
      'Una API REST funcional y mayor independencia para desarrollar e integrar componentes.',
    tags: ['ASP.NET Core', 'PostgreSQL', 'Esquemas y entornos'],
  },
  {
    id: 'componentes-propios',
    number: '02',
    title: 'Componentes propios',
    iconName: 'Blocks',
    accentColor: 'pink',
    summary:
      'De Tailwind a un sistema de componentes y estilos reutilizables.',
    situation:
      'Al comenzar formalmente el frontend, después del avance inicial del backend, necesitábamos controlar la consistencia visual entre pantallas.',
    alternativesSummary:
      'Utilizar Tailwind como base de estilos o construir componentes reutilizables con estilos propios.',
    decision:
      'Descartar Tailwind y desarrollar nuestro propio sistema de componentes, estilos y tokens.',
    result:
      'Componentes compartidos y una interfaz más consistente, con mayor control sobre su mantenimiento y evolución.',
    extractedComponents: ['Button', 'EmptyState', 'UserAvatar', 'Tokens CSS'],
    tags: ['Tokens de diseño', 'Modularización', 'Consistencia visual'],
  },
  {
    id: 'ia-desarrollo',
    number: '03',
    title: 'IA en el desarrollo',
    iconName: 'Bot',
    accentColor: 'orange',
    summary:
      'Codex y Antigravity para acelerar implementación y refactorización supervisadas.',
    situation:
      'La implementación de código repetitivo, reorganización de componentes y tareas de mantenimiento consumían tiempo.',
    alternativesSummary:
      'Continuar realizando todas las tareas manualmente o incorporar herramientas de asistencia mediante IA.',
    decision:
      'Integrar Codex y Antigravity como apoyo para implementación, refactorización y validaciones.',
    result:
      'Automatización parcial de tareas mecánicas y mayor capacidad para concentrarnos en decisiones de arquitectura, experiencia de usuario y revisión técnica.',
    supervisionNote:
      'Herramienta de asistencia bajo supervisión continua del equipo, conservando el criterio de diseño y la responsabilidad técnica.',
    tags: ['Codex', 'Antigravity', 'Asistencia supervisada'],
  },
  {
    id: 'identidad-interfaz',
    number: '04',
    title: 'Identidad de interfaz',
    iconName: 'PanelsTopLeft',
    accentColor: 'pink',
    summary:
      'Comparamos diseño continuo y diseño con contenedores. Elegimos una interfaz institucional.',
    situation:
      'Necesitábamos establecer una estructura visual coherente para las diferentes pantallas de la aplicación.',
    alternativesSummary:
      'Comparativa entre diseño continuo (tipo feed social) y diseño con contenedores (agrupación modular estructurada).',
    decision:
      'Después de implementar y comparar ambas variantes, el equipo eligió el estilo con contenedores.',
    result:
      'Un lenguaje visual más estructurado, aplicado progresivamente a las pantallas de la aplicación.',
    tags: ['Contenedores', 'Jerarquía visual', 'Estilo institucional'],
    visualComparison: {
      alternativeA: {
        name: 'Diseño continuo',
        label: 'Alternativa A',
        description:
          'Flujo abierto continuo con separadores sutiles y lectura secuencial tipo red social.',
        placeholderLabel: 'Exploración de flujo continuo',
        badgeText: 'Alternativa evaluada',
      },
      alternativeB: {
        name: 'Diseño con contenedores',
        label: 'Alternativa B',
        description:
          'Agrupaciones modulares delimitadas, jerarquía clara y estética cercana a paneles de configuración.',
        placeholderLabel: 'Estructura en tarjetas y bloques',
        isSelected: true,
        badgeText: 'Alternativa seleccionada',
      },
    },
  },
] as const

export function getDecisionById(id: string): DecisionItem | undefined {
  return DECISIONS_DATA.find((item) => item.id === id)
}

