import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Power, User, Clock } from "lucide-react"

// Mock pump activity data
const pumpActivities = [
  {
    id: "1",
    action: "ON",
    triggeredBy: "USER",
    triggeredByName: "John Doe",
    timestamp: "2024-01-15 14:32:15",
    duration: "Active",
  },
  {
    id: "2",
    action: "OFF",
    triggeredBy: "SYSTEM",
    triggeredByName: "Auto Schedule",
    timestamp: "2024-01-15 12:00:00",
    duration: "2h 32m",
  },
  {
    id: "3",
    action: "ON",
    triggeredBy: "USER",
    triggeredByName: "Jane Smith",
    timestamp: "2024-01-15 09:15:30",
    duration: "2h 45m",
  },
  {
    id: "4",
    action: "OFF",
    triggeredBy: "SYSTEM",
    triggeredByName: "Low Water Alert",
    timestamp: "2024-01-15 06:30:00",
    duration: "2h 45m",
  },
  {
    id: "5",
    action: "ON",
    triggeredBy: "USER",
    triggeredByName: "John Doe",
    timestamp: "2024-01-15 03:45:00",
    duration: "2h 45m",
  },
  {
    id: "6",
    action: "OFF",
    triggeredBy: "SYSTEM",
    triggeredByName: "Auto Schedule",
    timestamp: "2024-01-15 01:00:00",
    duration: "2h 45m",
  },
  {
    id: "7",
    action: "ON",
    triggeredBy: "USER",
    triggeredByName: "Jane Smith",
    timestamp: "2024-01-14 22:15:00",
    duration: "2h 45m",
  },
  {
    id: "8",
    action: "OFF",
    triggeredBy: "SYSTEM",
    triggeredByName: "Tank Full",
    timestamp: "2024-01-14 19:30:00",
    duration: "2h 45m",
  },
]

export function PumpActivityTable({ tankId }: { tankId: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Log</CardTitle>
        <CardDescription>Complete history of pump operations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Action</TableHead>
                <TableHead>Triggered By</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Duration</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pumpActivities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell>
                    <Badge
                      variant={activity.action === "ON" ? "default" : "secondary"}
                      className={cn("font-medium", activity.action === "ON" && "bg-success text-success-foreground")}
                    >
                      <Power className="h-3 w-3 mr-1" />
                      {activity.action}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-medium">
                      {activity.triggeredBy === "USER" ? (
                        <User className="h-3 w-3 mr-1" />
                      ) : (
                        <Clock className="h-3 w-3 mr-1" />
                      )}
                      {activity.triggeredBy}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{activity.triggeredByName}</TableCell>
                  <TableCell className="font-medium">{activity.timestamp}</TableCell>
                  <TableCell className="text-muted-foreground">{activity.duration}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
