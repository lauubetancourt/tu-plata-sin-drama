import { Link } from 'react-router-dom'
import { Button } from './Button'
import { PhoneFrame } from './PhoneFrame'

export function OnboardingSlide({
  title,
  description,
  step,
  total,
  previousTo,
  nextTo,
  nextLabel = 'Siguiente',
}) {
  return (
    <PhoneFrame>
      <section className="flex min-h-full flex-col">
        <div className="mb-8 text-right">
          <Link className="text-xs font-semibold text-slate-500" to="/dashboard">
            Omitir
          </Link>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <div className="mx-auto mb-5 h-24 w-24 rounded-[28px] bg-gradient-to-br from-lime-300 to-lime-500" />
          <h1 className="text-2xl font-extrabold text-slate-900">{title}</h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">{description}</p>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {Array.from({ length: total }).map((_, index) => (
            <span
              key={index}
              className={[
                'h-2 rounded-full transition-all',
                index + 1 === step ? 'w-8 bg-lime-500' : 'w-2 bg-slate-300',
              ].join(' ')}
            />
          ))}
        </div>

        <div className="mt-auto grid grid-cols-2 gap-3 pt-8">
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
  )
}
