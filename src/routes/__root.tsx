import * as z from "zod";

import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { type AuthContextValue } from "@/providers/AuthContext";

import PageLayout from "@/components/layout/PageLayout";

const rootSearchParams = z.object({
  redirect: z.string().optional(),
});

const RootLayout: React.FC = () => (
  <>
    <PageLayout>
      <Outlet />
    </PageLayout>
    <TanStackRouterDevtools />
  </>
);

interface RootContext {
  auth?: AuthContextValue;
}

export const Route = createRootRouteWithContext<RootContext>()({
  component: RootLayout,
  validateSearch: rootSearchParams,
});
