import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageHeader } from "../../components/PageHeader";
import { PhoneFrame } from "../../components/PhoneFrame";

function makeTipCover(title, start, end) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${start}" />
          <stop offset="100%" stop-color="${end}" />
        </linearGradient>
      </defs>
      <rect width="800" height="450" fill="url(#bg)" />
      <circle cx="660" cy="90" r="120" fill="white" opacity="0.08" />
      <circle cx="140" cy="360" r="150" fill="white" opacity="0.08" />
      <text x="52" y="90" fill="white" opacity="0.72" font-family="Arial, sans-serif" font-size="28" font-weight="700">
        Tu plata, sin drama
      </text>
      <text x="52" y="320" fill="white" font-family="Arial, sans-serif" font-size="40" font-weight="700">
        ${title}
      </text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

const FINANCIAL_TIPS = [
  {
    id: 1,
    title: "Mira primero en qué se te va lo pequeño",
    body: "Antes de recortar algo grande, revisa esos gastos que haces casi en automático. Verlos por categoría suele darte una foto más clara y manejable en menos de un minuto.",
    kicker: "Tip rápido",
    image: makeTipCover("Gastos pequeños", "#315f45", "#6f9c7f"),
  },
  {
    id: 2,
    title: "Ahorrar poco también cuenta",
    body: "Si este mes no puedes guardar mucho, empieza con una cantidad mínima que sí puedas sostener. La constancia vale más que esperar el momento perfecto.",
    kicker: "Para empezar hoy",
    image: makeTipCover("Ahorro constante", "#7b5d2e", "#caa164"),
  },
  {
    id: 3,
    title: "Compárate contigo, no con otros",
    body: "Tu avance real se ve mejor cuando comparas esta semana con la anterior. Ese cambio pequeño ya te puede mostrar si vas ganando control.",
    kicker: "Más claridad",
    image: makeTipCover("Tu propio avance", "#4a4d80", "#7c7fb2"),
  },
];

export function FinancialEducationPage() {
  return (
    <PhoneFrame>
      <PageHeader
        title="Educación financiera"
        backTo="/dashboard"
        titleClassName="whitespace-nowrap text-lg"
      />

      <section className="space-y-3">
        {FINANCIAL_TIPS.map((tip) => {
          return (
            <Card key={tip.id} className="relative mx-auto w-full pt-0">
              <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
              <img
                src={tip.image}
                alt={tip.title}
                className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
              />
              <CardHeader>
                <CardAction>
                  <Badge variant="secondary">{tip.kicker}</Badge>
                </CardAction>
                <CardTitle>{tip.title}</CardTitle>
                <CardDescription>{tip.body}</CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </section>
    </PhoneFrame>
  );
}
