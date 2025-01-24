import * as React from "react";

import { cn } from "@/lib/utils";

export type InputProps = React.ComponentProps<"input"> & {
  error?: boolean;
  icon?: React.ReactNode;
  containerClassName?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, icon, containerClassName, ...props }, ref) => {
    return !icon ? (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-md border border-primary-400 bg-transparent px-4 py-2 text-sm text-neutral-900 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 lg:text-base",
          error && "border-primary-500",
          (type === "radio" || type === "checkbox") && "size-4 shrink-0",
          className
        )}
        ref={ref}
        {...props}
      />
    ) : (
      <div
        className={cn(
          "flex h-12 items-center gap-2 rounded-md border border-primary-400 px-4 py-2 focus-within:ring-1 focus-within:ring-ring",
          error && "border-primary-500",
          containerClassName
        )}
      >
        {icon}
        <input
          type={type}
          className={cn(
            "flex w-full text-sm text-neutral-900 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 lg:text-base",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
