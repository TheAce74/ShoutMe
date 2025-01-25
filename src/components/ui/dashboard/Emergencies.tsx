"use client";

import Button from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { checkDate, cn, getKeys } from "@/lib/utils";
import { MagnifyingGlass, Warning } from "@phosphor-icons/react";
import { format, parse } from "date-fns";

const sirens = [
  {
    title: "Phone theft",
    location: "SEET head",
    isActive: true,
    createdAt: new Date(),
  },
  {
    title: "Robbery",
    location: "FUTO cafe",
    isActive: false,
    createdAt: new Date(),
  },
  {
    title: "Fire",
    location: "Senate building",
    isActive: true,
    createdAt: new Date(),
  },
  {
    title: "Phone theft",
    location: "SEET head",
    isActive: true,
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
  },
  {
    title: "Robbery",
    location: "FUTO cafe",
    isActive: false,
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
  },
  {
    title: "Fire",
    location: "Senate building",
    isActive: true,
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
  },
  {
    title: "Phone theft",
    location: "SEET head",
    isActive: true,
    createdAt: new Date(new Date().setDate(new Date().getDate() - 4)),
  },
  {
    title: "Robbery",
    location: "FUTO cafe",
    isActive: false,
    createdAt: new Date(new Date().setDate(new Date().getDate() - 4)),
  },
  {
    title: "Fire",
    location: "Senate building",
    isActive: true,
    createdAt: new Date(new Date().setDate(new Date().getDate() - 4)),
  },
  {
    title: "Fire",
    location: "Senate building",
    isActive: true,
    createdAt: new Date(new Date().setDate(new Date().getDate() - 5)),
  },
];

export default function Emergencies() {
  const groupedSirens: Record<string, typeof sirens> = {};

  sirens.forEach((siren) => {
    const isYesterday = checkDate(siren.createdAt) === "Yesterday";
    const isToday = checkDate(siren.createdAt) === "Today";
    const key = isYesterday
      ? "Yesterday"
      : isToday
        ? "Today"
        : format(siren.createdAt, "PPPP");
    groupedSirens[key] = groupedSirens[key]
      ? [...groupedSirens[key], siren]
      : [siren];
  });

  const groupedSirensKeys = [
    "Today",
    "Yesterday",
    ...[...getKeys(groupedSirens)]
      .filter((key) => key !== "Yesterday" && key !== "Today")
      .sort(
        (a, b) =>
          parse(b, "PPPP", new Date()).getTime() -
          parse(a, "PPPP", new Date()).getTime()
      ),
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="hidden h-[225px] w-full min-w-[332px] rounded-md bg-neutral-300 lg:sticky lg:top-24 lg:block lg:h-[calc(100dvh_-_200px)]" />
      <div>
        <Input
          placeholder="Search"
          containerClassName="mb-4"
          icon={<MagnifyingGlass size={20} />}
        />
        <h2 className="mb-3 text-xl font-bold text-primary-400 underline lg:text-2xl">
          All Emergencies
        </h2>
        <ul>
          {groupedSirensKeys
            .filter((key) => key in groupedSirens)
            .map((key) => (
              <li key={key}>
                <h3 className="mb-2 mt-4 font-bold uppercase text-primary-400">
                  {key}
                </h3>
                <ul className="flex flex-col gap-6">
                  {groupedSirens[key].map((siren, idx) => (
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
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
