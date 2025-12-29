import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const tanks = [
  { id: "1", name: "Main Tank", location: "Rooftop - North" },
  { id: "2", name: "Secondary Tank", location: "Ground Floor - East" },
  { id: "3", name: "Backup Tank", location: "Basement - West" },
  { id: "4", name: "Emergency Tank", location: "Rooftop - South" },
]

export default function AllSensorsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Sensor History</h1>
        <p className="text-muted-foreground mt-1">View sensor data for all water tanks</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {tanks.map((tank) => (
          <Card key={tank.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">{tank.name}</h3>
                <p className="text-sm text-muted-foreground">{tank.location}</p>
                <Badge variant="secondary">Last updated: 5 min ago</Badge>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/dashboard/tank/${tank.id}/sensors`}>
                  View History
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
