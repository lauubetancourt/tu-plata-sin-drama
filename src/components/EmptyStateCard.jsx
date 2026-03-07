export function EmptyStateCard({ title, subtitle }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center">
      <h2 className="text-lg font-bold text-slate-800">{title}</h2>
      <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
    </div>
  )
}
