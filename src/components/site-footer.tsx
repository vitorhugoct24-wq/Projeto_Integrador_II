import Link from "next/link"
import { Library } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border bg-secondary/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm">
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Library className="size-4" aria-hidden />
            </span>
            <span className="font-serif text-base font-semibold text-foreground">CTBJeca</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            A biblioteca virtual do Colégio Técnico de Bom Jesus — Piauí. Descubra, reserve e
            compartilhe leituras com a comunidade escolar.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 text-sm">
          <div className="flex flex-col gap-2">
            <span className="font-medium text-foreground">Navegar</span>
            <Link href="/busca" className="text-muted-foreground hover:text-foreground">
              Buscar acervo
            </Link>
            <Link href="/quiz" className="text-muted-foreground hover:text-foreground">
              Quiz de Descoberta
            </Link>
            <Link href="/achados-e-perdidos" className="text-muted-foreground hover:text-foreground">
              Achados e Perdidos
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-medium text-foreground">Biblioteca</span>
            <span className="text-muted-foreground">Bloco Central · Térreo</span>
            <span className="text-muted-foreground">Seg a Sex · 7h às 18h</span>
            <Link href="/totem" className="text-muted-foreground hover:text-foreground">
              Modo Totem
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-border/60 py-4">
        <p className="mx-auto max-w-6xl px-4 text-xs text-muted-foreground">
          CTBJeca · Protótipo de interface. Dados fictícios para demonstração.
        </p>
      </div>
    </footer>
  )
}
