import { Outlet } from "react-router-dom";
import Footer from "../../Components/Website/Footer/Footer";
import Header from "../../Components/Website/Header/Header";
import TopHeader from "../../Components/Website/Header/TopHeader";
import Cookie from "cookie-universal";
import Logout from "./Auth/Logout";

function HomePage() {
  const cookie = Cookie();
  return (
    <div className="home-page">
      <TopHeader />
      <Header />
      <Outlet />
      {cookie.get("cookieToken") && <Logout />}
      {/* <Footer /> */}
    </div>
  );
}

export default HomePage;
