import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
import Logout from "./Auth/Logout";

function UserPage() {
  const cookie = Cookie();
  const navigate = useNavigate();
  useEffect(() => {
    if (!cookie.get("cookieToken")) {
      navigate("/signup");
    }
  }, []);
  return (
    <div className="user-page">
      <div className="container">
        <div className="main-section">
          {cookie.get("cookieRole") === "admin" ? (
            <h1>Admin Page</h1>
          ) : (
            <h1>User Page</h1>
          )}
          <p>
            Hello, <span>{cookie.get("cookieName")}</span>
          </p>
          {cookie.get("cookieToken") && <Logout />}
        </div>
      </div>
    </div>
  );
}

export default UserPage;
