import { useState } from "react";
import { baseUrl } from "../app/shared";

export class Registration {
  constructor(
    public login: string,
    public email: string,
    public password: string,
    public langKey: string
  ) {}
}

const Register = (props: any) => {
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

  const register = (e: any) => {
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
    <section className="p-4">
      {error ? (
        <div className="error">
          <span className="close" onClick={closeError} />
          <p className="error-text">
            La registrazione è fallita. Riprova con nuove credenziali.
          </p>
        </div>
      ) : registered ? (
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
      <div className="flex-col justify-center align-middle border-2 p-8 rounded-2xl border-white">
        <h1 className="text-2xl">Squealer SMM Registration</h1>
        <form onSubmit={register} className="flex flex-col justify-center">
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
          className="border-2 border-[#4b2ca0] rounded-2xl bg-white text-[#4b2ca0] p-2 font-semibold"
        >
          Hai già un Account? Fai il Log in qui!
        </button>
      </div>
    </section>
  );
};

export default Register;
