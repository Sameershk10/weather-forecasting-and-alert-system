"use client"

import { useEffect, useRef } from "react"

export function AnimatedGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(width, height) / 2 - 20

    let animationFrame: number

    const drawGlobe = (time: number) => {
      ctx.clearRect(0, 0, width, height)

      // Draw outer glow
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius + 30)
      gradient.addColorStop(0, "rgba(139, 92, 246, 0.3)")
      gradient.addColorStop(1, "rgba(139, 92, 246, 0)")
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius + 30, 0, Math.PI * 2)
      ctx.fill()

      // Draw main globe
      ctx.fillStyle = "rgba(30, 30, 46, 0.8)"
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.fill()

      // Draw globe outline with gradient
      const lineGradient = ctx.createLinearGradient(centerX - radius, centerY, centerX + radius, centerY)
      lineGradient.addColorStop(0, "rgba(139, 92, 246, 0.5)")
      lineGradient.addColorStop(0.5, "rgba(34, 197, 229, 0.7)")
      lineGradient.addColorStop(1, "rgba(139, 92, 246, 0.5)")
      ctx.strokeStyle = lineGradient
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.stroke()

      // Draw rotating data points
      for (let i = 0; i < 8; i++) {
        const angle = (time * 0.0001 + (i * Math.PI) / 4) % (Math.PI * 2)
        const x = centerX + Math.cos(angle) * (radius * 0.8)
        const y = centerY + Math.sin(angle) * (radius * 0.8)

        // Draw data point
        const pointGradient = ctx.createRadialGradient(x, y, 0, x, y, 8)
        pointGradient.addColorStop(0, "rgba(245, 158, 11, 0.8)")
        pointGradient.addColorStop(1, "rgba(245, 158, 11, 0)")
        ctx.fillStyle = pointGradient
        ctx.beginPath()
        ctx.arc(x, y, 8, 0, Math.PI * 2)
        ctx.fill()

        // Draw glow ring
        ctx.strokeStyle = `rgba(245, 158, 11, ${0.3 + Math.sin(time * 0.001 + i) * 0.2})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(x, y, 12, 0, Math.PI * 2)
        ctx.stroke()
      }

      // Draw latitude lines
      ctx.strokeStyle = "rgba(34, 197, 229, 0.1)"
      ctx.lineWidth = 1
      for (let i = 0; i < 4; i++) {
        const y = centerY - radius + (i * radius * 2) / 3
        ctx.beginPath()
        ctx.ellipse(centerX, y, radius * 0.9, radius * 0.3, 0, 0, Math.PI * 2)
        ctx.stroke()
      }

      // Draw longitude lines
      ctx.strokeStyle = "rgba(34, 197, 229, 0.1)"
      const angle = (time * 0.00005) % (Math.PI * 2)
      for (let i = 0; i < 4; i++) {
        const lineAngle = angle + (i * Math.PI) / 2
        ctx.beginPath()
        ctx.arc(centerX, centerY, radius, lineAngle, lineAngle + 0.1)
        ctx.stroke()
      }

      animationFrame = requestAnimationFrame(drawGlobe)
    }

    drawGlobe(0)

    return () => cancelAnimationFrame(animationFrame)
  }, [])

  return <canvas ref={canvasRef} width={400} height={400} className="mx-auto rounded-full neon-glow" />
}
