import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  const avg = await prisma.sensorReading.aggregate({
    _avg: {
      ph: true,
      chlorine: true,
      temperature: true,
    },
  })

  let quality = "WARNING"

  if (
    avg._avg.ph !== null &&
    avg._avg.chlorine !== null &&
    avg._avg.temperature !== null &&
    avg._avg.ph >= 6.5 &&
    avg._avg.ph <= 8.5 &&
    avg._avg.chlorine >= 0.2 &&
    avg._avg.chlorine <= 0.5 &&
    avg._avg.temperature >= 20 &&
    avg._avg.temperature <= 30
  ) {
    quality = "GOOD"
  }

  return NextResponse.json({
    avgPh: avg._avg.ph,
    avgChlorine: avg._avg.chlorine,
    avgTemperature: avg._avg.temperature,
    quality,
  })
}
