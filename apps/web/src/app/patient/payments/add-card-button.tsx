"use client"

import { toast } from "sonner"

import { Button } from "@/components/ui/button"

export function AddCardButton() {
  return (
    <Button size="sm" variant="outline" onClick={() => toast("Adding a card isn't available in this preview.")}>
      Add card
    </Button>
  )
}
