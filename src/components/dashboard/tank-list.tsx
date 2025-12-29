import { TankCard } from "@/components/dashboard/tank-card"

const tanks = [
  {
    id: "1",
    name: "Main Tank",
    location: "Rooftop - North",
    capacity: 5000,
    waterLevel: 85,
    pumpStatus: "ON",
    lastUpdated: "2 minutes ago",
    sensorData: {
      ph: 7.2,
      chlorine: 1.5,
      temperature: 24,
    },
  },
  {
    id: "2",
    name: "Secondary Tank",
    location: "Ground Floor - East",
    capacity: 3000,
    waterLevel: 62,
    pumpStatus: "OFF",
    lastUpdated: "5 minutes ago",
    sensorData: {
      ph: 7.4,
      chlorine: 1.3,
      temperature: 22,
    },
  },
  {
    id: "3",
    name: "Backup Tank",
    location: "Basement - West",
    capacity: 4000,
    waterLevel: 45,
    pumpStatus: "OFF",
    lastUpdated: "10 minutes ago",
    sensorData: {
      ph: 7.0,
      chlorine: 1.8,
      temperature: 20,
    },
  },
  {
    id: "4",
    name: "Emergency Tank",
    location: "Rooftop - South",
    capacity: 2000,
    waterLevel: 95,
    pumpStatus: "ON",
    lastUpdated: "1 minute ago",
    sensorData: {
      ph: 7.3,
      chlorine: 1.6,
      temperature: 25,
    },
  },
]

export function TankList() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {tanks.map((tank) => (
        <TankCard key={tank.id} tank={tank} />
      ))}
    </div>
  )
}
