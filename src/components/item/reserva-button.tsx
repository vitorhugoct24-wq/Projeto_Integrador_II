"use client"

import { useState } from "react"
import { Check, BookMarked, Bell } from "lucide-react"
import type { Disponibilidade } from "@/lib/data"
import { cn } from "@/lib/utils"

export function ReservaButton({
  status,
  titulo,
}: {
  status: Disponibilidade
  titulo: string
}) {
  const [feito, setFeito] = useState(false)

  const disponivel = status === "disponivel"
  const label = disponivel ? "Reservar para retirada" : "Avisar quando chegar"

  if (feito) {
    return (
      <div className="rounded-xl bg-success/15 p-4 text-center ring-1 ring-success/25">
        <Check className="mx-auto size-6 text-success" aria-hidden />
        <p className="mt-2 text-sm font-semibold text-foreground">
          {disponivel ? "Reserva confirmada!" : "Vamos te avisar!"}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          {disponivel
            ? "Retire na biblioteca em até 24h. Guardamos pra você."
            : `Você entra na fila de espera de "${titulo}".`}
        </p>
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => setFeito(true)}
      className={cn(
        "flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold shadow-sm transition-transform hover:-translate-y-0.5",
        disponivel
          ? "bg-primary text-primary-foreground"
          : "bg-accent text-accent-foreground",
      )}
    >
      {disponivel ? <BookMarked className="size-4" aria-hidden /> : <Bell className="size-4" aria-hidden />}
      {label}
    </button>
  )
}
