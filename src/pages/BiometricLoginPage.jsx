import { Button } from '../components/Button'
import { PhoneFrame } from '../components/PhoneFrame'

export function BiometricLoginPage() {
  return (
    <PhoneFrame>
      <section className="flex min-h-full flex-col items-center justify-center text-center">
        <div className="w-full max-w-xs rounded-3xl border border-slate-200 bg-white px-6 py-8 shadow-sm">
          <div className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-3xl bg-slate-900 text-4xl text-white">
            <span aria-hidden="true">◎</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">iHola!</h1>
          <p className="mt-2 text-sm font-semibold text-slate-700">
            Ingresa con huella
          </p>
          <div className="mt-5 rounded-2xl bg-slate-100 p-3 text-xs text-slate-600">
            Autenticacion biometrica
            <br />
            Toca el sensor para continuar.
          </div>
        </div>

        <div className="mt-6 w-full space-y-3">
          <Button to="/onboarding/1">Simular huella</Button>
          <Button to="/onboarding/1" variant="ghost">
            Cancelar
          </Button>
        </div>
      </section>
    </PhoneFrame>
  )
}
