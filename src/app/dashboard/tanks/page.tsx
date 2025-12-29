import { TankList } from "@/components/dashboard/tank-list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function TanksPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Water Tanks</h1>
          <p className="text-muted-foreground mt-1">Manage and monitor all your water tanks</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Tank
        </Button>
      </div>

      <TankList />
    </div>
  )
}
