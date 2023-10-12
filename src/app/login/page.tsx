"use client"; // This is a client component 👈🏽

import { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";

const AuthenticationPage = () => {
  const [currentForm, setCurrentForm] = useState("login");

  const toggleForm = (formName : string) => {
    setCurrentForm(formName);
  };

  return <div className="authpage"> {currentForm == "login" ? <Login onFormSwitch={toggleForm}/> : <Register onFormSwitch={toggleForm}/>}</div>;
};

export default AuthenticationPage;
