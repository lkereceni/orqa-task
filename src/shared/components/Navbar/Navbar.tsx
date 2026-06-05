import { FaBars, FaSearch, FaUser } from "react-icons/fa";
import "./Navbar.css";
import { useAuth } from "../../../features/auth";

interface NavbarProps {
  onToggleSidebar: () => void;
  isSidebarOpen?: boolean;
}

const Navbar = ({ onToggleSidebar, isSidebarOpen }: NavbarProps) => {
  const { user } = useAuth();

  return (
    <header className="navbar">
      <div className="navbar-content">
        <button
          className="navbar-menu-toggle"
          onClick={onToggleSidebar}
          aria-label="Toggle navbar menu"
          aria-expanded={isSidebarOpen}
        >
          <FaBars />
        </button>

        <div className="navbar-left">
          <div className="search-container">
            <div className="search-input-wrapper">
              <FaSearch className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Search..."
                value={""}
                aria-label="search"
              />
            </div>
          </div>
        </div>
        <div className="navbar-right">
          <div className="user-profile-container">
            <button className="user-profile-button" onClick={() => {}}>
              <div className="user-avatar">
                <FaUser />
              </div>
              <div className="user-info">
                <span className="user-username">
                  {user?.username || "User"}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
