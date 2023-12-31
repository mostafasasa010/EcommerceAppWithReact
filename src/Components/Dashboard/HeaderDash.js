import { Link, NavLink } from "react-router-dom";

function HeaderDash() {
  function handleClick() {
    document.querySelector(".menu-phones").classList.toggle("active");
  }
  function handleClickLink() {
    document.querySelector(".menu-phones").classList.remove("active");
  }
  return (
    <>
      <header className="main-header dash">
        <div className="container">
          <div>
            <Link to="/">
              <div className="logo">
                <img src={require("../../Imgs/Icon.png")} alt="Logo" />
                <h1>CLICON</h1>
              </div>
            </Link>
            <div className="search-header">
              <input placeholder="Search for anything..." />
              <i className="ph ph-magnifying-glass"></i>
            </div>
            <div className="right">
              <i onClick={handleClick} className="ph ph-list second"></i>
              <NavLink activeclassname="active" to="/cart" className="nav-cart">
                <i className="ph ph-shopping-cart-simple"></i>
                <span>2</span>
              </NavLink>
              <NavLink activeclassname="active" to="/fav" className="nav-fav">
                <i className="ph ph-heart"></i>
                <span>3</span>
              </NavLink>
              <NavLink activeclassname="active" to="/user" className="nav-user">
                <i className="ph ph-user"></i>
              </NavLink>
            </div>
          </div>
        </div>
      </header>
      <ul className="menu-phones second">
        <li>
          <NavLink activeclassname="active" to="/" onClick={handleClickLink}>
            <i className="ph ph-house"></i>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            activeclassname="active"
            to="/dashboard/users"
            onClick={handleClickLink}
          >
            <i className="ph ph-heart"></i>
            Users
          </NavLink>
        </li>
        <li>
          <NavLink
            activeclassname="active"
            to="/dashboard/products"
            onClick={handleClickLink}
          >
            <i className="ph ph-user"></i>
            Products
          </NavLink>
        </li>
        <li>
          <NavLink activeclassname="active" to="addProduct">
            <i className="ph ph-plus"></i>
            <span>Add Product</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            activeclassname="active"
            to="/dashboard/categories"
            onClick={handleClickLink}
          >
            <i className="ph ph-cards"></i>
            Categories
          </NavLink>
        </li>
        <li>
          <NavLink
            activeclassname="active"
            to="/dashboard/addCategory"
            onClick={handleClickLink}
          >
            <i className="ph ph-plus"></i>
            Add Category
          </NavLink>
        </li>
      </ul>
    </>
  );
}

export default HeaderDash;
