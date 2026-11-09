import { useEffect } from 'react'
import {
  ArrowLeft,
  Database,
  Blocks,
  Bot,
  PanelsTopLeft,
  CheckCircle2,
  GitFork,
  HelpCircle,
  TrendingUp,
  Sparkles,
  Layers,
  Component,
  Cpu,
  LayoutGrid,
} from 'lucide-react'
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

function renderDecisionIcon(iconName: DecisionItem['iconName']) {
  switch (iconName) {
    case 'Database':
      return <Database size={24} aria-hidden="true" />
    case 'Blocks':
      return <Blocks size={24} aria-hidden="true" />
    case 'Bot':
      return <Bot size={24} aria-hidden="true" />
    case 'PanelsTopLeft':
      return <PanelsTopLeft size={24} aria-hidden="true" />
    default:
      return <Sparkles size={24} aria-hidden="true" />
  }
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
          <span className="decision-comparison-pill">{alternative.label}</span>
          <h4 className="decision-comparison-name">{alternative.name}</h4>
        </div>
        <span
          className={`decision-comparison-badge ${
            isSelected ? 'decision-comparison-badge--selected' : ''
          }`}
        >
          {isSelected ? (
            <>
              <CheckCircle2 size={12} aria-hidden="true" />
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
      {/* 1. Barra superior: Botón de regreso y selector rápido 01-04 */}
      <div className="decision-detail-topbar">
        <button
          type="button"
          className="decision-detail-back-btn"
          onClick={onBack}
          aria-label="Volver a la vista general de las cuatro decisiones"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          <span>Volver a decisiones</span>
        </button>

        {/* Selector interactivo rápido entre decisiones para presentaciones */}
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

      {/* 2. Encabezado principal de la decisión */}
      <header className="decision-detail-header">
        <div className="decision-detail-title-group">
          <div className="decision-detail-icon-frame" aria-hidden="true">
            {renderDecisionIcon(decision.iconName)}
          </div>
          <div>
            <div className="decision-detail-meta-pill">
              <span>DECISIÓN {decision.number}</span>
              <span className="decision-detail-dot" aria-hidden="true" />
              <span>{decision.tags[0]}</span>
            </div>
            <h3 id="decision-detail-title" className="decision-detail-title">
              {decision.title}
            </h3>
          </div>
        </div>

        <p className="decision-detail-lead">{decision.summary}</p>
      </header>

      {/* 3. Cuadrícula de 4 pilares: Situación, Alternativas, Decisión y Resultado */}
      <div className="decision-detail-pillars-grid">
        {/* Pilar 1: Situación */}
        <div className="decision-pillar-card decision-pillar-card--situation">
          <div className="decision-pillar-header">
            <span className="decision-pillar-icon" aria-hidden="true">
              <HelpCircle size={17} />
            </span>
            <h4 className="decision-pillar-title">Situación</h4>
          </div>
          <p className="decision-pillar-text">{decision.situation}</p>
        </div>

        {/* Pilar 2: Alternativas */}
        <div className="decision-pillar-card decision-pillar-card--alternatives">
          <div className="decision-pillar-header">
            <span className="decision-pillar-icon" aria-hidden="true">
              <GitFork size={17} />
            </span>
            <h4 className="decision-pillar-title">Alternativas</h4>
          </div>
          <p className="decision-pillar-text">{decision.alternativesSummary}</p>
        </div>

        {/* Pilar 3: Decisión */}
        <div className="decision-pillar-card decision-pillar-card--decision">
          <div className="decision-pillar-header">
            <span className="decision-pillar-icon" aria-hidden="true">
              <CheckCircle2 size={17} />
            </span>
            <h4 className="decision-pillar-title">Decisión</h4>
          </div>
          <p className="decision-pillar-text">{decision.decision}</p>
        </div>

        {/* Pilar 4: Resultado */}
        <div className="decision-pillar-card decision-pillar-card--result">
          <div className="decision-pillar-header">
            <span className="decision-pillar-icon" aria-hidden="true">
              <TrendingUp size={17} />
            </span>
            <h4 className="decision-pillar-title">Resultado</h4>
          </div>
          <p className="decision-pillar-text">{decision.result}</p>
        </div>
      </div>

      {/* 4. Bloques especiales complementarios según la decisión */}

      {/* Decisión 04: Zona especial de comparación visual */}
      {decision.visualComparison && (
        <section
          className="decision-detail-special-section"
          aria-labelledby="comparison-section-heading"
        >
          <div className="decision-special-header">
            <div className="decision-special-badge">
              <LayoutGrid size={13} aria-hidden="true" />
              <span>EVALUACIÓN VISUAL</span>
            </div>
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
        <div className="decision-detail-chips-block">
          <span className="decision-chips-label">
            <Component size={14} aria-hidden="true" />
            <span>Componentes extraídos durante la modularización:</span>
          </span>
          <div className="decision-chips-list">
            {decision.extractedComponents.map((comp) => (
              <span key={comp} className="decision-chip-pill">
                <code>{comp}</code>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Decisión 03: Nota sobre asistencia supervisada de IA */}
      {decision.supervisionNote && (
        <div className="decision-detail-supervision-banner">
          <Cpu size={16} className="decision-supervision-icon" aria-hidden="true" />
          <p className="decision-supervision-text">{decision.supervisionNote}</p>
        </div>
      )}

      {/* Decisión 01: Insignia de arquitectura conectada */}
      {decision.id === 'arquitectura-datos' && (
        <div className="decision-detail-chips-block">
          <span className="decision-chips-label">
            <Layers size={14} aria-hidden="true" />
            <span>Ecosistema de datos y servicios:</span>
          </span>
          <div className="decision-chips-list">
            <span className="decision-chip-pill">ASP.NET Core (.NET 8)</span>
            <span className="decision-chip-pill">C# API REST</span>
            <span className="decision-chip-pill">PostgreSQL</span>
            <span className="decision-chip-pill">Esquemas aislados</span>
          </div>
        </div>
      )}
    </article>
  )
}

