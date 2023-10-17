import { baseUrl } from "./shared";

const getSMMVIPs = () => {

    const url = baseUrl + "api/addsmm";

  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      //localStorage.setItem("", );
      console.log(localStorage);
    })
    .catch((error) => {
      console.log("Authorization failed : " + error.message);
      //stampa messaggio di errore
    });
};