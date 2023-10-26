import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
// Context Files
import { User } from "../../Context/Context";

function UserPage() {
  const userContext = useContext(User);
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
      {cookie.get("cookieToken") && <p>{cookie.get("cookieToken")}</p>}
      {userContext.auth.name && <p>{userContext.auth.name}</p>}
    </div>
  );
}

export default UserPage;
