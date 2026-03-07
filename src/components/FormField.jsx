export function FormField({ label, placeholder, value }) {
  return (
    <label className="block space-y-2">
      <span className="text-xs font-semibold text-slate-600">{label}</span>
      <input
        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-lime-400 focus:outline-none"
        defaultValue={value}
        placeholder={placeholder}
        readOnly
      />
    </label>
  )
}
