import { useToast } from "@/hooks/useToast";
import { ApiErrorResponse, LoginInputs, LoginResponse } from "@/lib/types";
import { login } from "@/services/auth";
import { useAuthStore } from "@/store/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next-nprogress-bar";
import { useSearchParams } from "next/navigation";

function useLogin() {
  const { toast } = useToast();
  const { login: loginAuth } = useAuthStore();
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect");

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload: LoginInputs): Promise<LoginResponse> => {
      const response = await login(payload);
      return response.data;
    },
    onSuccess: (data) => {
      toast({
        title: "Success!",
        description: data.message,
      });
      loginAuth(data.token);
      push(redirectUrl ? redirectUrl : "/dashboard");
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
    login: mutateAsync,
    loginPending: isPending,
  };
}

export { useLogin };
