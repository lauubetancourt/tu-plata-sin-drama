import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { BiometricLoginPage } from "../pages/BiometricLoginPage";
import { CategoriesPage } from "../pages/categories/CategoriesPage";
import { DashboardPage } from "../pages/DashboardPage";
import { GoalsPage } from "../pages/goals/GoalsPage";
import { GoalsIntroPage } from "../pages/goals/GoalsIntroPage";
import { MovementsPage } from "../pages/movements/MovementsPage";
import { OnboardingBudgetPage } from "../pages/onboarding/OnboardingBudgetPage";
import { OnboardingGoalPage } from "../pages/onboarding/OnboardingGoalPage";
import { OnboardingTrackPage } from "../pages/onboarding/OnboardingTrackPage";
import { OnboardingWelcomePage } from "../pages/onboarding/OnboardingWelcomePage";
import { RemindersPage } from "../pages/reminders/RemindersPage";
import { QuickRegisterPage } from "../pages/QuickRegisterPage";

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
        <Route path="/categorias" element={<CategoriesPage />} />
        <Route path="/metas" element={<GoalsPage />} />
        <Route path="/recordatorios" element={<RemindersPage />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
