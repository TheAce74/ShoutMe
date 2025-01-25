"use client";

import Button from "@/components/ui/button";
import { useAddEmergency } from "@/hooks/dialogs/useAddEmergency";
import { useError } from "@/hooks/dialogs/useError";
import { useSuccess } from "@/hooks/dialogs/useSuccess";
import { cn } from "@/lib/utils";
import { CaretRight, Warning } from "@phosphor-icons/react";
import Link from "next/link";

const sirens = [
  {
    title: "Phone theft",
    location: "SEET head",
    isActive: true,
  },
  {
    title: "Robbery",
    location: "FUTO cafe",
    isActive: false,
  },
  {
    title: "Fire",
    location: "Senate building",
    isActive: true,
  },
];

export default function Dashboard() {
  const { successDialog, openSuccessDialog, closeSuccessDialog } = useSuccess(
    "You have successfully added an Emergency Alert!",
    "Dismiss"
  );
  const { errorDialog, openErrorDialog, closeErrorDialog } = useError(
    "Couldn't add Emergency Alert!",
    "Dismiss"
  );
  const { openEmergencyDialog, emergencyDialog } = useAddEmergency(
    {
      open: openSuccessDialog,
      close: closeSuccessDialog,
    },
    {
      open: openErrorDialog,
      close: closeErrorDialog,
    }
  );

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="h-[225px] w-full min-w-[332px] rounded-md bg-neutral-300 lg:sticky lg:top-24 lg:h-[calc(100dvh_-_200px)]" />
      <div>
        <div className="flex-starter mb-3 gap-4">
          <h2 className="text-xl font-bold text-primary-400 underline lg:text-2xl">
            Emergencies
          </h2>
          <Link
            href="/dashboard/emergencies"
            className="trans-all flex items-center gap-1 font-semibold hover:text-primary-400 focus-visible:text-primary-400"
          >
            <span>View more</span>
            <CaretRight size={14} weight="bold" className="mt-1" />
          </Link>
        </div>
        <ul>
          {sirens.map((siren, idx) => (
            <li
              key={siren.title + siren.location + idx}
              className="flex-starter flex-wrap gap-6 border-b border-neutral-200 py-3"
            >
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "flex size-[30px] items-center justify-center rounded-circle text-neutral-100",
                    siren.isActive ? "bg-success-400" : "bg-warning-400"
                  )}
                >
                  <Warning size={20} weight="fill" />
                </div>
                <h3 className="line-clamp-1">{siren.title}</h3>
              </div>
              <p className="line-clamp-1">{siren.location}</p>
              <Button variant={siren.isActive ? "active" : "resolved"}>
                {siren.isActive ? "Active" : "Resolved"}
              </Button>
            </li>
          ))}
        </ul>
        <button
          className="trans-all mx-auto mt-8 flex size-[106px] items-center justify-center rounded-circle bg-primary-400 text-neutral-100 hover:bg-primary-500 focus-visible:bg-primary-500 active:scale-95"
          onClick={openEmergencyDialog}
        >
          <Warning size={64} weight="fill" />
        </button>
      </div>
      {emergencyDialog}
      {successDialog}
      {errorDialog}
    </div>
  );
}
