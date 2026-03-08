import { Card, CardContent } from '@/components/ui/card'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import { NavLink } from 'react-router-dom'

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Inicio' },
  { to: '/movimientos', label: 'Movimientos' },
  { to: '/categorias', label: 'Categorias' },
  { to: '/metas', label: 'Metas' },
  { to: '/recordatorios', label: 'Recordatorios' },
]

export function BottomNav() {
  return (
    <Card className="sticky bottom-0 mt-6 rounded-2xl border border-border/70 bg-card/95 py-0 shadow-sm backdrop-blur">
      <CardContent className="p-2">
        <NavigationMenu className="w-full max-w-none">
          <NavigationMenuList className="grid w-full grid-cols-5 gap-1">
        {NAV_ITEMS.map((item) => (
            <NavigationMenuItem className="w-full" key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'block rounded-xl px-1 py-2 text-center text-[10px] font-semibold transition',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:bg-muted',
                )
              }
            >
              {item.label}
            </NavLink>
            </NavigationMenuItem>
        ))}
          </NavigationMenuList>
        </NavigationMenu>
      </CardContent>
    </Card>
  )
}
