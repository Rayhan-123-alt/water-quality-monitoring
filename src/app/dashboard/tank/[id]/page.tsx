import { TankHeader } from "@/components/tank/tank-header"
import { SensorCards } from "@/components/tank/sensor-cards"
import { SensorCharts } from "@/components/tank/sensor-charts"
import { PumpControl } from "@/components/tank/pump-control"

// Mock data for demonstration
const tankData = {
  id: "1",
  name: "Main Tank",
  location: "Rooftop - North",
  capacity: 5000,
  waterLevel: 85,
  pumpStatus: "ON",
  lastUpdated: "2 minutes ago",
}

export default function TankDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <TankHeader tank={tankData} />

      <SensorCards tankId={params.id} />

      <div className="grid gap-6 lg:grid-cols-2">
        <SensorCharts />
        <PumpControl tankId={params.id} currentStatus={tankData.pumpStatus} />
      </div>
    </div>
  )
}
