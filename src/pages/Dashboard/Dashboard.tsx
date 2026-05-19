import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user?.username}!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
