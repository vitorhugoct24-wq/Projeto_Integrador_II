"use client"

import { useStore } from "@/lib/store"
import { StatusBadge } from "@/components/status-badge"
import type { Disponibilidade } from "@/lib/data"

export function LiveStatusBadge({
  itemId,
  statusInicial,
  className,
}: {
  itemId: string
  statusInicial: Disponibilidade
  className?: string
}) {
  const { getItem } = useStore()
  const status = getItem(itemId)?.status ?? statusInicial
  return <StatusBadge status={status} className={className} />
}
