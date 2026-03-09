import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle, Pencil, Plus, Trash2 } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { Button } from "../../components/Button";
import { EmptyStateCard } from "../../components/EmptyStateCard";
import { FormField } from "../../components/FormField";
import { PageHeader } from "../../components/PageHeader";
import { PhoneFrame } from "../../components/PhoneFrame";

function fmt(n) {
  return "$" + Number(n).toLocaleString("es-CO");
}

export function CategoriesPage() {
  const { isNewUser, categories, addCategory, updateCategory, removeCategory } =
    useApp();

  // ── form dialog (create + edit) ────────────────────────────────────────
  const [formOpen, setFormOpen] = useState(false);
  const [formTarget, setFormTarget] = useState(null); // null → create | object → edit
  const [formName, setFormName] = useState("");
  const [formBudget, setFormBudget] = useState("");
  const [formErrors, setFormErrors] = useState({});

  // ── delete dialog ──────────────────────────────────────────────────────
  const [deleteTarget, setDeleteTarget] = useState(null);

  // ── feedback ───────────────────────────────────────────────────────────
  const [successMsg, setSuccessMsg] = useState("");

  function showSuccess(msg) {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  }

  // ── handlers ───────────────────────────────────────────────────────────
  function openAdd() {
    setFormTarget(null);
    setFormName("");
    setFormBudget("");
    setFormErrors({});
    setFormOpen(true);
  }

  function openEdit(cat) {
    setFormTarget(cat);
    setFormName(cat.name);
    setFormBudget(cat.budget > 0 ? String(cat.budget) : "");
    setFormErrors({});
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setFormTarget(null);
  }

  function handleSave() {
    const e = {};
    if (!formName.trim()) {
      e.name = "Ingresa un nombre para la categoría";
    } else if (
      categories.some(
        (c) =>
          c.id !== formTarget?.id &&
          c.name.toLowerCase() === formName.trim().toLowerCase(),
      )
    ) {
      e.name = "Ya tienes una categoría con este nombre";
    }
    if (Object.keys(e).length) {
      setFormErrors(e);
      return;
    }

    if (formTarget) {
      updateCategory(formTarget.id, {
        name: formName.trim(),
        budget: Number(formBudget) || 0,
      });
      showSuccess("¡Categoría actualizada!");
    } else {
      addCategory({ name: formName.trim(), budget: Number(formBudget) || 0 });
      showSuccess("¡Categoría agregada!");
    }
    closeForm();
  }

  function handleDelete() {
    removeCategory(deleteTarget.id);
    setDeleteTarget(null);
    showSuccess("Categoría eliminada.");
  }

  return (
    <PhoneFrame>
      <PageHeader title="Categorías" backTo="/dashboard" />

      {/* Success banner */}
      {successMsg && (
        <div className="flex items-center gap-2 rounded-xl bg-emerald-100 px-4 py-3 text-sm font-semibold text-emerald-800">
          <CheckCircle className="size-4 shrink-0" />
          {successMsg}
        </div>
      )}

      {/* Empty state */}
      {categories.length === 0 ? (
        <EmptyStateCard
          title="Aún no hay categorías"
          subtitle="Agrega categorías para organizar tus gastos y asignarles un presupuesto."
          cta="Agregar categoría"
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
          {categories.map((cat) => {
            const hasBudget = cat.budget > 0;
            const pct = hasBudget
              ? Math.min(Math.round((cat.spent / cat.budget) * 100), 100)
              : 0;
            const over = hasBudget && cat.spent > cat.budget;

            return (
              <Card
                key={cat.id}
                className={cn(
                  "rounded-2xl py-0",
                  over && "border-red-300 bg-red-50",
                )}
              >
                <CardContent className="space-y-3 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-foreground">
                        {cat.name}
                      </p>
                      {over && (
                        <span className="flex items-center gap-1 text-xs font-semibold text-red-600">
                          <AlertTriangle className="size-3" />
                          Límite superado
                        </span>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <button
                        className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground"
                        onClick={() => openEdit(cat)}
                      >
                        <Pencil className="size-3.5" />
                      </button>
                      <button
                        className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-red-50 hover:text-destructive"
                        onClick={() => setDeleteTarget(cat)}
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </div>

                  {hasBudget ? (
                    <div className="space-y-1">
                      <span className="text-xs text-muted-foreground">
                        {fmt(cat.spent)} / {fmt(cat.budget)}
                      </span>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all",
                            over
                              ? "bg-red-500"
                              : pct >= 80
                                ? "bg-amber-400"
                                : "bg-primary",
                          )}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      Sin presupuesto asignado
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </section>
      )}

      {/* Form dialog (create + edit) */}
      <Dialog
        open={formOpen}
        onOpenChange={(o) => {
          if (!o) closeForm();
        }}
      >
        <DialogContent className="rounded-3xl" showCloseButton={false}>
          <DialogHeader className="flex items-center">
            <DialogTitle>
              {formTarget ? "Editar categoría" : "Agregar categoría"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <FormField
              required
              autoFocus
              label="Nombre"
              placeholder="Ej. Alimentación, transporte..."
              value={formName}
              error={formErrors.name}
              onChange={(e) => {
                setFormName(e.target.value);
                setFormErrors({});
              }}
            />
            <FormField
              inputMode="numeric"
              label="Presupuesto"
              placeholder="Ej. 150000, 300000"
              value={formBudget}
              onChange={(e) =>
                setFormBudget(e.target.value.replace(/[^0-9]/g, ""))
              }
            />
          </div>
          <DialogFooter className="grid grid-cols-2 gap-3 border-0 bg-transparent p-2 sm:grid-cols-2">
            <Button variant="ghost" onClick={closeForm}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>
              {formTarget ? "Guardar cambios" : "Agregar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete dialog */}
      <Dialog
        open={!!deleteTarget}
        onOpenChange={(o) => {
          if (!o) setDeleteTarget(null);
        }}
      >
        <DialogContent className="rounded-3xl" showCloseButton={false}>
          <DialogHeader className="flex items-center">
            <DialogTitle>¿Eliminar esta categoría?</DialogTitle>
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
