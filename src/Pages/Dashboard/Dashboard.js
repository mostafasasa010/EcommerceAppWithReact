import { Outlet, useNavigate } from "react-router-dom";
import HeaderDash from "../../Components/Dashboard/HeaderDash";
import SideBarDash from "../../Components/Dashboard/SideBarDash";
import { useEffect } from "react";

function Dashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/dashboard/users");
  }, []);
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
