import "./MainLayout.css";
import Sidebar from "../shared/components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "../shared/components/Navbar/Navbar";
import { useState } from "react";

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="main-layout">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        onSidebarStateChange={setIsSidebarOpen}
      />
      <div className="layout-content">
        <Navbar
          onToggleSidebar={handleToggleSidebar}
          isSidebarOpen={isSidebarOpen}
        />
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
