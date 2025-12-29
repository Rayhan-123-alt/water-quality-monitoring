import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { MapPin, Droplet, ArrowRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface TankCardProps {
  tank: {
    id: string
    name: string
    location: string
    capacity: number
    waterLevel: number
    pumpStatus: string
    lastUpdated: string
    sensorData: {
      ph: number
      chlorine: number
      temperature: number
    }
  }
}

export function TankCard({ tank }: TankCardProps) {
  const getWaterLevelColor = (level: number) => {
    if (level >= 70) return "text-success"
    if (level >= 40) return "text-warning"
    return "text-destructive"
  }

  const getProgressColor = (level: number) => {
    if (level >= 70) return "bg-success"
    if (level >= 40) return "bg-warning"
    return "bg-destructive"
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{tank.name}</CardTitle>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-3 w-3" />
              {tank.location}
            </div>
          </div>
          <Badge
            variant={tank.pumpStatus === "ON" ? "default" : "secondary"}
            className={cn(tank.pumpStatus === "ON" && "bg-success text-success-foreground")}
          >
            {tank.pumpStatus}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Water Level</span>
            <span className={cn("font-semibold", getWaterLevelColor(tank.waterLevel))}>{tank.waterLevel}%</span>
          </div>
          <Progress value={tank.waterLevel} className="h-2" indicatorClassName={getProgressColor(tank.waterLevel)} />
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Droplet className="h-3 w-3" />
            {((tank.capacity * tank.waterLevel) / 100).toLocaleString()} / {tank.capacity.toLocaleString()} L
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-2 border-t">
          <div className="text-center">
            <div className="text-xs text-muted-foreground">pH</div>
            <div className="text-sm font-medium">{tank.sensorData.ph}</div>
          </div>
          <div className="text-center border-x">
            <div className="text-xs text-muted-foreground">Chlorine</div>
            <div className="text-sm font-medium">{tank.sensorData.chlorine} mg/L</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-muted-foreground">Temp</div>
            <div className="text-sm font-medium">{tank.sensorData.temperature}°C</div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-muted-foreground">Updated {tank.lastUpdated}</span>
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/dashboard/tank/${tank.id}`}>
              Details
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
