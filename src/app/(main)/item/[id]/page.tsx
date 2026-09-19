import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, MapPin, Star, Users } from "lucide-react"
import { getItem, itens, tiposLabel } from "@/lib/data"
import { ItemCover } from "@/components/item-cover"
import { StatusBadge } from "@/components/status-badge"
import { ItemCard } from "@/components/item-card"
import { ReservaButton } from "@/components/item/reserva-button"

export function generateStaticParams() {
  return itens.map((i) => ({ id: i.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const item = getItem(id)
  if (!item) return { title: "Item não encontrado" }
  return {
    title: item.titulo,
    description: item.sinopse.slice(0, 150),
  }
}

export default async function ItemPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const item = getItem(id)
  if (!item) notFound()

  const media =
    item.comentarios.length > 0
      ? (item.comentarios.reduce((s, c) => s + c.nota, 0) / item.comentarios.length).toFixed(1)
      : null

  const relacionados = itens
    .filter(
      (i) =>
        i.id !== item.id &&
        (i.tipo === item.tipo || i.temas.some((t) => item.temas.includes(t))),
    )
    .slice(0, 5)

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link
        href="/busca"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Voltar para a busca
      </Link>

      <div className="mt-6 grid gap-8 md:grid-cols-[minmax(0,240px)_1fr] md:gap-12">
        <div className="mx-auto w-52 md:mx-0 md:w-full">
          <div className="md:sticky md:top-24">
            <ItemCover item={item} />
            <div className="mt-4">
              <ReservaButton status={item.status} titulo={item.titulo} />
            </div>
          </div>
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
              {tiposLabel[item.tipo]}
            </span>
            {item.disciplina && (
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                {item.disciplina}
              </span>
            )}
            <StatusBadge status={item.status} />
          </div>

          <h1 className="mt-4 font-serif text-3xl font-semibold text-foreground text-balance md:text-4xl">
            {item.titulo}
          </h1>
          <p className="mt-1 text-lg text-muted-foreground">{item.autor}</p>

          <div className="mt-4 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
            {media && (
              <span className="inline-flex items-center gap-1.5">
                <Star className="size-4 fill-accent text-accent" aria-hidden />
                <span className="font-medium text-foreground">{media}</span>
                <span>({item.comentarios.length})</span>
              </span>
            )}
            {item.emprestimosMes != null && (
              <span className="inline-flex items-center gap-1.5">
                <Users className="size-4" aria-hidden />
                {item.emprestimosMes} empréstimos no mês
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-4" aria-hidden />
              {item.estante}
            </span>
          </div>

          <div className="mt-6">
            <h2 className="font-serif text-lg font-semibold text-foreground">Sinopse</h2>
            <p className="mt-2 leading-relaxed text-foreground/90">{item.sinopse}</p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {[...item.temas, ...item.clima].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 rounded-2xl border border-border bg-card p-4 sm:max-w-md">
            <div>
              <p className="text-xs text-muted-foreground">Faixa indicada</p>
              <p className="text-sm font-medium text-foreground">{item.faixa}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Localização</p>
              <p className="text-sm font-medium text-foreground">{item.estante}</p>
            </div>
          </div>

          <section className="mt-10">
            <h2 className="font-serif text-xl font-semibold text-foreground">
              O que a turma achou
            </h2>
            {item.comentarios.length > 0 ? (
              <ul className="mt-4 space-y-4">
                {item.comentarios.map((c) => (
                  <li key={c.id} className="rounded-2xl border border-border bg-card p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-medium text-foreground">{c.aluno}</p>
                        <p className="text-xs text-muted-foreground">{c.turma}</p>
                      </div>
                      <div className="flex items-center gap-0.5" aria-label={`Nota ${c.nota} de 5`}>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={
                              i < c.nota
                                ? "size-4 fill-accent text-accent"
                                : "size-4 text-border"
                            }
                            aria-hidden
                          />
                        ))}
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-foreground/90">{c.texto}</p>
                    <p className="mt-2 text-xs text-muted-foreground">{c.data}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 rounded-2xl border border-dashed border-border p-6 text-sm text-muted-foreground">
                Ainda não há comentários. Seja a primeira pessoa da turma a avaliar depois de ler!
              </p>
            )}
          </section>
        </div>
      </div>

      {relacionados.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-5 font-serif text-2xl font-semibold text-foreground">
            Quem leu, também levou
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {relacionados.map((rel) => (
              <ItemCard key={rel.id} item={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
