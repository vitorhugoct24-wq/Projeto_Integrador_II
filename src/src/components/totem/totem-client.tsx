"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Library, Search, X, MapPin, LogOut, Compass } from "lucide-react"
import { tiposLabel, type ItemTipo } from "@/lib/data"
import { useStore } from "@/lib/store"
import { TypeIcon } from "@/components/type-icon"
import { StatusBadge } from "@/components/status-badge"
import { cn } from "@/lib/utils"

const tipos = Object.keys(tiposLabel) as ItemTipo[]

export function TotemClient() {
  const { itens } = useStore()
  const [q, setQ] = useState("")
  const [tipo, setTipo] = useState<ItemTipo | null>(null)

  const resultados = useMemo(() => {
    const termo = q.trim().toLowerCase()
    return itens.filter((i) => {
      if (tipo && i.tipo !== tipo) return false
      if (termo) {
        const alvo = [i.titulo, i.autor, ...i.temas].join(" ").toLowerCase()
        if (!alvo.includes(termo)) return false
      }
      return true
    })
  }, [q, tipo, itens])

  const buscando = q.trim().length > 0 || tipo !== null

  return (
    <div className="flex min-h-dvh flex-col bg-primary text-primary-foreground">
      <header className="flex items-center justify-between gap-4 px-8 py-6">
        <div className="flex items-center gap-3">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-primary-foreground/10">
            <Library className="size-7" aria-hidden />
          </span>
          <div>
            <p className="font-serif text-2xl font-semibold">Biblioteca CTBJ</p>
            <p className="text-sm text-primary-foreground/60">Consulta rápida do acervo</p>
          </div>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-primary-foreground/10 px-4 py-3 text-sm font-medium transition-colors hover:bg-primary-foreground/20"
        >
          <LogOut className="size-4" aria-hidden />
          Sair do totem
        </Link>
      </header>

      <main className="flex-1 rounded-t-[2.5rem] bg-background px-6 py-8 text-foreground md:px-10">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-center font-serif text-3xl font-semibold text-balance md:text-4xl">
            O que você procura hoje?
          </h1>

          <div className="mt-6 flex items-center gap-3 rounded-2xl border-2 border-border bg-card px-5 py-4 shadow-sm focus-within:border-primary">
            <Search className="size-6 shrink-0 text-muted-foreground" aria-hidden />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Toque e digite o título, autor ou tema…"
              className="w-full bg-transparent text-lg outline-none placeholder:text-muted-foreground"
              aria-label="Buscar no acervo"
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
            />
            {q && (
              <button
                type="button"
                onClick={() => setQ("")}
                className="rounded-full p-2 text-muted-foreground hover:bg-muted"
                aria-label="Limpar"
              >
                <X className="size-5" />
              </button>
            )}
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {tipos.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTipo(tipo === t ? null : t)}
                aria-pressed={tipo === t}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-5 py-3 text-base font-medium transition-colors",
                  tipo === t
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-muted",
                )}
              >
                <TypeIcon tipo={t} className="size-5" />
                {tiposLabel[t]}
              </button>
            ))}
          </div>

          {!buscando && (
            <Link
              href="/quiz"
              className="mt-6 flex items-center justify-center gap-2 rounded-2xl bg-accent px-5 py-4 text-base font-semibold text-accent-foreground"
            >
              <Compass className="size-5" aria-hidden />
              Não sabe o que ler? Faça o Quiz de Descoberta
            </Link>
          )}

          <div className="mt-8">
            <p className="mb-4 text-sm text-muted-foreground">
              {buscando
                ? `${resultados.length} ${resultados.length === 1 ? "resultado" : "resultados"}`
                : "Acervo completo"}
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {resultados.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4"
                >
                  <div
                    className="flex size-16 shrink-0 items-center justify-center rounded-xl"
                    style={{ backgroundColor: item.corCapa, color: item.corTexto }}
                  >
                    <TypeIcon tipo={item.tipo} className="size-7" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-serif text-lg font-semibold">{item.titulo}</p>
                    <p className="truncate text-sm text-muted-foreground">{item.autor}</p>
                    <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="size-3.5" aria-hidden />
                      {item.estante}
                    </p>
                  </div>
                  <StatusBadge status={item.status} />
                </div>
              ))}
            </div>

            {resultados.length === 0 && (
              <div className="rounded-2xl border border-dashed border-border py-16 text-center">
                <p className="font-serif text-xl font-semibold">Nada encontrado</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Tente outro termo ou peça ajuda no balcão.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
