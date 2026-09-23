import { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen">
        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Main Area */}
        <div className="flex min-w-0 flex-1 flex-col">
          <Header onMenuClick={() => setSidebarOpen(true)} />

          <main className="flex-1 p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Overlay */}
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close navigation"
          />

          {/* Drawer */}
          <div className="relative h-full w-72">
            <div className="h-full">
              <Sidebar mobile onNavigate={() => setSidebarOpen(false)} />
            </div>
          </div>
          {/* <div className="relative h-full w-72">
            <div className="h-full">
              <Sidebar />
            </div>
          </div> */}
        </div>
      )}
    </div>
  );
}

export default AppLayout;
