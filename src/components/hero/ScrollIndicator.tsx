import { ArrowDown } from 'lucide-react'

interface ScrollIndicatorProps {
  targetId?: string
  label?: string
  ariaLabel?: string
  dataGsap?: string
  className?: string
  onScrollToTarget?: (targetId: string) => void
}

export function ScrollIndicator({
  targetId = 'funcionalidades',
  label = 'Desliza para descubrir',
  ariaLabel,
  dataGsap = 'scroll-indicator',
  className = '',
  onScrollToTarget,
}: ScrollIndicatorProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onScrollToTarget) {
      e.preventDefault()
      onScrollToTarget(targetId)
      return
    }
    const targetEl = document.getElementById(targetId)
    if (!targetEl) return

    e.preventDefault()
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    targetEl.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  return (
    <div
      className={`hero-scroll-indicator-wrap ${className}`}
      data-gsap={dataGsap}
    >
      <a
        href={`#${targetId}`}
        className="hero-scroll-indicator"
        aria-label={ariaLabel ?? `${label} — Ir a la siguiente sección`}
        onClick={handleClick}
      >
        <span className="hero-scroll-text">{label}</span>
        <span className="hero-scroll-arrow-box" aria-hidden="true">
          <ArrowDown size={15} className="hero-scroll-arrow-icon" />
        </span>
      </a>
    </div>
  )
}

