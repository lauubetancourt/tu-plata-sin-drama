import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, Loader2 } from 'lucide-react'
import { Button } from '../../components/Button'
import { FormField } from '../../components/FormField'
import { PageHeader } from '../../components/PageHeader'
import { PhoneFrame } from '../../components/PhoneFrame'

function todayISO() {
  return new Date().toISOString().split('T')[0]
}

export function NewGoalPage() {
  const [name, setName] = useState('')
  const [target, setTarget] = useState('')
  const [deadline, setDeadline] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const navigate = useNavigate()

  // real-time validation
  useEffect(() => {
    const e = {}
    if (target !== '' && Number(target) === 0) e.target = 'El valor de la meta debe ser mayor a cero'
    if (deadline && deadline < todayISO()) e.deadline = 'La fecha límite no puede ser una fecha pasada'
    setErrors(e)
  }, [target, deadline])

  useEffect(() => {
    if (loading) {
      const t = setTimeout(() => { setLoading(false); setSaved(true) }, 1500)
      return () => clearTimeout(t)
    }
  }, [loading])

  useEffect(() => {
    if (saved) {
      const t = setTimeout(() => navigate('/metas'), 2000)
      return () => clearTimeout(t)
    }
  }, [saved, navigate])

  function handleSave() {
    const e = {}
    if (!name.trim()) e.name = 'El nombre es obligatorio'
    if (!target) e.target = 'El valor de la meta es obligatorio'
    else if (Number(target) === 0) e.target = 'El valor de la meta debe ser mayor a cero'
    if (!deadline) e.deadline = 'La fecha límite es obligatoria'
    else if (deadline < todayISO()) e.deadline = 'La fecha límite no puede ser una fecha pasada'
    if (Object.keys(e).length) { setErrors(e); return }
    setLoading(true)
  }

  const hasErrors = Object.keys(errors).length > 0

  return (
    <PhoneFrame>
      <PageHeader title="Nueva meta" backTo="/metas/intro" />

      {saved && (
        <div className="flex items-center gap-2 rounded-xl bg-emerald-100 px-4 py-3 text-sm font-semibold text-emerald-800">
          <CheckCircle className="size-4 shrink-0" />
          Meta creada exitosamente
        </div>
      )}

      <Card className="rounded-3xl py-0">
        <CardContent className="space-y-4 p-4">
          <FormField
            required
            autoFocus
            label="Nombre de la meta"
            placeholder="Ej. Viaje, Fondo de emergencia"
            value={name}
            error={errors.name}
            onChange={(e) => {
              setName(e.target.value)
              if (e.target.value.trim()) setErrors(prev => { const n = { ...prev }; delete n.name; return n })
            }}
          />
          <FormField
            required
            inputMode="numeric"
            label="Valor de la meta"
            placeholder="Ingresa el monto"
            value={target}
            error={errors.target}
            onChange={(e) => setTarget(e.target.value.replace(/[^0-9]/g, ''))}
          />
          <FormField
            required
            label="Fecha límite"
            type="date"
            value={deadline}
            error={errors.deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </CardContent>
      </Card>

      <div className="mt-6">
        <Button disabled={hasErrors || loading || saved} onClick={handleSave}>
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="size-4 animate-spin" />
              Guardando...
            </span>
          ) : 'Guardar meta'}
        </Button>
      </div>
    </PhoneFrame>
  )
}
