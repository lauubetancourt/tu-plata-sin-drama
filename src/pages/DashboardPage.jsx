import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ActionTile } from '../components/ActionTile'
import { BottomNav } from '../components/BottomNav'
import { Button } from '../components/Button'
import { PhoneFrame } from '../components/PhoneFrame'
import { StatCard } from '../components/StatCard'

export function DashboardPage() {
  return (
    <PhoneFrame>
      <section className="space-y-5">
        <Card className="rounded-3xl border-border/80 bg-gradient-to-br from-foreground to-foreground/80 py-0 text-primary-foreground">
          <CardContent className="space-y-3 px-5 py-5">
            <Badge className="bg-primary/20 text-primary-foreground" variant="secondary">
              Tu plata, sin drama
            </Badge>
            <h1 className="text-2xl font-black tracking-tight">Registro express</h1>
            <p className="text-xs text-primary-foreground/70">
              Registra un movimiento en menos de 10 segundos.
            </p>
            <Button className="w-auto px-5" size="lg" to="/registro-express">
              Ir a registro express
            </Button>
          </CardContent>
        </Card>

        <section className="grid grid-cols-2 gap-3">
          <StatCard amount="$1.2 MILL" label="Ingresos" tone="income" />
          <StatCard amount="$600 MIL" label="Gastos" tone="expense" />
        </section>

        <section className="space-y-3">
          <div className="space-y-2">
            <h2 className="text-sm font-bold text-muted-foreground">Acciones principales</h2>
            <Separator />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <ActionTile
              subtitle="Lista, agrega y edita gastos"
              title="Movimientos"
              to="/movimientos"
            />
            <ActionTile
              subtitle="Clasifica tus registros"
              title="Categorias"
              to="/categorias"
            />
            <ActionTile
              subtitle="Sigue tus objetivos"
              title="Metas de ahorro"
              to="/metas/intro"
            />
            <ActionTile
              subtitle="Evita pagos olvidados"
              title="Recordatorios"
              to="/recordatorios/vacio"
            />
          </div>
        </section>
      </section>

      <BottomNav />
    </PhoneFrame>
  )
}
