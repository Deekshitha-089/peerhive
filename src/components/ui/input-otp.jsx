import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { Minus } from "lucide-react"
import { cn } from "@/lib/utils"

const InputOTP = React.forwardRef(function InputOTP(
  { className, containerClassName, ...props },
  ref
) {
  return (
    <OTPInput
      ref={ref}
      containerClassName={cn(
        "flex items-center gap-2",
        containerClassName
      )}
      className={cn("disabled:opacity-50", className)}
      {...props}
    />
  )
})
InputOTP.displayName = "InputOTP"

const InputOTPGroup = React.forwardRef(function InputOTPGroup(
  { className, ...props },
  ref
) {
  return (
    <div ref={ref} className={cn("flex items-center", className)} {...props} />
  )
})
InputOTPGroup.displayName = "InputOTPGroup"

const InputOTPSlot = React.forwardRef(function InputOTPSlot(
  { index, className, ...props },
  ref
) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const slot = inputOTPContext?.slots?.[index] || {}
  const { char, hasFakeCaret, isActive } = slot

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-9 w-9 items-center justify-center border",
        isActive && "ring-1 ring-ring",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground" />
        </div>
      )}
    </div>
  )
})
InputOTPSlot.displayName = "InputOTPSlot"

const InputOTPSeparator = React.forwardRef(function InputOTPSeparator(
  props,
  ref
) {
  return (
    <div ref={ref} role="separator" {...props}>
      <Minus />
    </div>
  )
})
InputOTPSeparator.displayName = "InputOTPSeparator"

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }