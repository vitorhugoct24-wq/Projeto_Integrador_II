"use client"

import { useMemo, useState } from "react"
import { MapPin, CalendarDays, Search, PackageCheck } from "lucide-react"
import { useStore } from "@/lib/store"
import { cn } from "@/lib/utils"

type Filtro = "todos" | "aguardando" | "devolvido"

const filtros: { valor: Filtro; rotulo: string }[] = [
  { valor: "todos", rotulo: "Todos" },
  { valor: "aguardando", rotulo: "Aguardando dono" },
  { valor: "devolvido", rotulo: "Já devolvidos" },
]

export function AchadosClient() {
  const { achados } = useStore()
  const [q, setQ] = useState("")
  const [filtro, setFiltro] = useState<Filtro>("todos")

  const lista = useMemo(() => {
    const termo = q.trim().toLowerCase()
    return achados.filter((a) => {
      if (filtro !== "todos" && a.status !== filtro) return false
      if (termo) {
        const alvo = `${a.nome} ${a.descricao} ${a.local}`.toLowerCase()
        if (!alvo.includes(termo)) return false
      }
      return true
    })
  }, [q, filtro, achados])

  const aguardando = achados.filter((a) => a.status === "aguardando").length

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="max-w-2xl">
        <h1 className="font-serif text-3xl font-semibold text-foreground text-balance">
          Achados e Perdidos
        </h1>
        <p className="mt-2 text-muted-foreground">
          Objetos encontrados pela escola ficam guardados na biblioteca. Reconheceu algo seu?
          Passe no balcão com a descrição para retirar. Temos{" "}
          <span className="font-semibold text-foreground">{aguardando} itens</span> esperando dono.
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-ring">
          <Search className="size-5 shrink-0 text-muted-foreground" aria-hidden />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="O que você perdeu? Ex.: garrafa, fone, chave…"
            className="w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"
            aria-label="Buscar item perdido"
          />
        </div>
        <div className="flex gap-2">
          {filtros.map((f) => (
            <button
              key={f.valor}
              type="button"
              onClick={() => setFiltro(f.valor)}
              aria-pressed={filtro === f.valor}
              className={cn(
                "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                filtro === f.valor
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-muted",
              )}
            >
              {f.rotulo}
            </button>
          ))}
        </div>
      </div>

      {lista.length > 0 ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {lista.map((a) => (
            <article
              key={a.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
            >
              <div
                className="flex h-32 items-center justify-center text-5xl"
                style={{ backgroundColor: a.corBg }}
                aria-hidden
              >
                {a.emoji}
              </div>
              <div className="flex flex-1 flex-col p-4">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="font-serif text-lg font-semibold text-foreground">{a.nome}</h2>
                  <span
                    className={cn(
                      "shrink-0 rounded-full px-2.5 py-1 text-xs font-medium",
                      a.status === "aguardando"
                        ? "bg-accent/25 text-accent-foreground"
                        : "bg-success/15 text-success",
                    )}
                  >
                    {a.status === "aguardando" ? "Aguardando" : "Devolvido"}
                  </span>
                </div>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{a.descricao}</p>
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="size-3.5" aria-hidden />
                    {a.local}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays className="size-3.5" aria-hidden />
                    {a.data}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-16 text-center">
          <PackageCheck className="size-10 text-muted-foreground" aria-hidden />
          <p className="mt-4 font-serif text-lg font-semibold text-foreground">
            Nenhum item por aqui
          </p>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            Não encontramos nada com esse termo. Se você perdeu algo recentemente, passe no balcão
            da biblioteca — nem tudo é cadastrado no mesmo dia.
          </p>
        </div>
      )}
    </div>
  )
}
