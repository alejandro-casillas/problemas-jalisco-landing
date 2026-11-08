import { Check, Grid, Sparkles, Waves } from 'lucide-react'
import { BACKGROUND_OPTIONS, type BackgroundType } from './types'

interface BackgroundSwitcherProps {
  current: BackgroundType
  onChange: (id: BackgroundType) => void
  className?: string
}

export function BackgroundSwitcher({
  current,
  onChange,
  className = '',
}: BackgroundSwitcherProps) {
  const getIcon = (id: BackgroundType) => {
    switch (id) {
      case 'dot-grid':
        return <Grid size={15} aria-hidden="true" />
      case 'threads':
        return <Waves size={15} aria-hidden="true" />
      case 'static-gradient':
        return <Sparkles size={15} aria-hidden="true" />
    }
  }

  return (
    <div className={`background-switcher-container ${className}`} role="toolbar" aria-label="Selector de fondos del laboratorio">
      <div className="switcher-tabs" role="tablist">
        {BACKGROUND_OPTIONS.map((opt) => {
          const isSelected = current === opt.id
          return (
            <button
              key={opt.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              className={`switcher-tab ${isSelected ? 'switcher-tab--active' : ''}`}
              onClick={() => onChange(opt.id)}
            >
              <span className="switcher-tab-icon">{getIcon(opt.id)}</span>
              <span className="switcher-tab-label">{opt.shortLabel}</span>
              {isSelected && <Check size={14} className="switcher-tab-check" aria-hidden="true" />}
            </button>
          )
        })}
      </div>
    </div>
  )
}

