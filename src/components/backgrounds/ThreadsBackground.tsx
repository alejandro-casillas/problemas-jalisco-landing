import { useEffect, useRef } from 'react'

interface ThreadsBackgroundProps {
  color?: string
  strandCount?: number
  amplitude?: number
  speed?: number
  enableMouseInteraction?: boolean
  className?: string
}

export function ThreadsBackground({
  color = '#E00B50',
  strandCount = 42,
  amplitude = 1.05,
  speed = 0.55,
  enableMouseInteraction = true,
  className = '',
}: ThreadsBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const mouseRef = useRef({
    x: 0.68,
    y: 0.5,
    targetX: 0.68,
    targetY: 0.5,
    active: false,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let animationFrameId: number
    let width = 0
    let height = 0

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height

      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()

    const handleMouseMove = (e: MouseEvent) => {
      if (!enableMouseInteraction || width <= 0 || height <= 0) return
      const rect = canvas.getBoundingClientRect()
      const relX = (e.clientX - rect.left) / width
      const relY = (e.clientY - rect.top) / height

      if (relX >= 0 && relX <= 1 && relY >= 0 && relY <= 1) {
        mouseRef.current.targetX = relX
        mouseRef.current.targetY = relY
        mouseRef.current.active = true
      } else {
        mouseRef.current.active = false
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current.active = false
    }

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseleave', handleMouseLeave)

    let time = 0

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      if (!prefersReducedMotion) {
        time += 0.0075 * speed
      }

      // Suavizado por interpolación lineal (lerp) para el cursor
      const mouse = mouseRef.current
      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.045
        mouse.y += (mouse.targetY - mouse.y) * 0.045
      } else {
        mouse.x += (0.68 - mouse.x) * 0.02
        mouse.y += (0.5 - mouse.y) * 0.02
      }

      // Composición cinematográfica del Hero:
      // - Líneas tenues detrás de la columna editorial izquierda
      // - Cruce fluido por la zona central con convergencia armónica
      // - Mayor presencia e iluminación cerca del mockup del teléfono (zona derecha ~62%-82%)
      // - Desvanecimiento progresivo hacia ambos extremos (0% y 100%)
      const baseCenterY = height * 0.52
      const mouseInfluenceY = (mouse.y - 0.5) * height * 0.28
      const mouseInfluenceX = (mouse.x - 0.5) * 1.2

      for (let s = 0; s < strandCount; s++) {
        const progress = s / (strandCount - 1)
        const strandOffset = (progress - 0.5) * 2 // -1 a +1

        // Fase y frecuencia armónica por hebra
        const phase = s * 0.07 + time
        const strandFreq = 0.0017 + progress * 0.00055

        // Perfil de opacidad horizontal con desvanecimiento en extremos y foco en el teléfono
        const gradient = ctx.createLinearGradient(0, 0, width, 0)
        const alphaBell = Math.sin(progress * Math.PI)
        const alphaBase = 0.035 + alphaBell * 0.3

        // Uso sutil de acento secundario en contadas hebras internas respetando el 90%+ rosa institucional
        const isSecondaryStrand = s % 14 === 7
        const rgb = isSecondaryStrand ? '88, 195, 227' : '224, 11, 80'
        const roleScale = isSecondaryStrand ? 0.45 : 1

        gradient.addColorStop(0, `rgba(${rgb}, 0)`)
        gradient.addColorStop(0.12, `rgba(${rgb}, ${(alphaBase * 0.16 * roleScale).toFixed(4)})`)
        gradient.addColorStop(0.36, `rgba(${rgb}, ${(alphaBase * 0.34 * roleScale).toFixed(4)})`)
        gradient.addColorStop(0.54, `rgba(${rgb}, ${(alphaBase * 0.72 * roleScale).toFixed(4)})`)
        gradient.addColorStop(0.72, `rgba(${rgb}, ${Math.min(0.65, alphaBase * 1.28 * roleScale).toFixed(4)})`)
        gradient.addColorStop(0.88, `rgba(${rgb}, ${(alphaBase * 0.55 * roleScale).toFixed(4)})`)
        gradient.addColorStop(1, `rgba(${rgb}, 0)`)

        ctx.strokeStyle = gradient
        ctx.lineWidth = isSecondaryStrand ? 1.0 : 1.15 + alphaBell * 0.35

        ctx.beginPath()

        const segments = 56
        for (let i = 0; i <= segments; i++) {
          const x = (i / segments) * width
          const xNorm = x / width

          // Envolvente que mantiene calma tras el texto, cruza el centro y se expande junto al dispositivo
          const edgeTaper = Math.sin(xNorm * Math.PI)
          const rightPresence = 0.35 + 0.65 * Math.pow(xNorm, 1.15)
          const amplitudeProfile =
            (height * 0.21) * amplitude * rightPresence * (0.45 + 0.55 * edgeTaper)

          // Nudo de cruce armónico en la zona central (~46% del ancho)
          const centerCrossing = Math.sin((xNorm - 0.46) * Math.PI * 1.35)

          // Ondulación armónica doble con curvatura senoidal
          const wave1 = Math.sin(x * strandFreq + phase)
          const wave2 =
            Math.cos(x * strandFreq * 1.55 - phase * 0.82 + strandOffset * 1.2) * 0.42
          const combinedWave = (wave1 + wave2) * amplitudeProfile

          // Deflexión orgánica suave hacia el cursor
          const distToMouseX = Math.abs(xNorm - mouse.x)
          const mouseDeflection =
            Math.exp(-distToMouseX * 5.2) * mouseInfluenceY * (0.65 + progress * 0.35)

          // Separación entre hebras que converge al cruzar el centro y envuelve el teléfono a la derecha
          const spreadFactor =
            strandOffset * (height * 0.095) * (0.55 + 0.65 * Math.abs(centerCrossing))

          const y =
            baseCenterY +
            spreadFactor +
            combinedWave +
            mouseDeflection +
            xNorm * mouseInfluenceX * 22

          if (i === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }

        ctx.stroke()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [color, strandCount, amplitude, speed, enableMouseInteraction])

  return (
    <canvas
      ref={canvasRef}
      className={`threads-canvas ${className}`}
      aria-hidden="true"
    />
  )
}
