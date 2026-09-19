import type { Metadata } from "next"
import Link from "next/link"
import { AlertTriangle, CalendarClock, Clock, History, Library, Star } from "lucide-react"
import {
  alunoAtual,
  emPosse,
  reservas,
  historico,
  getItem,
} from "@/lib/data"
import { StatusBadge } from "@/components/status-badge"
import { TypeIcon } from "@/components/type-icon"

export const metadata: Metadata = {
  title: "Meu painel",
  description: "Acompanhe seus empréstimos, reservas e histórico de leitura na biblioteca do CTBJeca.",
}

export default function PainelPage() {
  const primeiroNome = alunoAtual.nome.split(" ")[0]
  const atrasados = emPosse.filter((e) => e.atrasado).length

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <header className="flex flex-col gap-4 rounded-3xl bg-primary p-6 text-primary-foreground md:flex-row md:items-center md:justify-between md:p-8">
        <div>
          <p className="text-sm text-primary-foreground/70">Olá, {primeiroNome} 👋</p>
          <h1 className="mt-1 font-serif text-2xl font-semibold md:text-3xl">{alunoAtual.nome}</h1>
          <p className="mt-1 text-sm text-primary-foreground/70">
            {alunoAtual.turma} · Matrícula {alunoAtual.matricula}
          </p>
        </div>
        <div className="flex gap-3">
          <div className="rounded-2xl bg-primary-foreground/10 px-4 py-3 text-center">
            <p className="font-serif text-2xl font-semibold">{emPosse.length}</p>
            <p className="text-xs text-primary-foreground/70">com você</p>
          </div>
          <div className="rounded-2xl bg-primary-foreground/10 px-4 py-3 text-center">
            <p className="font-serif text-2xl font-semibold">{reservas.length}</p>
            <p className="text-xs text-primary-foreground/70">reservas</p>
          </div>
          <div className="rounded-2xl bg-primary-foreground/10 px-4 py-3 text-center">
            <p className="font-serif text-2xl font-semibold">{historico.length}</p>
            <p className="text-xs text-primary-foreground/70">lidos</p>
          </div>
        </div>
      </header>

      {atrasados > 0 && (
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-destructive/30 bg-destructive/5 p-4">
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-destructive" aria-hidden />
          <div>
            <p className="text-sm font-semibold text-foreground">
              Você tem {atrasados} devolução{atrasados > 1 ? "ões" : ""} em atraso
            </p>
            <p className="text-sm text-muted-foreground">
              Passe na biblioteca o quanto antes para regularizar e liberar novos empréstimos.
            </p>
          </div>
        </div>
      )}

      <section className="mt-10">
        <h2 className="mb-4 inline-flex items-center gap-2 font-serif text-xl font-semibold text-foreground">
          <Library className="size-5 text-primary" aria-hidden />
          Com você agora
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {emPosse.map((e) => {
            const item = getItem(e.itemId)
            if (!item) return null
            return (
              <Link
                key={e.itemId}
                href={`/item/${item.id}`}
                className="flex gap-4 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/40"
              >
                <div
                  className="flex size-14 shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: item.corCapa, color: item.corTexto }}
                >
                  <TypeIcon tipo={item.tipo} className="size-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-foreground">{item.titulo}</p>
                  <p className="truncate text-xs text-muted-foreground">{item.autor}</p>
                  <p
                    className={
                      e.atrasado
                        ? "mt-2 inline-flex items-center gap-1 text-xs font-semibold text-destructive"
                        : "mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground"
                    }
                  >
                    <CalendarClock className="size-3.5" aria-hidden />
                    {e.atrasado ? "Atrasado — devolver até " : "Devolver até "}
                    {e.devolverAte}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 inline-flex items-center gap-2 font-serif text-xl font-semibold text-foreground">
          <Clock className="size-5 text-accent-foreground" aria-hidden />
          Reservas na fila
        </h2>
        <div className="space-y-3">
          {reservas.map((r) => {
            const item = getItem(r.itemId)
            if (!item) return null
            return (
              <Link
                key={r.itemId}
                href={`/item/${item.id}`}
                className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/40"
              >
                <div
                  className="flex size-11 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: item.corCapa, color: item.corTexto }}
                >
                  <TypeIcon tipo={item.tipo} className="size-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-foreground">{item.titulo}</p>
                  <p className="text-xs text-muted-foreground">Previsão de retirada: {r.previsao}</p>
                </div>
                <div className="text-right">
                  <StatusBadge status={item.status} />
                  <p className="mt-1 text-xs text-muted-foreground">
                    {r.posicao}º na fila
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 inline-flex items-center gap-2 font-serif text-xl font-semibold text-foreground">
          <History className="size-5 text-muted-foreground" aria-hidden />
          Já li
        </h2>
        <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
          {historico.map((h) => {
            const item = getItem(h.itemId)
            if (!item) return null
            return (
              <li key={h.itemId}>
                <Link
                  href={`/item/${item.id}`}
                  className="flex items-center gap-4 p-4 transition-colors hover:bg-secondary/40"
                >
                  <div
                    className="flex size-10 shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: item.corCapa, color: item.corTexto }}
                  >
                    <TypeIcon tipo={item.tipo} className="size-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-foreground">{item.titulo}</p>
                    <p className="text-xs text-muted-foreground">{h.concluidoEm}</p>
                  </div>
                  <div className="flex items-center gap-0.5" aria-label={`Sua nota: ${h.nota} de 5`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={
                          i < h.nota ? "size-4 fill-accent text-accent" : "size-4 text-border"
                        }
                        aria-hidden
                      />
                    ))}
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}
