import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";

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
      <h1>User Page</h1>
      {cookie.get("cookieName") && cookie.get("cookieRole") === "user" ? (
        <p>{cookie.get("cookieName")}</p>
      ) : cookie.get("cookieName") === "" &&
        cookie.get("cookieRole") === "user" ? (
        <p>User</p>
      ) : cookie.get("cookieName") === "" &&
        cookie.get("cookieRole") === "admin" ? (
        <p>Admin</p>
      ) : (
        <p>{cookie.get("cookieName")}</p>
      )}
    </div>
  );
}

export default UserPage;
