import { Outlet } from "react-router-dom";
import Footer from "../../Components/Website/Footer/Footer";
import Header from "../../Components/Website/Header/Header";
import TopHeader from "../../Components/Website/Header/TopHeader";
import { useContext } from "react";
import { User } from "../../Context/Context";

function HomePage() {
  const userContext = useContext(User);
  return (
    <div className="home-page">
      <TopHeader />
      <Header />
      <Outlet />
      <div className="home-page">
        {/* {userContext.auth && <p>{userContext.userData.name}</p>} */}
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
