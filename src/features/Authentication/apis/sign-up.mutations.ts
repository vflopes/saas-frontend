import { useMutation } from "@tanstack/react-query";
import { signUpService, confirmSignUpService } from "./services";
import { AuthMutationKeys } from "./query-keys";

export const useSignUp = () => {
  return useMutation({
    mutationKey: AuthMutationKeys.signUp,
    mutationFn: signUpService,
  });
};

export const useConfirmSignUp = () => {
  return useMutation({
    mutationKey: AuthMutationKeys.confirmSignUp,
    mutationFn: confirmSignUpService,
  });
};
