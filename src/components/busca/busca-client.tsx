"use client"

import { useMemo, useState } from "react"
import { Search, SlidersHorizontal, X, PackageSearch } from "lucide-react"
import {
  itens,
  tiposLabel,
  statusLabel,
  type ItemTipo,
  type Disponibilidade,
} from "@/lib/data"
import { ItemCard } from "@/components/item-card"
import { cn } from "@/lib/utils"

const tipos = Object.keys(tiposLabel) as ItemTipo[]
const status = Object.keys(statusLabel) as Disponibilidade[]

const disciplinas = Array.from(
  new Set(itens.map((i) => i.disciplina).filter(Boolean) as string[]),
).sort()

const climas = Array.from(new Set(itens.flatMap((i) => i.clima))).sort()

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
        active
          ? "bg-primary text-primary-foreground"
          : "bg-secondary text-secondary-foreground hover:bg-muted",
      )}
    >
      {children}
    </button>
  )
}

function FilterGroup({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  )
}

export function BuscaClient() {
  const [q, setQ] = useState("")
  const [tipo, setTipo] = useState<ItemTipo | null>(null)
  const [disciplina, setDisciplina] = useState<string | null>(null)
  const [clima, setClima] = useState<string | null>(null)
  const [disp, setDisp] = useState<Disponibilidade | null>(null)

  const temFiltro = Boolean(tipo || disciplina || clima || disp)

  const resultados = useMemo(() => {
    const termo = q.trim().toLowerCase()
    return itens.filter((i) => {
      if (tipo && i.tipo !== tipo) return false
      if (disciplina && i.disciplina !== disciplina) return false
      if (clima && !i.clima.includes(clima)) return false
      if (disp && i.status !== disp) return false
      if (termo) {
        const alvo = [i.titulo, i.autor, i.disciplina ?? "", ...i.temas, ...i.clima]
          .join(" ")
          .toLowerCase()
        if (!alvo.includes(termo)) return false
      }
      return true
    })
  }, [q, tipo, disciplina, clima, disp])

  function limpar() {
    setTipo(null)
    setDisciplina(null)
    setClima(null)
    setDisp(null)
    setQ("")
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="max-w-2xl">
        <h1 className="font-serif text-3xl font-semibold text-foreground text-balance">
          Buscar no acervo
        </h1>
        <p className="mt-2 text-muted-foreground">
          Procure diretamente pelo que você já conhece ou explore por tipo, disciplina e clima de
          leitura para descobrir algo novo.
        </p>
      </div>

      <div className="mt-6 flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-ring">
        <Search className="size-5 shrink-0 text-muted-foreground" aria-hidden />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Título, autor, disciplina ou tema…"
          className="w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"
          aria-label="Buscar no acervo"
        />
        {q && (
          <button
            type="button"
            onClick={() => setQ("")}
            className="rounded-full p-1 text-muted-foreground hover:bg-muted"
            aria-label="Limpar busca"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-secondary/40 p-5">
        <div className="mb-4 flex items-center justify-between">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
            <SlidersHorizontal className="size-4" aria-hidden />
            Explorar por
          </span>
          {temFiltro && (
            <button
              type="button"
              onClick={limpar}
              className="text-xs font-medium text-primary hover:underline"
            >
              Limpar filtros
            </button>
          )}
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <FilterGroup label="Tipo">
            {tipos.map((t) => (
              <Chip key={t} active={tipo === t} onClick={() => setTipo(tipo === t ? null : t)}>
                {tiposLabel[t]}
              </Chip>
            ))}
          </FilterGroup>
          <FilterGroup label="Disponibilidade">
            {status.map((s) => (
              <Chip key={s} active={disp === s} onClick={() => setDisp(disp === s ? null : s)}>
                {statusLabel[s]}
              </Chip>
            ))}
          </FilterGroup>
          <FilterGroup label="Disciplina">
            {disciplinas.map((d) => (
              <Chip
                key={d}
                active={disciplina === d}
                onClick={() => setDisciplina(disciplina === d ? null : d)}
              >
                {d}
              </Chip>
            ))}
          </FilterGroup>
          <FilterGroup label="Clima de leitura">
            {climas.map((cl) => (
              <Chip key={cl} active={clima === cl} onClick={() => setClima(clima === cl ? null : cl)}>
                {cl}
              </Chip>
            ))}
          </FilterGroup>
        </div>
      </div>

      <div className="mt-8">
        <p className="mb-4 text-sm text-muted-foreground">
          {resultados.length} {resultados.length === 1 ? "item encontrado" : "itens encontrados"}
        </p>

        {resultados.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {resultados.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-16 text-center">
            <PackageSearch className="size-10 text-muted-foreground" aria-hidden />
            <p className="mt-4 font-serif text-lg font-semibold text-foreground">
              Nada encontrado por aqui
            </p>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Tente outros termos ou remova alguns filtros. Se não achar, passe no balcão que a
              gente te ajuda a encontrar.
            </p>
            <button
              type="button"
              onClick={limpar}
              className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
            >
              Limpar tudo
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
