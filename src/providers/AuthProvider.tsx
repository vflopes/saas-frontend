import { useState, use } from "react";
import { AuthContext, type AuthContextValue } from "./AuthContext";
import { getCurrentUser, fetchAuthSession } from "@aws-amplify/auth";
import { useQuery } from "@tanstack/react-query";

export const AuthProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const user = use(
    useQuery({
      queryKey: ["currentUser"],
      queryFn: async () => {
        await fetchAuthSession({ forceRefresh: true });
        try {
          const user = await getCurrentUser();
          setIsAuthenticated(true);
          return user;
        } catch (error) {
          if (
            error instanceof Error &&
            error.name === "UserUnAuthenticatedException"
          ) {
            // User is not authenticated
            setIsAuthenticated(false);
            return null;
          }
          console.log(error);
          throw error;
        }
      },
      retry: false,
    }).promise
  );

  const authContextValue: AuthContextValue = {
    isAuthenticated,
    ...(user && {
      user: {
        username: user.username,
        userId: user.userId,
      },
    }),
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
