"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export function HistoricalGraph() {
  const data = [
    { month: "Jan", avg: 12, high: 18, low: 5 },
    { month: "Feb", avg: 14, high: 20, low: 7 },
    { month: "Mar", avg: 17, high: 23, low: 10 },
    { month: "Apr", avg: 21, high: 27, low: 14 },
    { month: "May", avg: 25, high: 31, low: 18 },
    { month: "Jun", avg: 28, high: 34, low: 21 },
    { month: "Jul", avg: 30, high: 36, low: 23 },
    { month: "Aug", avg: 29, high: 35, low: 22 },
    { month: "Sep", avg: 26, high: 32, low: 19 },
    { month: "Oct", avg: 21, high: 26, low: 15 },
    { month: "Nov", avg: 16, high: 21, low: 10 },
    { month: "Dec", avg: 13, high: 19, low: 6 },
  ]

  return (
    <div className="glass rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4 text-primary">Historical Data (Yearly)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="rgb(245, 158, 11)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="rgb(245, 158, 11)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(139, 92, 246, 0.1)" />
          <XAxis dataKey="month" stroke="rgb(107, 114, 128)" />
          <YAxis stroke="rgb(107, 114, 128)" />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(15, 23, 42, 0.9)",
              border: "1px solid rgba(139, 92, 246, 0.5)",
              borderRadius: "8px",
            }}
            labelStyle={{ color: "rgb(241, 245, 249)" }}
          />
          <Area
            type="monotone"
            dataKey="avg"
            stroke="rgb(245, 158, 11)"
            fillOpacity={1}
            fill="url(#colorAvg)"
            name="Average Temperature"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
