import { PumpActivityTable } from "@/components/tables/pump-activity-table"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download } from "lucide-react"
import Link from "next/link"

export default function PumpActivityPage({ params }: { params: { id: string } }) {
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
          <h1 className="text-3xl font-bold tracking-tight">Pump Activity Log</h1>
          <p className="text-muted-foreground">Complete history of pump operations</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Log
        </Button>
      </div>

      <PumpActivityTable tankId={params.id} />
    </div>
  )
}
