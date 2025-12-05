import { useMutation } from "@tanstack/react-query";
import { loginService } from "../services/AuthServices";
import { signupService } from "../services/AuthServices";
import { useAuthStore } from "../stores/useAuthStore";


export const useLogin = () => {
  const { saveToken } = useAuthStore();

  return useMutation({
    mutationFn: loginService,
    onSuccess: (data) => {
      saveToken(data); 
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      console.error("Login error:", err);
    },
  });
};

export const useSignup = () => {
  return useMutation({
    mutationFn: signupService,
  });
};