// app/actions/pump.ts
"use server";

import { prisma } from "@/lib/prisma";

export async function togglePump(pumpId: string, isOn: boolean) {
  await prisma.pump.update({
    where: { id: pumpId },
    data: {
      isActive: isOn,
      lastActivatedAt: new Date(),
      activities: {
        create: {
          action: isOn ? "ON" : "OFF",
          triggeredBy: "USER",
        },
      },
    },
  });
}
