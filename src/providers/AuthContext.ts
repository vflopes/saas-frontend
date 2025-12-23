import { createContext } from "react";

export interface User {
  username: string;
  userId: string;
}

export interface AuthContextValue {
  isAuthenticated: boolean;
  user?: User;
}

export const AuthContext = createContext<AuthContextValue>({
  isAuthenticated: false,
});
