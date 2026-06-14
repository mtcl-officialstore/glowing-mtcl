"use client"

import { Check, ChevronDown, Sparkles } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MODELS, getModel } from "@/lib/models"
import { cn } from "@/lib/utils"

export function ModelSelector({
  value,
  onChange,
}: {
  value: string
  onChange: (id: string) => void
}) {
  const active = getModel(value)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-9 gap-1.5 px-2.5 font-medium">
          <Sparkles className="size-4 text-primary" />
          <span className="text-sm">{active.name}</span>
          <ChevronDown className="size-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-72">
        <DropdownMenuLabel>Choose a model</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {MODELS.map((model) => (
          <DropdownMenuItem
            key={model.id}
            onClick={() => onChange(model.id)}
            className="flex items-start gap-2 py-2"
          >
            <Check
              className={cn(
                "mt-0.5 size-4 shrink-0",
                model.id === value ? "opacity-100 text-primary" : "opacity-0",
              )}
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium leading-tight">
                {model.name}
                <span className="ml-1.5 text-xs font-normal text-muted-foreground">{model.provider}</span>
              </span>
              <span className="text-xs text-muted-foreground">{model.description}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
