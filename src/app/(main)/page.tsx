import Link from "next/link"
import { Compass, Puzzle, Music, ArrowRight } from "lucide-react"
import { itens } from "@/lib/data"
import { Hero } from "@/components/home/hero"
import { CuradoriaDestaque } from "@/components/home/curadoria-destaque"
import { SectionHeading } from "@/components/section-heading"
import { ItemCard } from "@/components/item-card"

export default function HomePage() {
  const maisEmprestados = [...itens]
    .sort((a, b) => (b.emprestimosMes ?? 0) - (a.emprestimosMes ?? 0))
    .slice(0, 5)

  const novidades = itens.filter((i) => i.novidade)

  const naoLivros = itens.filter((i) => i.tipo !== "livro")

  return (
    <>
      <Hero />

      <div className="mx-auto max-w-6xl space-y-16 px-4 py-14">
        <CuradoriaDestaque />

        <section>
          <SectionHeading
            eyebrow="Os favoritos da galera"
            title="Mais emprestados do mês"
            href="/busca"
          />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {maisEmprestados.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        <section>
          <SectionHeading
            eyebrow="Fresquinhos na estante"
            title="Recém-chegados"
            href="/busca"
          />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {novidades.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <Link
            href="/quiz"
            className="group flex flex-col justify-between gap-6 rounded-3xl bg-accent p-6 text-accent-foreground md:p-8"
          >
            <Compass className="size-8" aria-hidden />
            <div>
              <h3 className="font-serif text-xl font-semibold">Não sabe o que ler?</h3>
              <p className="mt-1 text-sm text-accent-foreground/80">
                Responda 3 perguntas rápidas e receba recomendações feitas pra você.
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold">
                Fazer o quiz
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </span>
            </div>
          </Link>

          <div className="rounded-3xl border border-border bg-card p-6 md:p-8">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Puzzle className="size-5" aria-hidden />
              <Music className="size-5" aria-hidden />
            </div>
            <h3 className="mt-4 font-serif text-xl font-semibold text-foreground">
              Além dos livros
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              A biblioteca também empresta jogos de mesa e instrumentos musicais.
            </p>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {naoLivros.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
