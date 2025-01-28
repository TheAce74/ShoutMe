import { useToast } from "@/hooks/useToast";
import {
  ApiErrorResponse,
  RegisterInputs,
  RegisterResponse,
} from "@/lib/types";
import { register } from "@/services/auth";
import { useAuthStore } from "@/store/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next-nprogress-bar";

function useRegister() {
  const { toast } = useToast();
  const { login } = useAuthStore();
  const { push } = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload: RegisterInputs): Promise<RegisterResponse> => {
      const response = await register(payload);
      return response.data;
    },
    onSuccess: (data) => {
      toast({
        title: "Success!",
        description: data.message,
      });
      login(data.token);
      push("/dashboard");
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
    register: mutateAsync,
    registerPending: isPending,
  };
}

export { useRegister };
