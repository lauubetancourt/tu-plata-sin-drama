import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "./Button";
import { PhoneFrame } from "./PhoneFrame";

export function OnboardingSlide({
  title,
  description,
  icon,
  step,
  total,
  previousTo,
  nextTo,
  nextLabel = "Siguiente",
}) {
  return (
    <PhoneFrame>
      <section className="flex min-h-full flex-col">
        <Card className="rounded-3xl border border-border/70 bg-card py-0 text-center shadow-sm">
          <CardContent className="px-6 py-6">
            <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-[28px] bg-gradient-to-br from-primary to-primary/70 text-primary-foreground">
              <span className="flex h-12 w-12 items-center justify-center [&>svg]:h-full [&>svg]:w-full">{icon}</span>
            </div>
            <Badge className="mb-3" variant="secondary">
              Paso {step} de {total}
            </Badge>
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
              {title}
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          </CardContent>
        </Card>

        <div className="mt-6 flex items-center justify-center gap-2">
          {Array.from({ length: total }).map((_, index) => (
            <span
              key={index}
              className={[
                "h-2 rounded-full transition-all",
                index + 1 === step ? "w-8 bg-primary" : "w-2 bg-muted",
              ].join(" ")}
            />
          ))}
        </div>

        <div className="mt-auto grid grid-cols-4 gap-3 pt-8">
          <Button variant="subtle" to="/dashboard">Omitir</Button>
          <br/>
          {previousTo ? (
            <Button to={previousTo} variant="ghost">
              Anterior
            </Button>
          ) : (
            <div />
          )}
          <Button to={nextTo}>{nextLabel}</Button>
        </div>
      </section>
    </PhoneFrame>
  );
}
