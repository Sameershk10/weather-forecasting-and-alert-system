"use client"

import { MapPin } from "lucide-react"

export function Header() {
  return (
    <header className="border-b border-white/10 backdrop-blur-xl bg-background/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg glass neon-glow flex items-center justify-center">
            <span className="text-xl">🌍</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Weather Portal</h1>
            <p className="text-xs text-muted-foreground">Interactive Climate Data</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>Global View</span>
        </div>
      </div>
    </header>
  )
}
