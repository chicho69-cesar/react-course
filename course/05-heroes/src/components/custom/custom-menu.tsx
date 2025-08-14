import { cn } from "@/lib/utils"
import {
  NavigationMenuItem,
  NavigationMenuLink,
} from "@radix-ui/react-navigation-menu"
import { Link, useLocation } from "react-router"
import { NavigationMenu, NavigationMenuList } from "../ui/navigation-menu"

export function CustomMenu() {
  const { pathname } = useLocation()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <NavigationMenu className="py-5">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={cn(isActive("/") && "bg-slate-200", "p-2 rounded-md")}
          >
            <Link to="/">Inicio</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={cn(
              isActive("/search") && "bg-slate-200",
              "p-2 rounded-md"
            )}
          >
            <Link to="/search">Buscar superhéroes</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
