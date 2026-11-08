import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import logoWebp from '../../assets/problemas-jalisco-letras-webp.webp'
import logoPng from '../../assets/problemas-jalisco-letras-png.png'

interface NavItem {
  id: string
  label: string
  href?: string
  isUpcoming?: boolean
}

const NAV_ITEMS: NavItem[] = [
  { id: 'inicio', label: 'Inicio', href: '#inicio' },
  { id: 'funcionalidades', label: 'Funcionalidades', href: '#funcionalidades' },
  { id: 'tecnologias', label: 'Tecnologías', isUpcoming: true },
  { id: 'descargar', label: 'Descargar', isUpcoming: true },
]

interface SiteHeaderProps {
  onNavigate?: (targetId: string) => void
}

export function SiteHeader({ onNavigate }: SiteHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    setMobileMenuOpen(false)
    if (onNavigate && href.startsWith('#')) {
      e.preventDefault()
      onNavigate(href.slice(1))
    }
  }

  return (
    <header className="site-header" data-gsap="site-header">
      <div className="site-header-inner">
        <a
          href="#inicio"
          className="site-brand-link"
          aria-label="Problemas Jalisco — Ir al inicio"
          onClick={(e) => handleLinkClick(e, '#inicio')}
        >
          <span className="site-brand-logo-frame">
            <picture className="site-brand-picture">
              <source srcSet={logoWebp} type="image/webp" />
              <img
                src={logoPng}
                alt="Problemas Jalisco"
                className="site-brand-logo"
                width={500}
                height={300}
                decoding="async"
              />
            </picture>
          </span>
        </a>

        {/* Navegación de escritorio */}
        <nav className="site-nav-desktop" aria-label="Navegación principal">
          <ul className="site-nav-list">
            {NAV_ITEMS.map((item) => (
              <li key={item.id} className="site-nav-item">
                {item.href && !item.isUpcoming ? (
                  <a
                    href={item.href}
                    className="site-nav-link"
                    onClick={(e) => handleLinkClick(e, item.href!)}
                  >
                    {item.label}
                  </a>
                ) : (
                  <button
                    type="button"
                    className={`site-nav-link site-nav-link--disabled ${
                      item.id === 'descargar' ? 'site-nav-link--cta-disabled' : ''
                    }`}
                    disabled
                    aria-disabled="true"
                    title="Sección disponible en próximas fases del showcase"
                  >
                    <span>{item.label}</span>
                    <span className="site-nav-soon-tag">Pronto</span>
                  </button>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Botón de menú móvil */}
        <button
          type="button"
          className="site-mobile-toggle"
          aria-expanded={mobileMenuOpen}
          aria-controls="site-mobile-drawer"
          aria-label={mobileMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          {mobileMenuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>

      {/* Menú desplegable adaptable a móvil */}
      {mobileMenuOpen && (
        <nav
          id="site-mobile-drawer"
          className="site-nav-mobile"
          aria-label="Navegación móvil"
        >
          <ul className="site-nav-mobile-list">
            {NAV_ITEMS.map((item) => (
              <li key={item.id} className="site-nav-mobile-item">
                {item.href && !item.isUpcoming ? (
                  <a
                    href={item.href}
                    className="site-nav-mobile-link"
                    onClick={(e) => handleLinkClick(e, item.href!)}
                  >
                    <span>{item.label}</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    className="site-nav-mobile-link site-nav-mobile-link--disabled"
                    disabled
                    aria-disabled="true"
                  >
                    <span>{item.label}</span>
                    <span className="site-nav-soon-tag">Próxima fase</span>
                  </button>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}

