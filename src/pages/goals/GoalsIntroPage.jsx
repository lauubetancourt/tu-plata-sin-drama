import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '../../components/Button'
import { PageHeader } from '../../components/PageHeader'
import { PhoneFrame } from '../../components/PhoneFrame'

export function GoalsIntroPage() {
  return (
    <PhoneFrame>
      <PageHeader title="Metas de ahorro" backTo="/dashboard" />

      <Card className="rounded-3xl py-0">
        <CardContent className="space-y-3 p-5">
          <Badge variant="secondary">Plan de ahorro</Badge>
          <h2 className="text-xl font-black tracking-tight text-foreground">
            Alcanza tus Metas de Ahorro
          </h2>
          <p className="text-sm text-muted-foreground">
            Define un objetivo y ahorra paso a paso. Mantente enfocada con una
            visualizacion clara de tu avance.
          </p>
        </CardContent>
      </Card>

      <div className="mt-6">
        <Button to="/metas/nueva">Nueva meta</Button>
      </div>
    </PhoneFrame>
  )
}
