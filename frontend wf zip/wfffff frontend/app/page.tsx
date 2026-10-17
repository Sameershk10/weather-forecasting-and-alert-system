import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { PredictiveChart } from "@/components/predictive-chart"
import { HistoricalGraph } from "@/components/historical-graph"
import { AlertCards } from "@/components/alert-cards"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section with Globe and Stats */}
      <HeroSection />

      {/* Charts and Data Section */}
      <section className="py-16 md:py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Climate Analytics</h2>
            <p className="text-muted-foreground">Comprehensive weather forecasting and historical climate data</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <PredictiveChart />
            <HistoricalGraph />
          </div>
        </div>
      </section>

      {/* Alerts Section */}
      <section className="py-16 md:py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Real-Time Alerts</h2>
            <p className="text-muted-foreground">Critical weather events and climate notifications</p>
          </div>

          <div className="max-w-2xl mx-auto">
            <AlertCards />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-background/50 backdrop-blur-xl py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-muted-foreground">
            Interactive Weather & Climate Data Portal © 2025 • Powered by Advanced Analytics
          </p>
        </div>
      </footer>
    </main>
  )
}
