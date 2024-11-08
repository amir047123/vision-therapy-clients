import Navbar from "../../../Component/WebNavbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../../../Component/Footer/Footer";

const Main = () => {
  return (
    <>
      <Navbar></Navbar>
      <Outlet />
      <Footer />
    </>
  );
};

export default Main;
