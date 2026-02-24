import * as React from "react"
import * as MenubarPrimitive from "@radix-ui/react-menubar"
import { Check, ChevronRight, Circle } from "lucide-react"
import { cn } from "@/lib/utils"

const Menubar = React.forwardRef(function Menubar(
  { className, ...props },
  ref
) {
  return (
    <MenubarPrimitive.Root
      ref={ref}
      className={cn(
        "flex h-9 items-center space-x-1 rounded-md border bg-background p-1",
        className
      )}
      {...props}
    />
  )
})

const MenubarTrigger = React.forwardRef(function MenubarTrigger(
  { className, ...props },
  ref
) {
  return (
    <MenubarPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex items-center rounded-sm px-3 py-1 text-sm",
        className
      )}
      {...props}
    />
  )
})

const MenubarContent = React.forwardRef(function MenubarContent(
  { className, ...props },
  ref
) {
  return (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        ref={ref}
        className={cn(
          "z-50 min-w-[12rem] rounded-md border bg-popover p-1 shadow-md",
          className
        )}
        {...props}
      />
    </MenubarPrimitive.Portal>
  )
})

export { Menubar, MenubarTrigger, MenubarContent }