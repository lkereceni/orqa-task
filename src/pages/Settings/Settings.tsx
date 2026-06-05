import "./Settings.css";
import { useState } from "react";
import Card from "../../shared/components/Card/Card";
import { useAuth } from "../../features/auth";
import { useApiError } from "../../shared/hooks/useApiError";
import ErrorToast from "../../shared/components/ErrorToast/ErrorToast";

const Settings = () => {
  const { user } = useAuth();
  const { error, handleApiError, clearError } = useApiError();

  const [isLoading, setIsLoading] = useState(false);

  const handleSaveSettings = async () => {
    setIsLoading(true);

    try {
      await new Promise((r) => setTimeout(r, 2000));

      throw new Error("Failed to update settings...");
    } catch (err) {
      handleApiError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h2>Settings</h2>
      <p>Update your username and password</p>

      <div className="settings-container">
        <Card className="settings-card">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={user?.username || ""}
              placeholder="Enter your username"
            />
          </div>
          <button
            className="settings-save-button"
            disabled={isLoading}
            onClick={handleSaveSettings}
          >
            Save Changes
          </button>
        </Card>

        {error && <ErrorToast message={error.message} onClose={clearError} />}
      </div>
    </>
  );
};

export default Settings;
