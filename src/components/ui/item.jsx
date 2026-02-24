import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

function ItemGroup({ className, ...props }) {
  return (
    <div
      role="list"
      className={cn("flex flex-col", className)}
      {...props}
    />
  )
}

function ItemSeparator({ className, ...props }) {
  return (
    <Separator
      orientation="horizontal"
      className={cn("my-0", className)}
      {...props}
    />
  )
}

const itemVariants = cva(
  "flex items-center rounded-md text-sm",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-border",
        muted: "bg-muted/50",
      },
      size: {
        default: "p-4 gap-4",
        sm: "px-4 py-3 gap-2.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Item({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "div"
  return (
    <Comp
      className={cn(itemVariants({ variant, size }), className)}
      {...props}
    />
  )
}

function ItemMedia({ className, ...props }) {
  return (
    <div className={cn("flex items-center", className)} {...props} />
  )
}

function ItemContent({ className, ...props }) {
  return (
    <div className={cn("flex flex-1 flex-col", className)} {...props} />
  )
}

function ItemTitle({ className, ...props }) {
  return (
    <div className={cn("text-sm font-medium", className)} {...props} />
  )
}

function ItemDescription({ className, ...props }) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props} />
  )
}

function ItemActions({ className, ...props }) {
  return (
    <div className={cn("flex items-center gap-2", className)} {...props} />
  )
}

function ItemHeader({ className, ...props }) {
  return (
    <div className={cn("flex justify-between", className)} {...props} />
  )
}

function ItemFooter({ className, ...props }) {
  return (
    <div className={cn("flex justify-between", className)} {...props} />
  )
}

export {
  Item,
  ItemMedia,
  ItemContent,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
  ItemDescription,
  ItemHeader,
  ItemFooter,
}