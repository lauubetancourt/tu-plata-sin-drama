import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

export function SelectField({ label, value, onChange, children, className = '', required = false, error }) {
  return (
    <div className={cn('space-y-2', className)}>
      <Label className="text-xs font-semibold text-muted-foreground">
        {label}{required && <span className="text-red-500">*</span>}
      </Label>
      <select
        className={cn(
          'h-11 w-full rounded-xl border border-input bg-background/80 px-3 text-sm text-foreground outline-none transition-colors focus:border-ring focus:ring-3 focus:ring-ring/50',
          error && 'border-red-400 focus:border-red-400 focus:ring-red-400/30'
        )}
        value={value}
        onChange={onChange}
      >
        {children}
      </select>
      {error && <p className="text-xs font-medium text-red-500">{error}</p>}
    </div>
  )
}
