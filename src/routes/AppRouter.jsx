import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { BiometricLoginPage } from '../pages/BiometricLoginPage'
import { CategoriesPage } from '../pages/categories/CategoriesPage'
import { DashboardPage } from '../pages/DashboardPage'
import { GoalsPage } from '../pages/goals/GoalsPage'
import { GoalsIntroPage } from '../pages/goals/GoalsIntroPage'
import { NewGoalPage } from '../pages/goals/NewGoalPage'
import { DeleteMovementPage } from '../pages/movements/DeleteMovementPage'
import { EditMovementPage } from '../pages/movements/EditMovementPage'
import { MovementsPage } from '../pages/movements/MovementsPage'
import { NewMovementPage } from '../pages/movements/NewMovementPage'
import { OnboardingBudgetPage } from '../pages/onboarding/OnboardingBudgetPage'
import { OnboardingGoalPage } from '../pages/onboarding/OnboardingGoalPage'
import { OnboardingTrackPage } from '../pages/onboarding/OnboardingTrackPage'
import { OnboardingWelcomePage } from '../pages/onboarding/OnboardingWelcomePage'
import { EditReminderPage } from '../pages/reminders/EditReminderPage'
import { NewReminderPage } from '../pages/reminders/NewReminderPage'
import { RemindersEmptyPage } from '../pages/reminders/RemindersEmptyPage'
import { RemindersPage } from '../pages/reminders/RemindersPage'
import { QuickRegisterPage } from '../pages/QuickRegisterPage'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BiometricLoginPage />} />
        <Route path="/onboarding/1" element={<OnboardingWelcomePage />} />
        <Route path="/onboarding/2" element={<OnboardingTrackPage />} />
        <Route path="/onboarding/3" element={<OnboardingBudgetPage />} />
        <Route path="/onboarding/4" element={<OnboardingGoalPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/registro-express" element={<QuickRegisterPage />} />
        <Route path="/movimientos" element={<MovementsPage />} />
        <Route path="/movimientos/nuevo" element={<NewMovementPage />} />
        <Route path="/movimientos/editar" element={<EditMovementPage />} />
        <Route path="/movimientos/eliminar" element={<DeleteMovementPage />} />
        <Route path="/categorias" element={<CategoriesPage />} />
        <Route path="/metas/intro" element={<GoalsIntroPage />} />
        <Route path="/metas/nueva" element={<NewGoalPage />} />
        <Route path="/metas" element={<GoalsPage />} />
        <Route path="/recordatorios/vacio" element={<RemindersEmptyPage />} />
        <Route path="/recordatorios/nuevo" element={<NewReminderPage />} />
        <Route path="/recordatorios" element={<RemindersPage />} />
        <Route path="/recordatorios/editar" element={<EditReminderPage />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}
