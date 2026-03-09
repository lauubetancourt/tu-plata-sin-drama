import { Separator } from "@/components/ui/separator";
import { ActionTile } from "../components/ActionTile";
import { BottomNav } from "../components/BottomNav";
import { Button } from "../components/Button";
import { PhoneFrame } from "../components/PhoneFrame";
import { StatCard } from "../components/StatCard";
import { useApp } from "../context/AppContext";
import { DollarSign } from "lucide-react";
import { MoveRight } from "lucide-react";
import { BanknoteArrowDown } from "lucide-react";
import { BanknoteArrowUp } from "lucide-react";

function fmtShort(n) {
  if (n === 0) return "$0";
  else {
    return `$${n.toLocaleString("es-CO")}`;
  }
}

export function DashboardPage() {
  const { movements, isNewUser } = useApp();

  const income = movements
    .filter((m) => m.type === "ingreso")
    .reduce((s, m) => s + m.amount, 0);

  const expenses = movements
    .filter((m) => m.type === "gasto")
    .reduce((s, m) => s + m.amount, 0);

  return (
    <PhoneFrame>
      <section className="space-y-5">
        <div
          className="flex flex-row items-center justify-center bg-transparent"
          variant="secondary"
        >
          <DollarSign className="text-primary" />
          <p className="text-xl font-bold text-muted-foreground">
            Tu plata, sin drama
          </p>
        </div>
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
