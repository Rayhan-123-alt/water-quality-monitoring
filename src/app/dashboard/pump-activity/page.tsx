import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Power } from "lucide-react"
import { cn } from "@/lib/utils"

const tanks = [
  { id: "1", name: "Main Tank", location: "Rooftop - North", pumpStatus: "ON", lastActivity: "2 min ago" },
  { id: "2", name: "Secondary Tank", location: "Ground Floor - East", pumpStatus: "OFF", lastActivity: "1 hour ago" },
  { id: "3", name: "Backup Tank", location: "Basement - West", pumpStatus: "OFF", lastActivity: "3 hours ago" },
  { id: "4", name: "Emergency Tank", location: "Rooftop - South", pumpStatus: "ON", lastActivity: "5 min ago" },
]

export default function AllPumpActivityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Pump Activity</h1>
        <p className="text-muted-foreground mt-1">Monitor pump operations across all tanks</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {tanks.map((tank) => (
          <Card key={tank.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">{tank.name}</h3>
                  <Badge
                    variant={tank.pumpStatus === "ON" ? "default" : "secondary"}
                    className={cn(tank.pumpStatus === "ON" && "bg-success text-success-foreground")}
                  >
                    <Power className="h-3 w-3 mr-1" />
                    {tank.pumpStatus}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{tank.location}</p>
                <p className="text-xs text-muted-foreground">Last activity: {tank.lastActivity}</p>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/dashboard/tank/${tank.id}/pump-activities`}>
                  View Log
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
