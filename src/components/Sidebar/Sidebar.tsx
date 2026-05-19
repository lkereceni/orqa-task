import { useState } from "react";
import "./Sidebar.css";
import type { MenuItem } from "../../types";
import { FaBars, FaHome, FaUser } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { useAuth } from "../../hooks/useAuth";
import logo from "../../assets/orqa_logo.png";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useAuth();

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

  return (
    <div>
      <button
        className="menu-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
      >
        <FaBars />
      </button>

      {isOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        ></div>
      )}

      <nav className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="logo-container">
            <img className="logo-image" src={logo} alt="Orqa Logo" />
            <h1 className="logo-text">Orqa FPV</h1>
          </div>

          <button
            className="close-button"
            onClick={() => setIsOpen(false)}
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
                onClick={() => {
                  if (window.innerWidth < 768) {
                    setIsOpen(false);
                  }
                }}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="sidebar-footer">
          <a href="#" className="user-profile">
            <div className="avatar">
              <FaUser />
            </div>
            <div className="user-info">
              <p className="user-username">{user?.username}</p>
            </div>
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
