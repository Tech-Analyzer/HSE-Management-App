"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

interface BadgeCategory {
  name: string
  levels: [string, string, string]
}

const badgeCategories: BadgeCategory[] = [
  { name: "HSE Compliance", levels: ["Rule Rookie 🥉", "Safety Pro 🥈", "HSE Legend 🥇"] },
  { name: "Safety Leadership", levels: ["Starter Captain 🥉", "Squad Leader 🥈", "Safety MVP 🥇"] },
  { name: "Risk Management", levels: ["Risk Watcher 🥉", "Risk Handler 🥈", "Risk Mastermind 🥇"] },
  { name: "Permit To Work", levels: ["Permit Learner 🥉", "PTW Operator 🥈", "Permit Boss 🥇"] },
  { name: "Emergency Preparedness", levels: ["Fast Thinker 🥉", "Rescue Ready 🥈", "Emergency Ace 🥇"] },
  { name: "First Aid & Medical Safety", levels: ["First Aid Fresh 🥉", "Lifesaver Mode 🥈", "Rescue Pro 🥇"] },
  { name: "Environmental Awareness", levels: ["Eco Buddy 🥉", "Green Guardian 🥈", "Earth Defender 🥇"] },
  { name: "Fire Safety", levels: ["Fire Watch 🥉", "Flame Fighter 🥈", "Blaze Buster 🥇"] },
  { name: "Safe Lifting & Equipment Handling", levels: ["Lift Smart 🥉", "Heavy Handler 🥈", "Load Master 🥇"] },
  { name: "Work at Heights Safety", levels: ["Sky Cautious 🥉", "Ladder Boss 🥈", "High Flyer 🥇"] },
  { name: "PPE Rockstar", levels: ["Gear Rookie 🥉", "Shield Boss 🥈", "PPE Rockstar 🥇"] },
  { name: "Safety Awareness", levels: ["Aware Starter 🥉", "Safe Mindset 🥈", "Safety Rockstar 🥇"] },
]

interface BadgeAwardingSystemProps {
  passportId: string
  onBadgeAward: (category: string, level: string) => void
}

export function BadgeAwardingSystem({ passportId, onBadgeAward }: BadgeAwardingSystemProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [selectedLevel, setSelectedLevel] = useState<string>("")
  const { toast } = useToast()

  const handleAwardBadge = () => {
    if (!selectedCategory || !selectedLevel) {
      toast({
        title: "Error",
        description: "Please select both a category and a level.",
        variant: "destructive",
      })
      return
    }

    onBadgeAward(selectedCategory, selectedLevel)

    toast({
      title: "Badge Awarded",
      description: `${selectedLevel} badge awarded to ${passportId} in ${selectedCategory} category.`,
    })

    setSelectedCategory("")
    setSelectedLevel("")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Badge Awarding System</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category">Select Badge Category</Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {badgeCategories.map((category) => (
                  <SelectItem key={category.name} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {selectedCategory && (
            <div className="space-y-2">
              <Label htmlFor="level">Select Badge Level</Label>
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger id="level">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  {badgeCategories
                    .find((category) => category.name === selectedCategory)
                    ?.levels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <Button onClick={handleAwardBadge} className="w-full">
            Award Badge
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

