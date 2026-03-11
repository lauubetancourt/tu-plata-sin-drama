import { createContext, useContext, useState } from "react";

// ── Seed data (shown when isNewUser === false) ──────────────────────────────
const MOVEMENTS_SEED = [
  {
    id: 1,
    date: "2026-03-03",
    name: "Almuerzo",
    amount: 20000,
    type: "gasto",
    category: "Comida",
    description: "",
    recurring: false,
    periodicity: "",
    startDate: "",
    endDate: "",
  },
  {
    id: 2,
    date: "2026-03-03",
    name: "Transporte",
    amount: 5000,
    type: "gasto",
    category: "Transporte",
    description: "",
    recurring: false,
    periodicity: "",
    startDate: "",
    endDate: "",
  },
  {
    id: 3,
    date: "2026-03-02",
    name: "Salario",
    amount: 2000000,
    type: "ingreso",
    category: "",
    description: "",
    recurring: false,
    periodicity: "",
    startDate: "",
    endDate: "",
  },
];

const CATEGORIES_SEED = [
  { id: 1, name: "Comida", budget: 300000, spent: 280000 },
  { id: 2, name: "Hogar", budget: 500000, spent: 120000 },
  { id: 3, name: "Estudio", budget: 200000, spent: 210000 },
  { id: 4, name: "Transporte", budget: 150000, spent: 60000 },
  { id: 5, name: "Personal", budget: 0, spent: 45000 },
];

const GOALS_SEED = [
  {
    id: 1,
    name: "Viaje",
    target: 3000000,
    saved: 2358000,
    deadline: "2026-03-28",
  },
  {
    id: 2,
    name: "Fondo emergencia",
    target: 1000000,
    saved: 200000,
    deadline: "2026-12-31",
  },
];

const REMINDERS_SEED = [
  { id: 1, name: "Pago de tarjeta", description: "", date: "2026-03-28" },
  { id: 2, name: "Netflix", description: "", date: "2026-04-05" },
];

const SYNC_DELAY_MS = 2200;

// ── Context ─────────────────────────────────────────────────────────────────
const AppContext = createContext(null);

export function AppProvider({ children }) {
  // ── Dev flags ───────────────────────────────────────────────────────────
  const [isNewUser, setIsNewUser] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  // ── Data arrays ─────────────────────────────────────────────────────────
  const [movements, setMovements] = useState(MOVEMENTS_SEED);
  const [categories, setCategories] = useState(CATEGORIES_SEED);
  const [goals, setGoals] = useState(GOALS_SEED);
  const [reminders, setReminders] = useState(REMINDERS_SEED);

  // When isNewUser toggles, reset arrays accordingly
  function toggleNewUser(val) {
    setIsNewUser(val);
    if (val) {
      setMovements([]);
      setCategories([]);
      setGoals([]);
      setReminders([]);
    } else {
      setMovements(MOVEMENTS_SEED);
      setCategories(CATEGORIES_SEED);
      setGoals(GOALS_SEED);
      setReminders(REMINDERS_SEED);
    }
  }

  // ── Movements CRUD ──────────────────────────────────────────────────────
  function addMovement(data) {
    setMovements((prev) => [{ ...data, id: Date.now() }, ...prev]);
  }
  function updateMovement(id, data) {
    setMovements((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...data } : m)),
    );
  }
  function removeMovement(id) {
    setMovements((prev) => prev.filter((m) => m.id !== id));
  }

  // ── Categories CRUD ─────────────────────────────────────────────────────
  function addCategory(data) {
    setCategories((prev) => [...prev, { ...data, id: Date.now(), spent: 0 }]);
  }
  function updateCategory(id, data) {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...data } : c)),
    );
  }
  function removeCategory(id) {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  }

  // ── Goals CRUD ──────────────────────────────────────────────────────────
  function addGoal(data) {
    setGoals((prev) => [...prev, { ...data, id: Date.now(), saved: 0 }]);
  }
  function updateGoal(id, data) {
    setGoals((prev) => prev.map((g) => (g.id === id ? { ...g, ...data } : g)));
  }
  function removeGoal(id) {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  }

  // ── Reminders CRUD ──────────────────────────────────────────────────────
  function addReminder(data) {
    setReminders((prev) => [...prev, { ...data, id: Date.now() }]);
  }
  function updateReminder(id, data) {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...data } : r)),
    );
  }
  function removeReminder(id) {
    setReminders((prev) => prev.filter((r) => r.id !== id));
  }

  // ── Cloud sync simulation ───────────────────────────────────────────────
  function syncData() {
    setIsSyncing(true);

    return new Promise((resolve, reject) => {
      window.setTimeout(() => {
        setIsSyncing(false);

        if (!isOnline) {
          reject(
            new Error(
              "No pudimos sincronizar por un problema de red. Tus datos quedaron guardados localmente.",
            ),
          );
          return;
        }

        resolve({
          message: "Tus datos se sincronizaron correctamente con la nube.",
        });
      }, SYNC_DELAY_MS);
    });
  }

  return (
    <AppContext.Provider
      value={{
        // flags
        isNewUser,
        setIsNewUser: toggleNewUser,
        isOnline,
        setIsOnline,
        isSyncing,
        syncData,
        // movements
        movements,
        addMovement,
        updateMovement,
        removeMovement,
        // categories
        categories,
        addCategory,
        updateCategory,
        removeCategory,
        // goals
        goals,
        addGoal,
        updateGoal,
        removeGoal,
        // reminders
        reminders,
        addReminder,
        updateReminder,
        removeReminder,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
