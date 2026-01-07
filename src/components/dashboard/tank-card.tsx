import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LucideIcon, Zap, Droplets, Thermometer, FlaskConical } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

type Tank = {
  id: string
  name: string
  location: string
  capacity: number
  waterLevel: number
  pumpStatus: "ON" | "OFF"
  lastUpdated: string
  sensorData: {
    ph: number
    chlorine: number
    temperature: number
  }
}

// Helper formatter (bisa di luar TankCard juga)
const formatVolume = (value: number): string => {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

const getStatusColor = (status: "ON" | "OFF") => {
  return status === "ON"
    ? "bg-green-100 text-green-800 border-green-200"
    : "bg-orange-100 text-orange-800 border-orange-200"
}

const getWaterLevelColor = (percent: number) => {
  if (percent < 20) return "bg-red-500"
  if (percent <= 60) return "bg-yellow-500"
  return "bg-emerald-500"
}

export function TankCard({ tank }: { tank: Tank }) {
  const waterPercent = (tank.waterLevel / tank.capacity) * 100
  const lastUpdated = new Date(tank.lastUpdated)

  const sensorItems = [
    { label: "pH", value: tank.sensorData.ph.toFixed(1), icon: FlaskConical, unit: "", color: tank.sensorData.ph >= 6.5 && tank.sensorData.ph <= 8.5 ? "text-emerald-600" : "text-amber-600" },
    { label: "Cl₂", value: tank.sensorData.chlorine.toFixed(2), icon: Droplets, unit: "ppm", color: tank.sensorData.chlorine >= 0.2 && tank.sensorData.chlorine <= 4.0 ? "text-emerald-600" : "text-amber-600" },
    { label: "Temp", value: tank.sensorData.temperature.toFixed(1), icon: Thermometer, unit: "°C", color: tank.sensorData.temperature <= 30 ? "text-emerald-600" : "text-amber-600" },
  ]

  return (
    <Card className="overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-white to-gray-50 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">{tank.name}</h3>
            <p className="text-sm text-muted-foreground">{tank.location}</p>
          </div>
          <Badge
            variant="outline"
            className={`px-3 py-1 font-medium border ${getStatusColor(tank.pumpStatus)}`}
          >
            <Zap className="mr-1 h-3 w-3" />
            {tank.pumpStatus}
          </Badge>
        </div>

        {/* Water Level Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Water Level</span>
            <span>{Math.round(waterPercent)}%</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-gray-200 overflow-hidden">
            <div
              className={`h-full ${getWaterLevelColor(waterPercent)} transition-all duration-500`}
              style={{ width: `${waterPercent}%` }}
            />
          </div>
          
          <p className="mt-1 text-xs">
            <span className="font-medium">
              {waterPercent < 20 
                ? "Rendah" 
                : waterPercent <= 60 
                  ? "Sedang" 
                  : "Aman"}
            </span>{" "}
            <span className="text-muted-foreground">
              ({formatVolume(tank.waterLevel)} L / {formatVolume(tank.capacity)} L)
            </span>
          </p>
        </div>
      </div>

      <div className="mx-5 h-px bg-border" />

      <div className="p-5">
        <div className="grid grid-cols-3 gap-3">
          {sensorItems.map((item, i) => {
            const Icon = item.icon
            return (
              <div key={i} className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Icon className={`h-4 w-4 ${item.color}`} />
                </div>
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className={`text-sm font-medium ${item.color}`}>
                  {item.value}
                  {item.unit && <span className="text-xs text-muted-foreground ml-0.5">{item.unit}</span>}
                </p>
              </div>
            )
          })}
        </div>

        <div className="mt-4 flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Last updated:</span>
          <span className="font-medium text-foreground">
            {formatDistanceToNow(lastUpdated, { addSuffix: true })}
          </span>
        </div>
      </div>
    </Card>
  )
}