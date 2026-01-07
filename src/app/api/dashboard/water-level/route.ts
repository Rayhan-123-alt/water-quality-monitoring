import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const now = new Date()

  const startThisWeek = new Date()
  startThisWeek.setDate(now.getDate() - 7)

  const startLastWeek = new Date()
  startLastWeek.setDate(now.getDate() - 14)

  // === MINGGU INI ===
  const thisWeek = await prisma.sensorReading.aggregate({
    _avg: {
      waterLevel: true,
    },
    where: {
      recordedAt: {
        gte: startThisWeek,
      },
    },
  })

  // === MINGGU LALU ===
  const lastWeek = await prisma.sensorReading.aggregate({
    _avg: {
      waterLevel: true,
    },
    where: {
      recordedAt: {
        gte: startLastWeek,
        lt: startThisWeek,
      },
    },
  })

  const thisWeekAvg = thisWeek._avg.waterLevel ?? 0
  const lastWeekAvg = lastWeek._avg.waterLevel ?? 0

  const percentageChange =
    lastWeekAvg === 0
      ? 0
      : ((thisWeekAvg - lastWeekAvg) / lastWeekAvg) * 100

  return NextResponse.json({
    avgWaterLevel: Number(thisWeekAvg.toFixed(1)),
    percentageChange: Number(percentageChange.toFixed(1)),
  })
}
