import React from "react";

import TopBar from "@/components/layout/TopBar";

const PageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen items-center justify-start">
      <header className="grow-0 mt-2 w-full flex items-center justify-center">
        <TopBar />
      </header>
      <main className="grow w-full p-4 flex items-start justify-center">
        {children}
      </main>
    </div>
  );
};

export default PageLayout;
