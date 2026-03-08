import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { Loader2, WifiOff } from 'lucide-react'
import { Button } from './Button'
import { FormField } from './FormField'
import { SelectField } from './SelectField'

const PERIODICITIES = ['Semanal', 'Quincenal', 'Mensual', 'Anual']

function todayISO() {
  return new Date().toISOString().split('T')[0]
}

const EMPTY = {
  type: 'gasto',
  name: '',
  amount: '',
  category: '',
  description: '',
  date: todayISO(),
  recurring: false,
  startDate: todayISO(),
  endDate: '',
  periodicity: 'Mensual',
}

function toForm(movement) {
  if (!movement) return { ...EMPTY, date: todayISO(), startDate: todayISO() }
  return {
    type: movement.type,
    name: movement.name,
    amount: String(movement.amount),
    category: movement.category ?? '',
    description: movement.description ?? '',
    date: movement.date,
    recurring: movement.recurring ?? false,
    startDate: movement.startDate ?? todayISO(),
    endDate: movement.endDate ?? '',
    periodicity: movement.periodicity ?? 'Mensual',
  }
}

/**
 * Reusable dialog for creating and editing movements.
 *
 * Props:
 *  open          – controlled visibility
 *  initial       – null → "create" mode | movement object → "edit" mode
 *  onClose       – called when dialog should close
 *  onSave(data)  – called with the validated form data after the loading delay
 *  categoryNames – string[] of available category names
 *  isOnline      – boolean; shows offline warning inside form when false
 */
export function MovementFormDialog({ open, initial, onClose, onSave, categoryNames, isOnline }) {
  const isEdit = !!initial

  const [form, setForm] = useState(() => toForm(initial))
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  // Reset form each time the dialog opens or the target movement changes
  useEffect(() => {
    if (open) {
      setForm(toForm(initial))
      setErrors({})
      setLoading(false)
    }
  }, [open, initial])

  function set(key, val) {
    setForm((prev) => ({ ...prev, [key]: val }))
    setErrors((prev) => {
      const next = { ...prev }
      delete next[key]
      return next
    })
  }

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = 'El nombre es obligatorio'
    if (!form.amount || Number(form.amount) === 0)
      e.amount = 'El monto debe ser mayor a cero'
    if (form.type === 'gasto' && !form.category)
      e.category = 'La categoría es obligatoria'
    if (!form.date) e.date = 'La fecha es obligatoria'
    if (form.type === 'gasto' && form.recurring && !form.startDate)
      e.startDate = 'La fecha de inicio es obligatoria'
    return e
  }

  function handleSave() {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }

    setLoading(true)
    setTimeout(() => {
      onSave({
        ...form,
        name: form.name.trim(),
        amount: Number(form.amount),
      })
      // parent will close dialog; React 19 is safe with this state update
      setLoading(false)
    }, 1200)
  }

  const isExpense = form.type === 'gasto'

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o && !loading) onClose() }}>
      <DialogContent className="rounded-3xl" showCloseButton={false}>
        <DialogHeader className="flex items-center">
          <DialogTitle>{isEdit ? 'Editar movimiento' : 'Nuevo movimiento'}</DialogTitle>
        </DialogHeader>

        {!isOnline && (
          <div className="flex items-center gap-2 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700">
            <WifiOff className="size-3.5 shrink-0" />
            Sin conexión — los cambios se guardarán localmente
          </div>
        )}

        <div className="max-h-[55vh] space-y-3 overflow-y-auto pr-1">
          {/* Type toggle — segmented control */}
          <div className="flex rounded-xl bg-muted p-1 gap-1">
            {['gasto', 'ingreso'].map((t) => (
              <button
                key={t}
                className={cn(
                  'flex-1 h-8 rounded-lg text-sm font-semibold capitalize transition',
                  form.type === t
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground',
                )}
                onClick={() => set('type', t)}
              >
                {t}
              </button>
            ))}
          </div>

          <FormField
            required
            label="Nombre"
            placeholder={isExpense ? 'Ej. Almuerzo, arriendo' : 'Ej. Salario, venta'}
            value={form.name}
            error={errors.name}
            onChange={(e) => set('name', e.target.value)}
          />

          <FormField
            required
            inputMode="numeric"
            label="Valor"
            placeholder={'Ej. 15000'}
            value={form.amount}
            error={errors.amount}
            onChange={(e) => set('amount', e.target.value.replace(/[^0-9]/g, ''))}
          />

          {isExpense && (
            <SelectField
              required
              label="Categoría"
              value={form.category}
              error={errors.category}
              onChange={(e) => set('category', e.target.value)}
            >
              <option value="">Selecciona una categoría</option>
              {categoryNames.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </SelectField>
          )}

          <FormField
            label="Descripción"
            placeholder={isExpense ? 'Ej. Almuerzo de cumpleaños, arriendo de oficina' : 'Ej. Quincena de marzo, venta de bicicleta'}
            value={form.description}
            onChange={(e) => set('description', e.target.value)}
          />

          {/* Para gastos: primero el toggle de recurrencia, luego el(los) campo(s) de fecha */}
          {isExpense && (
            <>
              <Separator />
              <label className="flex cursor-pointer items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground">
                  ¿Es recurrente?
                </span>
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-primary"
                  checked={form.recurring}
                  onChange={(e) => set('recurring', e.target.checked)}
                />
              </label>
            </>
          )}

          {/* Fecha única: ingresos siempre, gastos no recurrentes */}
          {(!isExpense || !form.recurring) && (
            <FormField
              required
              label="Fecha"
              type="date"
              value={form.date}
              error={errors.date}
              onChange={(e) => set('date', e.target.value)}
            />
          )}

          {/* Fechas de recurrencia: solo gastos recurrentes */}
          {isExpense && form.recurring && (
            <>
              <FormField
                required
                label="Fecha de inicio"
                type="date"
                value={form.startDate}
                error={errors.startDate}
                onChange={(e) => set('startDate', e.target.value)}
              />
              <FormField
                label="Fecha de fin (opcional)"
                type="date"
                value={form.endDate}
                onChange={(e) => set('endDate', e.target.value)}
              />
              <SelectField
                required
                label="Periodicidad"
                value={form.periodicity}
                onChange={(e) => set('periodicity', e.target.value)}
              >
                {PERIODICITIES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </SelectField>
            </>
          )}
        </div>

        <DialogFooter className="grid grid-cols-2 gap-3 border-0 bg-transparent p-4 sm:grid-cols-2">
          <Button variant="ghost" disabled={loading} onClick={onClose}>
            Cancelar
          </Button>
          <Button disabled={loading} onClick={handleSave}>
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="size-4 animate-spin" />
                Agregando...
              </span>
            ) : (isEdit ? 'Guardar' : 'Agregar')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
