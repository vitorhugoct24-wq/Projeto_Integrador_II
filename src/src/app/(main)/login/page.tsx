"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { LogIn, GraduationCap, BookOpenCheck, Info } from "lucide-react"
import { useAuth, DEMO_ACCOUNTS } from "@/lib/auth"

export default function LoginPage() {
  const { login, user } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [erro, setErro] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const ok = login(email, senha)
    if (!ok) {
      setErro(true)
      return
    }
    router.push("/painel")
  }

  function entrarComo(conta: (typeof DEMO_ACCOUNTS)[number]) {
    setEmail(conta.email)
    setSenha(conta.senha)
    const ok = login(conta.email, conta.senha)
    if (ok) router.push(conta.role === "bibliotecaria" ? "/admin" : "/painel")
  }

  if (user) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <p className="text-sm text-muted-foreground">
          Você já está logado como <span className="font-medium text-foreground">{user.nome}</span>.
        </p>
        <Link
          href={user.role === "bibliotecaria" ? "/admin" : "/painel"}
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          Ir para {user.role === "bibliotecaria" ? "a área da bibliotecária" : "meu painel"}
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="font-serif text-2xl font-semibold text-foreground">Entrar no CTBJeca</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Acesse com sua conta de aluno ou de bibliotecária.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setErro(false)
            }}
            placeholder="seuemail@ctbj.edu.br"
            className="w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-primary"
            required
          />
        </div>
        <div>
          <label htmlFor="senha" className="mb-1.5 block text-sm font-medium text-foreground">
            Senha
          </label>
          <input
            id="senha"
            type="password"
            value={senha}
            onChange={(e) => {
              setSenha(e.target.value)
              setErro(false)
            }}
            placeholder="••••••••"
            className="w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-primary"
            required
          />
        </div>

        {erro && (
          <p className="text-sm font-medium text-destructive">
            E-mail ou senha incorretos. Confira as contas de demonstração abaixo.
          </p>
        )}

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
        >
          <LogIn className="size-4" aria-hidden />
          Entrar
        </button>
      </form>

      <div className="mt-8 rounded-2xl border border-dashed border-border bg-card p-4">
        <p className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <Info className="size-3.5" aria-hidden />
          Protótipo acadêmico — use uma das contas de demonstração:
        </p>
        <div className="mt-3 space-y-2">
          <button
            type="button"
            onClick={() => entrarComo(DEMO_ACCOUNTS[0])}
            className="flex w-full items-center gap-3 rounded-xl border border-border bg-background p-3 text-left transition-colors hover:border-primary/40"
          >
            <GraduationCap className="size-5 shrink-0 text-primary" aria-hidden />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground">Entrar como aluno</p>
              <p className="truncate text-xs text-muted-foreground">
                {DEMO_ACCOUNTS[0].email} · {DEMO_ACCOUNTS[0].senha}
              </p>
            </div>
          </button>
          <button
            type="button"
            onClick={() => entrarComo(DEMO_ACCOUNTS[1])}
            className="flex w-full items-center gap-3 rounded-xl border border-border bg-background p-3 text-left transition-colors hover:border-primary/40"
          >
            <BookOpenCheck className="size-5 shrink-0 text-primary" aria-hidden />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground">Entrar como bibliotecária</p>
              <p className="truncate text-xs text-muted-foreground">
                {DEMO_ACCOUNTS[1].email} · {DEMO_ACCOUNTS[1].senha}
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
