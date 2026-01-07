import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const now = new Date()

    // awal & akhir bulan ini
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59)

    const totalTanks = await prisma.toren.count()

    const tanksThisMonth = await prisma.toren.count({
      where: {
        createdAt: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
    })

    return NextResponse.json({
      totalTanks,
      tanksThisMonth,
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Failed to load dashboard stats" },
      { status: 500 }
    )
  }
}
