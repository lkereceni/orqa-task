import "./Dashboard.css";
import Card from "../../components/CoreComponents/Card/Card";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <div className="dashboard-grid">
        <Card className="empty-card" />
        <Card className="empty-card" />
        <Card className="empty-card" />
        <Card className="empty-card" />
      </div>
    </div>
  );
};

export default Dashboard;
