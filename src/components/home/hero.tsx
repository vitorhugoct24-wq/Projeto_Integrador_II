import Link from "next/link"
import { Search, Compass, BookOpen } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, currentColor 0 2px, transparent 2px 22px)",
        }}
      />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-8 px-4 py-14 md:py-20">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-3 py-1 text-xs font-medium ring-1 ring-primary-foreground/20">
            <BookOpen className="size-3.5" aria-hidden />
            Biblioteca do Colégio Técnico de Bom Jesus
          </span>
          <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight text-balance md:text-5xl">
            Descubra sua próxima leitura no CTBJeca
          </h1>
          <p className="mt-4 max-w-xl text-base text-primary-foreground/80 md:text-lg">
            Mais que um catálogo: um portal para explorar livros, jogos e instrumentos do nosso
            acervo, receber recomendações e trocar ideias com a turma.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="/busca"
            className="group flex flex-1 items-center gap-3 rounded-xl bg-background px-4 py-3.5 text-left text-foreground shadow-sm transition-shadow hover:shadow-md"
          >
            <Search className="size-5 text-muted-foreground" aria-hidden />
            <span className="text-sm text-muted-foreground">
              Buscar por título, autor ou disciplina…
            </span>
          </Link>
          <Link
            href="/quiz"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3.5 text-sm font-semibold text-accent-foreground shadow-sm transition-transform hover:-translate-y-0.5"
          >
            <Compass className="size-5" aria-hidden />
            Fazer o Quiz de Descoberta
          </Link>
        </div>

        <dl className="grid grid-cols-3 gap-4 border-t border-primary-foreground/15 pt-6 text-center sm:max-w-md sm:text-left">
          {[
            { n: "2.480", l: "itens no acervo" },
            { n: "312", l: "empréstimos no mês" },
            { n: "18", l: "novidades esta semana" },
          ].map((s) => (
            <div key={s.l}>
              <dt className="font-serif text-2xl font-semibold">{s.n}</dt>
              <dd className="text-xs text-primary-foreground/70">{s.l}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
