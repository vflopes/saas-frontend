import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";

import "@/index.css";
import "@/amplify.ts";

import { ReactQueryProvider } from "@/providers/ReactQueryProvider.tsx";
import { AuthProvider } from "@/providers/AuthProvider.tsx";

import { router } from "@/router.ts";
import { RouterProvider } from "@tanstack/react-router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactQueryProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </Suspense>
    </ReactQueryProvider>
  </StrictMode>
);
