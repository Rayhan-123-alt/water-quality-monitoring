"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Power, Clock, User } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface PumpControlProps {
  tankId: string
  currentStatus: string
}

export function PumpControl({ tankId, currentStatus }: PumpControlProps) {
  const [pumpStatus, setPumpStatus] = useState(currentStatus)
  const [isLoading, setIsLoading] = useState(false)

  const handleTogglePump = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setPumpStatus((prev) => (prev === "ON" ? "OFF" : "ON"))
    setIsLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pump Control</CardTitle>
        <CardDescription>Manage pump operation and view activity</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-sm font-medium">Current Status</div>
            <Badge
              variant={pumpStatus === "ON" ? "default" : "secondary"}
              className={cn("text-sm", pumpStatus === "ON" && "bg-success text-success-foreground")}
            >
              <Power className="h-3 w-3 mr-1" />
              {pumpStatus}
            </Badge>
          </div>
          <Button
            size="lg"
            variant={pumpStatus === "ON" ? "destructive" : "default"}
            onClick={handleTogglePump}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : pumpStatus === "ON" ? "Turn OFF" : "Turn ON"}
          </Button>
        </div>

        <Separator />

        <div className="space-y-4">
          <h4 className="text-sm font-medium">Recent Activity</h4>

          <div className="space-y-3">
            <div className="flex items-start gap-3 text-sm">
              <div className="rounded-full bg-success/10 p-2">
                <Power className="h-3 w-3 text-success" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Pump turned ON</span>
                  <span className="text-xs text-muted-foreground">2 min ago</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <User className="h-3 w-3" />
                  <span>Triggered by USER</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 text-sm">
              <div className="rounded-full bg-muted p-2">
                <Power className="h-3 w-3 text-muted-foreground" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Pump turned OFF</span>
                  <span className="text-xs text-muted-foreground">2 hours ago</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>Triggered by SYSTEM</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 text-sm">
              <div className="rounded-full bg-success/10 p-2">
                <Power className="h-3 w-3 text-success" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Pump turned ON</span>
                  <span className="text-xs text-muted-foreground">5 hours ago</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <User className="h-3 w-3" />
                  <span>Triggered by USER</span>
                </div>
              </div>
            </div>
          </div>

          <Button variant="outline" className="w-full bg-transparent" asChild>
            <a href={`/dashboard/tank/${tankId}/pump-activities`}>View Full Activity Log</a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
