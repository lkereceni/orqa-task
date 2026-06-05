import "./Login.css";

import Card from "../../shared/components/Card/Card";
import { LoginForm } from "../../features/auth";

const Login = () => {
  return (
    <div className="login-container">
      <Card className="login-card-container">
        <LoginForm />
      </Card>
    </div>
  );
};

export default Login;
