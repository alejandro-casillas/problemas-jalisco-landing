import { UserRound } from 'lucide-react'
import type { TeamMember } from '../../data/testingTransitionData'

interface TeamMemberCardProps {
  member: TeamMember
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  const accentClass = `team-member-card--accent-${member.accent}`

  return (
    <div
      className={`team-member-card ${accentClass}`}
      data-transition-gsap="team-member"
    >
      {/* Contenedor circular de fotografía o avatar provisional */}
      <div className="team-member-avatar-frame">
        {member.photoSrc ? (
          <img
            src={member.photoSrc}
            alt={`Fotografía de ${member.name}`}
            className="team-member-photo"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div
            className="team-member-avatar-placeholder"
            aria-label={`Avatar provisional de ${member.name}`}
          >
            <span className="team-member-initials">{member.initials}</span>
            <UserRound
              size={18}
              className="team-member-icon-provisional"
              aria-hidden="true"
            />
          </div>
        )}
        {/* Anillo de acento luminoso fino */}
        <span className="team-member-ring" aria-hidden="true" />
      </div>

      {/* Información del integrante: Nombre completo y rol */}
      <div className="team-member-info">
        <h4 className="team-member-name">{member.name}</h4>
        <span className="team-member-role">{member.role}</span>
      </div>
    </div>
  )
}

