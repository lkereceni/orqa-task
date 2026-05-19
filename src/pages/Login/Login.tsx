import "./Login.css";

import Card from "../../components/CoreComponents/Card/Card";
import LoginForm from "../../components/LoginForm/LoginForm";

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
