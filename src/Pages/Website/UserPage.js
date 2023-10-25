import { useContext } from "react";
import { User } from "../../Context/Context";
import Cookie from "cookie-universal";

function UserPage() {
  const userContext = useContext(User);
  const cookie = Cookie();
  return (
    <div className="user-page">
      <h1>User Page</h1>
      {cookie.get("cookieToken") && <p>{cookie.get("cookieToken")}</p>}
      {cookie.get("cookieName") && <p>{cookie.get("cookieName")}</p>}
    </div>
  );
}

export default UserPage;
