import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function EmptyStateCard({ title, subtitle }) {
  return (
    <Card className="rounded-3xl border border-dashed py-0 text-center">
      <CardHeader className="px-6 pb-0 pt-6">
        <Badge className="mx-auto" variant="secondary">
          Estado
        </Badge>
        <CardTitle className="pt-2 text-lg font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-6 pt-2 text-sm text-muted-foreground">
        {subtitle}
      </CardContent>
    </Card>
  )
}
