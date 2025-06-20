import { useState } from "react";
import useRegisterMutation from "../../hooks/useRegisterMutation";
import Spinner from "../../components/Spinner/Spinner";

// register page
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, isLoading, isPending, error } = useRegisterMutation();

  if (isPending) {
    return <Spinner />;
  }

  const handleRegister = (e) => {
    e.preventDefault();
    mutate({ name, email, password });
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleRegister} className="auth-form">
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <p className="error"> {error ? error.message : ""} </p>
        <button type="submit">Register</button>
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
