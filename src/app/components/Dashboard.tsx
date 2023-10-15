import SidebarMobile from "./SidebarMobile";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <SidebarMobile />
      <div>
        <h2>Maurizio Benazzi</h2>
      </div>
      <div className="stats-container">
        <div className="card">a</div>
        <div className="card">b</div>
        <div className="card">c</div>
      </div>
    </div>
  );
};

export default Dashboard;
