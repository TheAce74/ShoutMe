import { QUERY_KEYS } from "@/lib/constants";
import {
  AddEmergencyInputs,
  AddEmergencyResponse,
  ApiErrorResponse,
} from "@/lib/types";
import { addEmergency } from "@/services/emergency";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useAddEmergency(
  successCallback: () => void,
  errorCallback: () => void
) {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (
      payload: AddEmergencyInputs
    ): Promise<AddEmergencyResponse> => {
      const response = await addEmergency(payload);
      return response.data;
    },
    onSuccess: () => {
      successCallback();
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.EMERGENCY,
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.NOTIFICATION,
      });
    },
    onError: (error: ApiErrorResponse) => {
      console.error(error);
      errorCallback();
    },
  });

  return {
    addEmergency: mutateAsync,
    addEmergencyPending: isPending,
  };
}

export { useAddEmergency };
