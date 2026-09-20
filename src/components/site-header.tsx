"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Library, Menu, X, Monitor, User, LogOut, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth"

const nav = [
  { href: "/", label: "Início" },
  { href: "/busca", label: "Busca" },
  { href: "/quiz", label: "Quiz de Descoberta" },
  { href: "/painel", label: "Meu Painel" },
  { href: "/achados-e-perdidos", label: "Achados e Perdidos" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Library className="size-5" aria-hidden />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-serif text-lg font-semibold text-foreground">CTBJeca</span>
            <span className="text-[0.65rem] text-muted-foreground">Biblioteca do CTBJ</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/totem"
            className="hidden items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:inline-flex"
          >
            <Monitor className="size-4" aria-hidden />
            Modo Totem
          </Link>

          {user ? (
            <div className="hidden items-center gap-2 sm:flex">
              {user.role === "bibliotecaria" && (
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <ShieldCheck className="size-4" aria-hidden />
                  Área da bibliotecária
                </Link>
              )}
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground">
                <User className="size-4" aria-hidden />
                {user.nome.split(" ")[0]}
              </span>
              <button
                type="button"
                onClick={logout}
                aria-label="Sair"
                className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <LogOut className="size-4" aria-hidden />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground sm:inline-flex"
            >
              <User className="size-4" aria-hidden />
              Entrar
            </Link>
          )}

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-10 items-center justify-center rounded-lg text-foreground hover:bg-muted lg:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-background lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
            {nav.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-lg px-3 py-3 text-base font-medium transition-colors",
                    active
                      ? "bg-secondary text-secondary-foreground"
                      : "text-foreground hover:bg-muted",
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
            <Link
              href="/totem"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-3 text-base font-medium text-muted-foreground hover:bg-muted"
            >
              <Monitor className="size-4" aria-hidden />
              Modo Totem
            </Link>

            {user ? (
              <>
                {user.role === "bibliotecaria" && (
                  <Link
                    href="/admin"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-3 text-base font-medium text-muted-foreground hover:bg-muted"
                  >
                    <ShieldCheck className="size-4" aria-hidden />
                    Área da bibliotecária
                  </Link>
                )}
                <button
                  type="button"
                  onClick={() => {
                    logout()
                    setOpen(false)
                  }}
                  className="flex items-center gap-2 rounded-lg px-3 py-3 text-base font-medium text-muted-foreground hover:bg-muted"
                >
                  <LogOut className="size-4" aria-hidden />
                  Sair ({user.nome.split(" ")[0]})
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-3 text-base font-medium text-primary hover:bg-muted"
              >
                <User className="size-4" aria-hidden />
                Entrar
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  )
}
