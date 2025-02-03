"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

interface PointBasedSystemProps {
  passportId: string
  currentPoints: number
  onPointsUpdate: (newPoints: number) => void
}

export function PointBasedSystem({ passportId, currentPoints, onPointsUpdate }: PointBasedSystemProps) {
  const [selectedPoints, setSelectedPoints] = useState<string>("")
  const [reason, setReason] = useState("")
  const { toast } = useToast()

  const pointOptions = [-25, -20, -15, -10, -5, 5, 10, 15, 20, 25]

  const getTier = (points: number): string => {
    if (points >= 76) return "Elite"
    if (points >= 51) return "Tier 3"
    if (points >= 26) return "Tier 2"
    return "Tier 1"
  }

  const handleSubmit = () => {
    if (!selectedPoints || !reason) {
      toast({
        title: "Error",
        description: "Please select points and provide a reason.",
        variant: "destructive",
      })
      return
    }

    const newPoints = Math.max(0, Math.min(100, currentPoints + Number.parseInt(selectedPoints)))
    onPointsUpdate(newPoints)

    toast({
      title: "Points Updated",
      description: `${selectedPoints} points ${Number.parseInt(selectedPoints) >= 0 ? "added to" : "deducted from"} ${passportId}. New total: ${newPoints}`,
    })

    setSelectedPoints("")
    setReason("")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Point Based System</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label>Current Points</Label>
            <p className="text-2xl font-bold">{currentPoints}</p>
          </div>
          <div>
            <Label>Current Tier</Label>
            <p className="text-2xl font-bold">{getTier(currentPoints)}</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="points">Select Points</Label>
            <Select value={selectedPoints} onValueChange={setSelectedPoints}>
              <SelectTrigger id="points">
                <SelectValue placeholder="Select points" />
              </SelectTrigger>
              <SelectContent>
                {pointOptions.map((points) => (
                  <SelectItem key={points} value={points.toString()}>
                    {points > 0 ? `+${points}` : points}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="reason">Reason</Label>
            <Input
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Provide a reason for point change"
            />
          </div>
          <Button onClick={handleSubmit} className="w-full">
            Update Points
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

