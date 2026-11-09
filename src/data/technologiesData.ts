import reactNativeLogo from '../assets/technologies/react-native.svg'
import expoLogo from '../assets/technologies/expo.svg'
import dotnetLogo from '../assets/technologies/dotnet.svg'
import postgresqlLogo from '../assets/technologies/postgresql.svg'

export type ArchitectureNodeId = 'app-movil' | 'api-rest' | 'base-datos'

export interface ArchitectureLogoAsset {
  key: 'react-native' | 'expo' | 'dotnet' | 'postgresql'
  src: string
  alt: string
}

export interface ArchitectureModuleItem {
  id: ArchitectureNodeId
  layerLabel: string
  technology: string
  description: string
  logos: ArchitectureLogoAsset[]
}

export interface ArchitectureConnectionItem {
  id: string
  from: ArchitectureNodeId
  to: ArchitectureNodeId
  forwardLabel: string
  backwardLabel: string
}

export interface ComplementaryTechItem {
  id: string
  name: string
  role: string
}

export const TECHNOLOGIES_SECTION_META = {
  eyebrow: '03 / TECNOLOGÍAS Y ARQUITECTURA',
  titlePrefix: 'Ingeniería detrás de',
  titleAccent: 'cada reporte',
  description:
    'Una arquitectura que conecta la aplicación, los servicios y la información para ofrecer una experiencia ciudadana integrada.',
  complementaryLabel: 'Ecosistema y herramientas de desarrollo',
} as const

export const ARCHITECTURE_MODULES: ArchitectureModuleItem[] = [
  {
    id: 'app-movil',
    layerLabel: 'Aplicación',
    technology: 'React Native + Expo',
    description:
      'Interfaz móvil para consultar, crear y dar seguimiento a reportes.',
    logos: [
      {
        key: 'react-native',
        src: reactNativeLogo,
        alt: 'Logo oficial de React Native',
      },
      {
        key: 'expo',
        src: expoLogo,
        alt: 'Logo oficial de Expo',
      },
    ],
  },
  {
    id: 'api-rest',
    layerLabel: 'API REST',
    technology: 'ASP.NET Core + C#',
    description:
      'Gestiona las solicitudes, reglas de negocio y comunicación con los datos.',
    logos: [
      {
        key: 'dotnet',
        src: dotnetLogo,
        alt: 'Logo oficial de .NET',
      },
    ],
  },
  {
    id: 'base-datos',
    layerLabel: 'Base de datos',
    technology: 'PostgreSQL',
    description:
      'Almacena usuarios, reportes y la información relacionada.',
    logos: [
      {
        key: 'postgresql',
        src: postgresqlLogo,
        alt: 'Logo oficial de PostgreSQL',
      },
    ],
  },
]

export const ARCHITECTURE_CONNECTIONS: ArchitectureConnectionItem[] = [
  {
    id: 'conn-app-api',
    from: 'app-movil',
    to: 'api-rest',
    forwardLabel: 'Solicitudes HTTPS / JSON',
    backwardLabel: 'Respuestas en tiempo real',
  },
  {
    id: 'conn-api-db',
    from: 'api-rest',
    to: 'base-datos',
    forwardLabel: 'Consultas y transacciones',
    backwardLabel: 'Datos persistentes',
  },
]

export const COMPLEMENTARY_TECHNOLOGIES: ComplementaryTechItem[] = [
  {
    id: 'typescript',
    name: 'TypeScript',
    role: 'Tipado estático',
  },
  {
    id: 'expo-router',
    name: 'Expo Router',
    role: 'Navegación nativa',
  },
  {
    id: 'zustand',
    name: 'Zustand',
    role: 'Estado global',
  },
  {
    id: 'git-github',
    name: 'Git / GitHub',
    role: 'Control de versiones',
  },
]
