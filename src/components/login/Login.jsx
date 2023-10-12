import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPasssword] = useState("");
  const { user, isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const loginHandler = (e) => {
    e.preventDefault();
    if (email && password) login(email, password);
    console.log(user);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, user]);

  return (
    <div className="loginContainer">
      <h2>Login</h2>
      <form className="form">
        <div className="formControl">
          <label htmlFor="email">Email : </label>
          <input
            type="text"
            name="email"
            id="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="formControl">
          <label htmlFor="password">Password : </label>
          <input
            type="password"
            name="password"
            required
            id="password"
            onChange={(e) => setPasssword(e.target.value)}
          />
        </div>
        <button className="btn btn--primary" onClick={(e) => loginHandler(e)}>
          login
        </button>
      </form>
    </div>
  );
};

export default Login;
