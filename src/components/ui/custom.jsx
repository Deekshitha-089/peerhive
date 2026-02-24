import { cn } from "@/lib/utils";

export function Button({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}) {
  const variants = {
    primary:
      "bg-[hsl(292,27%,36%)] text-white hover:bg-[hsl(292,27%,30%)]",
    secondary:
      "bg-[hsl(40,27%,94%)] text-[hsl(292,27%,36%)]",
    outline:
      "border-2 border-[hsl(292,27%,36%)] text-[hsl(292,27%,36%)] hover:bg-[hsl(292,27%,36%)] hover:text-white",
    ghost: "text-[hsl(292,27%,36%)] hover:bg-gray-100",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={cn(
        "font-ui font-semibold rounded-lg transition-all duration-300",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function Input({ className, label, error, ...props }) {
  return (
    <div className="w-full space-y-2">
      {label && (
        <label className="block text-sm font-medium text-[hsl(292,27%,36%)]">
          {label}
        </label>
      )}
      <input
        className={cn(
          "w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[hsl(292,27%,36%)]",
          error && "border-red-500 focus:ring-red-500",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

export function Card({ className, children, ...props }) {
  return (
    <div
      className={cn(
        "bg-white rounded-lg border shadow-sm p-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function Badge({ children, variant = "default", className }) {
  const variants = {
    default: "bg-[hsl(292,27%,36%)] text-white",
    outline: "border border-[hsl(292,27%,36%)] text-[hsl(292,27%,36%)]",
    secondary: "bg-[hsl(40,27%,94%)] text-[hsl(292,27%,36%)]",
    success: "bg-emerald-100 text-emerald-800",
    warning: "bg-amber-100 text-amber-800",
  };

  return (
    <span
      className={cn(
        "px-2.5 py-0.5 rounded-full text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}