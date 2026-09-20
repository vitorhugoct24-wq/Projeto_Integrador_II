import Link from "next/link"
import { Quote, ArrowRight } from "lucide-react"
import { curadoria, getItem } from "@/lib/data"
import { ItemCover } from "@/components/item-cover"
import { LiveStatusBadge } from "@/components/live-status-badge"

export function CuradoriaDestaque() {
  const item = getItem(curadoria.itemId)
  if (!item) return null

  return (
    <section className="rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
      <div className="grid gap-8 md:grid-cols-[minmax(0,180px)_1fr] md:items-center">
        <Link href={`/item/${item.id}`} className="mx-auto w-40 md:mx-0">
          <ItemCover item={item} />
        </Link>
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-accent-foreground/70">
            {curadoria.titulo}
          </p>
          <h2 className="font-serif text-2xl font-semibold text-foreground text-balance md:text-3xl">
            {item.titulo}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">{item.autor}</p>

          <figure className="mt-4 rounded-2xl bg-secondary/60 p-4">
            <Quote className="size-5 text-accent-foreground/60" aria-hidden />
            <blockquote className="mt-1 text-sm leading-relaxed text-foreground/90">
              {curadoria.recado}
            </blockquote>
            <figcaption className="mt-3 text-xs font-medium text-muted-foreground">
              — {curadoria.bibliotecario}, bibliotecária
            </figcaption>
          </figure>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <LiveStatusBadge itemId={item.id} statusInicial={item.status} />
            <Link
              href={`/item/${item.id}`}
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Ver detalhes
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
