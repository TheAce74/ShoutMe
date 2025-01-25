import { ButtonVariants } from "@/lib/types";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariants;
};

export default function Button({
  children,
  variant,
  type,
  className,
  ...otherProps
}: ButtonProps) {
  return (
    <button
      type={type ?? "button"}
      {...otherProps}
      className={cn(buttonVariants({ variant }), className)}
    >
      {children}
    </button>
  );
}

export const buttonVariants = cva(
  "trans-all flex min-w-max items-center justify-center gap-2 rounded-md border border-current px-6 py-2 text-sm font-semibold hover:scale-95 focus-visible:scale-95 active:scale-90 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60 md:text-base",
  {
    variants: {
      variant: {
        primary:
          "border-primary-400 bg-primary-400 text-neutral-100 hover:border-primary-500 hover:bg-primary-500 focus-visible:border-primary-500 focus-visible:bg-primary-500",
        inverted:
          "border-neutral-900 text-neutral-900 hover:border-primary-400 hover:text-primary-400 focus-visible:border-primary-400 focus-visible:text-primary-400",
        active:
          "border-success-400 bg-success-400 text-neutral-100 hover:border-success-500 hover:bg-success-500 focus-visible:border-success-500 focus-visible:bg-success-500",
        resolved:
          "pointer-events-none cursor-not-allowed border-neutral-300 bg-neutral-300 text-neutral-900",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);
