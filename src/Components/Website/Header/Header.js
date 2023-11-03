import { Link, NavLink } from "react-router-dom";
import Cookie from "cookie-universal";

// Componente Header
function Header() {
  const cookie = Cookie();
  function handleClick() {
    document.querySelector(".menu-phones").classList.toggle("active");
  }
  function handleClickLink() {
    document.querySelector(".menu-phones").classList.remove("active");
  }
  return (
    <>
      <header className="main-header">
        <div className="container">
          <div>
            <Link to="/">
              <div className="logo">
                <img src={require("../../../Imgs/Icon.png")} alt="Logo" />
                <h1>CLICON</h1>
              </div>
            </Link>
            <div className="search-header">
              <input placeholder="Search for anything..." />
              <i className="ph ph-magnifying-glass"></i>
            </div>
            <div className="right">
              {cookie.get("cookieRole") === "admin" && (
                <Link className="btn-dashboard" to="/dashboard">
                  <i className="ph ph-align-bottom"></i>
                  Dashboard
                </Link>
              )}
              <i onClick={handleClick} className="ph ph-list"></i>
              <Link to="/cart" className="nav-cart">
                <i className="ph ph-shopping-cart-simple"></i>
                <span>2</span>
              </Link>
              <Link to="/fav" className="nav-fav">
                <i className="ph ph-heart"></i>
                <span>3</span>
              </Link>
              <Link to="/user" className="nav-user">
                <i className="ph ph-user"></i>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <ul className="menu-phones">
        <li>
          <NavLink activeclassname="active" to="/fav" onClick={handleClickLink}>
            <i className="ph ph-heart"></i>
            Fav Products
          </NavLink>
        </li>
        <li>
          <NavLink
            activeclassname="active"
            to="/user"
            onClick={handleClickLink}
          >
            <i className="ph ph-user"></i>
            Account Page
          </NavLink>
        </li>
        <li>
          {cookie.get("cookieRole") === "admin" && (
            <NavLink activeclassname="active" to="/dashboard">
              <i className="ph ph-align-bottom"></i>
              Dashboard
            </NavLink>
          )}
        </li>
      </ul>
    </>
  );
}

export default Header;
