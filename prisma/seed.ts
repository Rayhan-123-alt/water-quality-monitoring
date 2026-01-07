import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

// helpers
const randomBetween = (min: number, max: number) =>
  Math.random() * (max - min) + min;

const randomDateInPast = (days = 30) => {
  const now = Date.now();
  const past = now - days * 24 * 60 * 60 * 1000;
  return new Date(randomBetween(past, now));
};

// water level by status
function waterLevelByStatus(
  status: "AMAN" | "RENDAH" | "KRITIS"
) {
  if (status === "KRITIS") return randomBetween(3, 15);
  if (status === "RENDAH") return randomBetween(20, 35);
  return randomBetween(55, 85); // AMAN
}

// create readings, terakhir sesuai status
function createReadings(torenId: string, latestStatus: "AMAN" | "RENDAH" | "KRITIS", count = 5) {
  const readings = Array.from({ length: count }).map(() => ({
    torenId,
    ph: randomBetween(6.6, 7.4),
    chlorine: randomBetween(0.2, 0.5),
    temperature: randomBetween(24, 28),
    waterLevel: waterLevelByStatus("AMAN"), // default aman untuk semua kecuali terakhir
    recordedAt: randomDateInPast(30),
  }));

  // terakhir override sesuai status
  readings[count - 1].waterLevel = waterLevelByStatus(latestStatus);
  readings[count - 1].recordedAt = new Date(); // terakhir = sekarang

  return readings;
}

async function main() {
  // 1. User
  const hashedPassword = await bcrypt.hash("demo12345", 10);
  const randomEmail = `demo_${Date.now()}@aq.io`;

  const user = await prisma.user.create({
    data: {
      name: "Demo User",
      email: randomEmail,
      password: hashedPassword,
    },
  });

  // 2. Buat 3 Toren sekaligus
  const torenStatuses: ("KRITIS" | "RENDAH" | "AMAN")[] = ["KRITIS", "RENDAH", "AMAN"];
  for (const status of torenStatuses) {
    const capacityLiter = Math.floor(randomBetween(600, 1000));
    const toren = await prisma.toren.create({
      data: {
        name: `Toren ${status} Demo`,
        location: "Atap Genteng",
        capacityLiter,
        userId: user.id,
      },
    });

    // 3. Pump
    await prisma.pump.create({
      data: {
        name: `Pompa ${status}`,
        torenId: toren.id,
        isActive: false,
      },
    });

    // 4. Sensor readings
    const readings = createReadings(toren.id, status);
    await prisma.sensorReading.createMany({ data: readings });
  }

  console.log("Seed 3 toren dengan status berbeda done 🌱");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
