"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import {
  Library,
  PackagePlus,
  BookOpenCheck,
  Flag,
  Search,
  Trash2,
  CheckCircle2,
  ShieldAlert,
  LockKeyhole,
} from "lucide-react"
import { useAuth } from "@/lib/auth"
import { useStore } from "@/lib/store"
import { StatusBadge } from "@/components/status-badge"
import { TypeIcon } from "@/components/type-icon"
import { tiposLabel, type ItemTipo, type Item } from "@/lib/data"
import { cn } from "@/lib/utils"

const abas = [
  { id: "acervo", label: "Acervo", icon: Library },
  { id: "emprestimos", label: "Empréstimos", icon: BookOpenCheck },
  { id: "achados", label: "Achados e Perdidos", icon: PackagePlus },
  { id: "denuncias", label: "Denúncias", icon: Flag },
] as const

type Aba = (typeof abas)[number]["id"]

export default function AdminPage() {
  const { user, loading } = useAuth()
  const [aba, setAba] = useState<Aba>("acervo")

  if (loading) return null

  if (!user || user.role !== "bibliotecaria") {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <LockKeyhole className="mx-auto size-8 text-muted-foreground" aria-hidden />
        <h1 className="mt-4 font-serif text-xl font-semibold text-foreground">
          Área restrita à bibliotecária
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Faça login com a conta de bibliotecária para gerenciar o acervo, empréstimos e denúncias.
        </p>
        <Link
          href="/login"
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          Ir para o login
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <header>
        <p className="text-sm text-muted-foreground">Área da bibliotecária</p>
        <h1 className="mt-1 font-serif text-2xl font-semibold text-foreground md:text-3xl">
          Olá, {user.nome}
        </h1>
      </header>

      <div className="mt-6 flex gap-1 overflow-x-auto rounded-xl border border-border bg-card p-1">
        {abas.map((a) => (
          <button
            key={a.id}
            onClick={() => setAba(a.id)}
            className={cn(
              "flex shrink-0 items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
              aba === a.id
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <a.icon className="size-4" aria-hidden />
            {a.label}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {aba === "acervo" && <AbaAcervo />}
        {aba === "emprestimos" && <AbaEmprestimos />}
        {aba === "achados" && <AbaAchados />}
        {aba === "denuncias" && <AbaDenuncias />}
      </div>
    </div>
  )
}

// ---------- Acervo (RF05: cadastrar, editar, remover) ----------

function AbaAcervo() {
  const { itens, addItem, updateItem, deleteItem } = useStore()
  const [busca, setBusca] = useState("")
  const [formAberto, setFormAberto] = useState(false)

  const filtrados = itens.filter((i) =>
    i.titulo.toLowerCase().includes(busca.toLowerCase()),
  )

  function handleNovoItem(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const titulo = String(fd.get("titulo") || "").trim()
    if (!titulo) return
    const id = titulo
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
    addItem({
      id: `${id}-${Date.now().toString().slice(-4)}`,
      titulo,
      autor: String(fd.get("autor") || ""),
      tipo: fd.get("tipo") as ItemTipo,
      temas: [],
      clima: [],
      faixa: String(fd.get("faixa") || "Todas as idades"),
      sinopse: String(fd.get("sinopse") || ""),
      estante: String(fd.get("estante") || ""),
      status: "disponivel",
      corCapa: "#243b6b",
      corTexto: "#f4efe4",
      comentarios: [],
    })
    e.currentTarget.reset()
    setFormAberto(false)
  }

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar no acervo..."
            className="w-full rounded-xl border border-border bg-card py-2.5 pl-9 pr-3 text-sm outline-none focus:border-primary"
          />
        </div>
        <button
          onClick={() => setFormAberto((v) => !v)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          <PackagePlus className="size-4" aria-hidden />
          {formAberto ? "Cancelar" : "Cadastrar novo item"}
        </button>
      </div>

      {formAberto && (
        <form
          onSubmit={handleNovoItem}
          className="mt-4 grid gap-3 rounded-2xl border border-border bg-card p-4 sm:grid-cols-2"
        >
          <input name="titulo" required placeholder="Título" className="campo" />
          <input name="autor" placeholder="Autor / fabricante" className="campo" />
          <select name="tipo" className="campo" defaultValue="livro">
            <option value="livro">Livro</option>
            <option value="jogo">Jogo de mesa</option>
            <option value="instrumento">Instrumento</option>
          </select>
          <input name="faixa" placeholder="Faixa etária (ex: Ensino Médio)" className="campo" />
          <input name="estante" placeholder="Localização física" className="campo sm:col-span-2" />
          <textarea
            name="sinopse"
            placeholder="Sinopse / descrição"
            rows={2}
            className="campo sm:col-span-2"
          />
          <button
            type="submit"
            className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground sm:col-span-2"
          >
            Salvar no acervo
          </button>
        </form>
      )}

      <ul className="mt-6 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
        {filtrados.map((item) => (
          <li key={item.id} className="flex flex-wrap items-center gap-3 p-4">
            <div
              className="flex size-10 shrink-0 items-center justify-center rounded-lg"
              style={{ backgroundColor: item.corCapa, color: item.corTexto }}
            >
              <TypeIcon tipo={item.tipo} className="size-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-foreground">{item.titulo}</p>
              <p className="text-xs text-muted-foreground">{tiposLabel[item.tipo]}</p>
            </div>
            <select
              value={item.status}
              onChange={(e) => updateItem(item.id, { status: e.target.value as Item["status"] })}
              className="rounded-lg border border-border bg-background px-2 py-1.5 text-xs"
            >
              <option value="disponivel">Disponível</option>
              <option value="emprestado">Emprestado</option>
              <option value="reservado">Reservado</option>
            </select>
            <button
              onClick={() => deleteItem(item.id)}
              className="inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
              aria-label={`Remover ${item.titulo}`}
            >
              <Trash2 className="size-4" aria-hidden />
            </button>
          </li>
        ))}
        {filtrados.length === 0 && (
          <li className="p-6 text-center text-sm text-muted-foreground">Nenhum item encontrado.</li>
        )}
      </ul>
    </div>
  )
}

// ---------- Empréstimos (RF08) ----------

function AbaEmprestimos() {
  const { itens, emprestimos, criarEmprestimo, devolverEmprestimo } = useStore()
  const disponiveis = itens.filter((i) => i.status === "disponivel")
  const ativos = emprestimos.filter((e) => !e.devolvida)

  function handleEmprestar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const itemId = String(fd.get("itemId") || "")
    const aluno = String(fd.get("aluno") || "").trim()
    if (!itemId || !aluno) return
    criarEmprestimo(itemId, aluno, String(fd.get("turma") || ""))
    e.currentTarget.reset()
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div>
        <h2 className="font-serif text-lg font-semibold text-foreground">Registrar entrega</h2>
        <form onSubmit={handleEmprestar} className="mt-3 space-y-3 rounded-2xl border border-border bg-card p-4">
          <select name="itemId" required className="campo">
            <option value="">Selecione um item disponível...</option>
            {disponiveis.map((i) => (
              <option key={i.id} value={i.id}>
                {i.titulo}
              </option>
            ))}
          </select>
          <input name="aluno" required placeholder="Nome do aluno" className="campo" />
          <input name="turma" placeholder="Turma" className="campo" />
          <button
            type="submit"
            className="w-full rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            Registrar empréstimo
          </button>
        </form>
      </div>

      <div>
        <h2 className="font-serif text-lg font-semibold text-foreground">Empréstimos ativos</h2>
        <ul className="mt-3 space-y-3">
          {ativos.map((e) => {
            const item = itens.find((i) => i.id === e.itemId)
            return (
              <li
                key={e.id}
                className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium text-foreground">{item?.titulo ?? e.itemId}</p>
                  <p className="text-xs text-muted-foreground">
                    {e.alunoNome} {e.alunoTurma && `· ${e.alunoTurma}`} · retirado em {e.retiradaEm}
                  </p>
                </div>
                <button
                  onClick={() => devolverEmprestimo(e.id)}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-success/15 px-3 py-1.5 text-xs font-semibold text-success ring-1 ring-success/25"
                >
                  <CheckCircle2 className="size-3.5" aria-hidden />
                  Registrar devolução
                </button>
              </li>
            )
          })}
          {ativos.length === 0 && (
            <li className="rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
              Nenhum empréstimo ativo no momento.
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

// ---------- Achados e Perdidos (cadastro pelo admin) ----------

function AbaAchados() {
  const { achados, addAchado, marcarAchadoDevolvido } = useStore()

  function handleNovoAchado(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const nome = String(fd.get("nome") || "").trim()
    if (!nome) return
    addAchado({
      nome,
      descricao: String(fd.get("descricao") || ""),
      local: String(fd.get("local") || ""),
      data: new Date().toLocaleDateString("pt-BR"),
      status: "aguardando",
      corBg: "#4a5a72",
      emoji: "📦",
    })
    e.currentTarget.reset()
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div>
        <h2 className="font-serif text-lg font-semibold text-foreground">Cadastrar item encontrado</h2>
        <form onSubmit={handleNovoAchado} className="mt-3 space-y-3 rounded-2xl border border-border bg-card p-4">
          <input name="nome" required placeholder="O que foi encontrado?" className="campo" />
          <textarea name="descricao" placeholder="Descrição" rows={2} className="campo" />
          <input name="local" placeholder="Onde foi encontrado" className="campo" />
          <button
            type="submit"
            className="w-full rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            Cadastrar
          </button>
        </form>
      </div>

      <div>
        <h2 className="font-serif text-lg font-semibold text-foreground">Itens cadastrados</h2>
        <ul className="mt-3 space-y-3">
          {achados.map((a) => (
            <li
              key={a.id}
              className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4"
            >
              <div className="min-w-0">
                <p className="truncate font-medium text-foreground">
                  {a.emoji} {a.nome}
                </p>
                <p className="text-xs text-muted-foreground">{a.local}</p>
              </div>
              {a.status === "aguardando" ? (
                <button
                  onClick={() => marcarAchadoDevolvido(a.id)}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-success/15 px-3 py-1.5 text-xs font-semibold text-success ring-1 ring-success/25"
                >
                  <CheckCircle2 className="size-3.5" aria-hidden />
                  Marcar devolvido
                </button>
              ) : (
                <span className="shrink-0 text-xs font-medium text-muted-foreground">Devolvido</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// ---------- Denúncias (RF15) ----------

function AbaDenuncias() {
  const { itens, removerComentario, denunciarComentario } = useStore()
  const denunciados = itens.flatMap((i) =>
    i.comentarios.filter((c) => c.denunciado).map((c) => ({ item: i, comentario: c })),
  )

  return (
    <div>
      <h2 className="font-serif text-lg font-semibold text-foreground">Comentários denunciados</h2>
      <ul className="mt-3 space-y-3">
        {denunciados.map(({ item, comentario }) => (
          <li key={comentario.id} className="rounded-2xl border border-destructive/30 bg-destructive/5 p-4">
            <div className="flex items-start gap-2">
              <ShieldAlert className="mt-0.5 size-4 shrink-0 text-destructive" aria-hidden />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">
                  {comentario.aluno} · em "{item.titulo}"
                </p>
                <p className="mt-1 text-sm text-foreground/90">{comentario.texto}</p>
                {comentario.motivoDenuncia && (
                  <p className="mt-2 text-xs text-destructive">
                    Motivo da denúncia: {comentario.motivoDenuncia}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => removerComentario(item.id, comentario.id)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-destructive/10 px-3 py-1.5 text-xs font-semibold text-destructive"
              >
                <Trash2 className="size-3.5" aria-hidden />
                Remover comentário
              </button>
            </div>
          </li>
        ))}
        {denunciados.length === 0 && (
          <li className="rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
            Nenhuma denúncia pendente. 🎉
          </li>
        )}
      </ul>
    </div>
  )
}
