import { DEFAULT_PAGE_SIZE, QUERY_KEYS } from "@/lib/constants";
import {
  ApiErrorResponse,
  GetEmergenciesResponse,
  PaginatedResponse,
} from "@/lib/types";
import { getEmergencies } from "@/services/emergency";
import { useInfiniteQuery } from "@tanstack/react-query";

function useGetEmergencies(page: number, search?: string, page_size?: number) {
  const {
    data,
    error,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: QUERY_KEYS.EMERGENCY.concat([String(search)]),
    queryFn: async ({
      pageParam,
    }: {
      pageParam: number;
    }): Promise<PaginatedResponse<GetEmergenciesResponse>> => {
      const response = await getEmergencies(
        pageParam,
        search,
        page_size ?? DEFAULT_PAGE_SIZE
      );
      return response.data;
    },
    initialPageParam: page,
    getNextPageParam: (lastPage) => lastPage.pagination.nextPage,
  });

  return {
    emergencies: data,
    emergenciesError: error as ApiErrorResponse | null,
    emergenciesStatus: status,
    fetchNextEmergenciesPage: fetchNextPage,
    hasNextEmergenciesPage: hasNextPage,
    isFetchingEmergenciesNextPage: isFetchingNextPage,
    isFetchingEmergencies: isFetching,
  };
}

export { useGetEmergencies };
