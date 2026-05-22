import { BrokenSignalDrone } from "../../assets/BrokenSignalDrone";
import "./NotFound.css";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="not-found-code">404</div>
        <BrokenSignalDrone />
        <p className="not-found-description">
          Whoops, looks like your drone lost signal.
        </p>
        <div className="not-found-actions">
          <button className="btn-action btn-secondary" onClick={handleGoBack}>
            Go Back
          </button>
          <button className="btn-action" onClick={handleGoDashboard}>
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
