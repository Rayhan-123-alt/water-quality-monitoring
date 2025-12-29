import { StatsCards } from "@/components/dashboard/stats-cards"
import { TankList } from "@/components/dashboard/tank-list"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Monitor all your water tanks in one place</p>
      </div>

      <StatsCards />

      <div>
        <h2 className="text-2xl font-semibold mb-4">Water Tanks</h2>
        <TankList />
      </div>
    </div>
  )
}
