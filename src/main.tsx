/// <reference types="vitest/browser" />

import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";

import "@/index.css";
import "@/amplify.ts";

import useAuth from "@/hooks/use-auth";

import { ReactQueryProvider } from "@/providers/ReactQueryProvider.tsx";
import { AuthProvider } from "@/providers/AuthProvider.tsx";

import { router } from "@/router.ts";
import { RouterProvider } from "@tanstack/react-router";

const RoutedApp = () => {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactQueryProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <AuthProvider>
          <RoutedApp />
        </AuthProvider>
      </Suspense>
    </ReactQueryProvider>
  </StrictMode>
);
