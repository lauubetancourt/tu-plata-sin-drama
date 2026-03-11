import { createElement } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DollarSign } from "lucide-react";

export function AppBrandBar({
  align = "center",
  actions = [],
  className = "",
}) {
  const isLeft = align === "left";

  return (
    <div className={cn("flex items-start justify-between gap-3", className)}>
      <div
        className={cn(
          "flex flex-row items-center gap-1 bg-transparent",
          isLeft ? "justify-start" : "flex-1 justify-center",
        )}
      >
        <DollarSign
          className={cn("text-primary", isLeft ? "size-4" : "size-3")}
        />
        <p
          className={cn(
            "font-bold tracking-wide text-muted-foreground",
            isLeft ? "text-base" : "text-sm",
          )}
        >
          Tu plata, sin drama
        </p>
      </div>

      {actions.length > 0 ? (
        <div className="flex items-center gap-1">
          {actions.map(
            ({
              icon,
              label,
              onClick,
              disabled = false,
              iconClassName = "",
            }) => (
              <button
                key={label}
                type="button"
                aria-label={label}
                disabled={disabled}
                onClick={onClick}
                className={cn(
                  buttonVariants({ variant: "subtle", size: "icon-sm" }),
                  "rounded-xl disabled:cursor-default",
                )}
              >
                {createElement(icon, {
                  className: cn("size-4", iconClassName),
                })}
              </button>
            ),
          )}
        </div>
      ) : null}
    </div>
  );
}
