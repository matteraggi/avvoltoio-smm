"use client"; // This is a client component 👈🏽

import { useState } from "react";
import Login from "../../components/Login";
import Register from "../../components/Register";
import RegisterVip from "@/components/RegisterVip";

const AuthenticationPage = () => {
  const [currentForm, setCurrentForm] = useState("login");

  const toggleForm = (formName: string) => {
    setCurrentForm(formName);
  };

  if (currentForm == "login") {
    return (
      <div className="authpage">
        <Login onFormSwitch={toggleForm} />
      </div>
    );
  } else if (currentForm == "register") {
    return (
      <div className="authpage">
        <Register onFormSwitch={toggleForm} />
      </div>
    );
  } else if (currentForm == "registervip") {
    return (
      <div className="authpage">
        <RegisterVip onFormSwitch={toggleForm} />
      </div>
    );
  }
};

export default AuthenticationPage;
