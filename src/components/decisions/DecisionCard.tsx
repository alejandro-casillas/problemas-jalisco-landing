import type { KeyboardEvent } from 'react'
import {
  Database,
  Blocks,
  Bot,
  PanelsTopLeft,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import type { DecisionItem } from '../../data/decisionsData'

interface DecisionCardProps {
  decision: DecisionItem
  isSelected: boolean
  onSelect: (id: DecisionItem['id']) => void
  index: number
}

function renderDecisionIcon(iconName: DecisionItem['iconName']) {
  switch (iconName) {
    case 'Database':
      return <Database size={22} aria-hidden="true" />
    case 'Blocks':
      return <Blocks size={22} aria-hidden="true" />
    case 'Bot':
      return <Bot size={22} aria-hidden="true" />
    case 'PanelsTopLeft':
      return <PanelsTopLeft size={22} aria-hidden="true" />
    default:
      return <Sparkles size={22} aria-hidden="true" />
  }
}

export function DecisionCard({
  decision,
  isSelected,
  onSelect,
  index,
}: DecisionCardProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onSelect(decision.id)
    }
  }

  const accentClass = `decision-card--accent-${decision.accentColor}`

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Decisión ${decision.number}: ${decision.title}. Haz clic para explorar detalles.`}
      className={`decision-card ${accentClass} ${isSelected ? 'decision-card--selected' : ''}`}
      onClick={() => onSelect(decision.id)}
      onKeyDown={handleKeyDown}
      data-decisions-gsap="card"
      data-index={index}
    >
      {/* Resplandor focal sutil al hover */}
      <div className="decision-card-ambient-glow" aria-hidden="true" />

      {/* Cabecera de la tarjeta: Número e Icono temático */}
      <div className="decision-card-header">
        <div className="decision-card-icon-frame" aria-hidden="true">
          {renderDecisionIcon(decision.iconName)}
        </div>
        <span className="decision-card-number">{decision.number}</span>
      </div>

      {/* Contenido principal: Título y resumen conciso de dos líneas */}
      <div className="decision-card-body">
        <h3 className="decision-card-title">{decision.title}</h3>
        <p className="decision-card-summary">{decision.summary}</p>
      </div>

      {/* Pie de tarjeta con pista interactiva discreta */}
      <div className="decision-card-footer">
        <div className="decision-card-tags">
          {decision.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="decision-card-tag-pill">
              {tag}
            </span>
          ))}
        </div>

        <div className="decision-card-action">
          <span className="decision-card-action-text">Explorar decisión</span>
          <span className="decision-card-action-arrow" aria-hidden="true">
            <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </div>
  )
}

