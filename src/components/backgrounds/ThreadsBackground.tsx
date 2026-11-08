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
  strandCount = 38,
  amplitude = 1.1,
  speed = 0.65,
  enableMouseInteraction = true,
  className = '',
}: ThreadsBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const mouseRef = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
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
      if (!enableMouseInteraction) return
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.targetX = (e.clientX - rect.left) / width
      mouseRef.current.targetY = (e.clientY - rect.top) / height
      mouseRef.current.active = true
    }

    const handleMouseLeave = () => {
      mouseRef.current.active = false
    }

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    let time = 0

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      if (!prefersReducedMotion) {
        time += 0.008 * speed
      }

      // Suavizado por interpolación lineal (lerp) para el cursor
      const mouse = mouseRef.current
      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.05
        mouse.y += (mouse.targetY - mouse.y) * 0.05
      } else {
        mouse.x += (0.6 - mouse.x) * 0.02
        mouse.y += (0.5 - mouse.y) * 0.02
      }

      // Parámetros de composición: las ondas se originan sutiles a la izquierda
      // y adquieren amplitud y protagonismo hacia la derecha (área de mockup)
      const baseCenterY = height * 0.52
      const mouseInfluenceY = (mouse.y - 0.5) * height * 0.35
      const mouseInfluenceX = (mouse.x - 0.5) * 1.5

      for (let s = 0; s < strandCount; s++) {
        const progress = s / (strandCount - 1)
        const strandOffset = (progress - 0.5) * 2 // -1 a +1

        // Cálculo de fase y frecuencia armónica para cada hebra
        const phase = s * 0.065 + time
        const strandFreq = 0.0018 + progress * 0.0006

        // Gradiente horizontal específico por hebra para iluminar el lado derecho
        const gradient = ctx.createLinearGradient(0, 0, width, 0)
        const alphaBase = 0.04 + Math.sin(progress * Math.PI) * 0.28
        gradient.addColorStop(0, `rgba(224, 11, 80, 0.02)`)
        gradient.addColorStop(0.35, `rgba(224, 11, 80, ${alphaBase * 0.6})`)
        gradient.addColorStop(0.75, `rgba(224, 11, 80, ${alphaBase * 1.1})`)
        gradient.addColorStop(1, `rgba(224, 11, 80, ${alphaBase * 0.4})`)

        ctx.strokeStyle = gradient
        ctx.lineWidth = 1.25

        ctx.beginPath()

        const segments = 45
        for (let i = 0; i <= segments; i++) {
          const x = (i / segments) * width
          const xNorm = x / width

          // Amplitud progresiva: muy baja a la izquierda (legibilidad) y mayor a la derecha
          const amplitudeProfile = Math.pow(xNorm, 1.4) * (height * 0.22) * amplitude

          // Ondulación armónica doble con curvatura senoidal
          const wave1 = Math.sin(x * strandFreq + phase)
          const wave2 = Math.cos(x * strandFreq * 1.6 - phase * 0.8 + strandOffset) * 0.4
          const combinedWave = (wave1 + wave2) * amplitudeProfile

          // Deflexión orgánica hacia la posición del cursor
          const distToMouseX = Math.abs(xNorm - mouse.x)
          const mouseDeflection = Math.exp(-distToMouseX * 5.0) * mouseInfluenceY * (0.8 + progress * 0.4)

          const y = baseCenterY + strandOffset * (height * 0.12) + combinedWave + mouseDeflection + (xNorm * mouseInfluenceX * 30)

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
