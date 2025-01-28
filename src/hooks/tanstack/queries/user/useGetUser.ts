import { QUERY_KEYS } from "@/lib/constants";
import { ApiErrorResponse, GetUserResponse } from "@/lib/types";
import { getUser } from "@/services/user";
import { useQuery } from "@tanstack/react-query";

function useGetUser() {
  const { data, isError, error, isPending } = useQuery({
    queryKey: QUERY_KEYS.USER,
    queryFn: async (): Promise<GetUserResponse> => {
      const response = await getUser();
      return response.data;
    },
  });

  return {
    user: data,
    userError: error as ApiErrorResponse | null,
    isUserError: isError,
    isUserPending: isPending,
  };
}

export { useGetUser };
