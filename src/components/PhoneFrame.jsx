import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { WifiOff } from "lucide-react";
import { useApp } from "../context/AppContext";

export function PhoneFrame({ children }) {
  const { isOnline, setIsOnline, isNewUser, setIsNewUser } = useApp();

  return (
    <>
      <div
        className="min-h-screen bg-[radial-gradient(circle_at_top,_#d1e8c0,_#e7edf4_42%,_#dde4ed_100%)] sm:px-6 sm:py-8"
      >
        <Card className="mx-auto min-h-screen w-full max-w-[390px] overflow-hidden border border-border/70 bg-card py-0 shadow-2xl sm:min-h-[780px] sm:rounded-[32px]">
          <Separator className="mx-auto mt-2 h-1.5 w-20 rounded-full bg-black sm:mt-4" />
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
        <div className="mx-auto mt-3 flex max-w-[390px] items-center justify-between rounded-2xl border border-border/40 bg-white/60 px-4 py-2 text-xs font-medium text-muted-foreground backdrop-blur-sm">
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">
            DEV
          </span>
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
        </div>
      </div>
    </>
  );
}
