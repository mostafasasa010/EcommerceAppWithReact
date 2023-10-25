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
        </div>
      </div>
    </footer>
  );
}

export default Footer;
