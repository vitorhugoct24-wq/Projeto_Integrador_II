"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { Star, Flag, LogIn } from "lucide-react"
import { useAuth } from "@/lib/auth"
import { useStore } from "@/lib/store"
import type { Comentario } from "@/lib/data"

export function ComentariosSection({
  itemId,
  comentariosIniciais,
}: {
  itemId: string
  comentariosIniciais: Comentario[]
}) {
  const { user } = useAuth()
  const { getItem, addComentario, denunciarComentario } = useStore()
  const [nota, setNota] = useState(5)
  const [texto, setTexto] = useState("")
  const [denunciandoId, setDenunciandoId] = useState<string | null>(null)
  const [motivo, setMotivo] = useState("")

  // Antes da hidratação (ou se o store falhar) mostramos os comentários
  // estáticos vindos do servidor; depois disso, a lista ao vivo do store.
  const itemStore = getItem(itemId)
  const comentarios = (itemStore ? itemStore.comentarios : comentariosIniciais) as (Comentario & {
    denunciado?: boolean
  })[]

  function handleEnviar(e: FormEvent) {
    e.preventDefault()
    if (!user || user.role !== "aluno" || !texto.trim()) return
    addComentario(itemId, {
      aluno: user.nome,
      turma: user.turma ?? "",
      nota,
      texto: texto.trim(),
    })
    setTexto("")
    setNota(5)
  }

  function handleDenunciar(comentarioId: string) {
    if (!motivo.trim()) return
    denunciarComentario(itemId, comentarioId, motivo.trim())
    setDenunciandoId(null)
    setMotivo("")
  }

  return (
    <section className="mt-10">
      <h2 className="font-serif text-xl font-semibold text-foreground">O que a turma achou</h2>

      {comentarios.length > 0 ? (
        <ul className="mt-4 space-y-4">
          {comentarios.map((c) => (
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
                      className={i < c.nota ? "size-4 fill-accent text-accent" : "size-4 text-border"}
                      aria-hidden
                    />
                  ))}
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-foreground/90">{c.texto}</p>
              <div className="mt-2 flex items-center justify-between gap-3">
                <p className="text-xs text-muted-foreground">{c.data}</p>
                {user?.role === "aluno" &&
                  (c.denunciado ? (
                    <span className="text-xs text-muted-foreground">Denunciado — em análise</span>
                  ) : denunciandoId === c.id ? (
                    <div className="flex items-center gap-1.5">
                      <input
                        autoFocus
                        value={motivo}
                        onChange={(e) => setMotivo(e.target.value)}
                        placeholder="Motivo da denúncia"
                        className="rounded-lg border border-border bg-background px-2 py-1 text-xs outline-none focus:border-primary"
                      />
                      <button
                        onClick={() => handleDenunciar(c.id)}
                        className="rounded-lg bg-destructive/10 px-2 py-1 text-xs font-semibold text-destructive"
                      >
                        Enviar
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDenunciandoId(c.id)}
                      className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive"
                    >
                      <Flag className="size-3.5" aria-hidden />
                      Denunciar
                    </button>
                  ))}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 rounded-2xl border border-dashed border-border p-6 text-sm text-muted-foreground">
          Ainda não há comentários. Seja a primeira pessoa da turma a avaliar depois de ler!
        </p>
      )}

      <div className="mt-6 rounded-2xl border border-border bg-card p-4">
        {user?.role === "aluno" ? (
          <form onSubmit={handleEnviar} className="space-y-3">
            <p className="text-sm font-medium text-foreground">Deixe seu comentário</p>
            <div className="flex items-center gap-1" aria-label="Sua nota">
              {Array.from({ length: 5 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setNota(i + 1)}
                  aria-label={`Dar nota ${i + 1}`}
                >
                  <Star
                    className={i < nota ? "size-5 fill-accent text-accent" : "size-5 text-border"}
                    aria-hidden
                  />
                </button>
              ))}
            </div>
            <textarea
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              placeholder="O que você achou?"
              rows={2}
              className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-primary"
            />
            <button
              type="submit"
              className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
            >
              Publicar comentário
            </button>
          </form>
        ) : (
          <p className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <Link href="/login" className="inline-flex items-center gap-1.5 font-medium text-primary">
              <LogIn className="size-4" aria-hidden />
              Faça login como aluno
            </Link>
            para comentar e avaliar este item.
          </p>
        )}
      </div>
    </section>
  )
}
