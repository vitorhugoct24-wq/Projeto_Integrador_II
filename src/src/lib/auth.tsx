"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export type Role = "aluno" | "bibliotecaria"

export type SessionUser = {
  email: string
  nome: string
  role: Role
  turma?: string
}

// Contas fixas de demonstração — não é autenticação real. Como o site é
// publicado como arquivos estáticos (sem servidor/banco de dados), não é
// possível validar senha de forma segura. Isso simula o login apenas para
// fins de demonstração do fluxo (RF04) e das telas de aluno/bibliotecária.
export const DEMO_ACCOUNTS: (SessionUser & { senha: string })[] = [
  {
    email: "aluno@ctbj.edu.br",
    senha: "aluno123",
    nome: "Ana Luiza Ferreira",
    role: "aluno",
    turma: "3º Info A",
  },
  {
    email: "bibliotecaria@ctbj.edu.br",
    senha: "biblio123",
    nome: "Prof. Helena Bastos",
    role: "bibliotecaria",
  },
]

const STORAGE_KEY = "ctbjeca:session"

type AuthContextValue = {
  user: SessionUser | null
  loading: boolean
  login: (email: string, senha: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) setUser(JSON.parse(raw))
    } catch {
      // localStorage indisponível (ex: modo privado) — segue sem sessão
    }
    setLoading(false)
  }, [])

  function login(email: string, senha: string) {
    const conta = DEMO_ACCOUNTS.find(
      (c) => c.email.toLowerCase() === email.trim().toLowerCase() && c.senha === senha,
    )
    if (!conta) return false
    const { senha: _senha, ...sessionUser } = conta
    setUser(sessionUser)
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionUser))
    } catch {
      // segue mesmo se não conseguir persistir
    }
    return true
  }

  function logout() {
    setUser(null)
    try {
      window.localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignora
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth precisa estar dentro de <AuthProvider>")
  return ctx
}
