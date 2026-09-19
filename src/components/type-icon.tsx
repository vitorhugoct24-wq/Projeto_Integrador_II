import { BookOpen, Puzzle, Music } from "lucide-react"
import type { ItemTipo } from "@/lib/data"

export function TypeIcon({
  tipo,
  className,
}: {
  tipo: ItemTipo
  className?: string
}) {
  if (tipo === "jogo") return <Puzzle className={className} aria-hidden />
  if (tipo === "instrumento") return <Music className={className} aria-hidden />
  return <BookOpen className={className} aria-hidden />
}
