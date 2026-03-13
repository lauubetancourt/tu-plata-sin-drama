import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, Loader2, WifiOff } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '../../components/Button'
import { FormField } from '../../components/FormField'
import { PageHeader } from '../../components/PageHeader'
import { PhoneFrame } from '../../components/PhoneFrame'
import { useApp } from '../../context/AppContext'

function todayISO() {
  return new Date().toISOString().split('T')[0]
}

export function NewReminderPage() {
  const { isOnline } = useApp()
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (loading) {
      const t = setTimeout(() => { setLoading(false); setSaved(true) }, 1500)
      return () => clearTimeout(t)
    }
  }, [loading])

  useEffect(() => {
    if (saved) {
      const t = setTimeout(() => navigate('/recordatorios'), 2000)
      return () => clearTimeout(t)
    }
  }, [saved, navigate])

  function clearError(key) {
    setErrors(prev => { const n = { ...prev }; delete n[key]; return n })
  }

  function handleSave() {
    const e = {}
    if (!description.trim()) e.description = 'La descripción es obligatoria'
    if (!date) e.date = 'La fecha es obligatoria'
    if (Object.keys(e).length) { setErrors(e); return }
    setLoading(true)
  }

  const isOfflineSave = saved && !isOnline

  return (
    <PhoneFrame>
      <PageHeader title="Nuevo recordatorio" backTo="/recordatorios" />

      {saved && (
        <div
          className={cn(
            'flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold',
            isOfflineSave
              ? 'border border-amber-300 bg-amber-50 text-amber-800'
              : 'bg-emerald-100 text-emerald-800',
          )}
        >
          {isOfflineSave ? (
            <WifiOff className="size-4 shrink-0" />
          ) : (
            <CheckCircle className="size-4 shrink-0" />
          )}
          {isOnline
            ? 'Recordatorio creado exitosamente'
            : 'Sin conexión — recordatorio guardado localmente'}
        </div>
      )}

      <Card className="rounded-3xl py-0">
        <CardContent className="space-y-4 p-4">
          <FormField
            required
            autoFocus
            label="Descripción"
            placeholder="Ej. Pago de tarjeta, Netflix"
            value={description}
            error={errors.description}
            onChange={(e) => { setDescription(e.target.value); clearError('description') }}
          />
          <FormField
            required
            label="Fecha de vencimiento"
            type="date"
            value={date}
            error={errors.date}
            onChange={(e) => { setDate(e.target.value); clearError('date') }}
          />
        </CardContent>
      </Card>

      <div className="mt-6">
        <Button disabled={loading || saved} onClick={handleSave}>
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="size-4 animate-spin" />
              Guardando...
            </span>
          ) : 'Guardar recordatorio'}
        </Button>
      </div>
    </PhoneFrame>
  )
}
