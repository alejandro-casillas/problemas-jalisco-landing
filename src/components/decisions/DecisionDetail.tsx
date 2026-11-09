import { useEffect } from 'react'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import {
  DECISIONS_DATA,
  type DecisionItem,
  type VisualAlternative,
} from '../../data/decisionsData'

interface DecisionDetailProps {
  decision: DecisionItem
  onBack: () => void
  onSelectDecision: (id: DecisionItem['id']) => void
}

/**
 * Blueprint / Wireframe visual para la comparativa de la Decisión 04.
 * Ilustra la diferencia estructural real sin usar capturas ficticias de terceros.
 */
function VisualComparisonCard({
  alternative,
  isContinuous,
}: {
  alternative: VisualAlternative
  isContinuous: boolean
}) {
  const isSelected = Boolean(alternative.isSelected)

  return (
    <div
      className={`decision-comparison-box ${
        isSelected ? 'decision-comparison-box--selected' : ''
      }`}
    >
      <div className="decision-comparison-header">
        <div className="decision-comparison-title-wrap">
          <span className="decision-comparison-tag">{alternative.label}</span>
          <h4 className="decision-comparison-name">{alternative.name}</h4>
        </div>
        <span
          className={`decision-comparison-badge ${
            isSelected ? 'decision-comparison-badge--selected' : ''
          }`}
        >
          {isSelected ? (
            <>
              <CheckCircle2 size={13} aria-hidden="true" />
              <span>{alternative.badgeText}</span>
            </>
          ) : (
            <span>{alternative.badgeText}</span>
          )}
        </span>
      </div>

      <p className="decision-comparison-desc">{alternative.description}</p>

      {/* Espacio preparado para captura real o renderizado de wireframe conceptual */}
      <div className="decision-comparison-preview">
        {alternative.screenshotSrc ? (
          <img
            src={alternative.screenshotSrc}
            alt={`Captura real de la alternativa: ${alternative.name}`}
            className="decision-comparison-image"
          />
        ) : (
          <div
            className={`decision-wireframe ${
              isContinuous
                ? 'decision-wireframe--continuous'
                : 'decision-wireframe--containers'
            }`}
            aria-label={alternative.placeholderLabel}
          >
            {isContinuous ? (
              /* Wireframe estilizado de diseño continuo: lista fluida con separadores */
              <div className="wireframe-feed">
                <div className="wireframe-feed-item">
                  <div className="wireframe-avatar" />
                  <div className="wireframe-lines">
                    <div className="wireframe-line wireframe-line--title" />
                    <div className="wireframe-line wireframe-line--body" />
                  </div>
                </div>
                <div className="wireframe-divider" />
                <div className="wireframe-feed-item">
                  <div className="wireframe-avatar" />
                  <div className="wireframe-lines">
                    <div className="wireframe-line wireframe-line--title" />
                    <div className="wireframe-line wireframe-line--body" />
                  </div>
                </div>
                <div className="wireframe-divider" />
                <div className="wireframe-feed-item">
                  <div className="wireframe-avatar" />
                  <div className="wireframe-lines">
                    <div className="wireframe-line wireframe-line--title" />
                  </div>
                </div>
              </div>
            ) : (
              /* Wireframe estilizado de diseño con contenedores: bloques modulares delimitados */
              <div className="wireframe-containers">
                <div className="wireframe-card">
                  <div className="wireframe-card-header">
                    <div className="wireframe-card-pill" />
                    <div className="wireframe-card-badge" />
                  </div>
                  <div className="wireframe-card-body">
                    <div className="wireframe-line wireframe-line--title" />
                    <div className="wireframe-line wireframe-line--body" />
                  </div>
                </div>
                <div className="wireframe-card">
                  <div className="wireframe-card-header">
                    <div className="wireframe-card-pill" />
                  </div>
                  <div className="wireframe-card-body">
                    <div className="wireframe-line wireframe-line--body" />
                  </div>
                </div>
              </div>
            )}
            <span className="decision-wireframe-label">
              {alternative.placeholderLabel}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export function DecisionDetail({
  decision,
  onBack,
  onSelectDecision,
}: DecisionDetailProps) {
  // Manejo de tecla Escape para volver rápidamente a la cuadrícula general
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onBack()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onBack])

  const accentClass = `decision-detail--accent-${decision.accentColor}`

  return (
    <article
      className={`decision-detail ${accentClass}`}
      data-decisions-gsap="detail-view"
      aria-labelledby="decision-detail-title"
    >
      {/* 1. Barra superior: Botón de regreso y selector en pestañas tipográficas */}
      <div className="decision-detail-topbar">
        <button
          type="button"
          className="decision-detail-back-btn"
          onClick={onBack}
          aria-label="Volver a la vista general de las cuatro decisiones"
        >
          <ArrowLeft size={15} aria-hidden="true" />
          <span>Volver a decisiones</span>
        </button>

        {/* Pestañas tipográficas para navegar directamente entre decisiones */}
        <div
          className="decision-detail-quicknav"
          role="tablist"
          aria-label="Cambiar de decisión"
        >
          {DECISIONS_DATA.map((item) => {
            const isCurrent = item.id === decision.id
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isCurrent}
                aria-label={`Ver decisión ${item.number}: ${item.title}`}
                className={`decision-quicknav-btn ${
                  isCurrent ? 'decision-quicknav-btn--active' : ''
                }`}
                onClick={() => onSelectDecision(item.id)}
              >
                <span className="decision-quicknav-num">{item.number}</span>
                <span className="decision-quicknav-name">{item.title}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* 2. Encabezado editorial de la decisión */}
      <header className="decision-detail-header">
        <span className="decision-detail-eyebrow">
          DECISIÓN {decision.number} / {decision.title.toUpperCase()}
        </span>
        <h3 id="decision-detail-title" className="decision-detail-title">
          {decision.title}
        </h3>
        <p className="decision-detail-lead">{decision.summary}</p>
      </header>

      {/* 3. Cuatro columnas editoriales abiertas: Situación, Alternativas, Decisión y Resultado */}
      <div className="decision-detail-pillars-grid">
        {/* Columna 1: Situación */}
        <div className="decision-pillar-col decision-pillar-col--situation">
          <h4 className="decision-pillar-title">Situación</h4>
          <p className="decision-pillar-text">{decision.situation}</p>
        </div>

        {/* Columna 2: Alternativas */}
        <div className="decision-pillar-col decision-pillar-col--alternatives">
          <h4 className="decision-pillar-title">Alternativas</h4>
          <p className="decision-pillar-text">{decision.alternativesSummary}</p>
        </div>

        {/* Columna 3: Decisión (destacada sobria) */}
        <div className="decision-pillar-col decision-pillar-col--decision">
          <h4 className="decision-pillar-title">Decisión</h4>
          <p className="decision-pillar-text">{decision.decision}</p>
        </div>

        {/* Columna 4: Resultado */}
        <div className="decision-pillar-col decision-pillar-col--result">
          <h4 className="decision-pillar-title">Resultado</h4>
          <p className="decision-pillar-text">{decision.result}</p>
        </div>
      </div>

      {/* 4. Bloques editoriales complementarios según la decisión */}

      {/* Decisión 04: Comparativa visual entre Diseño continuo y Diseño con contenedores */}
      {decision.visualComparison && (
        <section
          className="decision-detail-special-section"
          aria-labelledby="comparison-section-heading"
        >
          <div className="decision-special-header">
            <span className="decision-special-label">EVALUACIÓN VISUAL</span>
            <h4
              id="comparison-section-heading"
              className="decision-special-title"
            >
              Comparativa de enfoque de interfaz
            </h4>
          </div>

          <div className="decision-comparison-grid">
            <VisualComparisonCard
              alternative={decision.visualComparison.alternativeA}
              isContinuous={true}
            />
            <VisualComparisonCard
              alternative={decision.visualComparison.alternativeB}
              isContinuous={false}
            />
          </div>
        </section>
      )}

      {/* Decisión 02: Evidencias de modularización y componentes propios */}
      {decision.extractedComponents && (
        <div className="decision-detail-editorial-block">
          <span className="decision-editorial-label">
            Componentes extraídos durante la modularización:
          </span>
          <div className="decision-editorial-inline">
            {decision.extractedComponents.map((comp, idx) => (
              <span key={comp} className="decision-editorial-item">
                {idx > 0 && <span className="decision-editorial-sep">·</span>}
                <code>{comp}</code>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Decisión 03: Nota sobre asistencia supervisada de IA */}
      {decision.supervisionNote && (
        <div className="decision-detail-supervision-note">
          <span className="decision-supervision-label">SUPERVISIÓN TÉCNICA</span>
          <p className="decision-supervision-text">{decision.supervisionNote}</p>
        </div>
      )}

      {/* Decisión 01: Ecosistema técnico y datos */}
      {decision.id === 'arquitectura-datos' && (
        <div className="decision-detail-editorial-block">
          <span className="decision-editorial-label">
            Ecosistema de datos y servicios:
          </span>
          <div className="decision-editorial-inline">
            <span className="decision-editorial-item">ASP.NET Core (.NET 8)</span>
            <span className="decision-editorial-sep">·</span>
            <span className="decision-editorial-item">C# API REST</span>
            <span className="decision-editorial-sep">·</span>
            <span className="decision-editorial-item">PostgreSQL</span>
            <span className="decision-editorial-sep">·</span>
            <span className="decision-editorial-item">Esquemas aislados</span>
          </div>
        </div>
      )}
    </article>
  )
}

