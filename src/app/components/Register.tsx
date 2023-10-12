import { useState } from "react";

const Register = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlesubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="auth-form">
      <h1>Squealer SMM Registration 💦</h1>
      <form onSubmit={handlesubmit} className="form-box">
        <label htmlFor="username">Username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="username"
          placeholder="canny"
          id="username"
          name="username"
        ></input>
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="youremail@gmail.com"
          id="email"
          name="email"
        ></input>
        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="1234"
          id="password"
          name="password"
        ></input>
        <button type="submit" className="confirm-btn">
          Register
        </button>
      </form>
      <button
        onClick={() => props.onFormSwitch("login")}
        className="chang-auth"
      >
        You already have an account? Log in here!
      </button>
    </div>
  );
};

export default Register;
