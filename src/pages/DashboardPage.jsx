import { Separator } from "@/components/ui/separator";
import { ActionTile } from "../components/ActionTile";
import { AppBrandBar } from "../components/AppBrandBar";
import { Button } from "../components/Button";
import { PhoneFrame } from "../components/PhoneFrame";
import { StatCard } from "../components/StatCard";
import { useApp } from "../context/AppContext";
import { PHONE_FRAME_TOASTER_ID } from "../components/ui/sonner";
import { Bell, CircleHelp, MoveRight, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { BanknoteArrowDown } from "lucide-react";
import { BanknoteArrowUp } from "lucide-react";

function fmtShort(n) {
  if (n === 0) return "$0";
  else {
    return `$${n.toLocaleString("es-CO")}`;
  }
}

export function DashboardPage() {
  const { movements, isSyncing, syncData } = useApp();

  const income = movements
    .filter((m) => m.type === "ingreso")
    .reduce((s, m) => s + m.amount, 0);

  const expenses = movements
    .filter((m) => m.type === "gasto")
    .reduce((s, m) => s + m.amount, 0);

  async function handleSync() {
    if (isSyncing) return;

    toast.promise(syncData, {
      toasterId: PHONE_FRAME_TOASTER_ID,
      loading: "Sincronizando tus datos con la nube...",
      success: (result) => result.message,
      error: (error) =>
        error instanceof Error
          ? error.message
          : "No pudimos sincronizar. Tus datos quedaron guardados localmente.",
    });
  }

  const dashboardActions = [
    { icon: Bell, label: "Notificaciones" },
    { icon: CircleHelp, label: "Ayuda" },
    {
      icon: RefreshCw,
      label: "Sincronizar",
      onClick: handleSync,
      disabled: isSyncing,
      iconClassName: isSyncing ? "animate-spin" : "",
    },
  ];

  return (
    <PhoneFrame>
      <section className="space-y-5">
        <AppBrandBar align="left" actions={dashboardActions} />
        <Button variant="cta" size="lg" to="/registro-express">
          Agregar gasto rápido <MoveRight className="ml-1" />
        </Button>

        <section className="grid grid-cols-2 gap-3">
          <StatCard
            icon={<BanknoteArrowDown />}
            amount={fmtShort(income)}
            label="Ingresos"
            tone="income"
          />
          <StatCard
            icon={<BanknoteArrowUp />}
            amount={fmtShort(expenses)}
            label="Gastos"
            tone="expense"
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-2">
            <h2 className="text-sm font-bold text-muted-foreground">
              Acciones principales
            </h2>
            <Separator />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <ActionTile
              subtitle="Gestiona tus ingresos y gastos"
              title="Movimientos"
              to="/movimientos"
            />
            <ActionTile
              subtitle="Clasifica y ordena tus gastos"
              title="Categorías"
              to="/categorias"
            />
            <ActionTile
              subtitle="Controla tu progreso de ahorro"
              title="Metas de ahorro"
              to="/metas"
            />
            <ActionTile
              subtitle="Define tus avisos de próximos pagos"
              title="Recordatorios"
              to="/recordatorios"
            />
          </div>
        </section>
      </section>
    </PhoneFrame>
  );
}
