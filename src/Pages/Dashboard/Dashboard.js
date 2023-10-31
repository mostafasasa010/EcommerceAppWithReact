import { Outlet } from "react-router-dom";
import HeaderDash from "../../Components/Dashboard/HeaderDash";
import SideBarDash from "../../Components/Dashboard/SideBarDash";
import Footer from "../../Components/Website/Footer/Footer";

function Dashboard() {
  return (
    <div className="dashboard">
      <HeaderDash />
      <SideBarDash />
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
}

export default Dashboard;
