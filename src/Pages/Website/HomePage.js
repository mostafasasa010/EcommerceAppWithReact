import { Outlet } from "react-router-dom";
import Footer from "../../Components/Website/Footer/Footer";
import Header from "../../Components/Website/Header/Header";
import TopHeader from "../../Components/Website/Header/TopHeader";

function HomePage() {
  return (
    <div className="home-page">
      <TopHeader />
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
}

export default HomePage;
