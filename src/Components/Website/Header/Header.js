import Logo from "./Logo";
import Search from "./Search";

function Header() {
  return (
    <header className="main-header">
      <Logo />
      <Search />
      <div className="right">
        <div className="nav-cart">
          <i className="ph ph-shopping-cart-simple"></i>
          <span>2</span>
        </div>
        <div className="nav-fav">
          <i className="ph ph-heart"></i>
          <span>3</span>
        </div>
        <i className="ph ph-user"></i>
      </div>
    </header>
  );
}

export default Header;
