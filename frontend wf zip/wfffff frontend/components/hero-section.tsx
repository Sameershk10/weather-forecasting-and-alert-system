"use client"

import { AnimatedGlobe } from "./animated-globe"
import { WeatherStats } from "./weather-stats"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-12 md:py-20">
      {/* Background animated grid */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(0deg, transparent 24%, rgba(139, 92, 246, 0.1) 25%, rgba(139, 92, 246, 0.1) 26%, transparent 27%, transparent 74%, rgba(139, 92, 246, 0.1) 75%, rgba(139, 92, 246, 0.1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(139, 92, 246, 0.1) 25%, rgba(139, 92, 246, 0.1) 26%, transparent 27%, transparent 74%, rgba(139, 92, 246, 0.1) 75%, rgba(139, 92, 246, 0.1) 76%, transparent 77%, transparent)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Globe */}
          <div className="flex justify-center">
            <AnimatedGlobe />
          </div>

          {/* Right: Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-block">
                <span className="text-xs font-mono text-primary px-3 py-1 rounded-full glass">
                  ◆ REAL-TIME MONITORING
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-balance leading-tight">
                <span className="text-foreground">Advanced Climate</span>{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">
                  Intelligence System
                </span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
                Experience cutting-edge weather analytics with real-time data, predictive models, and comprehensive
                climate insights powered by NASA-grade precision.
              </p>
            </div>

            {/* Live Stats Grid */}
            <WeatherStats />

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 rounded-lg glass glass-hover border border-primary/50 text-primary font-medium transition-all hover:border-primary hover:shadow-lg hover:shadow-purple-500/20 neon-glow">
                Explore Now
              </button>
              <button className="px-6 py-3 rounded-lg bg-accent/20 glass-hover border border-accent/50 text-accent font-medium transition-all neon-glow-gold">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
