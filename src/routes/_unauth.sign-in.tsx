import { createFileRoute } from "@tanstack/react-router";

import SignInPage from "@/features/Authentication/pages/SignInPage";

export const Route = createFileRoute("/_unauth/sign-in")({
  component: SignInPage,
});
