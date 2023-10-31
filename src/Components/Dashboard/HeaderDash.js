import { Link } from "react-router-dom";

function HeaderDash() {
  return (
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
  );
}

export default HeaderDash;
