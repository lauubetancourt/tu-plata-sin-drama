import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

export function FormField({ label, placeholder, value, className = '' }) {
  return (
    <div className={cn('space-y-2', className)}>
      <Label className="text-xs font-semibold text-muted-foreground">{label}</Label>
      <Input
        className="h-11 rounded-xl bg-background/80 text-sm"
        defaultValue={value}
        placeholder={placeholder}
        readOnly
      />
    </div>
  )
}
