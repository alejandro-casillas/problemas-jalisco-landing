import { ArrowRight, Layers, Palette, Sparkles } from 'lucide-react'

function App() {
  return (
    <main className="validation-lab">
      {/* Encabezado y Contexto */}
      <header className="lab-header">
        <div className="badge">
          <span className="badge-dot" aria-hidden="true"></span>
          <span>Problemas Jalisco · Showcase v2.0</span>
        </div>
        <h1 className="lab-title">Identidad visual & sistema de diseño</h1>
        <p className="lab-description">
          Laboratorio visual de validación para la Fase 1.2. Define la atmósfera
          cinematográfica del showroom con fondos profundos, iluminación
          ambiental rosa y jerarquía tipográfica editorial antes de construir
          las secciones del producto.
        </p>
      </header>

      {/* 1. Muestra de Paleta Cromática */}
      <section className="lab-section" aria-labelledby="palette-heading">
        <div className="lab-section-header">
          <h2 id="palette-heading" className="lab-section-title">
            Paleta cromática institucional
          </h2>
          <p className="lab-section-subtitle">
            Proporción de acento: 90% Rosa institucional, 5% Azul informativo, 5%
            Naranja de énfasis
          </p>
        </div>

        <div className="palette-grid">
          {/* Color Primario */}
          <article className="palette-card palette-card--primary">
            <div className="color-swatch-box swatch-primary">
              <span>#E00B50</span>
              <span className="palette-percentage">90%</span>
            </div>
            <div className="palette-info">
              <div className="palette-role">
                <span className="palette-role-name">Rosa Institucional</span>
                <span className="palette-percentage">Principal</span>
              </div>
              <p className="palette-usage">
                Protagonista indiscutible. Domina botones de acción, estados
                activos, iluminación ambiental y acentos clave.
              </p>
            </div>
          </article>

          {/* Color Secundario */}
          <article className="palette-card">
            <div className="color-swatch-box swatch-secondary">
              <span>#58C3E3</span>
              <span className="palette-percentage">5%</span>
            </div>
            <div className="palette-info">
              <div className="palette-role">
                <span className="palette-role-name">Azul Informativo</span>
                <span className="palette-percentage">Secundario</span>
              </div>
              <p className="palette-usage">
                Detalles puntuales, indicadores de estado informativo y datos
                técnicos específicos.
              </p>
            </div>
          </article>

          {/* Color Terciario */}
          <article className="palette-card">
            <div className="color-swatch-box swatch-tertiary">
              <span>#FE8B01</span>
              <span className="palette-percentage">5%</span>
            </div>
            <div className="palette-info">
              <div className="palette-role">
                <span className="palette-role-name">Naranja Énfasis</span>
                <span className="palette-percentage">Terciario</span>
              </div>
              <p className="palette-usage">
                Uso excepcional para alertas comunitarias, estados críticos o
                etiquetas de alta relevancia.
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* 2. Muestra de Superficies y Jerarquía Tipográfica */}
      <section className="lab-section" aria-labelledby="surfaces-heading">
        <div className="lab-section-header">
          <h2 id="surfaces-heading" className="lab-section-title">
            Superficies y jerarquía visual
          </h2>
          <p className="lab-section-subtitle">
            Fondos oscuros profundos con transiciones suaves y contraste
            adecuado
          </p>
        </div>

        <div className="surfaces-grid">
          {/* Fondo Principal */}
          <div className="surface-demo-box surface-demo-base">
            <span className="surface-label">Fondo Base · #0D0E10</span>
            <h3 className="surface-heading">Atmósfera Cinematográfica</h3>
            <p className="surface-text">
              Fondo profundo con gradientes radiales sutiles que generan
              iluminación ambiental sin saturación visual.
            </p>
          </div>

          {/* Superficie Estándar */}
          <div className="surface-demo-box surface-demo-standard">
            <span className="surface-label">Superficie · #1A1B1F</span>
            <h3 className="surface-heading">Contenedores y Tarjetas</h3>
            <p className="surface-text">
              Superficie principal para módulos de contenido, tarjetas de
              funcionalidades y paneles de información.
            </p>
          </div>

          {/* Superficie Elevada */}
          <div className="surface-demo-box surface-demo-elevated">
            <span className="surface-label">Elevada · #292A2E</span>
            <h3 className="surface-heading">Elementos Interactivos</h3>
            <p className="surface-text">
              Nivel superior con bordes translúcidos y sombras suaves para
              menús, modales y botones secundarios.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Muestra de Botones y Componentes Base */}
      <section className="lab-section" aria-labelledby="components-heading">
        <div className="lab-section-header">
          <h2 id="components-heading" className="lab-section-title">
            Componentes interactivos de muestra
          </h2>
          <p className="lab-section-subtitle">
            Comportamiento de botones con estados hover y resplandores
            controlados
          </p>
        </div>

        <div className="card">
          <div className="actions-row">
            <button type="button" className="btn-primary">
              <Sparkles size={16} aria-hidden="true" />
              <span>Botón Principal (Rosa Institucional)</span>
              <ArrowRight size={16} aria-hidden="true" />
            </button>

            <button type="button" className="btn-secondary">
              <Layers size={16} aria-hidden="true" />
              <span>Botón Secundario (Superficie Elevada)</span>
            </button>

            <span className="badge">
              <Palette size={14} aria-hidden="true" />
              <span>Modo Oscuro Cinematográfico Activo</span>
            </span>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
