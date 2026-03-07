export function StatCard({ label, amount, tone = 'income' }) {
  const accent =
    tone === 'expense'
      ? 'border-red-200 bg-red-50 text-red-700'
      : 'border-lime-200 bg-lime-50 text-lime-700'

  return (
    <article className={`rounded-2xl border p-4 ${accent}`}>
      <p className="text-xs font-semibold uppercase tracking-wide">{label}</p>
      <p className="mt-2 text-xl font-extrabold">{amount}</p>
    </article>
  )
}
