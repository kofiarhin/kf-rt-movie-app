import { useState } from "react";
import useRegisterMutation from "../../hooks/useRegisterMutation";

// register page
const Register = () => {
  const [name, setName] = useState("test");
  const [email, setEmail] = useState("test6@gmail.com");
  const [password, setPassword] = useState("password");
  const { mutate, isLoading, error } = useRegisterMutation();
  console.log(error);

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
