import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef(function Input(
  { className, type, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        "h-9 w-full rounded-md border border-input px-3 py-1 text-sm shadow-sm",
        className
      )}
      {...props}
    />
  )
})
Input.displayName = "Input"

export { Input }