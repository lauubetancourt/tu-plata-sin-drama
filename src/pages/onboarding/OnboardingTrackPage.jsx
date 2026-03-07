import { OnboardingSlide } from '../../components/OnboardingSlide'

export function OnboardingTrackPage() {
  return (
    <OnboardingSlide
      description="Empieza a registrar tus movimientos por categoria y visualiza tu historial en segundos."
      nextTo="/onboarding/3"
      previousTo="/onboarding/1"
      step={2}
      title="Registra tus Gastos"
      total={4}
    />
  )
}
