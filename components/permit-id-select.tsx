import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface PermitIdSelectProps {
  permitIds: { id: string; status: "Open" | "Closing Today" }[]
  value: string
  onValueChange: (value: string) => void
}

export function PermitIdSelect({ permitIds, value, onValueChange }: PermitIdSelectProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
          {value ? permitIds.find((permit) => permit.id === value)?.id : "Select Permit ID..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search Permit ID..." />
          <CommandList>
            <CommandEmpty>No Permit ID found.</CommandEmpty>
            <CommandGroup>
              {permitIds.map((permit) => (
                <CommandItem
                  key={permit.id}
                  onSelect={() => {
                    onValueChange(permit.id === value ? "" : permit.id)
                    setOpen(false)
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === permit.id ? "opacity-100" : "opacity-0")} />
                  {permit.id}
                  <span className="ml-auto text-sm text-muted-foreground">{permit.status}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

