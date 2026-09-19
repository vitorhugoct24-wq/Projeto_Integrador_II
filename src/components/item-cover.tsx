import { cn } from "@/lib/utils"
import type { Item } from "@/lib/data"
import { tiposLabel } from "@/lib/data"
import { TypeIcon } from "@/components/type-icon"

// Capa estilizada em CSS no formato de lombada/capa de estante.
export function ItemCover({
  item,
  className,
}: {
  item: Item
  className?: string
}) {
  return (
    <div
      className={cn(
        "relative flex aspect-[3/4] flex-col justify-between overflow-hidden rounded-md p-3 shadow-sm",
        className,
      )}
      style={{ backgroundColor: item.corCapa, color: item.corTexto }}
    >
      {/* lombada */}
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 w-1.5 bg-black/15"
      />
      <span
        aria-hidden
        className="absolute inset-y-0 left-1.5 w-px bg-white/20"
      />
      <div className="flex items-center justify-between pl-2">
        <TypeIcon tipo={item.tipo} className="size-4 opacity-80" />
        <span className="text-[0.6rem] font-medium uppercase tracking-wide opacity-70">
          {tiposLabel[item.tipo]}
        </span>
      </div>
      <div className="pl-2">
        <p className="font-serif text-sm font-semibold leading-tight text-balance line-clamp-4">
          {item.titulo}
        </p>
        <p className="mt-1 text-[0.7rem] leading-snug opacity-80 line-clamp-2">
          {item.autor}
        </p>
      </div>
    </div>
  )
}
