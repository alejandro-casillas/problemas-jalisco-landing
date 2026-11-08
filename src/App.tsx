import { useState } from 'react'
import { Activity, ArrowRight, Smartphone, Sparkles } from 'lucide-react'
import { BackgroundStage } from './components/backgrounds/BackgroundStage'
import { BackgroundSwitcher } from './components/backgrounds/BackgroundSwitcher'
import { BACKGROUND_OPTIONS, type BackgroundType } from './components/backgrounds/types'

function App() {
  const [activeBackground, setActiveBackground] = useState<BackgroundType>('dot-grid')

  const currentOption =
    BACKGROUND_OPTIONS.find((opt) => opt.id === activeBackground) ??
    BACKGROUND_OPTIONS[0]

  return (
    <div className="showcase-app">
      {/* 1. SECCIÓN PRINCIPAL DEL LABORATORIO DE FONDOS (100vh / 100dvh) */}
      <section
        className="lab-hero-stage"
        aria-label="Laboratorio interactivo de fondos"
      >
        {/* Capa de Fondo Dinámica: Renderizado exclusivo del efecto seleccionado */}
        <BackgroundStage activeBackground={activeBackground} />

        {/* Capa de Contenido por encima del fondo */}
        <div className="lab-hero-container">
          {/* Columna Izquierda: Información editorial, Título, CTA y Controles */}
          <div className="lab-content-column">
            <div className="lab-identifier-badge">
              <span className="badge-dot" aria-hidden="true" />
              <span>PROBLEMAS JALISCO · SHOWCASE V2.0</span>
            </div>

            <h1 className="lab-hero-title">
              Una nueva forma de{' '}
              <span className="lab-hero-title-accent">participar.</span>
            </h1>

            <p className="lab-hero-description">
              Plataforma cívica interactiva para reportar anomalías urbanas,
              monitorear el avance de obras públicas y fortalecer la
              transparencia comunitaria en Jalisco con seguimiento en tiempo
              real.
            </p>

            <div className="lab-actions-group">
              <div className="lab-cta-row">
                <button type="button" className="btn-primary">
                  <Sparkles size={16} aria-hidden="true" />
                  <span>Explorar funcionalidades</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              </div>

              {/* Selector Discreto de Fondos */}
              <div className="background-switcher-panel">
                <span className="switcher-label">
                  Laboratorio de Fondo Activo
                </span>
                <BackgroundSwitcher
                  current={activeBackground}
                  onChange={setActiveBackground}
                />
              </div>

              {/* Indicador y Ficha Técnica del Efecto Activo */}
              <div
                className="active-effect-info"
                role="status"
                aria-live="polite"
              >
                <span className="active-effect-chip">
                  {currentOption.technology}
                </span>
                <span aria-hidden="true">·</span>
                <span className="active-effect-perf">
                  <Activity size={13} aria-hidden="true" />
                  {currentOption.performanceNote}
                </span>
                <span aria-hidden="true">·</span>
                <span>{currentOption.description}</span>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Espacio Reservado para el Futuro Mockup del iPhone */}
          <div className="lab-preview-column" aria-hidden="true">
            <div className="mockup-reserved-placeholder">
              <div className="mockup-reserved-icon">
                <Smartphone size={24} />
              </div>
              <h2 className="mockup-reserved-title">
                Espacio reservado para Mockup 3D
              </h2>
              <p className="mockup-reserved-note">
                Aquí se integrará el dispositivo móvil en las fases posteriores.
                Evalúa cómo el fondo ({currentOption.name}) fluye y enmarca esta
                zona.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
