import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Mock sensor history data
const sensorHistory = [
  {
    id: "1",
    recordedAt: "2024-01-15 14:30:00",
    ph: 7.2,
    chlorine: 1.5,
    temperature: 24,
    waterLevel: 85,
  },
  {
    id: "2",
    recordedAt: "2024-01-15 14:00:00",
    ph: 7.1,
    chlorine: 1.4,
    temperature: 24,
    waterLevel: 84,
  },
  {
    id: "3",
    recordedAt: "2024-01-15 13:30:00",
    ph: 7.3,
    chlorine: 1.6,
    temperature: 25,
    waterLevel: 83,
  },
  {
    id: "4",
    recordedAt: "2024-01-15 13:00:00",
    ph: 7.2,
    chlorine: 1.5,
    temperature: 25,
    waterLevel: 82,
  },
  {
    id: "5",
    recordedAt: "2024-01-15 12:30:00",
    ph: 7.0,
    chlorine: 1.3,
    temperature: 23,
    waterLevel: 81,
  },
  {
    id: "6",
    recordedAt: "2024-01-15 12:00:00",
    ph: 7.1,
    chlorine: 1.4,
    temperature: 23,
    waterLevel: 80,
  },
  {
    id: "7",
    recordedAt: "2024-01-15 11:30:00",
    ph: 7.2,
    chlorine: 1.5,
    temperature: 22,
    waterLevel: 79,
  },
  {
    id: "8",
    recordedAt: "2024-01-15 11:00:00",
    ph: 7.3,
    chlorine: 1.6,
    temperature: 22,
    waterLevel: 78,
  },
]

export function SensorHistoryTable({ tankId }: { tankId: string }) {
  const getStatusBadge = (value: number, min: number, max: number) => {
    if (value >= min && value <= max) {
      return <Badge className="bg-success text-success-foreground">Normal</Badge>
    }
    return <Badge variant="destructive">Alert</Badge>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sensor Readings</CardTitle>
        <CardDescription>Historical data from all sensors</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Recorded At</TableHead>
                <TableHead>pH Level</TableHead>
                <TableHead>Chlorine (mg/L)</TableHead>
                <TableHead>Temperature (°C)</TableHead>
                <TableHead>Water Level (%)</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sensorHistory.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.recordedAt}</TableCell>
                  <TableCell>{record.ph}</TableCell>
                  <TableCell>{record.chlorine}</TableCell>
                  <TableCell>{record.temperature}</TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "font-medium",
                        record.waterLevel >= 70
                          ? "text-success"
                          : record.waterLevel >= 40
                            ? "text-warning"
                            : "text-destructive",
                      )}
                    >
                      {record.waterLevel}%
                    </span>
                  </TableCell>
                  <TableCell>{getStatusBadge(record.ph, 6.5, 8.5)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
