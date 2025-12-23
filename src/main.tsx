import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@/amplify.ts";
import App from "./App.tsx";

import { ReactQueryProvider } from "@/providers/ReactQueryProvider.tsx";
import { AuthProvider } from "@/providers/AuthProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactQueryProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Suspense>
    </ReactQueryProvider>
  </StrictMode>
);
