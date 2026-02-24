import { cn } from "@/lib/utils"

function Kbd({ className, ...props }) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "bg-muted text-muted-foreground inline-flex h-5 min-w-5 items-center justify-center rounded-sm px-1 text-xs font-medium",
        className
      )}
      {...props}
    />
  )
}

function KbdGroup({ className, ...props }) {
  return (
    <kbd
      data-slot="kbd-group"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    />
  )
}

export { Kbd, KbdGroup }