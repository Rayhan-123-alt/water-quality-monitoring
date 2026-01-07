"use client"

import useSWR from "swr"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Droplet, Power, Activity, TrendingUp } from "lucide-react"

type DashboardStats = {
  totalTanks: number
  tanksThisMonth: number
}

type PumpStats = {
  totalPumps: number
  pumpsThisMonth: number
}

type WaterLevelStats = {
  avgWaterLevel: number
  percentageChange: number
}

type WaterQuality = {
  quality: "GOOD" | "WARNING"
  avgPh: number | null
  avgChlorine: number | null
  avgTemperature: number | null
}

const fetcher = (url: string) => fetch(url).then(res => res.json())

export function StatsCards() {
  const { data: stats, isLoading, error } = useSWR<DashboardStats>(
    "/api/dashboard/stats",
    fetcher,
    {
      refreshInterval: 1000,
    }
  )

  const { data: pumpStats } = useSWR<PumpStats>(
    "/api/dashboard/pumps",
    fetcher,
    { refreshInterval: 1000 }
  )

  const { data: waterLevel } = useSWR<WaterLevelStats>(
    "/api/dashboard/water-level",
    fetcher,
    { refreshInterval: 1000 }
  )

  const { data: quality } = useSWR<WaterQuality>(
    "/api/dashboard/water-quality",
    fetcher,
    { refreshInterval: 1000 }
  )

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* TOTAL TANKS - Biru lembut */}
      <Card className="bg-blue-50/50 border-blue-200">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-blue-900">Total Tanks</CardTitle>
          <Droplet className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-900">
            {isLoading ? "-" : stats?.totalTanks}
          </div>
          <p className="text-xs text-blue-700 mt-1">
            Active water tanks
          </p>
          <p className="text-xs text-blue-600 font-medium mt-2">
            {!isLoading && stats
              ? `+${stats.tanksThisMonth} this month`
              : ""}
          </p>
        </CardContent>
      </Card>

      {/* ACTIVE PUMPS - Hijau lembut */}
      <Card className="bg-green-50/50 border-green-200">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-green-900">
            Active Pumps
          </CardTitle>
          <Power className="h-4 w-4 text-green-600" />
        </CardHeader>

        <CardContent>
          <div className="text-2xl font-bold text-green-900">
            {pumpStats?.totalPumps ?? "-"}
          </div>

          <p className="text-xs text-green-700 mt-1">
            All pumps existing
          </p>

          <p className="text-xs text-green-600 font-medium mt-2">
            {pumpStats
              ? `+${pumpStats.pumpsThisMonth} this month`
              : ""}
          </p>
        </CardContent>
      </Card>


      {/* AVG WATER LEVEL - Teal/Cyan */}
      <Card className="bg-teal-50/50 border-teal-200">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-teal-900">
            Avg Water Level
          </CardTitle>
          <Activity className="h-4 w-4 text-teal-600" />
        </CardHeader>

        <CardContent>
          <div className="text-2xl font-bold text-teal-900">
            {waterLevel ? `${waterLevel.avgWaterLevel}%` : "-"}
          </div>

          <p className="text-xs text-teal-700 mt-1">
            Across all tanks (7 days)
          </p>

          {waterLevel && (
            <p
              className={`text-xs font-medium mt-2 ${
                waterLevel.percentageChange >= 0
                  ? "text-teal-600"
                  : "text-red-600"
              }`}
            >
              {waterLevel.percentageChange >= 0 ? "+" : ""}
              {waterLevel.percentageChange}% from last week
            </p>
          )}
        </CardContent>
      </Card>


      {/* WATER QUALITY - Ungu */}
      <Card className="bg-purple-50/50 border-purple-200">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-purple-900">
            Water Quality
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-purple-600" />
        </CardHeader>

        <CardContent>
          <div
            className={`text-2xl font-bold ${
              quality?.quality === "GOOD"
                ? "text-purple-900"
                : "text-red-600"
            }`}
          >
            {quality?.quality ?? "-"}
          </div>

          <p className="text-xs text-purple-700 mt-1">
            {quality?.quality === "GOOD"
              ? "All sensors are normal"
              : "One or more values out of range"}
          </p>

          {quality && (
            <p className="text-xs text-purple-600 font-medium mt-2">
              pH {quality.avgPh?.toFixed(2)} •
              Cl {quality.avgChlorine?.toFixed(2)} •
              Temp {quality.avgTemperature?.toFixed(1)}°C
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}