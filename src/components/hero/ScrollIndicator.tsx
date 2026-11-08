import { ArrowDown } from 'lucide-react'

interface ScrollIndicatorProps {
  targetId?: string
  onScrollToTarget?: (targetId: string) => void
}

export function ScrollIndicator({
  targetId = 'funcionalidades',
  onScrollToTarget,
}: ScrollIndicatorProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onScrollToTarget) {
      e.preventDefault()
      onScrollToTarget(targetId)
    }
  }

  return (
    <div className="hero-scroll-indicator-wrap" data-gsap="scroll-indicator">
      <a
        href={`#${targetId}`}
        className="hero-scroll-indicator"
        aria-label="Desliza para descubrir la siguiente sección"
        onClick={handleClick}
      >
        <span className="hero-scroll-text">Desliza para descubrir</span>
        <span className="hero-scroll-arrow-box" aria-hidden="true">
          <ArrowDown size={15} className="hero-scroll-arrow-icon" />
        </span>
      </a>
    </div>
  )
}

