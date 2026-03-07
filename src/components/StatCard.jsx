import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export function StatCard({ label, amount, tone = 'income' }) {
  const accent =
    tone === 'expense'
      ? 'border-red-200/80 bg-red-50/80 text-red-700'
      : 'border-emerald-200/80 bg-emerald-50/80 text-emerald-700'

  return (
    <Card className={cn('rounded-2xl py-0', accent)}>
      <CardHeader className="px-4 pb-0 pt-4">
        <Badge
          className="w-fit border-current/20 bg-white/60 text-[10px] uppercase tracking-wide"
          variant="outline"
        >
          {label}
        </Badge>
      </CardHeader>
      <CardContent className="px-4 pb-4 pt-2">
        <CardTitle className="text-xl font-extrabold">{amount}</CardTitle>
      </CardContent>
    </Card>
  )
}
