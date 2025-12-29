import { SensorHistoryTable } from "@/components/tables/sensor-history-table"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download } from "lucide-react"
import Link from "next/link"

export default function SensorHistoryPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Button variant="ghost" size="sm" asChild className="mb-2">
            <Link href={`/dashboard/tank/${params.id}`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Tank Details
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Sensor History</h1>
          <p className="text-muted-foreground">View detailed sensor readings over time</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      </div>

      <SensorHistoryTable tankId={params.id} />
    </div>
  )
}
