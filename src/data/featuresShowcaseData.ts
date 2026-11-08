export type ShowcaseTransitionDirection = 'vertical' | 'horizontal'
export type ScreenshotTheme = 'light' | 'dark'

export interface ShowcaseTransitionConfig {
  /** Dirección principal del desplazamiento de pantallas ('vertical' u 'horizontal') */
  direction: ShowcaseTransitionDirection
  /** Duración total del desplazamiento entre pantallas en segundos */
  duration: number
  /** Curva de aceleración GSAP para el cambio de pantalla */
  ease: string
  /** Distancia porcentual de recorrido de la captura entrante/saliente */
  screenTravelPercent: number
  /** Duración de salida del bloque de texto (segundos) */
  textExitDuration: number
  /** Duración de entrada del bloque de texto (segundos) */
  textEnterDuration: number
  /** Curva de salida del contenido editorial */
  textExitEase: string
  /** Curva de entrada del contenido editorial */
  textEnterEase: string
  /** Desplazamiento en píxeles para la transición de títulos y descripciones */
  textOffsetPx: number
  /** Desfase escalonado entre etiquetas destacadas (segundos) */
  tagStagger: number
}

/**
 * Configuración centralizada de las transiciones del Showcase.
 * Cambiar `direction` a 'horizontal' permite evaluar el desplazamiento lateral
 * sin modificar la lógica interna del carrusel.
 */
export const SHOWCASE_TRANSITION_CONFIG: ShowcaseTransitionConfig = {
  direction: 'vertical',
  duration: 0.65,
  ease: 'power3.inOut',
  screenTravelPercent: 100,
  textExitDuration: 0.23,
  textEnterDuration: 0.42,
  textExitEase: 'power2.in',
  textEnterEase: 'power3.out',
  textOffsetPx: 20,
  tagStagger: 0.055,
}

export interface ThemedScreenshots {
  /** Ruta de captura en tema claro (src/assets/screenshots/light/) */
  light?: string
  /** Ruta de captura en tema oscuro (src/assets/screenshots/dark/) */
  dark?: string
}

export interface FeatureShowcaseItem {
  /** Identificador único del estado o pantalla */
  id: string
  /** Nombre base de archivo compartido en las carpetas light/ y dark/ (ej. 'pantalla-01') */
  assetKey: string
  /** Índice formateado a dos dígitos para el contador (ej. '01') */
  screenNumber: string
  /** Etiqueta visible en el placeholder provisional dentro del teléfono */
  screenLabel: string
  /** Encabezado principal de la funcionalidad (sin punto final) */
  title: string
  /** Descripción breve de la pantalla */
  description: string
  /** Variantes opcionales de captura por tema (Light / Dark) */
  screenshots?: ThemedScreenshots
  /** Texto alternativo accesible para la captura real */
  screenshotAlt?: string
  /** Etiquetas o características destacadas opcionales */
  tags?: string[]
}

/**
 * Resolución estática en tiempo de compilación mediante Vite `import.meta.glob`.
 * Detecta automáticamente cualquier imagen colocada en `src/assets/screenshots/light/`
 * y `src/assets/screenshots/dark/` sin usar rutas dinámicas inseguras.
 */
const lightScreenshotModules = import.meta.glob<string>(
  '../assets/screenshots/light/*.{webp,png,jpg,jpeg}',
  { eager: true, import: 'default' },
)

const darkScreenshotModules = import.meta.glob<string>(
  '../assets/screenshots/dark/*.{webp,png,jpg,jpeg}',
  { eager: true, import: 'default' },
)

function findAssetByKey(
  modules: Record<string, string>,
  assetKey: string,
): string | undefined {
  for (const [path, url] of Object.entries(modules)) {
    const fileName = path.split('/').pop() ?? ''
    if (fileName.startsWith(`${assetKey}.`)) {
      return url
    }
  }
  return undefined
}

export interface ResolvedScreenshot {
  src?: string
  effectiveTheme: ScreenshotTheme
  isFallbackVariant: boolean
}

/**
 * Obtiene la captura correspondiente al tema activo ('light' | 'dark') para una pantalla.
 * Si falta una de las dos variantes pero existe la otra, aplica un fallback controlado
 * hacia la variante disponible para evitar imágenes rotas o espacios vacíos.
 */
export function resolveThemedScreenshot(
  item: FeatureShowcaseItem,
  theme: ScreenshotTheme,
): ResolvedScreenshot {
  const lightUrl =
    item.screenshots?.light ?? findAssetByKey(lightScreenshotModules, item.assetKey)
  const darkUrl =
    item.screenshots?.dark ?? findAssetByKey(darkScreenshotModules, item.assetKey)

  if (theme === 'light') {
    if (lightUrl) {
      return { src: lightUrl, effectiveTheme: 'light', isFallbackVariant: false }
    }
    if (darkUrl) {
      return { src: darkUrl, effectiveTheme: 'dark', isFallbackVariant: true }
    }
    return { src: undefined, effectiveTheme: 'light', isFallbackVariant: false }
  }

  if (darkUrl) {
    return { src: darkUrl, effectiveTheme: 'dark', isFallbackVariant: false }
  }
  if (lightUrl) {
    return { src: lightUrl, effectiveTheme: 'light', isFallbackVariant: true }
  }
  return { src: undefined, effectiveTheme: 'dark', isFallbackVariant: false }
}

export const FEATURES_SHOWCASE_SECTION_META = {
  eyebrow: 'EXPLORA LA APLICACIÓN',
  totalFormatted: '07',
} as const

export const FEATURES_SHOWCASE_ITEMS: FeatureShowcaseItem[] = [
  {
    id: 'pantalla-1',
    assetKey: 'pantalla-01',
    screenNumber: '01',
    screenLabel: 'PANTALLA 1',
    title: 'Encabezado 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio praesent libero, sed cursus ante dapibus diam. Sed nisi nulla quis sem at nibh elementum imperdiet duis sagittis.',
    tags: ['Característica 01', 'Vista principal', 'Interacción'],
  },
  {
    id: 'pantalla-2',
    assetKey: 'pantalla-02',
    screenNumber: '02',
    screenLabel: 'PANTALLA 2',
    title: 'Encabezado 2',
    description:
      'Duis sagittis ipsum praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa vesti bulum lacinia arcu eget nulla class aptent taciti sociosqu ad litora torquent.',
    tags: ['Característica 02', 'Exploración', 'Detalle'],
  },
  {
    id: 'pantalla-3',
    assetKey: 'pantalla-03',
    screenNumber: '03',
    screenLabel: 'PANTALLA 3',
    title: 'Encabezado 3',
    description:
      'Curabitur sodales ligula in libero. Sed dignissim lacinia nunc curabitur tortor. Pellentesque nibh aenean quam in scelerisque sem at dolor maecenas mattis sed convallis.',
    tags: ['Característica 03', 'Participación', 'Seguimiento'],
  },
  {
    id: 'pantalla-4',
    assetKey: 'pantalla-04',
    screenNumber: '04',
    screenLabel: 'PANTALLA 4',
    title: 'Encabezado 4',
    description:
      'Maecenas mattis sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel suscipit quis, luctus non massa fusce ac turpis.',
    tags: ['Característica 04', 'Ubicación', 'Contexto'],
  },
  {
    id: 'pantalla-5',
    assetKey: 'pantalla-05',
    screenNumber: '05',
    screenLabel: 'PANTALLA 5',
    title: 'Encabezado 5',
    description:
      'Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum nulla metus, ullamcorper vel tincidunt sed, euismod in nibh. Quisque volutpat condimentum velit class aptent.',
    tags: ['Característica 05', 'Comunidad', 'Actividad'],
  },
  {
    id: 'pantalla-6',
    assetKey: 'pantalla-06',
    screenNumber: '06',
    screenLabel: 'PANTALLA 6',
    title: 'Encabezado 6',
    description:
      'Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante sed lacinia urna non tincidunt.',
    tags: ['Característica 06', 'Notificaciones', 'Estado'],
  },
  {
    id: 'pantalla-7',
    assetKey: 'pantalla-07',
    screenNumber: '07',
    screenLabel: 'PANTALLA 7',
    title: 'Encabezado 7',
    description:
      'Nam nec ante sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi ut fringilla suspendisse potenti.',
    tags: ['Característica 07', 'Perfil ciudadano', 'Configuración'],
  },
]
