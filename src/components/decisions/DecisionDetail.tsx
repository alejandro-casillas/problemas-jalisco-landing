import { useEffect } from 'react'
import gsap from 'gsap'
import {
  ArrowLeft,
  ArrowRight,
  Blocks,
  Bot,
  Clock,
  HelpCircle,
  Layers,
  Layout,
  Network,
  Package,
  Palette,
  Server,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import {
  DECISIONS_DATA,
  type DecisionItem,
  type FlowIconName,
} from '../../data/decisionsData'

interface DecisionDetailProps {
  decision: DecisionItem
  onBack: () => void
  onSelectDecision: (id: DecisionItem['id']) => void
}

function renderFlowIcon(name: FlowIconName, size = 22) {
  switch (name) {
    case 'HelpCircle':
      return <HelpCircle size={size} aria-hidden="true" />
    case 'Package':
      return <Package size={size} aria-hidden="true" />
    case 'Clock':
      return <Clock size={size} aria-hidden="true" />
    case 'Layout':
      return <Layout size={size} aria-hidden="true" />
    case 'Server':
      return <Server size={size} aria-hidden="true" />
    case 'Blocks':
      return <Blocks size={size} aria-hidden="true" />
    case 'Bot':
      return <Bot size={size} aria-hidden="true" />
    case 'Palette':
      return <Palette size={size} aria-hidden="true" />
    case 'Network':
      return <Network size={size} aria-hidden="true" />
    case 'ShieldCheck':
      return <ShieldCheck size={size} aria-hidden="true" />
    case 'Sparkles':
      return <Sparkles size={size} aria-hidden="true" />
    case 'Layers':
      return <Layers size={size} aria-hidden="true" />
    default:
      return <Sparkles size={size} aria-hidden="true" />
  }
}

export function DecisionDetail({
  decision,
  onBack,
  onSelectDecision,
}: DecisionDetailProps) {
  // Manejo de tecla Escape para volver rápidamente a la cuadrícula general
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onBack()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onBack])

  // Animación cinematográfica escalonada al montar o cambiar de decisión
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (prefersReducedMotion) return

    gsap.fromTo(
      '[data-decisions-gsap="flow-block"]',
      { autoAlpha: 0, y: 14 },
      { autoAlpha: 1, y: 0, duration: 0.38, stagger: 0.08, ease: 'power2.out' },
    )
    gsap.fromTo(
      '[data-decisions-gsap="flow-connector"]',
      { autoAlpha: 0, scale: 0.9 },
      { autoAlpha: 1, scale: 1, duration: 0.35, delay: 0.12, ease: 'power2.out' },
    )
  }, [decision.id])

  const accentClass = `decision-detail--accent-${decision.accentColor}`

  return (
    <article
      className={`decision-detail ${accentClass}`}
      data-decisions-gsap="detail-view"
      aria-labelledby="decision-detail-title"
    >
      {/* 1. Barra superior: Botón de regreso y selector en pestañas tipográficas */}
      <div className="decision-detail-topbar">
        <button
          type="button"
          className="decision-detail-back-btn"
          onClick={onBack}
          aria-label="Volver a la vista general de las cuatro decisiones"
        >
          <ArrowLeft size={15} aria-hidden="true" />
          <span>Volver a decisiones</span>
        </button>

        {/* Pestañas tipográficas para navegar directamente entre decisiones */}
        <div
          className="decision-detail-quicknav"
          role="tablist"
          aria-label="Cambiar de decisión"
        >
          {DECISIONS_DATA.map((item) => {
            const isCurrent = item.id === decision.id
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isCurrent}
                aria-label={`Ver decisión ${item.number}: ${item.title}`}
                className={`decision-quicknav-btn ${
                  isCurrent ? 'decision-quicknav-btn--active' : ''
                }`}
                onClick={() => onSelectDecision(item.id)}
              >
                <span className="decision-quicknav-num">{item.number}</span>
                <span className="decision-quicknav-name">{item.title}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* 2. Encabezado editorial de la decisión */}
      <header className="decision-detail-header">
        <span className="decision-detail-eyebrow">
          DECISIÓN {decision.number} / {decision.title.toUpperCase()}
        </span>
        <h3 id="decision-detail-title" className="decision-detail-title">
          {decision.title}
        </h3>
        {decision.flowSubtitle && (
          <p className="decision-detail-lead">{decision.flowSubtitle}</p>
        )}
      </header>

      {/* 3. Secuencia cinematográfica de 3 bloques conectados: ANTES -> DECIDIMOS -> RESULTADO */}
      <div
        className="decision-flow-stage"
        role="region"
        aria-label="Secuencia de decisión: Antes, Decidimos y Resultado"
      >
        {/* Bloque 1: ANTES */}
        <div
          className="decision-flow-card decision-flow-card--before"
          data-decisions-gsap="flow-block"
        >
          <div className="decision-flow-card-header">
            <span className="decision-flow-card-icon" aria-hidden="true">
              {renderFlowIcon(decision.beforeStep.iconName, 18)}
            </span>
            <span className="decision-flow-card-label">
              {decision.beforeStep.label}
            </span>
          </div>
          <p className="decision-flow-card-text">{decision.beforeStep.text}</p>
        </div>

        {/* Conector discreto 1 -> 2 */}
        <div
          className="decision-flow-connector"
          data-decisions-gsap="flow-connector"
          aria-hidden="true"
        >
          <span className="decision-flow-connector-line" />
          <ArrowRight size={16} className="decision-flow-connector-arrow" />
          <span className="decision-flow-connector-line" />
        </div>

        {/* Bloque 2: DECIDIMOS (PROTAGONISTA) */}
        <div
          className="decision-flow-card decision-flow-card--decided"
          data-decisions-gsap="flow-block"
        >
          <div className="decision-flow-card-header">
            <span className="decision-flow-card-icon" aria-hidden="true">
              {renderFlowIcon(decision.decidedStep.iconName, 22)}
            </span>
            <span className="decision-flow-card-label">
              {decision.decidedStep.label}
            </span>
          </div>
          <p className="decision-flow-card-text">{decision.decidedStep.text}</p>
        </div>

        {/* Conector discreto 2 -> 3 */}
        <div
          className="decision-flow-connector"
          data-decisions-gsap="flow-connector"
          aria-hidden="true"
        >
          <span className="decision-flow-connector-line" />
          <ArrowRight size={16} className="decision-flow-connector-arrow" />
          <span className="decision-flow-connector-line" />
        </div>

        {/* Bloque 3: RESULTADO */}
        <div
          className="decision-flow-card decision-flow-card--result"
          data-decisions-gsap="flow-block"
        >
          <div className="decision-flow-card-header">
            <span className="decision-flow-card-icon" aria-hidden="true">
              {renderFlowIcon(decision.resultStep.iconName, 18)}
            </span>
            <span className="decision-flow-card-label">
              {decision.resultStep.label}
            </span>
          </div>
          <p className="decision-flow-card-text">{decision.resultStep.text}</p>
        </div>
      </div>
    </article>
  )
}
