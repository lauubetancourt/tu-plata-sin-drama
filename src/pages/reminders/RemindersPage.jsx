import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { BellOff, CalendarClock, CheckCircle, Loader2, Pencil, Plus, Trash2 } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { Button } from '../../components/Button'
import { EmptyStateCard } from '../../components/EmptyStateCard'
import { FormField } from '../../components/FormField'
import { PageHeader } from '../../components/PageHeader'
import { PhoneFrame } from '../../components/PhoneFrame'

function fmtDate(iso) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('es-CO', {
    day: '2-digit', month: 'short', year: 'numeric',
  })
}

function daysLeft(iso) {
  const diff = new Date(iso) - new Date(new Date().toDateString())
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

function todayISO() {
  return new Date().toISOString().split('T')[0]
}

const EMPTY_FORM = { name: '', description: '', date: '' }

function toForm(reminder) {
  if (!reminder) return { ...EMPTY_FORM }
  return { name: reminder.name ?? '', description: reminder.description ?? '', date: reminder.date }
}

// ── ReminderFormDialog ────────────────────────────────────────────────────────
function ReminderFormDialog({ open, initial, onClose, onSave }) {
  const isEdit = !!initial
  const [form, setForm] = useState(() => toForm(initial))
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (open) {
      setForm(toForm(initial))
      setErrors({})
      setLoading(false)
    }
  }, [open, initial])

  function set(key, val) {
    setForm((prev) => ({ ...prev, [key]: val }))
    setErrors((prev) => { const n = { ...prev }; delete n[key]; return n })
  }

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = 'Ingresa un nombre para el recordatorio'
    if (!form.date) e.date = 'Elige una fecha'
    else if (form.date <= todayISO() && !isEdit) e.date = 'La fecha debe ser futura'
    return e
  }

  function handleSave() {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setLoading(true)
    setTimeout(() => {
      onSave({ name: form.name.trim(), description: form.description.trim(), date: form.date })
      setLoading(false)
    }, 1200)
  }

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o && !loading) onClose() }}>
      <DialogContent className="rounded-3xl" showCloseButton={false}>
        <DialogHeader className="flex items-center">
          <DialogTitle>{isEdit ? 'Editar recordatorio' : 'Nuevo recordatorio'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <FormField
            required
            label="Nombre"
            placeholder="Ej: Pago de tarjeta"
            value={form.name}
            error={errors.name}
            onChange={(e) => set('name', e.target.value)}
          />
          <FormField
            label="Descripción"
            placeholder="Ej: Pagar la cuota de crédito..."
            value={form.description}
            onChange={(e) => set('description', e.target.value)}
          />
          <FormField
            required
            type="date"
            label="Fecha"
            value={form.date}
            error={errors.date}
            onChange={(e) => set('date', e.target.value)}
          />
        </div>
        <DialogFooter className="grid grid-cols-2 gap-3 border-0 bg-transparent p-2 sm:grid-cols-2">
          <Button variant="ghost" disabled={loading} onClick={onClose}>Cancelar</Button>
          <Button disabled={loading} onClick={handleSave}>
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="size-4 animate-spin" />
                Guardando...
              </span>
            ) : 'Guardar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function RemindersPage() {
  const { isNewUser, reminders, addReminder, updateReminder, removeReminder } = useApp()

  const [formOpen, setFormOpen] = useState(false)
  const [formTarget, setFormTarget] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [successMsg, setSuccessMsg] = useState('')
  const [notifDenied, setNotifDenied] = useState(false)

  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'denied') {
      setNotifDenied(true)
    }
  }, [])

  function showSuccess(msg) {
    setSuccessMsg(msg)
    setTimeout(() => setSuccessMsg(''), 3000)
  }

  function openAdd() { setFormTarget(null); setFormOpen(true) }
  function openEdit(reminder) { setFormTarget(reminder); setFormOpen(true) }
  function closeForm() { setFormOpen(false); setFormTarget(null) }

  function handleSave(data) {
    if (formTarget) {
      updateReminder(formTarget.id, data)
      showSuccess('¡Recordatorio actualizado!')
    } else {
      addReminder(data)
      showSuccess('¡Recordatorio agregado!')
    }
    closeForm()
  }

  function handleDelete() {
    removeReminder(deleteTarget.id)
    setDeleteTarget(null)
    showSuccess('Recordatorio eliminado')
  }

  return (
    <PhoneFrame>
      <PageHeader title="Recordatorios" backTo="/dashboard" />

      {notifDenied && (
        <div className="flex items-start gap-3 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <BellOff className="mt-0.5 size-4 shrink-0" />
          <div>
            <p className="font-semibold">Notificaciones desactivadas</p>
            <p className="text-xs font-normal">Activa las notificaciones para que podamos avisarte cuando se acerque un pago</p>
          </div>
        </div>
      )}

      {/* Success banner */}
      {successMsg && (
        <div className="flex items-center gap-2 rounded-xl bg-emerald-100 px-4 py-3 text-sm font-semibold text-emerald-800">
          <CheckCircle className="size-4 shrink-0" />
          {successMsg}
        </div>
      )}

      {/* Empty state */}
      {reminders.length === 0 ? (
        <EmptyStateCard
          title="Aún no hay recordatorios"
          subtitle="Agrega un recordatorio para no olvidar tu fecha de pago"
          cta="Agregar recordatorio"
          action={openAdd}
        />
      ) : (
        <section className="space-y-3">
          <div className="flex">
            <div className="mt-5">
              <Button onClick={openAdd}>
                <Plus className="size-4" />
                Agregar
              </Button>
            </div>
          </div>
          {reminders.map((r) => {
            const days = daysLeft(r.date)
            const urgent = days <= 3 && days >= 0
            const overdue = days < 0
            return (
              <Card
                key={r.id}
                className={cn(
                  'rounded-2xl py-0',
                  overdue && 'border-red-300 bg-red-50',
                  urgent && !overdue && 'border-amber-300 bg-amber-50',
                )}
              >
                <CardContent className="space-y-2 p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-0.5">
                      <p className="text-sm font-bold text-foreground">{r.name}</p>
                      {r.description && (
                        <p className="text-xs text-muted-foreground">{r.description}</p>
                      )}
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <CalendarClock className="size-3" />
                        {fmtDate(r.date)}
                        {overdue && <span className="font-semibold text-red-600">· Vencido</span>}
                        {urgent && !overdue && (
                          <span className="font-semibold text-amber-600">
                            · {days === 0 ? 'Hoy' : `${days} día${days !== 1 ? 's' : ''}`}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button
                        className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground"
                        onClick={() => openEdit(r)}
                      >
                        <Pencil className="size-3.5" />
                      </button>
                      <button
                        className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-red-50 hover:text-destructive"
                        onClick={() => setDeleteTarget(r)}
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </section>
      )}

      {/* Form dialog (create + edit) */}
      <ReminderFormDialog
        open={formOpen}
        initial={formTarget}
        onClose={closeForm}
        onSave={handleSave}
      />

      {/* Delete dialog */}
      <Dialog open={!!deleteTarget} onOpenChange={(o) => { if (!o) setDeleteTarget(null) }}>
        <DialogContent className="rounded-3xl" showCloseButton={false}>
          <DialogHeader className="flex items-center">
            <DialogTitle>Eliminar recordatorio</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground text-center">
            ¿Estás seguro de que quieres eliminar <strong>{deleteTarget?.name}</strong>? <br/> Esta acción no se puede deshacer.
          </p>
          <DialogFooter className="grid grid-cols-2 gap-3 border-0 bg-transparent p-2 sm:grid-cols-2">
            <Button variant="ghost" onClick={() => setDeleteTarget(null)}>Cancelar</Button>
            <Button variant="destructive" onClick={handleDelete}>Sí, eliminar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PhoneFrame>
  )
}
