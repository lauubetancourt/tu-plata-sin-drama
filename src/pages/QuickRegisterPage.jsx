import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, Loader2, Zap } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { Button } from '../components/Button'
import { FormField } from '../components/FormField'
import { PageHeader } from '../components/PageHeader'
import { PhoneFrame } from '../components/PhoneFrame'

function todayISO() {
  return new Date().toISOString().split('T')[0]
}

export function QuickRegisterPage() {
  const { addMovement } = useApp()
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [amountError, setAmountError] = useState(false)

  const amountValid = amount.trim() !== ''
  const navigate = useNavigate()

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        addMovement({
          type: 'gasto',
          name: 'Gasto rápido',
          amount: Number(amount),
          description: description.trim(),
          date: todayISO(),
          recurring: false,
          express: true,
        })
        setLoading(false)
        setSaved(true)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [loading])

  useEffect(() => {
    if (saved) {
      const timer = setTimeout(() => navigate('/movimientos'), 2000)
      return () => clearTimeout(timer)
    }
  }, [saved, navigate])

  function handleSave() {
    if (!amountValid) {
      setAmountError(true)
      return
    }
    setLoading(true)
  }

  return (
    <PhoneFrame>
      <PageHeader
        backTo="/dashboard"
        title="Gasto rápido"
      />

      {saved && (
        <div className="flex items-center gap-2 rounded-xl bg-emerald-100 px-4 py-3 text-sm font-semibold text-emerald-800">
          <CheckCircle className="size-4 shrink-0" />
          ¡Gasto agregado a tus movimientos!
        </div>
      )}

      <Card className="rounded-3xl py-0 ring-0">
        <CardContent className="space-y-4 p-4">
          <FormField
            required
            autoFocus
            inputMode="numeric"
            label="Valor"
            placeholder="Ej: 15000"
            value={amount}
            error={amountError ? 'Ingresa el valor del gasto' : undefined}
            onChange={(e) => {
              const onlyNums = e.target.value.replace(/[^0-9]/g, '')
              setAmount(onlyNums)
              if (onlyNums) setAmountError(false)
            }}
          />
          <FormField
            label="Descripción"
            placeholder="Ej: Café, taxi, almuerzo..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </CardContent>
      </Card>

      <div className="mt-6">
        <Button disabled={!amountValid || loading || saved} onClick={handleSave}>
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="size-4 animate-spin" />
              Agregando...
            </span>
          ) : (
            'Agregar'
          )}
        </Button>
      </div>
    </PhoneFrame>
  )
}
