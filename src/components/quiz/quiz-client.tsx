"use client"

import { useState } from "react"
import { Compass, RotateCcw, Sparkles, ArrowLeft } from "lucide-react"
import { quizPerguntas, recomendarPorQuiz } from "@/lib/data"
import { ItemCard } from "@/components/item-card"
import { cn } from "@/lib/utils"

export function QuizClient() {
  const [passo, setPasso] = useState(0)
  const [respostas, setRespostas] = useState<Record<string, string>>({})
  const [finalizado, setFinalizado] = useState(false)

  const total = quizPerguntas.length
  const pergunta = quizPerguntas[passo]
  const progresso = Math.round(((finalizado ? total : passo) / total) * 100)

  function escolher(valor: string) {
    const novas = { ...respostas, [pergunta.id]: valor }
    setRespostas(novas)
    if (passo + 1 < total) {
      setPasso(passo + 1)
    } else {
      setFinalizado(true)
    }
  }

  function reiniciar() {
    setPasso(0)
    setRespostas({})
    setFinalizado(false)
  }

  if (finalizado) {
    const recomendacoes = recomendarPorQuiz(respostas)
    return (
      <div className="mx-auto max-w-4xl px-4 py-14">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent/25 px-3 py-1 text-xs font-semibold text-accent-foreground">
            <Sparkles className="size-3.5" aria-hidden />
            Suas recomendações
          </span>
          <h1 className="mt-4 font-serif text-3xl font-semibold text-foreground text-balance md:text-4xl">
            Achamos que você vai curtir estes
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            Selecionamos com base no clima e nos temas que você escolheu. Passe o mouse, veja os
            detalhes e reserve o que chamar sua atenção.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
          {recomendacoes.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={reiniciar}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground shadow-sm transition-transform hover:-translate-y-0.5"
          >
            <RotateCcw className="size-4" aria-hidden />
            Refazer o quiz
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-14">
      <div className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
          <Compass className="size-3.5" aria-hidden />
          Quiz de Descoberta
        </span>
      </div>

      <div className="mt-8">
        <div className="mb-2 flex items-center justify-between text-xs font-medium text-muted-foreground">
          <span>
            Pergunta {passo + 1} de {total}
          </span>
          <span>{progresso}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-accent transition-all duration-500"
            style={{ width: `${((passo) / total) * 100}%` }}
          />
        </div>
      </div>

      <div className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
        <h1 className="font-serif text-2xl font-semibold text-foreground text-balance md:text-3xl">
          {pergunta.pergunta}
        </h1>
        <div className="mt-6 flex flex-col gap-3">
          {pergunta.opcoes.map((op) => {
            const ativa = respostas[pergunta.id] === op.valor
            return (
              <button
                key={op.valor}
                type="button"
                onClick={() => escolher(op.valor)}
                className={cn(
                  "rounded-2xl border p-4 text-left text-base font-medium transition-all hover:-translate-y-0.5 hover:shadow-sm",
                  ativa
                    ? "border-primary bg-primary/5 text-foreground"
                    : "border-border bg-background text-foreground hover:border-primary/40",
                )}
              >
                {op.rotulo}
              </button>
            )
          })}
        </div>
      </div>

      {passo > 0 && (
        <button
          type="button"
          onClick={() => setPasso(passo - 1)}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Voltar
        </button>
      )}
    </div>
  )
}
