"use client";

import EmergencyButton from "@/components/ui/dashboard/EmergencyButton";
import Empty from "@/components/ui/dashboard/Empty";
import Error from "@/components/ui/dashboard/Error";
import { Skeleton } from "@/components/ui/skeleton";
import { useAddEmergency } from "@/hooks/dialogs/useAddEmergency";
import { useError } from "@/hooks/dialogs/useError";
import { useSuccess } from "@/hooks/dialogs/useSuccess";
import { useGetEmergencies } from "@/hooks/tanstack/queries/emergency/useGetEmergencies";
import { cn } from "@/lib/utils";
import { CaretRight, Warning } from "@phosphor-icons/react";
import Link from "next/link";

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

  const { emergencies, emergenciesStatus, emergenciesError } =
    useGetEmergencies(1, undefined, 3);

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
        {emergenciesStatus === "pending" ? (
          [0, 1, 2].map((item) => (
            <Skeleton
              className="mb-2 h-[60px] w-full"
              key={"placeholder" + item}
            />
          ))
        ) : emergenciesStatus === "error" && emergenciesError ? (
          <Error errorText={emergenciesError.message} />
        ) : emergencies && emergencies.pages[0].data.length === 0 ? (
          <Empty emptyText="No emergencies" className="h-full" />
        ) : (
          emergencies &&
          emergencies.pages.map((page, idx) => (
            <ul key={`page ${idx}`}>
              {page.data.map((emergency) => (
                <li
                  key={emergency.title + emergency.location + emergency._id}
                  className="flex-starter flex-wrap gap-6 border-b border-neutral-200 py-3 xs:flex-nowrap"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "flex size-[30px] min-w-max items-center justify-center rounded-circle text-neutral-100",
                        emergency.isActive ? "bg-success-400" : "bg-warning-400"
                      )}
                    >
                      <Warning size={20} weight="fill" />
                    </div>
                    <h3 className="line-clamp-1">{emergency.title}</h3>
                  </div>
                  <p className="line-clamp-1">{emergency.location}</p>
                  <EmergencyButton
                    emergencyId={emergency._id}
                    isActive={emergency.isActive}
                  />
                </li>
              ))}
            </ul>
          ))
        )}
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
