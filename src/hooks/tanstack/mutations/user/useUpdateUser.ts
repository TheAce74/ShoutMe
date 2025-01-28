import { useToast } from "@/hooks/useToast";
import { QUERY_KEYS } from "@/lib/constants";
import {
  UpdateUserResponse,
  ApiErrorResponse,
  ProfileInputs,
} from "@/lib/types";
import { updateUser } from "@/services/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useUpdateUser(callback: () => void) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (
      payload: Partial<ProfileInputs>
    ): Promise<UpdateUserResponse> => {
      const response = await updateUser(payload);
      return response.data;
    },
    onSuccess: (data) => {
      toast({
        title: "Success!",
        description: data.message,
      });
      callback();
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.USER,
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
    updateUser: mutateAsync,
    updateUserPending: isPending,
  };
}

export { useUpdateUser };
