import Link from "next/link"
import { cn } from "@/lib/utils"
import type { Item } from "@/lib/data"
import { ItemCover } from "@/components/item-cover"
import { LiveStatusBadge } from "@/components/live-status-badge"

export function ItemCard({
  item,
  className,
}: {
  item: Item
  className?: string
}) {
  return (
    <Link
      href={`/item/${item.id}`}
      className={cn(
        "group flex flex-col gap-3 rounded-2xl border border-border bg-card p-3 transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      <div className="relative">
        <ItemCover item={item} className="transition-transform group-hover:scale-[1.01]" />
        {item.novidade && (
          <span className="absolute -right-1.5 -top-1.5 rounded-full bg-accent px-2 py-0.5 text-[0.65rem] font-semibold text-accent-foreground shadow-sm">
            Novidade
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <h3 className="font-serif text-sm font-semibold leading-tight text-foreground line-clamp-2">
          {item.titulo}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-1">{item.autor}</p>
        <div className="mt-auto pt-2">
          <LiveStatusBadge itemId={item.id} statusInicial={item.status} />
        </div>
      </div>
    </Link>
  )
}
