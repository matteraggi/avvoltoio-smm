import { useState } from "react";
import { baseUrl } from "../app/shared";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { LoggedContext } from "@/context/logged.context";

const Login = (props: any) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  const { logged, setLogged } = useContext(LoggedContext);

  const [error, setError] = useState(false); //messaggio di errore

  const closeError = () => {
    setError(false);
  };

  const getAuthenticationToken = (e: any) => {
    e.preventDefault();
    const url = baseUrl + "api/authenticate/smm";

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
          router.back();
        }
        //reindirizza verso home
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("id_token", data.id_token);
        setLogged(Math.random());
      })
      .catch((error) => {
        console.log("Authorization failed : " + error.message);
        //stampa messaggio di errore
      });
  };

  return (
    <section>
      {error ? (
        <div className="error">
          <span className="close" onClick={closeError} />
          <p className="error-text">
            Le credenziali inserite non corrispondono a nessun account SMM o
            VIP.
          </p>
        </div>
      ) : (
        <div className="space"></div>
      )}
      <div className="flex-col justify-center align-middle border-2 p-8 rounded-2xl border-white">
        <h1>Squealer SMM Log In</h1>
        <form onSubmit={getAuthenticationToken} className="flex flex-col justify-center">
          <label htmlFor="username">Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="username"
            placeholder="canny"
            id="username"
            name="username"
            className="w-auto"
          ></input>
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="1234"
            id="password"
            name="password"
            className="w-auto"

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
          <button type="submit" className="confirm-btn w-auto">
            Log In
          </button>
        </form>
        <p className="chang-auth mt-3">Non hai un Account? Registrati: </p>
        <div className="flex gap-2 pt-1">
          <button
            className="border-2 border-[#4b2ca0] rounded-2xl bg-white text-[#4b2ca0] p-2 font-semibold"
            onClick={() => props.onFormSwitch("register")}
          >
            Come SMM
          </button>
          <button
            className="border-2 border-[#4b2ca0] rounded-2xl bg-white text-[#4b2ca0] p-2 font-semibold"
            onClick={() => props.onFormSwitch("registervip")}
          >
            Come VIP
          </button>
        </div>
      </div>
    </section>
  );
};

export default Login;
