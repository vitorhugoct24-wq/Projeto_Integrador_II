import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function SectionHeading({
  eyebrow,
  title,
  href,
  linkLabel = "Ver tudo",
}: {
  eyebrow?: string
  title: string
  href?: string
  linkLabel?: string
}) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-accent-foreground/70">
            {eyebrow}
          </p>
        )}
        <h2 className="font-serif text-2xl font-semibold text-foreground text-balance">{title}</h2>
      </div>
      {href && (
        <Link
          href={href}
          className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          {linkLabel}
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      )}
    </div>
  )
}
