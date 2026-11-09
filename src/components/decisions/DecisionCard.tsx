import type { KeyboardEvent } from 'react'
import {
  ArrowRight,
  Database,
  Blocks,
  Bot,
  PanelsTopLeft,
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
      return <Database size={18} aria-hidden="true" />
    case 'Blocks':
      return <Blocks size={18} aria-hidden="true" />
    case 'Bot':
      return <Bot size={18} aria-hidden="true" />
    case 'PanelsTopLeft':
      return <PanelsTopLeft size={18} aria-hidden="true" />
    default:
      return <Sparkles size={18} aria-hidden="true" />
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
      {/* Contenido principal: Icono temático + Título a la derecha */}
      <div className="decision-card-body">
        <div className="decision-card-title-row">
          <span className="decision-card-icon" aria-hidden="true">
            {renderDecisionIcon(decision.iconName)}
          </span>
          <h3 className="decision-card-title">{decision.title}</h3>
        </div>
      </div>

      {/* Pie de tarjeta con llamada a la acción */}
      <div className="decision-card-footer">
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

