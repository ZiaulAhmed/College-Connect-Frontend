import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-shell">
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className={`app-body ${sidebarOpen ? "sidebar-open" : ""}`}>
        <Sidebar />
        <main className="app-main">
          <div className="app-main-inner">{children}</div>
        </main>
      </div>
    </div>
  );
}
