import { cn } from "@/lib/utils";

type ErrorProps = {
  errorText: string;
  className?: string;
};

export default function Error({ errorText, className }: ErrorProps) {
  return (
    <div
      className={cn(
        "grid h-[60dvh] place-content-center place-items-center",
        className
      )}
    >
      <p className="text-center text-base font-medium text-primary-400 md:text-lg">
        {errorText}
      </p>
    </div>
  );
}
