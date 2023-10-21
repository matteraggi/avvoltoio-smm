"use client"; // This is a client component 👈🏽

import { useEffect } from "react";
import DashboardMain from "../components/DashboardMain";
import Sidebar from "../components/Sidebar";
import { baseUrl } from "../shared";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  useEffect(() => {
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
        if (!response.ok) {
          router.push("/login");
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("id", data.id);
      })
      .catch((error) => {
        console.log("Authorization failed : " + error.message);
      });
  }, []);

  return (
    <section className="homepage">
      <Sidebar />
      <DashboardMain />
    </section>
  );
};

export default page;
