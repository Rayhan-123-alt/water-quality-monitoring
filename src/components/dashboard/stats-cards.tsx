import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Droplet, Power, Activity, TrendingUp } from "lucide-react"

const stats = [
  {
    title: "Total Tanks",
    value: "4",
    description: "Active water tanks",
    icon: Droplet,
    trend: "+2 this month",
  },
  {
    title: "Active Pumps",
    value: "2",
    description: "Currently running",
    icon: Power,
    trend: "50% capacity",
  },
  {
    title: "Avg Water Level",
    value: "78%",
    description: "Across all tanks",
    icon: Activity,
    trend: "+5% from last week",
  },
  {
    title: "Water Quality",
    value: "Good",
    description: "All sensors normal",
    icon: TrendingUp,
    trend: "No alerts",
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            <p className="text-xs text-primary mt-2">{stat.trend}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
