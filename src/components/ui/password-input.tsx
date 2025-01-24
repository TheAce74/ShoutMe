import { Button } from "@/components/ui/sbutton";
import { cn } from "@/lib/utils";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import { forwardRef, ReactNode, useState } from "react";

export type InputProps = Omit<React.ComponentProps<"input">, "type"> & {
  error?: boolean;
  icon?: ReactNode;
  containerClassName?: string;
};

const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, icon, containerClassName, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div
        className={cn(
          "flex h-12 items-center gap-2 rounded-md border border-primary-400 px-4 py-2 focus-within:ring-1 focus-within:ring-ring",
          error && "border-primary-500",
          containerClassName
        )}
      >
        {icon}
        <input
          {...props}
          type={showPassword ? "text" : "password"}
          className={cn(
            "flex w-full text-sm text-neutral-900 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 lg:text-base",
            className
          )}
          ref={ref}
        />
        <Button
          variant="ghost"
          type="button"
          className="px-2 py-1"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
        </Button>
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
