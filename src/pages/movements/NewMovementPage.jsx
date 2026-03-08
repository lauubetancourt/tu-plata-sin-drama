import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { CheckCircle, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '../../components/Button'
import { FormField } from '../../components/FormField'
import { SelectField } from '../../components/SelectField'
import { PageHeader } from '../../components/PageHeader'
import { PhoneFrame } from '../../components/PhoneFrame'

const CATEGORIES = ['Comida', 'Transporte', 'Entretenimiento', 'Salud', 'Personal', 'Educación', 'Otro']
const PERIODICITIES = ['Semanal', 'Quincenal', 'Mensual', 'Anual']

function todayISO() {
  return new Date().toISOString().split('T')[0]
}

function nextChargeLabel(dateStr, periodicity) {
  const d = new Date(dateStr)
  if (periodicity === 'Semanal') d.setDate(d.getDate() + 7)
  else if (periodicity === 'Quincenal') d.setDate(d.getDate() + 15)
  else if (periodicity === 'Mensual') d.setMonth(d.getMonth() + 1)
  else if (periodicity === 'Anual') d.setFullYear(d.getFullYear() + 1)
  return d.toLocaleDateString('es-CO', { day: '2-digit', month: 'long', year: 'numeric' })
}

export function NewMovementPage() {
  const [type, setType] = useState('gasto')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(todayISO())
  const [recurring, setRecurring] = useState(false)
  const [startDate, setStartDate] = useState(todayISO())
  const [endDate, setEndDate] = useState('')
  const [periodicity, setPeriodicity] = useState('Mensual')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [nextCharge, setNextCharge] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (loading) {
      const t = setTimeout(() => { setLoading(false); setSaved(true) }, 1500)
      return () => clearTimeout(t)
    }
  }, [loading])

  useEffect(() => {
    if (saved) {
      const t = setTimeout(() => navigate('/movimientos'), 2000)
      return () => clearTimeout(t)
    }
  }, [saved, navigate])

  function validate() {
    const e = {}
    if (!amount) e.amount = 'El monto es obligatorio'
    if (type === 'gasto' && !category) e.category = 'La categoría es obligatoria'
    if (!date) e.date = 'La fecha es obligatoria'
    if (type === 'gasto' && recurring && !startDate) e.startDate = 'La fecha de inicio es obligatoria'
    return e
  }

  function handleSave() {
    const e = validate()
    if (Object.keys(e).length > 0) { setErrors(e); return }
    if (type === 'gasto' && recurring && startDate) {
      setNextCharge(nextChargeLabel(startDate, periodicity))
    }
    setLoading(true)
  }

  function clearError(key) {
    setErrors(prev => { const n = { ...prev }; delete n[key]; return n })
  }

  const isExpense = type === 'gasto'

  return (
    <PhoneFrame>
      <PageHeader title="Nuevo movimiento" backTo="/movimientos" />

      {saved && (
        <div className="flex flex-col gap-1 rounded-xl bg-emerald-100 px-4 py-3 text-sm font-semibold text-emerald-800">
          <div className="flex items-center gap-2">
            <CheckCircle className="size-4 shrink-0" />
            Movimiento guardado exitosamente
          </div>
          {nextCharge && (
            <p className="text-xs font-normal">Próximo cobro automático: {nextCharge}</p>
          )}
        </div>
      )}

      <div className="grid grid-cols-2 gap-2 pb-2">
        {['gasto', 'ingreso'].map((t) => (
          <button
            key={t}
            className={cn(
              'h-10 rounded-xl text-sm font-semibold capitalize transition',
              type === t
                ? 'bg-primary text-primary-foreground'
                : 'border border-border bg-background text-muted-foreground hover:bg-muted'
            )}
            onClick={() => { setType(t); setErrors({}); setRecurring(false) }}
          >
            {t}
          </button>
        ))}
      </div>

      <Card className="rounded-3xl py-0">
        <CardContent className="space-y-4 p-4">
          <FormField
            required
            autoFocus
            inputMode="numeric"
            label="Monto"
            placeholder="Ingresa el monto"
            value={amount}
            error={errors.amount}
            onChange={(e) => {
              const v = e.target.value.replace(/[^0-9]/g, '')
              setAmount(v)
              if (v) clearError('amount')
            }}
          />

          {isExpense && (
            <SelectField
              required
              label="Categoría"
              value={category}
              error={errors.category}
              onChange={(e) => { setCategory(e.target.value); clearError('category') }}
            >
              <option value="">Selecciona una categoría</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </SelectField>
          )}

          <FormField
            label="Descripción"
            placeholder="Descripción opcional"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <FormField
            required
            label="Fecha"
            type="date"
            value={date}
            error={errors.date}
            onChange={(e) => { setDate(e.target.value); clearError('date') }}
          />

          {isExpense && (
            <>
              <Separator />
              <label className="flex cursor-pointer items-center justify-between gap-3">
                <span className="text-xs font-semibold text-muted-foreground">¿Es recurrente?</span>
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-primary"
                  checked={recurring}
                  onChange={(e) => setRecurring(e.target.checked)}
                />
              </label>

              {recurring && (
                <>
                  <FormField
                    required
                    label="Fecha de inicio"
                    type="date"
                    value={startDate}
                    error={errors.startDate}
                    onChange={(e) => { setStartDate(e.target.value); clearError('startDate') }}
                  />
                  <FormField
                    label="Fecha de fin (opcional)"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                  <SelectField
                    required
                    label="Periodicidad"
                    value={periodicity}
                    onChange={(e) => setPeriodicity(e.target.value)}
                  >
                    {PERIODICITIES.map((p) => <option key={p} value={p}>{p}</option>)}
                  </SelectField>
                </>
              )}
            </>
          )}
        </CardContent>
      </Card>

      <div className="mt-6">
        <Button disabled={loading || saved} onClick={handleSave}>
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="size-4 animate-spin" />
              Guardando...
            </span>
          ) : 'Guardar movimiento'}
        </Button>
      </div>
    </PhoneFrame>
  )
}
