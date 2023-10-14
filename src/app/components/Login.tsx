import { useState } from "react";
import { baseUrl } from "../shared";
import { useRouter } from "next/navigation";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const [error, setError] = useState(false); //messaggio di errore

  const closeError = () => {
    setError(false);
  };

  const getAuthenticationToken = (e) => {
    e.preventDefault();
    const url = baseUrl + "api/authenticate";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        rememberMe: rememberMe,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          setError(true);
          setPassword("");
          setRememberMe(false);
          setUsername("");
        } else {
          router.push("/");
        }
        //reindirizza verso home
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("id_token", data.id_token);
        console.log(localStorage);
      })
      .catch((error) => {
        console.log("Authorization failed : " + error.message);
        //stampa messaggio di errore
      });
  };

  return (
    <section className="login ">
      {error ? (
        <div className="error">
          <span className="close" onClick={closeError} />
          <p className="error-text">
            Le credenziali inserite non corrispondono a nessun account SMM.
          </p>
        </div>
      ) : (
        <div className="space"></div>
      )}
      <div className="auth-form">
        <h1>Squealer SMM Log In 💦</h1>
        <form onSubmit={getAuthenticationToken} className="form-box">
          <label htmlFor="username">Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="username"
            placeholder="canny"
            id="username"
            name="username"
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
          <div className="checkboxsection">
            <label htmlFor="rememberMe">Remember me</label>
            <input
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              className="checkbox"
            />
          </div>
          <button type="submit" className="confirm-btn">
            Log In
          </button>
        </form>
        <button
          onClick={() => props.onFormSwitch("register")}
          className="chang-auth"
        >
          Don't have an account? Register here!{" "}
        </button>
      </div>
    </section>
  );
};

export default Login;
