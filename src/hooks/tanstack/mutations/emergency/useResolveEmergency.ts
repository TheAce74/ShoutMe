import { useToast } from "@/hooks/useToast";
import { QUERY_KEYS } from "@/lib/constants";
import { ResolveEmergencyResponse, ApiErrorResponse } from "@/lib/types";
import { resolveEmergency } from "@/services/emergency";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useResolveEmergency(callback: () => void) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (
      emergencyId: string
    ): Promise<ResolveEmergencyResponse> => {
      const response = await resolveEmergency(emergencyId);
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
    resolveEmergency: mutateAsync,
    resolveEmergencyPending: isPending,
  };
}

export { useResolveEmergency };
