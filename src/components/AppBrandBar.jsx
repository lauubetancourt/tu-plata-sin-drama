import { createElement } from "react";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
              menuItems,
              disabled = false,
              iconClassName = "",
            }) => {
              if (menuItems?.length) {
                return (
                  <DropdownMenu key={label} modal={false}>
                    <DropdownMenuTrigger asChild>
                      <button
                        type="button"
                        aria-label={label}
                        disabled={disabled}
                        className={cn(
                          buttonVariants({
                            variant: "subtle",
                            size: "icon-sm",
                          }),
                          "rounded-xl disabled:cursor-default",
                        )}
                      >
                        {createElement(icon, {
                          className: cn("size-4", iconClassName),
                        })}
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      side="bottom"
                      sideOffset={8}
                      className="w-40"
                    >
                      {menuItems.map((item) => {
                        const ItemIcon = item.icon;

                        return (
                          <DropdownMenuItem
                            key={item.label}
                            disabled={item.disabled}
                            onClick={item.onClick}
                          >
                            {ItemIcon
                              ? createElement(ItemIcon, { className: "size-4" })
                              : null}
                            {item.label}
                          </DropdownMenuItem>
                        );
                      })}
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              }

              return (
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
              );
            },
          )}
        </div>
      ) : null}
    </div>
  );
}
