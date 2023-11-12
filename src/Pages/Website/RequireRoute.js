import Cookie from "cookie-universal";
import { Navigate, Outlet } from "react-router-dom";
function RequireRoute() {
  const cookie = Cookie();
  return cookie.get("cookieRole") === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace={true} />
  );
}

export default RequireRoute;
