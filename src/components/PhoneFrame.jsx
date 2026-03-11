import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { WifiOff } from "lucide-react";
import { Bell, BellRing, Info, Lightbulb, TriangleAlert } from "lucide-react";
import { toast } from "sonner";
import { useApp } from "../context/AppContext";
import { PHONE_FRAME_TOASTER_ID, Toaster } from "./ui/sonner";

function fmtDate(iso) {
  return new Date(iso + "T00:00:00").toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

const AWARENESS_NOTIFICATIONS = {
  info: {
    icon: Info,
    toast: "info",
    label: "Info",
    title: "Subieron tus gastos pequeños",
    message:
      "Esta semana registraste más consumos hormiga de lo habitual. Verlos juntos puede darte más contexto.",
    date: "2026-03-10",
  },
  warning: {
    icon: TriangleAlert,
    toast: "warning",
    label: "Advertencia",
    title: "Comida va cerca de tu límite",
    message:
      "Has usado el 82% de tu presupuesto en comida. Revisarlo hoy puede evitarte presión al cierre del mes.",
    date: "2026-03-11",
  },
  suggestion: {
    icon: Lightbulb,
    toast: "success",
    label: "Sugerencia",
    title: "Transporte creció frente a la semana pasada",
    message:
      "Si agregas una nota al próximo gasto de transporte, te será más fácil entender el cambio y ajustar.",
    date: "2026-03-09",
  },
};

export function PhoneFrame({ children }) {
  const { isOnline, setIsOnline, isNewUser, setIsNewUser } = useApp();

  function showAwarenessNotification(type) {
    const notification = AWARENESS_NOTIFICATIONS[type];
    if (!notification) return;

    const Icon = notification.icon;
    const showToast = toast[notification.toast] ?? toast;

    showToast(notification.title, {
      toasterId: PHONE_FRAME_TOASTER_ID,
      position: "top-center",
      closeButton: true,
      duration: 8000,
      icon: <Icon className="size-4" />,
      description: (
        <div className="space-y-2">
          <p>{notification.message}</p>
          <div className="flex items-center gap-1.5 text-xs opacity-80">
            <Bell className="size-3" />
            <span>Notificación del sistema</span>
            <span aria-hidden="true">·</span>
            <span>{fmtDate(notification.date)}</span>
          </div>
        </div>
      ),
    });
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#d1e8c0,_#e7edf4_42%,_#dde4ed_100%)] sm:px-6 sm:py-8">
      <Card className="relative mx-auto min-h-screen w-full max-w-[390px] gap-0 overflow-hidden border border-border/70 bg-card py-0 shadow-2xl sm:min-h-[780px] sm:rounded-[32px]">
        <Separator className="mx-auto mt-2 h-1.5 w-20 rounded-full sm:mt-4" />
        <Toaster
          id={PHONE_FRAME_TOASTER_ID}
          position="bottom-center"
          richColors
          offset={{ bottom: 12 }}
          mobileOffset={{ bottom: 12, left: 12, right: 12 }}
          style={{ position: "absolute", zIndex: 30 }}
        />
        {!isOnline && (
          <div className="flex items-center justify-center gap-2 bg-red-600 px-4 py-2 text-sm font-semibold text-white">
            <WifiOff className="size-4 shrink-0" />
            Sin conexión a internet
          </div>
        )}
        <main className="h-[calc(100vh-18px)] overflow-y-auto px-4 pb-8 pt-4 sm:h-[740px] sm:px-5 sm:pt-5">
          {children}
        </main>
      </Card>

      {/* Dev controls — visible below the phone card */}
      <div className="mx-auto mt-3 flex max-w-[390px] flex-wrap items-center gap-2 rounded-2xl border border-border/40 bg-white/60 px-4 py-2 text-xs font-medium text-muted-foreground backdrop-blur-sm">
        <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">
          DEV
        </span>
        <div className="ml-auto flex flex-wrap items-center justify-end gap-2">
          <label className="flex cursor-pointer select-none items-center gap-1.5">
            <span>Nuevo usuario</span>
            <input
              type="checkbox"
              className="h-3.5 w-3.5 accent-primary"
              checked={isNewUser}
              onChange={(e) => setIsNewUser(e.target.checked)}
            />
          </label>
          <label className="flex cursor-pointer select-none items-center gap-1.5">
            <span>Online</span>
            <input
              type="checkbox"
              className="h-3.5 w-3.5 accent-primary"
              checked={isOnline}
              onChange={(e) => setIsOnline(e.target.checked)}
            />
          </label>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="subtle" size="xs" className="rounded-lg">
                <BellRing className="size-3.5" />
                Alertas
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              side="top"
              sideOffset={8}
              className="w-44"
            >
              <DropdownMenuGroup>
                <DropdownMenuLabel>Disparar notificación</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {Object.entries(AWARENESS_NOTIFICATIONS).map(
                  ([type, notification]) => {
                    const Icon = notification.icon;

                    return (
                      <DropdownMenuItem
                        key={type}
                        onClick={() => showAwarenessNotification(type)}
                      >
                        <Icon className="size-4" />
                        {notification.label}
                      </DropdownMenuItem>
                    );
                  },
                )}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
