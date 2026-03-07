import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Link } from 'react-router-dom'

export function ActionTile({ to, title, subtitle }) {
  return (
    <Link to={to}>
      <Card className="rounded-2xl border border-border/70 bg-card py-0 transition hover:-translate-y-0.5 hover:border-primary/40">
        <CardHeader className="space-y-1 px-4 py-4">
          <CardTitle className="text-sm font-bold tracking-tight">{title}</CardTitle>
          <CardDescription className="text-xs">{subtitle}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  )
}
