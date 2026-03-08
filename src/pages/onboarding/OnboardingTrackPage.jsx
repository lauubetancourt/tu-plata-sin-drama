import { BanknoteArrowUp } from 'lucide-react'
import { OnboardingSlide } from '../../components/OnboardingSlide'

export function OnboardingTrackPage() {
  return (
    <OnboardingSlide
      description="Anota tus gastos e ingresos en pocos pasos. Visualiza tu historial en segundos."
      nextTo="/onboarding/3"
      previousTo="/onboarding/1"
      step={2}
      title="Registra tus Gastos e Ingresos"
      icon={<BanknoteArrowUp/>}
      total={4}
    />
  )
}
