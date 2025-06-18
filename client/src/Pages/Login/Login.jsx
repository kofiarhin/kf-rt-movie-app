import { useState } from "react";
import useLoginmutation from "../../hooks/useLoginMutation";
import Spinner from "../../components/Spinner/Spinner";

const Login = () => {
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("password");
  const { mutate, isLoading, isSuccess, error } = useLoginmutation();

  if (isLoading) {
    return <Spinner />;
  }

  const handleLogin = (e) => {
    e.preventDefault();
    mutate({ email, password });
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleLogin} className="auth-form">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <p className="error"> {error ? "Invalid Credentials" : ""} </p>
        <button type="submit">Login</button>
        <p>
          Don't have an account? <a href="/register">Register</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
