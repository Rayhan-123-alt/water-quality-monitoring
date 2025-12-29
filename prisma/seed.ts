import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 1. User
  const user = await prisma.user.create({
    data: {
      name: "Demo User",
      email: "demo@water.io",
    },
  });

  // 2. Toren
  const toren = await prisma.toren.create({
    data: {
      name: "Toren Rumah",
      location: "Atap Rumah",
      capacityLiter: 1000,
      userId: user.id,
    },
  });

  // 3. Pump
  const pump = await prisma.pump.create({
    data: {
      name: "Pompa Utama",
      torenId: toren.id,
    },
  });

  // 4. Sensor dummy (24 jam)
  const readings = Array.from({ length: 24 }).map((_, i) => ({
    torenId: toren.id,
    ph: 6.5 + Math.random(),
    chlorine: 0.2 + Math.random() * 0.3,
    temperature: 24 + Math.random() * 4,
    waterLevel: 30 + Math.random() * 70,
    recordedAt: new Date(Date.now() - i * 60 * 60 * 1000),
  }));

  await prisma.sensorReading.createMany({
    data: readings,
  });
}

main()
  .then(() => console.log("Seed done 🌱"))
  .catch(console.error)
  .finally(() => prisma.$disconnect());
