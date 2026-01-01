/// <reference types="vitest/browser" />

import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";

import "@/index.css";
import "@/amplify.ts";

import { ReactQueryProvider } from "@/providers/ReactQueryProvider.tsx";
import { AuthProvider } from "@/providers/AuthProvider.tsx";

import { RoutedApp } from "@/app.tsx";

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
