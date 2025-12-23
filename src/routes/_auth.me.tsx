import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/me")({
  component: Me,
});

function Me() {
  return <div className="p-2">Hello from Me!</div>;
}
