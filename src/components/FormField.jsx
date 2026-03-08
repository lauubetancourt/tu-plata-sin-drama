import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

export function FormField({ label, placeholder, value = '', className = '', readOnly = false, required = false, error, onChange, ...inputProps }) {
  const isReadOnly = readOnly || !onChange

  return (
    <div className={cn('space-y-2', className)}>
      <Label className="text-xs font-semibold text-muted-foreground">
        {label}{required && <span className="text-red-500">*</span>}
      </Label>
      <Input
        className={cn('h-11 rounded-xl bg-background/80 text-sm', error && 'border-red-400 focus-visible:border-red-400 focus-visible:ring-red-400/30')}
        value={value}
        placeholder={placeholder}
        readOnly={isReadOnly}
        onChange={onChange ?? (() => {})}
        {...inputProps}
      />
      {error && <p className="text-xs font-medium text-red-500">{error}</p>}
    </div>
  )
}
