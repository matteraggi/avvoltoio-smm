import Dashboard from "../components/Dashboard";
import Sidebar from "../components/Sidebar";

const page = () => {
  return (
    <section className="homepage">
      <Sidebar />
      <Dashboard />
    </section>
  );
};

export default page;
