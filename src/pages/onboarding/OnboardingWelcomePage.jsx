import { OnboardingSlide } from '../../components/OnboardingSlide'

export function OnboardingWelcomePage() {
  return (
    <OnboardingSlide
      description="Controla tus ingresos y gastos de forma sencilla. Empieza a registrar tus movimientos y organiza tu dinero."
      nextTo="/onboarding/2"
      step={1}
      title="¡Bienvenido!"
      total={4}
    />
  )
}
