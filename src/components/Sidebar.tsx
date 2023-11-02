import Avatar from "@mui/material/Avatar";
import { useEffect, useState, useContext } from "react";
import { baseUrl } from "../app/shared";
import Link from "next/link";
import { ClientsContext } from "../context/clients.context";
import ReactDOM from "react-dom";

const Sidebar = () => {
  const [arrayVIPS, setArrayVIPS] = useState<any[]>([]);
  const [errorStatus, setErrorStatus] = useState();

  const { clients, setClients } = useContext(ClientsContext);

  useEffect(() => {
    //ritorna l'array di tutti i clienti di un SMM
    const id = localStorage.getItem("id");
    const url = baseUrl + "api/smmclients/653fb9e8e057ecf2b1716cde";
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("id_token"),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw response.status;
        }
        return response.json();
      })
      .then((data) => {
        setArrayVIPS(data);
      })
      .catch((error) => {
        setErrorStatus(error);
      });
  }, []);

  if (typeof window !== "undefined") {
    const boxfocus = document.querySelectorAll(".list");
    boxfocus.forEach((boxfocus) => {
      boxfocus.addEventListener("click", () => {
        document.querySelector(".focus")?.classList.remove("focus");
        boxfocus.classList.add("focus");
      });
    });
  }

  if (arrayVIPS) {
    if (errorStatus == 403) {
      return (
        <>
          <p>
            Non hai i diritti per accedere a questa sezione ✋🏻😡 <br /> Fai{" "}
            <Link href="/login" className="link">
              Log In
            </Link>{" "}
            con il tuo account da SMM.
          </p>
        </>
      );
    } else if (errorStatus == 500) {
      return (
        <aside className="sidebar">
          <p>Ehhh boh, errore sconosciuto 😶‍🌫️</p>
        </aside>
      );
    } else if (arrayVIPS.length == 0) {
      return (
        <aside className="sidebar">
          <ul>
            <li>
              <div className="box">
                <h3>Non hai clienti 😂</h3>
              </div>
            </li>
          </ul>
        </aside>
      );
    } else {
      return (
        <aside className="sidebar">
          <ul>
            {arrayVIPS.map((arrayVIP) => {
              const id = arrayVIP._id;
              function openClient() {
                setClients(id);
              }
              return (
                <li
                  key={arrayVIP.login}
                  tabIndex={0}
                  className="list"
                  onClick={openClient}
                >
                  <div className="box">
                    <Avatar alt={arrayVIP._id} src="/squealerimage.png" />
                    <h3>{arrayVIP.login}</h3>
                  </div>
                </li>
              );
            })}
          </ul>
        </aside>
      );
    }
  }
};
export default Sidebar;
