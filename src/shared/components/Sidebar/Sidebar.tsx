import "./Sidebar.css";
import type { MenuItem } from "../../../types";
import { FaCog, FaHome, FaUser } from "react-icons/fa";
import { FaArrowRightFromBracket, FaX } from "react-icons/fa6";
import logo from "../../../assets/orqa_logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../features/auth";

interface SidebarProps {
  isSidebarOpen: boolean;
  onSidebarStateChange: (isOpen: boolean) => void;
}

const Sidebar = ({ isSidebarOpen, onSidebarStateChange }: SidebarProps) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const menuItems: MenuItem[] = [
    {
      id: 1,
      label: "Dashboard",
      icon: <FaHome />,
      url: "/dashboard",
    },
    {
      id: 2,
      label: "User Management",
      icon: <FaUser />,
      url: "/user-management",
    },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      onSidebarStateChange(false);
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout error: ", error);
    }
  };

  const handleNavLinkClick = () => {
    if (window.innerWidth < 1024) {
      onSidebarStateChange(false);
    }
  };

  const handleCloseSidebar = () => {
    onSidebarStateChange(false);
  };

  return (
    <>
      {isSidebarOpen && (
        <div
          className="sidebar-backdrop"
          onClick={handleCloseSidebar}
          aria-hidden="true"
        ></div>
      )}

      <nav className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="logo-container">
            <img className="logo-image" src={logo} alt="Orqa Logo" />
            <h1 className="logo-text">Orqa FPV</h1>
          </div>

          <button
            className="close-button"
            onClick={handleCloseSidebar}
            aria-label="Close navigation menu"
          >
            <FaX />
          </button>
        </div>

        <ul className="nav-list">
          {menuItems.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.url}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
                onClick={handleNavLinkClick}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="sidebar-footer">
          <ul className="nav-list">
            <li>
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
                onClick={handleNavLinkClick}
              >
                <span className="nav-icon">
                  <FaCog />
                </span>
                <span className="nav-label">Settings</span>
              </NavLink>
            </li>
            <li>
              <button className="nav-link" onClick={handleLogout}>
                <span className="nav-icon">
                  <FaArrowRightFromBracket />
                </span>
                <span className="nav-label">Log Out</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
