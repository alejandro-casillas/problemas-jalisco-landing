import { MapPin, Megaphone, Users } from 'lucide-react'

interface HeroMascotPlaceholderProps {
  className?: string
}

/**
 * Componente temporal encapsulado para el símbolo / mascota protagonista del Hero.
 * Diseñado como medallón tridimensional translúcido con iluminación rosa ambiental
 * para conservar el peso visual de composición de producto hasta integrar el arte definitivo.
 */
export function HeroMascotPlaceholder({
  className = '',
}: HeroMascotPlaceholderProps) {
  return (
    <div
      className={`hero-mascot-placeholder ${className}`}
      data-gsap="hero-mascot"
      aria-label="Símbolo provisional de participación ciudadana"
    >
      {/* Halo de iluminación rosa ambiental */}
      <div className="mascot-ambient-halo" aria-hidden="true" />

      {/* Anillo orbital exterior sutil */}
      <div className="mascot-orbit-ring" aria-hidden="true">
        <span className="mascot-satellite mascot-satellite--top" title="Geolocalización comunitaria">
          <MapPin size={14} strokeWidth={2.2} />
        </span>
        <span className="mascot-satellite mascot-satellite--bottom" title="Participación vecinal">
          <Users size={14} strokeWidth={2.2} />
        </span>
      </div>

      {/* Núcleo circular translúcido protagonista */}
      <div className="mascot-emblem-core">
        <div className="mascot-emblem-inner-glow" aria-hidden="true" />
        <Megaphone
          size={44}
          strokeWidth={1.75}
          className="mascot-emblem-icon"
          aria-hidden="true"
        />
        <span className="mascot-emblem-tag">Voz Ciudadana</span>
      </div>
    </div>
  )
}

