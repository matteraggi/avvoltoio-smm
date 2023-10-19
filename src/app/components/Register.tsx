import { useState } from "react";
import { baseUrl } from "../shared";

export class Registration {
  constructor(
    public login: string,
    public email: string,
    public password: string,
    public langKey: string
  ) {}
}

const Register = (props) => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const langKey = "en";

  const [error, setError] = useState(false); //messaggio di errore
  const [registered, setRegistered] = useState(false); //si è registrato?

  const closeError = () => {
    setError(false);
  };
  const closeRegistered = () => {
    setRegistered(false);
  };

  const register = (e) => {
    e.preventDefault();
    const url = baseUrl + "api/register/smm";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login: login,
        email: email,
        password: password,
        langKey: langKey,
      }),
    }).then((response) => {
      if (!response.ok) {
        setError(true);
        setRegistered(false);
        setPassword("");
        setEmail("");
        setLogin("");
      } else {
        setRegistered(true);
        setError(false);
      }
      return response.json();
    });
  };

  return (
    <section className="register">
      {error ? (
        <div className="error">
          <span className="close" onClick={closeError} />
          <p className="error-text">
            La registrazione è fallita. Riprova con nuove credenziali.
          </p>
        </div>
      ) : (
        <div className="space"></div>
      )}
      {registered ? (
        <div className="registered">
          <span className="close" onClick={closeRegistered} />
          <p>
            <button
              onClick={() => props.onFormSwitch("login")}
              className="chang-auth registered-text"
            >
              Ti sei appena registrato! Log in here!
            </button>
          </p>
        </div>
      ) : (
        <div className="space"></div>
      )}
      <div className="auth-form">
        <h1>Squealer SMM Registration 💦</h1>
        <form onSubmit={register} className="form-box">
          <label htmlFor="login">Username</label>
          <input
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            type="login"
            placeholder="canny"
            id="login"
            name="login"
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
            Registrati e Paga
          </button>
        </form>
        <button
          onClick={() => props.onFormSwitch("login")}
          className="chang-auth"
        >
          You already have an account? Log in here!
        </button>
      </div>
    </section>
  );
};

export default Register;
