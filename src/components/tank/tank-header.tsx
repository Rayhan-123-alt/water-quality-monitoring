import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MapPin, Settings } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface TankHeaderProps {
  tank: {
    id: string
    name: string
    location: string
    capacity: number
    waterLevel: number
    pumpStatus: string
    lastUpdated: string
  }
}

export function TankHeader({ tank }: TankHeaderProps) {
  return (
    <div className="space-y-4">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/dashboard">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Link>
      </Button>

      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">{tank.name}</h1>
            <Badge
              variant={tank.pumpStatus === "ON" ? "default" : "secondary"}
              className={cn("text-sm", tank.pumpStatus === "ON" && "bg-success text-success-foreground")}
            >
              Pump {tank.pumpStatus}
            </Badge>
          </div>
          <div className="flex items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{tank.location}</span>
            </div>
            <span>•</span>
            <span>Capacity: {tank.capacity.toLocaleString()} L</span>
            <span>•</span>
            <span>Updated {tank.lastUpdated}</span>
          </div>
        </div>

        <Button variant="outline">
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
      </div>
    </div>
  )
}
