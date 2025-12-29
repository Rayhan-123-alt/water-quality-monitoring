"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts"

// Mock historical data
const chartData = [
  { time: "00:00", ph: 7.1, chlorine: 1.4, temperature: 22, waterLevel: 78 },
  { time: "04:00", ph: 7.2, chlorine: 1.5, temperature: 21, waterLevel: 80 },
  { time: "08:00", ph: 7.3, chlorine: 1.6, temperature: 23, waterLevel: 82 },
  { time: "12:00", ph: 7.2, chlorine: 1.5, temperature: 25, waterLevel: 84 },
  { time: "16:00", ph: 7.1, chlorine: 1.4, temperature: 26, waterLevel: 85 },
  { time: "20:00", ph: 7.2, chlorine: 1.5, temperature: 24, waterLevel: 85 },
]

export function SensorCharts() {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Sensor History</CardTitle>
        <CardDescription>Real-time sensor readings over the last 24 hours</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-medium mb-3">Water Level</h4>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="time" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                <YAxis className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Line type="monotone" dataKey="waterLevel" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-3">Water Quality Metrics</h4>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="time" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                <YAxis className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "12px" }} />
                <Line type="monotone" dataKey="ph" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={false} name="pH" />
                <Line
                  type="monotone"
                  dataKey="chlorine"
                  stroke="hsl(var(--chart-3))"
                  strokeWidth={2}
                  dot={false}
                  name="Chlorine (mg/L)"
                />
                <Line
                  type="monotone"
                  dataKey="temperature"
                  stroke="hsl(var(--chart-4))"
                  strokeWidth={2}
                  dot={false}
                  name="Temperature (°C)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
