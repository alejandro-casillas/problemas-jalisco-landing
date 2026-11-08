interface StaticGradientBackgroundProps {
  className?: string
}

export function StaticGradientBackground({
  className = '',
}: StaticGradientBackgroundProps) {
  return (
    <div
      className={`static-gradient-bg ${className}`}
      aria-hidden="true"
    >
      {/* Resplandor ambiental superior */}
      <div className="gradient-orb orb-primary-top" />
      {/* Foco de iluminación lateral derecho (mockup preview) */}
      <div className="gradient-orb orb-primary-right" />
      {/* Viñeteado perimetral cinematográfico */}
      <div className="gradient-vignette" />
    </div>
  )
}

