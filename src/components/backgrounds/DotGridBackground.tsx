import { useEffect, useRef } from 'react'

interface Dot {
  x: number
  y: number
  originX: number
  originY: number
  vx: number
  vy: number
  baseAlpha: number
}

interface DotGridBackgroundProps {
  dotSize?: number
  gap?: number
  proximity?: number
  shockwaveStrength?: number
  className?: string
}

export function DotGridBackground({
  dotSize = 3,
  gap = 28,
  proximity = 110,
  shockwaveStrength = 22,
  className = '',
}: DotGridBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const mouseRef = useRef({
    x: -9999,
    y: -9999,
    lastX: -9999,
    lastY: -9999,
    vx: 0,
    vy: 0,
    isHovering: false,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let animationFrameId: number
    let width = 0
    let height = 0
    let dots: Dot[] = []

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const initGrid = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height

      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      dots = []
      // Distribución regular con desfase inicial para centrar la cuadrícula
      const offsetX = (width % gap) / 2
      const offsetY = (height % gap) / 2

      for (let x = offsetX; x < width; x += gap) {
        for (let y = offsetY; y < height; y += gap) {
          // Variación sutil de opacidad base para sensación de textura profunda
          const normalizedDistFromCenter = Math.hypot(x - width / 2, y - height / 2) / Math.hypot(width / 2, height / 2)
          const baseAlpha = Math.max(0.12, 0.35 - normalizedDistFromCenter * 0.18)

          dots.push({
            x,
            y,
            originX: x,
            originY: y,
            vx: 0,
            vy: 0,
            baseAlpha,
          })
        }
      }
    }

    initGrid()

    const handleResize = () => {
      initGrid()
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const currentX = e.clientX - rect.left
      const currentY = e.clientY - rect.top

      mouseRef.current.vx = (currentX - mouseRef.current.lastX) * 0.3
      mouseRef.current.vy = (currentY - mouseRef.current.lastY) * 0.3
      mouseRef.current.x = currentX
      mouseRef.current.y = currentY
      mouseRef.current.lastX = currentX
      mouseRef.current.lastY = currentY
      mouseRef.current.isHovering = true
    }

    const handleMouseLeave = () => {
      mouseRef.current.x = -9999
      mouseRef.current.y = -9999
      mouseRef.current.isHovering = false
    }

    const handleClick = (e: MouseEvent) => {
      if (prefersReducedMotion) return
      const rect = canvas.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const clickY = e.clientY - rect.top

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i]
        const dx = dot.x - clickX
        const dy = dot.y - clickY
        const dist = Math.hypot(dx, dy)

        if (dist < 180 && dist > 0.001) {
          const force = (1 - dist / 180) * shockwaveStrength
          const angle = Math.atan2(dy, dx)
          dot.vx += Math.cos(angle) * force
          dot.vy += Math.sin(angle) * force
        }
      }
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    canvas.addEventListener('click', handleClick)

    let time = 0

    const render = () => {
      ctx.clearRect(0, 0, width, height)
      time += 0.015

      const mouse = mouseRef.current

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i]

        if (!prefersReducedMotion) {
          // 1. Interacción sutil con el cursor (repulsión elástica)
          if (mouse.isHovering) {
            const dx = mouse.x - dot.x
            const dy = mouse.y - dot.y
            const dist = Math.hypot(dx, dy)

            if (dist < proximity && dist > 0.001) {
              const factor = (1 - dist / proximity)
              const force = factor * factor * 5.5
              const angle = Math.atan2(dy, dx)
              dot.vx -= Math.cos(angle) * force
              dot.vy -= Math.sin(angle) * force
            }
          }

          // 2. Respiración armónica sutil de fondo (micro-ondulación tecnológica)
          const ambientWave = Math.sin(dot.originX * 0.008 + dot.originY * 0.008 + time) * 0.35

          // 3. Física de retorno al origen (Ley de Hooke + Amortiguación refinada)
          const ox = dot.originX - dot.x
          const oy = dot.originY - dot.y + ambientWave

          dot.vx += ox * 0.07 // Tensión del resorte
          dot.vy += oy * 0.07
          dot.vx *= 0.82 // Fricción
          dot.vy *= 0.82

          dot.x += dot.vx
          dot.y += dot.vy
        }

        // Cálculo de intensidad lumínica en base a la proximidad y desplazamiento
        const displacement = Math.hypot(dot.x - dot.originX, dot.y - dot.originY)
        const mouseDist = mouse.isHovering
          ? Math.hypot(mouse.x - dot.x, mouse.y - dot.y)
          : 9999

        let alpha = dot.baseAlpha
        let currentSize = dotSize

        if (mouseDist < proximity) {
          const proximityBoost = (1 - mouseDist / proximity) * 0.65
          alpha = Math.min(1, alpha + proximityBoost)
          currentSize = dotSize + (1 - mouseDist / proximity) * 1.5
        } else if (displacement > 0.8) {
          alpha = Math.min(0.9, alpha + displacement * 0.08)
        }

        // Dibujo del punto en rosa institucional #E00B50
        ctx.fillStyle = `rgba(224, 11, 80, ${alpha.toFixed(3)})`
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, currentSize / 2, 0, Math.PI * 2)
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      canvas.removeEventListener('click', handleClick)
    }
  }, [dotSize, gap, proximity, shockwaveStrength])

  return (
    <canvas
      ref={canvasRef}
      className={`dot-grid-canvas ${className}`}
      aria-hidden="true"
    />
  )
}

