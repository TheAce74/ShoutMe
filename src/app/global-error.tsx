"use client";

import { useEffect } from "react";
import { ArrowsClockwise } from "@phosphor-icons/react";
import Button from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <section className="grid h-screen place-content-center place-items-center gap-5 px-4 text-center">
          <h1 className="text-lg font-bold lg:text-xl">
            Something went terribly wrong!
          </h1>
          <Button variant="inverted" onClick={reset}>
            <span>Try again</span>
            <ArrowsClockwise size={20} />
          </Button>
        </section>
      </body>
    </html>
  );
}
