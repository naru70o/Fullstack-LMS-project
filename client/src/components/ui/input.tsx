import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Base styles
        "w-full min-w-0",
        // Background and text
        "bg-popover-foreground/10 text-popover-foreground/70",
        // Typography
        "font-poppins text-[16px] font-normal leading-[24px]",
        // Spacing and sizing
        "p-4 rounded-lg",
        // Border and focus
        "focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]",
        // File input styles
        "file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
        // Placeholder and selection
        "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
        // Dark mode
        "dark:bg-input/30 dark:aria-invalid:ring-destructive/40",
        // Validation states
        "aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
        // Disabled state
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        // Transitions
        "transition-[color,box-shadow] shadow-xs",
        // Override with custom className
        className,
      )}
      {...props}
    />
  );
}

export { Input };
