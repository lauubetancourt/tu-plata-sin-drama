import { ActionTile } from '../components/ActionTile'
import { BottomNav } from '../components/BottomNav'
import { Button } from '../components/Button'
import { PhoneFrame } from '../components/PhoneFrame'
import { StatCard } from '../components/StatCard'

export function DashboardPage() {
  return (
    <PhoneFrame>
      <section className="space-y-5">
        <header className="rounded-3xl bg-slate-900 p-5 text-white">
          <p className="text-xs uppercase tracking-[0.2em] text-lime-300">
            Tu plata, sin drama
          </p>
          <h1 className="mt-2 text-2xl font-black">Registro express</h1>
          <p className="mt-2 text-xs text-slate-300">
            Registra un movimiento en menos de 10 segundos.
          </p>
          <div className="mt-4">
            <Button className="w-auto px-5" to="/registro-express">
              Ir a registro express
            </Button>
          </div>
        </header>

        <section className="grid grid-cols-2 gap-3">
          <StatCard amount="$1.2 MILL" label="Ingresos" tone="income" />
          <StatCard amount="$600 MIL" label="Gastos" tone="expense" />
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-bold text-slate-700">Acciones principales</h2>
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
