"use client";

import Button from "@/components/ui/button";
import { useRouter } from "next-nprogress-bar";

export default function NotFound() {
  const { back } = useRouter();

  return (
    <section className="grid h-screen place-content-center place-items-center px-4 py-8 text-center lg:px-6 lg:py-16">
      <h1 className="text-primary-600 mb-4 text-7xl font-extrabold tracking-tight lg:text-9xl">
        404
      </h1>
      <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
        Something&apos;s missing.
      </p>
      <p className="mb-4 text-lg text-gray-500 dark:text-gray-400">
        Sorry, we can&apos;t find that page. You&apos;ll find lots to explore on
        the previous page.
      </p>
      <Button variant="inverted" onClick={() => back()} className="mx-auto">
        Back to previous page
      </Button>
    </section>
  );
}
