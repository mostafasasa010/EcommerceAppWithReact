import { Outlet } from "react-router-dom";
import HeaderDash from "../../Components/Dashboard/HeaderDash";
import SideBarDash from "../../Components/Dashboard/SideBarDash";

function Dashboard() {
  return (
    <div className="dashboard">
      <HeaderDash />
      <SideBarDash />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Dashboard;
