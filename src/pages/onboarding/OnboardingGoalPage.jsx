import { OnboardingSlide } from '../../components/OnboardingSlide'

export function OnboardingGoalPage() {
  return (
    <OnboardingSlide
      description="Define un objetivo y ahorra paso a paso. ¡Estas mas cerca de lo que parece!"
      nextLabel="Empezar"
      nextTo="/dashboard"
      previousTo="/onboarding/3"
      step={4}
      title="Alcanza tus Metas de Ahorro"
      total={4}
    />
  )
}
