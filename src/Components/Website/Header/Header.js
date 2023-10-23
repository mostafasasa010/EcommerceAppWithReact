import { Link } from "react-router-dom";
import Logo from "./Logo";
import Search from "./Search";

function Header() {
  return (
    <header className="main-header">
      <div className="container">
        <div>
          <Link to="/">
            <Logo />
          </Link>
          <Search />
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

export default Header;
