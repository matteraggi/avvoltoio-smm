import Avatar from "@mui/material/Avatar";
import { useEffect, useState } from "react";
import { baseUrl } from "../app/shared";
import Link from "next/link";

const Sidebar = () => {
  const [arrayVIPS, setArrayVIPS] = useState([]);
  const [errorStatus, setErrorStatus] = useState();

  useEffect(() => {
    //ritorna l'array di tutti i clienti di un SMM
    //usarla non al clic di un button ma quando carichiamo un determinato elemento della pagina (e gestione http status)
    const id = localStorage.getItem("id");
    const url = baseUrl + "api/smmclients/" + id;
    //arrayVIPS.current =
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

  console.log(arrayVIPS);

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
          {arrayVIPS.map((arrayVIPS) => {
            return (
              <li key={arrayVIPS} tabIndex={0}>
                <div className="box">
                  <Avatar alt={arrayVIPS} src={arrayVIPS} />
                  <h3>{arrayVIPS}</h3>
                </div>
              </li>
            );
          })}
        </ul>
      </aside>
    );
  }
};
export default Sidebar;
