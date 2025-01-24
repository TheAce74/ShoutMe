import { cn } from "@/lib/utils";
import { ReactElement } from "react";
import { FieldErrors, FieldValues } from "react-hook-form";

export default function withErrorMessage<T extends FieldValues = FieldValues>(
  component: ReactElement,
  err: {
    errors: FieldErrors<T>;
    key: keyof T;
  },
  errorClassName?: string
) {
  const { errors, key } = err;
  return (
    <div>
      {component}
      {errors[key] && (
        <span
          className={cn(
            "mt-1 text-xs text-primary-500 md:text-sm",
            errorClassName
          )}
        >
          {String(errors[key].message)}
        </span>
      )}
    </div>
  );
}
