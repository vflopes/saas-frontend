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
          setIsAuthenticated(false);
          return null;
        }
      },
      retry: false,
    }).promise
  );

  const authContextValue: AuthContextValue = {
    isAuthenticated,
  };

  console.log("AuthContextValue:", authContextValue);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
