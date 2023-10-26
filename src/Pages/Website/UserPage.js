import { useContext } from "react";
import Cookie from "cookie-universal";
// Context Files
import { User } from "../../Context/Context";

function UserPage() {
  const userContext = useContext(User);
  const cookie = Cookie();
  return (
    <div className="user-page">
      <h1>User Page</h1>
      {cookie.get("cookieToken") && <p>{cookie.get("cookieToken")}</p>}
      {userContext.auth.name && <p>{userContext.auth.name}</p>}
    </div>
  );
}

export default UserPage;
