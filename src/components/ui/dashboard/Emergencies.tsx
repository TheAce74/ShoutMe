"use client";

import EmergencyButton from "@/components/ui/dashboard/EmergencyButton";
import Empty from "@/components/ui/dashboard/Empty";
import Error from "@/components/ui/dashboard/Error";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetEmergencies } from "@/hooks/tanstack/queries/emergency/useGetEmergencies";
import { useDebouncedSearch } from "@/hooks/useDebouncedSearch";
import { GetEmergenciesResponse } from "@/lib/types";
import { checkDate, cn, getKeys } from "@/lib/utils";
import { MagnifyingGlass, Warning } from "@phosphor-icons/react";
import { format, parse } from "date-fns";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function Emergencies() {
  const { search, setSearch, debouncedSearch } = useDebouncedSearch();

  const {
    emergencies,
    emergenciesStatus,
    emergenciesError,
    fetchNextEmergenciesPage,
    isFetchingEmergenciesNextPage,
    hasNextEmergenciesPage,
  } = useGetEmergencies(1, debouncedSearch);

  const groupedEmergencies: Record<string, GetEmergenciesResponse> = {};

  if (emergencies) {
    emergencies.pages.forEach((page) =>
      page.data.forEach((emergency) => {
        const isYesterday = checkDate(emergency.createdAt) === "Yesterday";
        const isToday = checkDate(emergency.createdAt) === "Today";
        const key = isYesterday
          ? "Yesterday"
          : isToday
            ? "Today"
            : format(emergency.createdAt, "PPPP");
        groupedEmergencies[key] = groupedEmergencies[key]
          ? [...groupedEmergencies[key], emergency]
          : [emergency];
      })
    );
  }

  const groupedEmergenciesKeys = [
    "Today",
    "Yesterday",
    ...[...getKeys(groupedEmergencies)]
      .filter((key) => key !== "Yesterday" && key !== "Today")
      .sort(
        (a, b) =>
          parse(b, "PPPP", new Date()).getTime() -
          parse(a, "PPPP", new Date()).getTime()
      ),
  ];

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextEmergenciesPage) {
      fetchNextEmergenciesPage();
    }
  }, [inView, fetchNextEmergenciesPage, hasNextEmergenciesPage]);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="hidden h-[225px] w-full min-w-[332px] rounded-md bg-neutral-300 lg:sticky lg:top-24 lg:block lg:h-[calc(100dvh_-_200px)]" />
      <div>
        <Input
          placeholder="Search"
          containerClassName="mb-4"
          icon={<MagnifyingGlass size={20} />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <h2 className="mb-3 text-xl font-bold text-primary-400 underline lg:text-2xl">
          All Emergencies
        </h2>
        <ul>
          {emergenciesStatus === "pending" ? (
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
              <Skeleton
                className="my-3 h-[60px] w-full"
                key={"placeholder" + item}
              />
            ))
          ) : emergenciesStatus === "error" && emergenciesError ? (
            <Error errorText={emergenciesError.message} />
          ) : emergencies && emergencies.pages[0].data.length === 0 ? (
            <Empty emptyText="No emergencies" />
          ) : (
            <>
              {groupedEmergenciesKeys
                .filter((key) => key in groupedEmergencies)
                .map((key) => (
                  <li key={key}>
                    <h3 className="mb-2 mt-4 font-bold uppercase text-primary-400">
                      {key}
                    </h3>
                    <ul className="flex flex-col gap-6">
                      {groupedEmergencies[key].map((emergency) => (
                        <li
                          key={
                            emergency.title + emergency.location + emergency._id
                          }
                          className="flex-starter flex-wrap gap-6 border-b border-neutral-200 py-3"
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={cn(
                                "flex size-[30px] items-center justify-center rounded-circle text-neutral-100",
                                emergency.isActive
                                  ? "bg-success-400"
                                  : "bg-warning-400"
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
                  </li>
                ))}
            </>
          )}
          <div ref={ref}>
            {isFetchingEmergenciesNextPage && (
              <Skeleton
                className="my-4 h-[60px] w-full"
                key="placeholder for next page"
              />
            )}
          </div>
        </ul>
      </div>
    </div>
  );
}
