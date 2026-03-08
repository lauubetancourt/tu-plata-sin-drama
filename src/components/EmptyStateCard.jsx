import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./Button";
import { Plus } from "lucide-react";

export function EmptyStateCard({ title, subtitle, cta, action }) {
  return (
    <Card className="rounded-3xl border border-dashed py-0 text-center">
      <CardHeader className="px-6 pb-0 pt-6">
        <CardTitle className="pt-2 text-lg font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-6 pt-2 text-sm text-muted-foreground">
        {subtitle}
        <div className="pt-4">
          <Button variant="cta" onClick={action}>
            <Plus className="size-4" />
            {cta}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
