import { useToast } from "@/hooks/useToast";
import { QUERY_KEYS } from "@/lib/constants";
import {
  AddEmergencyInputs,
  AddEmergencyResponse,
  ApiErrorResponse,
} from "@/lib/types";
import { addEmergency } from "@/services/emergency";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useAddEmergency(callback: () => void) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (
      payload: AddEmergencyInputs
    ): Promise<AddEmergencyResponse> => {
      const response = await addEmergency(payload);
      return response.data;
    },
    onSuccess: (data) => {
      toast({
        title: "Success!",
        description: data.message,
      });
      callback();
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.EMERGENCY,
      });
    },
    onError: (error: ApiErrorResponse) => {
      toast({
        title: "Error!",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    addEmergency: mutateAsync,
    addEmergencyPending: isPending,
  };
}

export { useAddEmergency };
