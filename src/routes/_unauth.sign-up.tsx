import { createFileRoute } from "@tanstack/react-router";

import SignUpPage from "@/features/Authentication/pages/SignUpPage";

export const Route = createFileRoute("/_unauth/sign-up")({
  component: SignUpPage,
});
