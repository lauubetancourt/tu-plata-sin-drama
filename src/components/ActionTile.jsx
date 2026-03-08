import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Link } from 'react-router-dom'

export function ActionTile({ to, title, subtitle }) {
  return (
    <Link className="h-full" to={to}>
      <Card className="h-full rounded-2xl border border-accent-foreground/20 bg-accent py-0 shadow-sm transition hover:-translate-y-0.5 hover:bg-accent/70">
        <CardHeader className="space-y-1 px-4 py-4">
          <CardTitle className="text-sm font-bold tracking-tight text-accent-foreground">
            {title}
          </CardTitle>
          <CardDescription className="text-xs text-accent-foreground/70">
            {subtitle}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  )
}
