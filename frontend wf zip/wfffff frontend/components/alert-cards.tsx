"use client"

import { AlertTriangle, AlertCircle, Zap } from "lucide-react"

export function AlertCards() {
  const alerts = [
    {
      type: "severe",
      icon: AlertTriangle,
      title: "Severe Storm Warning",
      description: "High-velocity winds expected in the next 2 hours",
      time: "2 hours",
    },
    {
      type: "moderate",
      icon: AlertCircle,
      title: "Air Quality Alert",
      description: "Moderate pollution levels detected across the region",
      time: "1 hour",
    },
    {
      type: "info",
      icon: Zap,
      title: "Solar Activity Peak",
      description: "Peak solar radiation detected at 3 PM local time",
      time: "Today",
    },
  ]

  return (
    <div className="space-y-3">
      {alerts.map((alert, i) => {
        const bgColor =
          alert.type === "severe"
            ? "border-red-500/50 bg-red-500/10"
            : alert.type === "moderate"
              ? "border-yellow-500/50 bg-yellow-500/10"
              : "border-blue-500/50 bg-blue-500/10"

        const iconColor =
          alert.type === "severe" ? "text-red-400" : alert.type === "moderate" ? "text-yellow-400" : "text-blue-400"

        return (
          <div key={i} className={`glass glass-hover rounded-lg p-4 border ${bgColor}`}>
            <div className="flex items-start gap-3">
              <alert.icon className={`w-5 h-5 mt-1 flex-shrink-0 ${iconColor}`} />
              <div className="flex-1">
                <p className="font-semibold text-sm text-foreground">{alert.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{alert.description}</p>
              </div>
              <span className="text-xs text-muted-foreground flex-shrink-0">{alert.time}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
