import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  CheckCircle,
  Pencil,
  Plus,
  Repeat2,
  Trash2,
  WifiOff,
  Zap,
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import { Button } from "../../components/Button";
import { EmptyStateCard } from "../../components/EmptyStateCard";
import { MovementFormDialog } from "../../components/MovementFormDialog";
import { PageHeader } from "../../components/PageHeader";
import { PhoneFrame } from "../../components/PhoneFrame";

function fmt(n) {
  return "$" + Number(n).toLocaleString("es-CO");
}

function fmtDate(iso) {
  return new Date(iso + "T00:00:00").toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function MovementsPage() {
  const {
    isNewUser,
    isOnline,
    movements,
    addMovement,
    updateMovement,
    removeMovement,
    categories,
  } = useApp();

  const categoryNames = categories.map((c) => c.name);

  // ── Dialog state ─────────────────────────────────────────────────────────
  const [formOpen, setFormOpen] = useState(false);
  const [formTarget, setFormTarget] = useState(null); // null → create | object → edit
  const [deleteTarget, setDeleteTarget] = useState(null);

  // ── Feedback state ────────────────────────────────────────────────────────
  const [successMsg, setSuccessMsg] = useState("");

  function showSuccess(msg) {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  }

  // ── Handlers ──────────────────────────────────────────────────────────────
  function openAdd() {
    setFormTarget(null);
    setFormOpen(true);
  }

  function openEdit(movement) {
    setFormTarget(movement);
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setFormTarget(null);
  }

  function handleSave(data) {
    if (formTarget) {
      updateMovement(formTarget.id, data);
      showSuccess(
        isOnline
          ? "¡Movimiento actualizado!"
          : "Sin conexión — cambios guardados localmente.",
      );
    } else {
      addMovement(data);
      showSuccess(
        isOnline
          ? "¡Movimiento agregado!"
          : "Sin conexión — movimiento guardado localmente.",
      );
    }
    closeForm();
  }

  function handleDelete() {
    removeMovement(deleteTarget.id);
    setDeleteTarget(null);
    showSuccess("Movimiento eliminado.");
  }

  // ── Render ────────────────────────────────────────────────────────────────
  const isOfflineSave = successMsg.startsWith("Sin conexión");

  return (
    <PhoneFrame>
      <PageHeader title="Movimientos" backTo="/dashboard" />

      {/* Success banner */}
      {successMsg && (
        <div
          className={cn(
            "flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold",
            isOfflineSave
              ? "border border-amber-300 bg-amber-50 text-amber-800"
              : "bg-emerald-100 text-emerald-800",
          )}
        >
          {isOfflineSave ? (
            <WifiOff className="size-4 shrink-0" />
          ) : (
            <CheckCircle className="size-4 shrink-0" />
          )}
          {successMsg}
        </div>
      )}

      {/* Empty state */}
      {movements.length === 0 ? (
        <EmptyStateCard
          title="Aún no hay movimientos"
          subtitle="Agrega tu primer gasto o ingreso para empezar a llevar el control."
          cta="Agregar movimiento"
          action={openAdd}
        />
      ) : (
        <section className="space-y-3">
          <div className="flex">
            <div className="mt-5">
              <Button onClick={openAdd}>
                Agregar
                <Plus className="size-4" />
              </Button>
            </div>
          </div>
          {movements.map((m) => {
            const isIncome = m.type === "ingreso";
            return (
              <Card key={m.id} className="rounded-2xl py-0">
                <CardContent className="space-y-2 p-4">
                  {/* Row 1: badges + actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <p className="text-[10px]">{fmtDate(m.date)}</p>
                      {m.recurring && (
                        <Badge
                          variant="outline"
                          className="text-[10px] border-primary/30 bg-primary/10 text-primary"
                        >
                          <Repeat2 className="mr-1 size-2.5" />
                          Recurrente
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <button
                        className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground"
                        onClick={() => openEdit(m)}
                      >
                        <Pencil className="size-3.5" />
                      </button>
                      <button
                        className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-red-50 hover:text-destructive"
                        onClick={() => setDeleteTarget(m)}
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </div>
                  {/* Row 2: label + amount */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-foreground">
                        {m.name || "Gasto rápido"}{" "}
                        {m.category && (
                          <span className="text-xs font-normal text-muted-foreground">
                            en {m.category}
                          </span>
                        )}
                      </p>
                      {m.description && (
                        <p className="text-xs italic text-muted-foreground">
                          {m.description}
                        </p>
                      )}
                    </div>
                    <p
                      className={cn(
                        "text-sm font-extrabold",
                        isIncome ? "text-emerald-700" : "text-destructive",
                      )}
                    >
                      {isIncome ? "+" : "-"}
                      {fmt(m.amount)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </section>
      )}

      {/* Form dialog (create + edit) */}
      <MovementFormDialog
        open={formOpen}
        initial={formTarget}
        onClose={closeForm}
        onSave={handleSave}
        categoryNames={categoryNames}
        isOnline={isOnline}
      />

      {/* Delete confirmation dialog */}
      <Dialog
        open={!!deleteTarget}
        onOpenChange={(o) => {
          if (!o) setDeleteTarget(null);
        }}
      >
        <DialogContent className="rounded-3xl" showCloseButton={false}>
          <DialogHeader className="flex items-center">
            <DialogTitle>¿Eliminar este movimiento?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground text-center">
            ¿Estás seguro de que quieres eliminar{" "}
            <strong>{deleteTarget?.name}</strong>? <br /> Esta acción no se
            puede deshacer.
          </p>
          <DialogFooter className="grid grid-cols-2 gap-3 border-0 bg-transparent p-2 sm:grid-cols-2">
            <Button variant="ghost" onClick={() => setDeleteTarget(null)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Sí, eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PhoneFrame>
  );
}
