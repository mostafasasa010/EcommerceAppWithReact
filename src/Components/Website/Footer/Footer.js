// Components Footer
function Footer() {
  return (
    <footer className="main-footer">
      <div className="container">
        <div>
          <div className="foot-one">
            <div className="top">
              <img src={require("../../../Imgs/Icon_Primary.png")} alt="Icon" />
              <h3>CLICON</h3>
            </div>
            <p className="gray">Customer Supports:</p>
            <p>{`(629) 555-0129`}</p>
            <p className="gray">
              4517 Washington Ave. Manchester, Kentucky 39495
            </p>
            <p>info@kinbo.com</p>
          </div>
          <div className="foot-two">
            <p>Top Category</p>
            <p className="gray">Computer & Laptop</p>
            <p className="gray">SmartPhone</p>
            <p className="gray">Headphone</p>
            <p className="gray">Camera & Photo</p>
            <p className="gray">TV & Homes</p>
          </div>
          <div className="foot-three">
            <p>Quick links</p>
            <p className="gray">Shop Product</p>
            <p className="gray">Shoping Cart</p>
            <p className="gray">Wishlist</p>
            <p className="gray">Compare</p>
            <p className="gray">Track Order</p>
            <p className="gray">Customer Help</p>
            <p className="gray">About Us</p>
          </div>
          <div className="foot-four">
            <p>Popular Tag</p>
            <div>
              <span>Game</span>
              <span>Iphone</span>
              <span>TV</span>
              <span>Asus Laptops</span>
              <span>Macbook</span>
              <span>SSD</span>
              <span>Graphics Card</span>
              <span>Power Bank</span>
              <span>Smart TV</span>
              <span>Speaker</span>
              <span>Tablet</span>
              <span>Microwave</span>
              <span>Samsung</span>
            </div>
          </div>
        </div>
      </div>
      <div className="foot">
        <p>
          Coding By <span>Mostafa</span> As Front and <span>Ahmed</span> As Back
          © 2023. Design by Templatecookie
        </p>
      </div>
    </footer>
  );
}

export default Footer;
