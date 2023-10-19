"use client"; // This is a client component 👈🏽

import React, { useEffect } from 'react';
import DashboardMain from "../components/DashboardMain";
import Sidebar from "../components/Sidebar";
import { getUser } from "../service";


const page = () => {
  useEffect(() => {
    getUser();
 }, []);

  return (
    <section className="homepage">
      <Sidebar />
      <DashboardMain />
    </section>
  );
};

export default page;
