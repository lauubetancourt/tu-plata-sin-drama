import { Wallet } from 'lucide-react'
import { OnboardingSlide } from '../../components/OnboardingSlide'

export function OnboardingBudgetPage() {
  return (
    <OnboardingSlide
      description="Asigna limites por categoria y controla tus gastos para mantenerte dentro de presupuesto."
      nextTo="/onboarding/4"
      previousTo="/onboarding/2"
      step={3}
      title="Configura tus Presupuestos"
      icon={<Wallet/>}
      total={4}
    />
  )
}
