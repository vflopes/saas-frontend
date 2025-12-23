import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { type AuthContextValue } from "@/providers/AuthContext";

const RootLayout = () => (
  <>
    <div className="p-2 flex gap-2">
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>{" "}
      <Link to="/about" className="[&.active]:font-bold">
        About
      </Link>
      <Link to="/me" className="[&.active]:font-bold">
        Me
      </Link>
    </div>
    <hr />
    <Outlet />
    <TanStackRouterDevtools />
  </>
);

interface RootContext {
  auth?: AuthContextValue;
}

export const Route = createRootRouteWithContext<RootContext>()({
  component: RootLayout,
});
