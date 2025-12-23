import { createContext } from "react";

export interface User {
  username: string;
  role: string;
}

export interface AuthContextValue {
  isAuthenticated: boolean;
  user?: User;
}

export const AuthContext = createContext<AuthContextValue>({
  isAuthenticated: false,
});
