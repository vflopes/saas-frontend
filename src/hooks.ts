import { useContext } from "react";

import { AuthContext } from "@/providers/AuthContext.ts";

export const useAuth = () => useContext(AuthContext);
