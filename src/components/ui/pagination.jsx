import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

const Pagination = ({ className, ...props }) => (
  <nav
    role="navigation"
    className={cn("flex justify-center", className)}
    {...props}
  />
)

const PaginationContent = React.forwardRef(function PaginationContent(
  { className, ...props },
  ref
) {
  return (
    <ul
      ref={ref}
      className={cn("flex items-center gap-1", className)}
      {...props}
    />
  )
})

const PaginationItem = ({ className, ...props }) => (
  <li className={cn(className)} {...props} />
)

const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  ...props
}) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      className
    )}
    {...props}
  />
)

const PaginationPrevious = (props) => (
  <PaginationLink {...props}>
    <ChevronLeft className="h-4 w-4" />
  </PaginationLink>
)

const PaginationNext = (props) => (
  <PaginationLink {...props}>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
)

const PaginationEllipsis = ({ className, ...props }) => (
  <span
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
  </span>
)

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}