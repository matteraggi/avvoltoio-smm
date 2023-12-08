import Navbar from "@/components/Navbar";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const page = () => {
  return (
    <div>
      <Navbar />
      <ToastContainer
        transition={Zoom}
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="colored"
      />
      profile
    </div>
  );
};

export default page;
