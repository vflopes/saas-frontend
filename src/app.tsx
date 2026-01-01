import useAuth from "@/hooks/use-auth";

import { router } from "@/router.ts";
import { RouterProvider } from "@tanstack/react-router";

export const RoutedApp = () => {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
};
