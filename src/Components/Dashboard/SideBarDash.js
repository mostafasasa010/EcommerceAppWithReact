import { NavLink } from "react-router-dom";

function SideBarDash() {
  return (
    <div className="side-dash">
      <div>
        <ul>
          <li>
            <NavLink activeclassname="active" to="users">
              <i className="ph ph-users"></i>Users
            </NavLink>
          </li>
          <li>
            <NavLink activeclassname="active" to="products">
              <i className="ph ph-stack"></i>Products
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBarDash;
