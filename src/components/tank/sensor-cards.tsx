import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Droplet, TestTube, Thermometer, Waves } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock sensor data
const sensorData = {
  ph: {
    value: 7.2,
    unit: "",
    status: "normal",
    min: 6.5,
    max: 8.5,
    icon: TestTube,
  },
  chlorine: {
    value: 1.5,
    unit: "mg/L",
    status: "normal",
    min: 0.5,
    max: 3.0,
    icon: Droplet,
  },
  temperature: {
    value: 24,
    unit: "°C",
    status: "normal",
    min: 15,
    max: 30,
    icon: Thermometer,
  },
  waterLevel: {
    value: 85,
    unit: "%",
    status: "good",
    min: 20,
    max: 100,
    icon: Waves,
  },
}

export function SensorCards({ tankId }: { tankId: string }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
      case "normal":
        return "bg-success text-success-foreground"
      case "warning":
        return "bg-warning text-warning-foreground"
      case "critical":
        return "bg-destructive text-destructive-foreground"
      default:
        return "bg-secondary text-secondary-foreground"
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Object.entries(sensorData).map(([key, data]) => (
        <Card key={key}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium capitalize">
              {key === "ph" ? "pH Level" : key.replace(/([A-Z])/g, " $1")}
            </CardTitle>
            <data.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {data.value}
              <span className="text-lg text-muted-foreground ml-1">{data.unit}</span>
            </div>
            <div className="flex items-center justify-between mt-3">
              <Badge variant="secondary" className={cn("text-xs", getStatusColor(data.status))}>
                {data.status.toUpperCase()}
              </Badge>
              <span className="text-xs text-muted-foreground">
                Range: {data.min} - {data.max}
                {data.unit}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
