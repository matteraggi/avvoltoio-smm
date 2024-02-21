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
      <div className="login flex h-screen justify-center w-full align-middle ">
        <Login onFormSwitch={toggleForm} />
      </div>
    );
  } else if (currentForm == "register") {
    return (
      <div className="flex h-screen justify-center align-middle login w-full">
        <Register onFormSwitch={toggleForm} />
      </div>
    );
  } else if (currentForm == "registervip") {
    return (
      <div className="flex h-screen justify-center align-middle login w-full">
        <RegisterVip onFormSwitch={toggleForm} />
      </div>
    );
  }
};

export default AuthenticationPage;
