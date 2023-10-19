import { baseUrl } from "./shared";


//usarla automaticamente in un momento post login, perché i dati che restituisce ci servono per le altre chiamate
export const getUser = () => {
  const url = baseUrl + "api/account";

  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + localStorage.getItem("id_token"),
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      localStorage.setItem("id", data.id);
      console.log(localStorage);
    })
    .catch((error) => {
      console.log("Authorization failed : " + error.message);
    });
};

export const addSMM = () => {
  const id = localStorage.getItem("id");
  const url = baseUrl + "api/add-smm/" + id;

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + localStorage.getItem("id_token"),
    },
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .catch((error) => {
      console.log("Authorization failed : " + error.message);
    });
};

//usarla non al clic di un button ma quando carichiamo un determinato elemento della pagina (e gestione http status)
export const getSMMVIPs = () => {
  const id = localStorage.getItem("id");
  const url = baseUrl + "api/smmclients/" + id;
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + localStorage.getItem("id_token"),
    },
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      localStorage.setItem("data", data);
      console.log(localStorage);
    })
    .catch((error) => {
      console.log("Authorization failed : " + error.message);
    });
};

//postare da parte di un vip
export const postForVips = () => {
  const id = localStorage.getItem("");
  const url = baseUrl + "api/squeals-smm/" + id;

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer" + localStorage.getItem("id_token"),
    },
  })
  .then((response) => {
    console.log(response);
    return response.json();
  })
  .catch((error) => {
    console.log("Authorization failed : " + error.message);
  })
}

//vedere il feed di un VIP
export const vipFeed = () => {
  const id = localStorage.getItem("");
  const url = baseUrl + "api/squeal-list-smm/" + id;

  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer" + localStorage.getItem("id_token"),
    },
  })
  .then((response) => {
    console.log(response);
    return response.json();
  })
  .then((data) => {
    localStorage.setItem("data", data);
    console.log(localStorage);
  })
  .catch((error) => {
    console.log("Authorization failed : " + error.message);
  })
}