import { useQuery } from "@tanstack/react-query";
import { autoSignInService } from "./services";
import { AuthQueryKeys } from "./query-keys";

export const useAutoSignIn = () => {
  return useQuery({
    queryKey: AuthQueryKeys.autoSignIn,
    queryFn: autoSignInService,
    enabled: false,
  });
};
