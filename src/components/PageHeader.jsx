import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'

export function PageHeader({ title, backTo, rightSlot }) {
  return (
    <header className="mb-5 flex items-center justify-between">
      <div className="w-24">
        {backTo ? (
          <Link
            to={backTo}
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'sm' }),
              'h-8 w-auto rounded-xl px-2 text-xs',
            )}
          >
            <span aria-hidden="true">‹</span>
            Volver
          </Link>
        ) : null}
      </div>
      <h1 className="text-base font-bold tracking-tight text-foreground">{title}</h1>
      <div className="w-24 text-right text-xs font-semibold text-muted-foreground">
        {rightSlot}
      </div>
    </header>
  )
}
