import { useNavigate } from "react-router-dom";
import HeaderDash from "../../Components/Dashboard/HeaderDash";

function Err404() {
  const navigate = useNavigate();
  return (
    <>
      <HeaderDash />
      <div className="err-404">
        <div>
          <img src={require("../../Imgs/error.png")} alt="Pic Error 404" />
          <p className="err">404, Page not founds</p>
          <p className="disc">
            Something went wrong. It’s look that your requested could not be
            found. It’s look like the link is broken or the page is removed.
          </p>
          <button onClick={() => navigate("/")} className="btn">
            <i className="ph ph-house"></i>
            Go To Home
          </button>
        </div>
      </div>
    </>
  );
}

export default Err404;
