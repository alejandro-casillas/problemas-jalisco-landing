import type { ReactNode } from 'react'
import { Image as ImageIcon, Layers } from 'lucide-react'
import logoWebp from '../../assets/problemas-jalisco-letras-webp.webp'
import logoPng from '../../assets/problemas-jalisco-letras-png.png'

export interface PhoneMockupProps {
  /** Ruta opcional de captura real de la aplicación Problemas Jalisco */
  screenshotSrc?: string
  /** Texto alternativo para la captura real */
  screenshotAlt?: string
  /** Contenido personalizado opcional dentro de la pantalla */
  children?: ReactNode
  /** Aplica la inclinación de perspectiva 3D del Hero */
  tilted?: boolean
  /** Clase CSS adicional para el contenedor externo */
  className?: string
}

/**
 * Componente reutilizable de dispositivo móvil construido en CSS.
 * Preparado para recibir capturas reales mediante `screenshotSrc` o `children`
 * sin modificar la estructura del Hero ni de futuras secciones.
 */
export function PhoneMockup({
  screenshotSrc,
  screenshotAlt = 'Captura de la aplicación Problemas Jalisco',
  children,
  tilted = true,
  className = '',
}: PhoneMockupProps) {
  return (
    <div
      className={`phone-mockup-perspective ${tilted ? 'phone-mockup-perspective--tilted' : ''} ${className}`}
      data-gsap="phone-entry"
    >
      <div className="phone-mockup-float-wrapper" data-gsap="phone-float">
        {/* Resplandor trasero del chasis */}
        <div className="phone-chassis-Backglow" aria-hidden="true" />

        {/* Marco físico del teléfono (CSS puro con profundidad 3D) */}
        <div className="phone-chassis">
          {/* Botones laterales físicos */}
          <span className="phone-side-btn phone-side-btn--silent" aria-hidden="true" />
          <span className="phone-side-btn phone-side-btn--vol-up" aria-hidden="true" />
          <span className="phone-side-btn phone-side-btn--vol-down" aria-hidden="true" />
          <span className="phone-side-btn phone-side-btn--power" aria-hidden="true" />

          {/* Bisel metálico interior */}
          <div className="phone-bezel">
            {/* Isla / cámara frontal superior */}
            <div className="phone-dynamic-island" aria-hidden="true">
              <span className="phone-speaker-slot" />
              <span className="phone-camera-lens" />
            </div>

            {/* Pantalla interna independiente con overflow: hidden */}
            <div className="phone-screen">
              {screenshotSrc ? (
                <img
                  src={screenshotSrc}
                  alt={screenshotAlt}
                  className="phone-screen-image"
                  loading="eager"
                  decoding="async"
                />
              ) : children ? (
                children
              ) : (
                /* Contenido provisional claramente identificable (sin interfaces ficticias) */
                <div className="phone-provisional-screen">
                  <div className="phone-provisional-top-glow" aria-hidden="true" />

                  <div className="phone-provisional-status">
                    <span className="phone-provisional-pill">
                      <Layers size={11} aria-hidden="true" />
                      <span>CONTENIDO PROVISIONAL</span>
                    </span>
                  </div>

                  <div className="phone-provisional-center">
                    <div className="phone-provisional-logo-box">
                      <picture>
                        <source srcSet={logoWebp} type="image/webp" />
                        <img
                          src={logoPng}
                          alt="Logotipo oficial de Problemas Jalisco"
                          className="phone-provisional-logo"
                          width={500}
                          height={300}
                        />
                      </picture>
                    </div>

                    <div className="phone-provisional-divider" aria-hidden="true" />

                    <div className="phone-provisional-notice">
                      <span className="phone-provisional-icon-badge" aria-hidden="true">
                        <ImageIcon size={16} />
                      </span>
                      <p className="phone-provisional-title">
                        Espacio preparado para captura real
                      </p>
                      <p className="phone-provisional-caption">
                        Marco 9:19.5 con recorte automático listo para integrar las
                        pantallas oficiales de Problemas Jalisco.
                      </p>
                    </div>
                  </div>

                  <div className="phone-provisional-footer" aria-hidden="true">
                    <span className="phone-home-bar" />
                  </div>
                </div>
              )}

              {/* Reflejo diagonal sutil de cristal */}
              <div className="phone-screen-glare" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

