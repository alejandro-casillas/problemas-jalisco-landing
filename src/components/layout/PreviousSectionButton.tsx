import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import {
  getPreviousSectionId,
  IMPLEMENTED_SECTION_IDS,
  type SectionId,
} from '../../data/sectionsConfig'

interface PreviousSectionButtonProps {
  onNavigateToSection: (targetId: string) => void
}

/**
 * Control flotante discreto ubicado cerca del borde derecho para regresar
 * a la sección inmediatamente anterior según el orden real del documento.
 * Permanece oculto mientras el usuario se encuentra en el Hero.
 */
export function PreviousSectionButton({
  onNavigateToSection,
}: PreviousSectionButtonProps) {
  const [activeSectionId, setActiveSectionId] = useState<SectionId>('inicio')

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const ratios = new Map<SectionId, number>()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id as SectionId
          ratios.set(id, entry.isIntersecting ? entry.intersectionRatio : 0)
        })

        let bestId: SectionId | null = null
        let bestRatio = 0

        for (const id of IMPLEMENTED_SECTION_IDS) {
          const ratio = ratios.get(id) ?? 0
          if (ratio > bestRatio) {
            bestRatio = ratio
            bestId = id
          }
        }

        if (bestId && bestRatio >= 0.25) {
          setActiveSectionId(bestId)
        }
      },
      {
        threshold: [0, 0.25, 0.5, 0.75],
      },
    )

    IMPLEMENTED_SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const previousSectionId = getPreviousSectionId(activeSectionId)
  const isVisible = previousSectionId !== null

  return (
    <button
      type="button"
      className={`previous-section-btn ${
        isVisible ? 'previous-section-btn--visible' : ''
      }`}
      aria-label="Volver a la sección anterior"
      title="Volver a la sección anterior"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      onClick={() => {
        if (previousSectionId) {
          onNavigateToSection(previousSectionId)
        }
      }}
    >
      <ArrowUp size={18} aria-hidden="true" />
    </button>
  )
}

