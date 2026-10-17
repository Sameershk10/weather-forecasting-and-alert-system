"use client"

export function WeatherStats() {
  const stats = [
    { label: "Temperature", value: "24°C", unit: "Rising", icon: "🌡️" },
    { label: "Humidity", value: "65%", unit: "Moderate", icon: "💧" },
    { label: "Wind Speed", value: "12 km/h", unit: "SW", icon: "💨" },
    { label: "Pressure", value: "1013 mb", unit: "Stable", icon: "🔵" },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <div key={i} className="glass glass-hover rounded-xl p-6 group">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
              <p className="text-3xl font-bold text-accent mb-1">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.unit}</p>
            </div>
            <span className="text-3xl group-hover:scale-110 transition-transform">{stat.icon}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
