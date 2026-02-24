"use client"

import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

function InputGroup({ className, ...props }) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        "relative flex w-full items-center rounded-md border border-input shadow-xs",
        className
      )}
      {...props}
    />
  )
}

const inputGroupAddonVariants = cva(
  "flex items-center gap-2 text-sm text-muted-foreground",
  {
    variants: {
      align: {
        "inline-start": "pl-3",
        "inline-end": "pr-3",
        "block-start": "w-full px-3 pt-3",
        "block-end": "w-full px-3 pb-3",
      },
    },
    defaultVariants: { align: "inline-start" },
  }
)

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}) {
  return (
    <div
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      {...props}
    />
  )
}

function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}) {
  return (
    <Button
      type={type}
      variant={variant}
      className={cn("h-6 px-2", className)}
      {...props}
    />
  )
}

function InputGroupText({ className, ...props }) {
  return (
    <span
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function InputGroupInput({ className, ...props }) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn("flex-1 border-0 shadow-none", className)}
      {...props}
    />
  )
}

function InputGroupTextarea({ className, ...props }) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn("flex-1 resize-none border-0 shadow-none", className)}
      {...props}
    />
  )
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
}