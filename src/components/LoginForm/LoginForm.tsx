import React, { useState } from "react";
import "./LoginForm.css";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, isLoading } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(username, password);
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error: ", error);
      setError("Login failed. Please try again.");
    }
  };

  return (
    <form className="login-form-container" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        autoComplete="off"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={isLoading}
        required
      />
      <input
        type="password"
        placeholder="Password"
        autoComplete="off"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoading}
        required
      />
      {error && <p>{error}</p>}
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
