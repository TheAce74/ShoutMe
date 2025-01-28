import { DEFAULT_PAGE_SIZE, QUERY_KEYS } from "@/lib/constants";
import {
  ApiErrorResponse,
  GetNotificationsResponse,
  PaginatedResponse,
} from "@/lib/types";
import { getNotifications } from "@/services/notification";
import { useInfiniteQuery } from "@tanstack/react-query";

function useGetNotifications(page: number, page_size?: number) {
  const {
    data,
    error,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: QUERY_KEYS.NOTIFICATION,
    queryFn: async ({
      pageParam,
    }: {
      pageParam: number;
    }): Promise<PaginatedResponse<GetNotificationsResponse>> => {
      const response = await getNotifications(
        pageParam,
        page_size ?? DEFAULT_PAGE_SIZE
      );
      return response.data;
    },
    initialPageParam: page,
    getNextPageParam: (lastPage) => lastPage.pagination.nextPage,
  });

  return {
    notifications: data,
    notificationsError: error as ApiErrorResponse | null,
    notificationsStatus: status,
    fetchNextNotificationsPage: fetchNextPage,
    hasNextNotificationsPage: hasNextPage,
    isFetchingNotificationsNextPage: isFetchingNextPage,
    isFetchingNotifications: isFetching,
  };
}

export { useGetNotifications };
