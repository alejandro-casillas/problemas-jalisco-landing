import { Wrench, ShieldAlert, ClipboardCheck, Sparkles } from 'lucide-react'
import type { TransitionTopic } from '../../data/testingTransitionData'

interface TransitionTopicCardProps {
  topic: TransitionTopic
}

function renderTopicIcon(iconName: TransitionTopic['iconName']) {
  switch (iconName) {
    case 'Wrench':
      return <Wrench size={22} aria-hidden="true" />
    case 'ShieldAlert':
      return <ShieldAlert size={22} aria-hidden="true" />
    case 'ClipboardCheck':
      return <ClipboardCheck size={22} aria-hidden="true" />
    default:
      return <Sparkles size={22} aria-hidden="true" />
  }
}

export function TransitionTopicCard({ topic }: TransitionTopicCardProps) {
  const accentClass = `transition-topic-card--accent-${topic.accent}`

  return (
    <article
      className={`transition-topic-card ${accentClass}`}
      data-transition-gsap="topic-card"
      aria-labelledby={`topic-title-${topic.id}`}
    >
      {/* Resplandor ambiental interno sutil */}
      <div className="transition-topic-ambient-glow" aria-hidden="true" />

      {/* Cabecera del bloque: Icono destacado */}
      <div className="transition-topic-header">
        <div className="transition-topic-icon-frame" aria-hidden="true">
          {renderTopicIcon(topic.iconName)}
        </div>
        <h3 id={`topic-title-${topic.id}`} className="transition-topic-title">
          {topic.title}
        </h3>
      </div>

      {/* Descripción principal concisa */}
      <p className="transition-topic-description">{topic.description}</p>

      {/* Aspectos técnicos y desafíos secundarios presentados discretamente */}
      {topic.subitems && topic.subitems.length > 0 && (
        <ul
          className="transition-topic-subitems"
          aria-label={`Aspectos clave de ${topic.title}`}
        >
          {topic.subitems.map((subitem) => (
            <li key={subitem} className="transition-topic-subitem-pill">
              <span className="transition-topic-dot" aria-hidden="true" />
              <span>{subitem}</span>
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}

