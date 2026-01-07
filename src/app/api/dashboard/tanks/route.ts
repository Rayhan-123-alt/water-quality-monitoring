import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  const torens = await prisma.toren.findMany({
    include: {
      sensorReadings: {
        orderBy: { recordedAt: "desc" },
        take: 1, // sensor TERBARU
      },
    },
  })

  const result = torens.map((toren) => {
    const sensor = toren.sensorReadings[0]

    return {
      id: toren.id,
      name: toren.name,
      location: toren.location,
      capacity: toren.capacityLiter,
      waterLevel: sensor?.waterLevel ?? 0,
      pumpStatus: sensor && sensor.waterLevel < 30 ? "ON" : "OFF",
      lastUpdated: sensor
        ? new Date(sensor.recordedAt).toLocaleString()
        : "-",
      sensorData: {
        ph: sensor?.ph ?? 0,
        chlorine: sensor?.chlorine ?? 0,
        temperature: sensor?.temperature ?? 0,
      },
    }
  })

  return NextResponse.json(result)
}
