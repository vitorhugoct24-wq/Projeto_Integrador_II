import type { Metadata } from "next"
import { AchadosClient } from "@/components/achados/achados-client"

export const metadata: Metadata = {
  title: "Achados e Perdidos",
  description: "Perdeu algo no CTBJ? Veja os itens encontrados pela escola e guardados na biblioteca.",
}

export default function AchadosPage() {
  return <AchadosClient />
}
