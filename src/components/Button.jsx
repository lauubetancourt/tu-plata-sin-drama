import { buttonVariants, Button as UiButton } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'

const variantMap = {
  primary: 'default',
  ghost: 'outline',
  danger: 'destructive',
}

export function Button({
  to,
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  size = 'default',
}) {
  const mappedVariant = variantMap[variant] ?? variant
  const baseClass = 'h-11 w-full rounded-2xl px-4 text-sm font-semibold'

  if (to) {
    return (
      <Link
        className={cn(
          buttonVariants({ variant: mappedVariant, size, className: baseClass }),
          className,
        )}
        to={to}
      >
        {children}
      </Link>
    )
  }

  return (
    <UiButton
      className={cn(baseClass, className)}
      size={size}
      type={type}
      variant={mappedVariant}
    >
      {children}
    </UiButton>
  )
}
