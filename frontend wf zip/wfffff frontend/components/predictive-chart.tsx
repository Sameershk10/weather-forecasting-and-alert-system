"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export function PredictiveChart() {
  const data = [
    { time: "00:00", temp: 18, humidity: 55 },
    { time: "04:00", temp: 16, humidity: 60 },
    { time: "08:00", temp: 20, humidity: 65 },
    { time: "12:00", temp: 24, humidity: 62 },
    { time: "16:00", temp: 25, humidity: 58 },
    { time: "20:00", temp: 22, humidity: 63 },
    { time: "24:00", temp: 19, humidity: 68 },
  ]

  return (
    <div className="glass rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4 text-primary">24-Hour Forecast</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <defs>
            <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="rgb(139, 92, 246)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="rgb(139, 92, 246)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorHumidity" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="rgb(34, 197, 229)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="rgb(34, 197, 229)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(139, 92, 246, 0.1)" />
          <XAxis dataKey="time" stroke="rgb(107, 114, 128)" />
          <YAxis stroke="rgb(107, 114, 128)" />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(15, 23, 42, 0.9)",
              border: "1px solid rgba(139, 92, 246, 0.5)",
              borderRadius: "8px",
            }}
            labelStyle={{ color: "rgb(241, 245, 249)" }}
          />
          <Line
            type="monotone"
            dataKey="temp"
            stroke="rgb(139, 92, 246)"
            strokeWidth={2}
            dot={false}
            name="Temperature"
          />
          <Line
            type="monotone"
            dataKey="humidity"
            stroke="rgb(34, 197, 229)"
            strokeWidth={2}
            dot={false}
            name="Humidity"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
