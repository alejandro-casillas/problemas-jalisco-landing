import { Moon, Sun } from 'lucide-react'
import type { ScreenshotTheme } from '../../data/featuresShowcaseData'

interface ScreenshotThemeToggleProps {
  theme: ScreenshotTheme
  onChange: (theme: ScreenshotTheme) => void
  className?: string
}

/**
 * Selector compacto Light/Dark exclusivo para alternar la variante de las capturas
 * dentro del teléfono sin alterar la estética oscura permanente del showroom.
 */
export function ScreenshotThemeToggle({
  theme,
  onChange,
  className = '',
}: ScreenshotThemeToggleProps) {
  return (
    <div
      className={`screenshot-theme-toggle-wrap ${className}`}
      role="group"
      aria-label="Apariencia de las capturas del teléfono"
    >
      <div
        className={`screenshot-theme-toggle screenshot-theme-toggle--${theme}`}
      >
        {/* Indicador deslizante en forma de píldora */}
        <span className="screenshot-theme-thumb" aria-hidden="true" />

        <button
          type="button"
          className={`screenshot-theme-option ${
            theme === 'light' ? 'screenshot-theme-option--active' : ''
          }`}
          aria-pressed={theme === 'light'}
          aria-label="Ver capturas en modo claro (Light)"
          onClick={() => onChange('light')}
        >
          <Sun size={13} className="screenshot-theme-icon" aria-hidden="true" />
          <span>Light</span>
        </button>

        <button
          type="button"
          className={`screenshot-theme-option ${
            theme === 'dark' ? 'screenshot-theme-option--active' : ''
          }`}
          aria-pressed={theme === 'dark'}
          aria-label="Ver capturas en modo oscuro (Dark)"
          onClick={() => onChange('dark')}
        >
          <Moon size={13} className="screenshot-theme-icon" aria-hidden="true" />
          <span>Dark</span>
        </button>
      </div>
    </div>
  )
}

