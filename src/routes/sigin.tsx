import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sigin")({
  component: SignIn,
});

function SignIn() {
  return <div className="p-2">Hello from SignIn!</div>;
}
