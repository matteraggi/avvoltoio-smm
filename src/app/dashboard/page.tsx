import DashboardMain from "../components/DashboardMain";
import Sidebar from "../components/Sidebar";

const page = () => {
  return (
    <section className="homepage">
      <Sidebar />
      <DashboardMain />
    </section>
  );
};

export default page;
