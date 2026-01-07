"use client"

import useSWR from "swr"
import { TankCard } from "@/components/dashboard/tank-card"
import { Skeleton } from "@/components/ui/skeleton"

const fetcher = (url: string) => fetch(url).then(res => res.json())

type Tank = {
  id: string
  name: string
  location: string
  capacity: number
  waterLevel: number
  pumpStatus: "ON" | "OFF"
  lastUpdated: string
  sensorData: {
    ph: number
    chlorine: number
    temperature: number
  }
}

export function TankList() {
  const { data: tanks, isLoading } = useSWR<Tank[]>(
    "/api/dashboard/tanks",
    fetcher,
    { refreshInterval: 1000 }
  )

  if (isLoading) {
    return <TankListSkeleton />
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {tanks?.map((tank) => (
        <TankCard key={tank.id} tank={tank} />
      ))}
    </div>
  )
}

// ✨ Modern & Professional Skeleton
function TankListSkeleton() {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-white to-gray-50 shadow-sm"
        >
          {/* Shimmer animation */}
          <div className="animate-pulse">
            {/* Header */}
            <div className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <Skeleton className="h-5 w-32 rounded-md" />
                  <Skeleton className="mt-2 h-4 w-24 rounded" />
                </div>
                <Skeleton className="h-8 w-16 rounded-full" />
              </div>

              {/* Water level bar */}
              <div className="mt-4">
                <Skeleton className="h-2 w-full rounded-full" />
                <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                  <Skeleton className="h-3 w-10" />
                  <Skeleton className="h-3 w-12" />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="mx-5 h-px bg-border" />

            {/* Sensor data grid */}
            <div className="p-5">
              <div className="grid grid-cols-3 gap-3">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="space-y-2">
                    <Skeleton className="h-4 w-10 rounded" />
                    <Skeleton className="h-6 w-16 rounded-lg" />
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-4 flex items-center justify-between">
                <Skeleton className="h-4 w-24 rounded" />
                <Skeleton className="h-3 w-20 rounded" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}