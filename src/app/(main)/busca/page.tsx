import type { Metadata } from "next"
import { BuscaClient } from "@/components/busca/busca-client"

export const metadata: Metadata = {
  title: "Busca no acervo",
  description: "Busque livros, jogos e instrumentos do acervo do CTBJeca por título, autor, tema ou clima de leitura.",
}

export default function BuscaPage() {
  return <BuscaClient />
}
