import { useState } from 'react'
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
const MOVEMENT_TYPES = ['gasto', 'ingreso']
const MOVEMENT_COPY = {
  gasto: {
    createTitle: 'Agregar gasto',
    editTitle: 'Editar gasto',
    nameLabel: '¿Qué gasto realizaste?',
    namePlaceholder: 'Ej. Almuerzo, arriendo',
    nameRequired: 'Escribe qué gasto realizaste para agregarlo.',
    amountLabel: 'Valor del gasto',
    amountPlaceholder: 'Ej. 15000',
    amountRequired: 'Escribe el valor para agregar este gasto.',
    categoryRequired: 'Selecciona una categoría para este gasto.',
    descriptionLabel: 'Descripción del gasto',
    descriptionPlaceholder: 'Ej. Almuerzo de cumpleaños, arriendo de oficina',
    dateLabel: 'Fecha del gasto',
    dateRequired: 'La fecha del gasto es obligatoria',
    recurringLabel: '¿Es un gasto recurrente?',
    startDateLabel: 'Fecha de inicio del gasto',
    startDateRequired: 'La fecha de inicio del gasto es obligatoria',
    endDateLabel: 'Fecha de fin del gasto (opcional)',
    periodicityLabel: 'Frecuencia del gasto',
    loadingCreate: 'Agregando gasto...',
    loadingEdit: 'Guardando gasto...',
    submitCreate: 'Agregar gasto',
    submitEdit: 'Guardar cambios',
  },
  ingreso: {
    createTitle: 'Agregar ingreso',
    editTitle: 'Editar ingreso',
    nameLabel: '¿Qué ingreso recibiste?',
    namePlaceholder: 'Ej. Salario, venta',
    nameRequired: 'Escribe qué ingreso recibiste para agregarlo.',
    amountLabel: 'Valor del ingreso',
    amountPlaceholder: 'Ej. 2500000',
    amountRequired: 'Escribe el valor para agregar este ingreso.',
    descriptionLabel: 'Descripción del ingreso',
    descriptionPlaceholder: 'Ej. Quincena de marzo, venta de bicicleta',
    dateLabel: 'Fecha del ingreso',
    dateRequired: 'La fecha del ingreso es obligatoria',
    loadingCreate: 'Agregando ingreso...',
    loadingEdit: 'Guardando ingreso...',
    submitCreate: 'Agregar ingreso',
    submitEdit: 'Guardar cambios',
  },
}

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
export function MovementFormDialog(props) {
  const { open, initial } = props
  const resetKey = open ? `${initial?.id ?? 'create'}-${initial?.type ?? 'gasto'}` : 'closed'

  return <MovementFormDialogContent key={resetKey} {...props} />
}

function MovementFormDialogContent({ open, initial, onClose, onSave, categoryNames, isOnline }) {
  const isEdit = !!initial

  const [form, setForm] = useState(() => toForm(initial))
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  function set(key, val) {
    setForm((prev) => ({ ...prev, [key]: val }))
    setErrors((prev) => {
      const next = { ...prev }
      delete next[key]
      return next
    })
  }

  function handleTypeChange(type) {
    setForm((prev) => ({
      ...prev,
      type,
      ...(type === 'ingreso'
        ? {
            category: '',
            recurring: false,
            startDate: todayISO(),
            endDate: '',
            periodicity: 'Mensual',
          }
        : {}),
    }))
    setErrors({})
  }

  function validate() {
    const e = {}
    const copy = MOVEMENT_COPY[form.type] ?? MOVEMENT_COPY.gasto
    if (!form.name.trim()) e.name = copy.nameRequired
    if (!form.amount || Number(form.amount) === 0)
      e.amount = copy.amountRequired
    if (form.type === 'gasto' && !form.category)
      e.category = copy.categoryRequired
    if (!form.date) e.date = copy.dateRequired
    if (form.type === 'gasto' && form.recurring && !form.startDate)
      e.startDate = copy.startDateRequired
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
  const copy = MOVEMENT_COPY[form.type] ?? MOVEMENT_COPY.gasto

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o && !loading) onClose() }}>
      <DialogContent className="rounded-3xl" showCloseButton={false}>
        <DialogHeader className="flex items-center">
          <DialogTitle>{isEdit ? copy.editTitle : copy.createTitle}</DialogTitle>
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
            {MOVEMENT_TYPES.map((t) => (
              <button
                key={t}
                className={cn(
                  'flex-1 h-8 rounded-lg text-sm font-semibold capitalize transition',
                  form.type === t
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground',
                )}
                onClick={() => handleTypeChange(t)}
              >
                {t}
              </button>
            ))}
          </div>

          <FormField
            required
            label={copy.nameLabel}
            placeholder={copy.namePlaceholder}
            value={form.name}
            error={errors.name}
            onChange={(e) => set('name', e.target.value)}
          />

          <FormField
            required
            inputMode="numeric"
            label={copy.amountLabel}
            placeholder={copy.amountPlaceholder}
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
            label={copy.descriptionLabel}
            placeholder={copy.descriptionPlaceholder}
            value={form.description}
            onChange={(e) => set('description', e.target.value)}
          />

          {/* Para gastos: primero el toggle de recurrencia, luego el(los) campo(s) de fecha */}
          {isExpense && (
            <>
              <Separator />
              <label className="flex cursor-pointer items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground">
                  {copy.recurringLabel}
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
              label={copy.dateLabel}
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
                label={copy.startDateLabel}
                type="date"
                value={form.startDate}
                error={errors.startDate}
                onChange={(e) => set('startDate', e.target.value)}
              />
              <FormField
                label={copy.endDateLabel}
                type="date"
                value={form.endDate}
                onChange={(e) => set('endDate', e.target.value)}
              />
              <SelectField
                required
                label={copy.periodicityLabel}
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
                {isEdit ? copy.loadingEdit : copy.loadingCreate}
              </span>
            ) : (isEdit ? copy.submitEdit : copy.submitCreate)}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
