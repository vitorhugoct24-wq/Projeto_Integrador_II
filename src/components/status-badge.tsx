import { cn } from "@/lib/utils"
import type { Disponibilidade } from "@/lib/data"
import { statusLabel } from "@/lib/data"

const styles: Record<Disponibilidade, string> = {
  disponivel: "bg-success/15 text-success ring-1 ring-success/25",
  emprestado: "bg-muted text-muted-foreground ring-1 ring-border",
  reservado: "bg-accent/25 text-accent-foreground ring-1 ring-accent/40",
}

export function StatusBadge({
  status,
  className,
}: {
  status: Disponibilidade
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        styles[status],
        className,
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          status === "disponivel" && "bg-success",
          status === "emprestado" && "bg-muted-foreground",
          status === "reservado" && "bg-accent-foreground/70",
        )}
        aria-hidden
      />
      {statusLabel[status]}
    </span>
  )
}
