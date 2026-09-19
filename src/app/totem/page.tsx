import type { Metadata } from "next"
import { TotemClient } from "@/components/totem/totem-client"

export const metadata: Metadata = {
  title: "Modo Totem · Biblioteca CTBJ",
  description: "Consulta rápida do acervo no totem da biblioteca do CTBJ.",
}

export default function TotemPage() {
  return <TotemClient />
}
