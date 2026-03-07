import { BottomNav } from '../../components/BottomNav'
import { Button } from '../../components/Button'
import { EmptyStateCard } from '../../components/EmptyStateCard'
import { PageHeader } from '../../components/PageHeader'
import { PhoneFrame } from '../../components/PhoneFrame'

export function RemindersEmptyPage() {
  return (
    <PhoneFrame>
      <PageHeader title="Recordatorios" backTo="/dashboard" />

      <EmptyStateCard
        subtitle="Crea uno para no olvidar tus fechas de pago importantes."
        title="Sin recordatorios activos"
      />

      <div className="mt-5">
        <Button to="/recordatorios/nuevo">Nuevo recordatorio</Button>
      </div>

      <BottomNav />
    </PhoneFrame>
  )
}
