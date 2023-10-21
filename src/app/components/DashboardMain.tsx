"use client"; // This is a client component 👈🏽

import Link from "next/link";
import SidebarMobile from "./SidebarMobile";
import { addSMM } from "../service";

const DashboardMain = () => {
  return (
    <div className="dashboard">
      <SidebarMobile />
      <div>
        <h2>Maurizio Benazzi</h2>
      </div>
      <button onClick={addSMM}>add a SMM!! </button>
      <div className="stats-container">
        <Link href="/squeal">
          <div className="card card-1">
            <h3>SQUEAL</h3>
          </div>
        </Link>
        <Link href="/feed">
          <div className="card card-1">
            <h3>FEED</h3>
          </div>
        </Link>
        <Link href="/trend">
          <div className="card card-1">
            <h3>TREND</h3>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default DashboardMain;
