import type { MouseEvent } from 'react'
import { type SectionId } from '../../data/sectionsConfig'
import logoWebpUrl from '../../assets/problemas-jalisco-letras-webp.webp'
import logoPngUrl from '../../assets/problemas-jalisco-letras-png.png'

interface SiteHeaderProps {
  onNavigate?: (sectionId: SectionId) => void
}

export function SiteHeader({ onNavigate }: SiteHeaderProps) {
  const handleAnchorClick = (
    event: MouseEvent<HTMLAnchorElement>,
    sectionId: SectionId,
  ) => {
    event.preventDefault()

    const target = document.getElementById(sectionId)
    if (target) {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
      target.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      })
    }

    onNavigate?.(sectionId)
  }

  return (
    <header className="site-header" data-gsap="header">
      <div className="site-header-inner">
        <a
          href="#inicio"
          className="site-brand-link"
          aria-label="Problemas Jalisco — Ir al inicio"
          onClick={(e) => handleAnchorClick(e, 'inicio')}
        >
          <span className="site-brand-logo-frame">
            <picture className="site-brand-picture">
              <source srcSet={logoWebpUrl} type="image/webp" />
              <img
                src={logoPngUrl}
                alt="Problemas Jalisco"
                className="site-brand-logo"
                width={158}
                height={80}
                decoding="async"
              />
            </picture>
          </span>
        </a>

        <nav className="site-nav" aria-label="Navegación principal">
          <ul className="site-nav-list">
            <li className="site-nav-item">
              <a
                href="#inicio"
                className="site-nav-link"
                onClick={(e) => handleAnchorClick(e, 'inicio')}
              >
                Inicio
              </a>
            </li>
            <li className="site-nav-item">
              <a
                href="#probar"
                className="site-nav-cta-probar"
                onClick={(e) => handleAnchorClick(e, 'probar')}
              >
                Probar
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
