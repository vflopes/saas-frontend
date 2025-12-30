import { useContext } from "react";

import { AuthContext } from "@/providers/AuthContext.ts";

const useAuth = () => useContext(AuthContext);

export default useAuth;
