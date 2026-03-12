import { Separator } from "@/components/ui/separator";
import { ActionTile } from "../components/ActionTile";
import { AppBrandBar } from "../components/AppBrandBar";
import { Button } from "../components/Button";
import { PhoneFrame } from "../components/PhoneFrame";
import { StatCard } from "../components/StatCard";
import { useApp } from "../context/AppContext";
import { PHONE_FRAME_TOASTER_ID } from "../components/ui/sonner";
import { toast } from "sonner";
import {
  BanknoteArrowDown,
  BanknoteArrowUp,
  CircleHelp,
  FileOutput,
  FileSpreadsheet,
  FileText,
  MoveRight,
  RefreshCw,
} from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function fmtShort(n) {
  if (n === 0) return "$0";
  else {
    return `$${n.toLocaleString("es-CO")}`;
  }
}

export function DashboardPage() {
  const { movements, isSyncing, syncData } = useApp();
  const navigate = useNavigate();
  const [isExporting, setIsExporting] = useState(false);
  const exportAttemptRef = useRef(0);

  const income = movements
    .filter((m) => m.type === "ingreso")
    .reduce((s, m) => s + m.amount, 0);

  const expenses = movements
    .filter((m) => m.type === "gasto")
    .reduce((s, m) => s + m.amount, 0);

  function handleSync() {
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

  function exportMonthlySummary(format) {
    exportAttemptRef.current += 1;
    const shouldFail = exportAttemptRef.current % 2 === 0;

    setIsExporting(true);

    return new Promise((resolve, reject) => {
      window.setTimeout(() => {
        setIsExporting(false);

        if (shouldFail) {
          reject(
            new Error(
              `No pudimos generar tu resumen mensual en ${format}. Inténtalo de nuevo en un momento.`,
            ),
          );
          return;
        }

        resolve({
          format,
          message: `Tu resumen mensual en ${format} está listo para compartir.`,
        });
      }, 2000);
    });
  }

  function handleExport(format) {
    if (isExporting) return;

    toast.promise(exportMonthlySummary(format), {
      toasterId: PHONE_FRAME_TOASTER_ID,
      loading: `Generando tu resumen mensual en ${format}...`,
      success: (result) => result.message,
      error: (error) =>
        error instanceof Error
          ? error.message
          : `No pudimos generar tu resumen mensual en ${format}. Inténtalo de nuevo en un momento.`,
    });
  }

  const dashboardActions = [
    {
      icon: CircleHelp,
      label: "Ayuda",
      onClick: () => navigate("/educacion-financiera"),
    },
    {
      icon: FileOutput,
      label: "Exportar",
      disabled: isExporting,
      menuItems: [
        {
          label: "Exportar PDF",
          icon: FileText,
          onClick: () => handleExport("PDF"),
          disabled: isExporting,
        },
        {
          label: "Exportar Excel",
          icon: FileSpreadsheet,
          onClick: () => handleExport("Excel"),
          disabled: isExporting,
        },
      ],
    },
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
