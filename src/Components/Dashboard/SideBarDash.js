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
          <li>
            <NavLink activeclassname="active" to="addCategory">
              <i className="ph ph-plus"></i>
              <span>Add Category</span>
            </NavLink>
          </li>
          <li>
            <NavLink activeclassname="active" to="categories">
              <i className="ph ph-cards"></i>
              <span>Categories</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBarDash;
