"use client";

import Error from "@/components/ui/dashboard/Error";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetNotifications } from "@/hooks/tanstack/queries/notification/useGetNotifications";
import { format } from "date-fns";
import Image from "next/image";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function Notifications() {
  const {
    notifications,
    notificationsStatus,
    notificationsError,
    fetchNextNotificationsPage,
    isFetchingNotificationsNextPage,
    hasNextNotificationsPage,
  } = useGetNotifications(1);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextNotificationsPage) {
      fetchNextNotificationsPage();
    }
  }, [inView, fetchNextNotificationsPage, hasNextNotificationsPage]);
  return notificationsStatus === "pending" ? (
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
      <Skeleton className="my-4 h-[90px] w-full" key={"placeholder" + item} />
    ))
  ) : notificationsStatus === "error" && notificationsError ? (
    <Error errorText={notificationsError.message} />
  ) : notifications && notifications.pages[0].data.length === 0 ? (
    <div className="grid min-h-[70dvh] place-content-center place-items-center gap-2 text-center">
      <Image
        src="/images/notifications.png"
        alt="Empty illustration"
        width={749}
        height={635}
        className="mx-auto mb-3 h-auto w-[157px] lg:w-[380px]"
      />
      <h2 className="text-xl font-bold text-primary-400 lg:text-2xl">
        You have no notifications
      </h2>
      <p>Your notifications will appear here when they arrive.</p>
    </div>
  ) : (
    notifications &&
    notifications.pages.map((page, idx) => (
      <ul key={`page ${idx}`}>
        {page.data.map((notification) => (
          <li
            key={notification.title + notification._id}
            className="mb-4 space-y-1 border-b border-neutral-200 pb-4"
          >
            <h3 className="text-lg font-semibold text-primary-400 lg:text-xl">
              {notification.title}
            </h3>
            <p>{notification.description}</p>
            <p className="font-medium italic">
              {format(notification.createdAt, "Pp")}
            </p>
          </li>
        ))}
        <div ref={ref}>
          {isFetchingNotificationsNextPage && (
            <Skeleton
              className="my-4 h-[90px] w-full"
              key="placeholder for next page"
            />
          )}
        </div>
      </ul>
    ))
  );
}
