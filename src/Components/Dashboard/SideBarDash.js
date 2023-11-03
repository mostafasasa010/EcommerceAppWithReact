import { NavLink } from "react-router-dom";

function SideBarDash() {
  return (
    <div className="side-dash">
      <div>
        <ul>
          <li>
            <NavLink activeclassname="active" to="users">
              <i className="ph ph-users"></i>
              <span>Users</span>
            </NavLink>
          </li>
          <li>
            <NavLink activeclassname="active" to="products">
              <i className="ph ph-stack"></i>
              <span>Products</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBarDash;
