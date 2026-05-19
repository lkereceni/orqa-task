import "./MainLayout.css";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="main-layout">
      <Sidebar />
      <div className="layout-content">
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
