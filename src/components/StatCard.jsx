import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export function StatCard({ label, icon, amount, tone = 'income' }) {
  const accent =
    tone === 'expense'
      ? 'border-red-300 bg-red-100 text-red-800'
      : 'border-emerald-300 bg-emerald-100 text-emerald-800'

  const iconAccent =
    tone === 'expense'
      ? 'bg-red-200 text-red-700'
      : 'bg-emerald-200 text-emerald-700'

  return (
    <Card className={cn('rounded-2xl py-0', accent)}>
      <CardHeader className="px-4 pb-0 pt-4">
        <div className="flex flex-row items-center gap-2">
          <span className={cn('flex h-7 w-7 items-center justify-center rounded-lg [&_svg]:size-4', iconAccent)}>
            {icon}
          </span>
          <p className="text-xs font-semibold uppercase tracking-wider text-current">{label}</p>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4 pt-2">
        <CardTitle className="text-xl font-extrabold">{amount}</CardTitle>
      </CardContent>
    </Card>
  )
}
