"use client"

import { useStore } from "@/lib/store"
import { StatusBadge } from "@/components/status-badge"
import { ReservaButton } from "@/components/item/reserva-button"
import type { Disponibilidade } from "@/lib/data"

export function ItemStatusLive({
  itemId,
  statusInicial,
  titulo,
}: {
  itemId: string
  statusInicial: Disponibilidade
  titulo: string
}) {
  const { getItem } = useStore()
  const status = getItem(itemId)?.status ?? statusInicial

  return (
    <div className="space-y-3">
      <StatusBadge status={status} className="w-fit" />
      <ReservaButton status={status} titulo={titulo} />
    </div>
  )
}
