import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const now = new Date()

  const startOfMonth = new Date(
    now.getFullYear(),
    now.getMonth(),
    1
  )

  const [totalPumps, pumpsThisMonth] = await Promise.all([
    prisma.pump.count(),
    prisma.pump.count({
      where: {
        createdAt: {
          gte: startOfMonth,
        },
      },
    }),
  ])

  return NextResponse.json({
    totalPumps,
    pumpsThisMonth,
  })
}
