import * as React from "react"
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import { ChevronDown } from "lucide-react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const NavigationMenu = React.forwardRef(function NavigationMenu(
  { className, children, ...props },
  ref
) {
  return (
    <NavigationMenuPrimitive.Root
      ref={ref}
      className={cn("relative flex items-center", className)}
      {...props}
    >
      {children}
    </NavigationMenuPrimitive.Root>
  )
})

const NavigationMenuList = NavigationMenuPrimitive.List
const NavigationMenuItem = NavigationMenuPrimitive.Item
const NavigationMenuLink = NavigationMenuPrimitive.Link

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
}