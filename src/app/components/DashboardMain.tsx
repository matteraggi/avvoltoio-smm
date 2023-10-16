import Link from "next/link";
import SidebarMobile from "./SidebarMobile";

const DashboardMain = () => {
  return (
    <div className="dashboard">
      <SidebarMobile />
      <div>
        <h2>Maurizio Benazzi</h2>
      </div>
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