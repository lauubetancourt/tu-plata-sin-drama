import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

export function PageHeader({ title, backTo, rightSlot }) {
  return (
    <header>
      <div className="flex flex-row items-center justify-center gap-1 bg-transparent">
        <DollarSign className="size-3 text-primary" />
        <p className="text-sm font-medium tracking-wide text-muted-foreground">
          Tu plata, sin drama
        </p>
      </div>
      <div className="mt-8 mb-5 flex items-center justify-between">
        <div className="w-24">
          {backTo ? (
            <Link
              to={backTo}
              className={cn(
                buttonVariants({ variant: "subtle", size: "sm" }),
                "h-8 w-auto rounded-xl px-2 text-xs",
              )}
            >
              <span aria-hidden="true">‹</span>
              Volver
            </Link>
          ) : null}
        </div>
        <h1 className="text-xl font-bold tracking-tight text-foreground">
          {title}
        </h1>
        <div className="w-24 text-right text-xs font-semibold text-muted-foreground">
          {rightSlot}
        </div>
      </div>
    </header>
  );
}
