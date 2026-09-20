"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import {
  itens as itensIniciais,
  achados as achadosIniciais,
  emPosse as emPosseInicial,
  type Item,
  type Comentario,
  type Achado,
  type Disponibilidade,
} from "@/lib/data"

export type ComentarioStore = Comentario & {
  denunciado?: boolean
  motivoDenuncia?: string
}

export type EmprestimoAtivo = {
  id: string
  itemId: string
  alunoNome: string
  alunoTurma?: string
  retiradaEm: string
  devolvida: boolean
}

type StoreShape = {
  itens: (Omit<Item, "comentarios"> & { comentarios: ComentarioStore[] })[]
  achados: Achado[]
  emprestimos: EmprestimoAtivo[]
}

const STORAGE_KEY = "ctbjeca:store:v1"

function seed(): StoreShape {
  return {
    itens: itensIniciais.map((i) => ({ ...i, comentarios: [...i.comentarios] })),
    achados: [...achadosIniciais],
    emprestimos: emPosseInicial.map((e, idx) => ({
      id: `seed-${idx}`,
      itemId: e.itemId,
      alunoNome: "Ana Luiza Ferreira",
      alunoTurma: "3º Info A",
      retiradaEm: e.retiradaEm,
      devolvida: false,
    })),
  }
}

type StoreContextValue = {
  itens: StoreShape["itens"]
  achados: StoreShape["achados"]
  emprestimos: StoreShape["emprestimos"]
  getItem: (id: string) => StoreShape["itens"][number] | undefined
  addComentario: (itemId: string, c: Omit<ComentarioStore, "id" | "data">) => void
  denunciarComentario: (itemId: string, comentarioId: string, motivo: string) => void
  removerComentario: (itemId: string, comentarioId: string) => void
  setStatus: (itemId: string, status: Disponibilidade) => void
  addItem: (item: Item) => void
  updateItem: (itemId: string, patch: Partial<Item>) => void
  deleteItem: (itemId: string) => void
  criarEmprestimo: (itemId: string, alunoNome: string, alunoTurma?: string) => void
  devolverEmprestimo: (emprestimoId: string) => void
  addAchado: (achado: Omit<Achado, "id">) => void
  marcarAchadoDevolvido: (achadoId: string) => void
  resetStore: () => void
}

const StoreContext = createContext<StoreContextValue | null>(null)

export function DataProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<StoreShape>(seed)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) setState(JSON.parse(raw))
    } catch {
      // segue com o seed padrão
    }
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!loaded) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // localStorage indisponível — mudanças ficam só na sessão atual
    }
  }, [state, loaded])

  function getItem(id: string) {
    return state.itens.find((i) => i.id === id)
  }

  function addComentario(itemId: string, c: Omit<ComentarioStore, "id" | "data">) {
    setState((s) => ({
      ...s,
      itens: s.itens.map((i) =>
        i.id === itemId
          ? {
              ...i,
              comentarios: [
                ...i.comentarios,
                { ...c, id: `c-${Date.now()}`, data: "agora" },
              ],
            }
          : i,
      ),
    }))
  }

  function denunciarComentario(itemId: string, comentarioId: string, motivo: string) {
    setState((s) => ({
      ...s,
      itens: s.itens.map((i) =>
        i.id === itemId
          ? {
              ...i,
              comentarios: i.comentarios.map((c) =>
                c.id === comentarioId ? { ...c, denunciado: true, motivoDenuncia: motivo } : c,
              ),
            }
          : i,
      ),
    }))
  }

  function removerComentario(itemId: string, comentarioId: string) {
    setState((s) => ({
      ...s,
      itens: s.itens.map((i) =>
        i.id === itemId
          ? { ...i, comentarios: i.comentarios.filter((c) => c.id !== comentarioId) }
          : i,
      ),
    }))
  }

  function setStatus(itemId: string, status: Disponibilidade) {
    setState((s) => ({
      ...s,
      itens: s.itens.map((i) => (i.id === itemId ? { ...i, status } : i)),
    }))
  }

  function addItem(item: Item) {
    setState((s) => ({ ...s, itens: [...s.itens, item] }))
  }

  function updateItem(itemId: string, patch: Partial<Item>) {
    setState((s) => ({
      ...s,
      itens: s.itens.map((i) => (i.id === itemId ? { ...i, ...patch } : i)),
    }))
  }

  function deleteItem(itemId: string) {
    setState((s) => ({ ...s, itens: s.itens.filter((i) => i.id !== itemId) }))
  }

  function criarEmprestimo(itemId: string, alunoNome: string, alunoTurma?: string) {
    setState((s) => ({
      ...s,
      itens: s.itens.map((i) => (i.id === itemId ? { ...i, status: "emprestado" } : i)),
      emprestimos: [
        ...s.emprestimos,
        {
          id: `e-${Date.now()}`,
          itemId,
          alunoNome,
          alunoTurma,
          retiradaEm: new Date().toLocaleDateString("pt-BR"),
          devolvida: false,
        },
      ],
    }))
  }

  function devolverEmprestimo(emprestimoId: string) {
    setState((s) => {
      const emp = s.emprestimos.find((e) => e.id === emprestimoId)
      return {
        ...s,
        emprestimos: s.emprestimos.map((e) =>
          e.id === emprestimoId ? { ...e, devolvida: true } : e,
        ),
        itens: emp
          ? s.itens.map((i) => (i.id === emp.itemId ? { ...i, status: "disponivel" } : i))
          : s.itens,
      }
    })
  }

  function addAchado(achado: Omit<Achado, "id">) {
    setState((s) => ({
      ...s,
      achados: [{ ...achado, id: `a-${Date.now()}` }, ...s.achados],
    }))
  }

  function marcarAchadoDevolvido(achadoId: string) {
    setState((s) => ({
      ...s,
      achados: s.achados.map((a) => (a.id === achadoId ? { ...a, status: "devolvido" } : a)),
    }))
  }

  function resetStore() {
    setState(seed())
    try {
      window.localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignora
    }
  }

  return (
    <StoreContext.Provider
      value={{
        itens: state.itens,
        achados: state.achados,
        emprestimos: state.emprestimos,
        getItem,
        addComentario,
        denunciarComentario,
        removerComentario,
        setStatus,
        addItem,
        updateItem,
        deleteItem,
        criarEmprestimo,
        devolverEmprestimo,
        addAchado,
        marcarAchadoDevolvido,
        resetStore,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error("useStore precisa estar dentro de <DataProvider>")
  return ctx
}
