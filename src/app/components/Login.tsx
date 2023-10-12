import { useState } from "react";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handlesubmit = (e) => {
    e.preventDefault();
    console.log(email);
  };

  return (
    <div className="auth-form">
      <h1>Squealer Log In 💦</h1>
      <form onSubmit={handlesubmit} className="form-box">
      <label htmlFor="username">Username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="username"
          placeholder="fattomenico"
          id="username"
          name="username"
        ></input>
        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="secret password"
          id="password"
          name="password"
        ></input>
        <button type="submit" className="confirm-btn">Log In</button>
      </form>
      <button onClick={() => props.onFormSwitch('register')} className="chang-auth">Don't have an account? Register here! </button>
    </div>
  );
};

export default Login;
