import { baseUrl } from "./shared";

//ritorna l'array con tutti i SMM. Qui solo per testing
export const getAllSMM = () => {
  const url = baseUrl + "api/smmvips";

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
      localStorage.setItem("arraysmm", JSON.stringify(data));
      var arraySMM = JSON.parse(localStorage.getItem("arraysmm") || "{}");
      var smm1id = arraySMM[0].userId;
      console.log(smm1id);
    })
    .catch((error) => {
      console.log("Authorization failed : " + error.message);
    });
};

//aggiungersi alla lista clienti di un SMM. Qui solo per testing
export const addSMM = () => {
  var arraySMM = JSON.parse(localStorage.getItem("arraysmm") || "{}");
  var smm1id = arraySMM[0]._id;
  const id = localStorage.getItem("id");
  const url = baseUrl + "api/add-smm/" + smm1id;

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + localStorage.getItem("id_token"),
    },
  })
    .then((response) => {
      return response.json();
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
      return response.json();
    })
    .catch((error) => {
      console.log("Authorization failed : " + error.message);
    });
};

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
      return response.json();
    })
    .then((data) => {
      localStorage.setItem("data", data);
    })
    .catch((error) => {
      console.log("Authorization failed : " + error.message);
    });
};
