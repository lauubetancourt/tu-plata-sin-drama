import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CheckCircle, Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useApp } from "../../context/AppContext";
import { Button } from "../../components/Button";
import { EmptyStateCard } from "../../components/EmptyStateCard";
import { FormField } from "../../components/FormField";
import { PageHeader } from "../../components/PageHeader";
import { PhoneFrame } from "../../components/PhoneFrame";

// ── helpers ──────────────────────────────────────────────────────────────────
function fmt(n) {
  return "$" + Number(n).toLocaleString("es-CO");
}

function daysLeft(deadline) {
  const diff = new Date(deadline) - new Date(new Date().toDateString());
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function fmtDate(iso) {
  return new Date(iso + "T00:00:00").toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function todayISO() {
  return new Date().toISOString().split("T")[0];
}

const EMPTY_FORM = { name: "", target: "", saved: "", deadline: "" };

function toForm(goal) {
  if (!goal) return { ...EMPTY_FORM };
  return {
    name: goal.name,
    target: String(goal.target),
    saved: String(goal.saved),
    deadline: goal.deadline,
  };
}

// ── GoalFormDialog ────────────────────────────────────────────────────────────
function GoalFormDialog({ open, initial, onClose, onSave }) {
  const isEdit = !!initial;
  const [form, setForm] = useState(() => toForm(initial));
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setForm(toForm(initial));
      setErrors({});
      setLoading(false);
    }
  }, [open, initial]);

  function set(key, val) {
    setForm((prev) => ({ ...prev, [key]: val }));
    setErrors((prev) => {
      const n = { ...prev };
      delete n[key];
      return n;
    });
  }

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Ingresa un nombre para tu meta";
    if (!form.target || Number(form.target) <= 0)
      e.target = "La meta debe ser mayor a cero";
    if (form.saved !== "" && Number(form.saved) < 0)
      e.saved = "El valor no puede ser negativo";
    if (!form.deadline) e.deadline = "Elige una fecha límite";
    else if (form.deadline <= todayISO() && !isEdit)
      e.deadline = "La fecha límite debe ser futura";
    return e;
  }

  function handleSave() {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      onSave({
        name: form.name.trim(),
        target: Number(form.target),
        saved: Number(form.saved || 0),
        deadline: form.deadline,
      });
      setLoading(false);
    }, 1200);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o && !loading) onClose();
      }}
    >
      <DialogContent className="rounded-3xl" showCloseButton={false}>
        <DialogHeader className="flex items-center">
          <DialogTitle>{isEdit ? "Editar meta de ahorro" : "Agregar meta de ahorro"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <FormField
            required
            label="Nombre"
            placeholder="Ej. Viaje a la playa, Carro"
            value={form.name}
            error={errors.name}
            onChange={(e) => set("name", e.target.value)}
          />
          <FormField
            required
            inputMode="numeric"
            label="Valor"
            placeholder="Ej. 100000"
            value={form.target}
            error={errors.target}
            onChange={(e) =>
              set("target", e.target.value.replace(/[^0-9]/g, ""))
            }
          />
          <FormField
            inputMode="numeric"
            label="Ahorro actual"
            placeholder="Ej. 5000"
            value={form.saved}
            error={errors.saved}
            onChange={(e) =>
              set("saved", e.target.value.replace(/[^0-9]/g, ""))
            }
          />
          <FormField
            required
            type="date"
            label="Fecha límite"
            value={form.deadline}
            error={errors.deadline}
            onChange={(e) => set("deadline", e.target.value)}
          />
        </div>
        <DialogFooter className="grid grid-cols-2 gap-3 border-0 bg-transparent p-2 sm:grid-cols-2">
          <Button variant="ghost" disabled={loading} onClick={onClose}>
            Cancelar
          </Button>
          <Button disabled={loading} onClick={handleSave}>
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="size-4 animate-spin" />
                Guardando...
              </span>
            ) : (
              isEdit ? "Guardar cambios" : "Agregar"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function GoalsPage() {
  const { isNewUser, goals, addGoal, updateGoal, removeGoal } = useApp();

  const [formOpen, setFormOpen] = useState(false);
  const [formTarget, setFormTarget] = useState(null); // null → create | object → edit
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  function showSuccess(msg) {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  }

  function openAdd() {
    setFormTarget(null);
    setFormOpen(true);
  }
  function openEdit(goal) {
    setFormTarget(goal);
    setFormOpen(true);
  }
  function closeForm() {
    setFormOpen(false);
    setFormTarget(null);
  }

  function handleSave(data) {
    if (formTarget) {
      updateGoal(formTarget.id, data);
      showSuccess("¡Meta actualizada!");
    } else {
      addGoal(data);
      showSuccess("¡Meta creada!");
    }
    closeForm();
  }

  function handleDelete() {
    removeGoal(deleteTarget.id);
    setDeleteTarget(null);
    showSuccess("Meta eliminada");
  }

  return (
    <PhoneFrame>
      <PageHeader title="Metas de ahorro" backTo="/dashboard" />

      {/* Success banner */}
      {successMsg && (
        <div className="flex items-center gap-2 rounded-xl bg-emerald-100 px-4 py-3 text-sm font-semibold text-emerald-800">
          <CheckCircle className="size-4 shrink-0" />
          {successMsg}
        </div>
      )}

      {/* Empty state */}
      {goals.length === 0 ? (
        <EmptyStateCard
          title="Aún no hay metas"
          subtitle="Agrega tu primera meta de ahorro y empieza a alcanzar lo que te propones."
          cta="Agregar meta"
          action={openAdd}
        />
      ) : (
        <section className="space-y-3">
          <div className="flex">
            <div className="mt-5">
              <Button onClick={openAdd}>
                <Plus className="size-4" />
                Agregar
              </Button>
            </div>
          </div>
          {goals.map((goal) => {
            const pct = Math.min(
              Math.round((goal.saved / goal.target) * 100),
              100,
            );
            const remaining = Math.max(goal.target - goal.saved, 0);
            const days = daysLeft(goal.deadline);
            const done = remaining === 0;
            const urgent = !done && days <= 7;

            return (
              <Card
                key={goal.id}
                className={cn(
                  "rounded-2xl py-0",
                  done && "border-emerald-300 bg-emerald-50",
                  urgent && "border-amber-300 bg-amber-50",
                )}
              >
                <CardContent className="space-y-3 p-4">
                  {/* header: name + actions */}
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-base font-bold text-foreground">
                        {goal.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {fmt(goal.saved)} de {fmt(goal.target)}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <button
                        className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground"
                        onClick={() => openEdit(goal)}
                      >
                        <Pencil className="size-3.5" />
                      </button>
                      <button
                        className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-red-50 hover:text-destructive"
                        onClick={() => setDeleteTarget(goal)}
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* progress bar */}
                  <div className="space-y-1">
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all",
                          done
                            ? "bg-emerald-500"
                            : urgent
                              ? "bg-amber-400"
                              : "bg-primary",
                        )}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <p className="text-right text-xs text-muted-foreground">
                      {pct}% alcanzado
                    </p>
                  </div>

                  {/* secondary info: remaining + deadline */}
                  <div className="flex items-center justify-between border-t border-border/50 pt-2 text-xs">
                    <span className={cn(
                      "font-semibold",
                      done ? "text-emerald-700" : "text-muted-foreground",
                    )}>
                      {done ? "¡Meta cumplida!" : `Falta: ${fmt(remaining)}`}
                    </span>
                    <span className={cn(
                      "font-medium",
                      urgent && !done ? "text-amber-600" : "text-muted-foreground",
                    )}>
                      Límite: {fmtDate(goal.deadline)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </section>
      )}

      {/* Goal form dialog (create + edit) */}
      <GoalFormDialog
        open={formOpen}
        initial={formTarget}
        onClose={closeForm}
        onSave={handleSave}
      />

      {/* delete dialog */}
      <Dialog
        open={!!deleteTarget}
        onOpenChange={(o) => {
          if (!o) setDeleteTarget(null);
        }}
      >
        <DialogContent className="rounded-3xl" showCloseButton={false}>
          <DialogHeader className="flex items-center">
            <DialogTitle>¿Eliminar esta meta?</DialogTitle>
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
