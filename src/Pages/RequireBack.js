import { Outlet } from "react-router-dom";
import Cookie from "cookie-universal";

function RequireBack() {
  const cookie = Cookie();
  return cookie.get("cookieToken") ? window.history.back() : <Outlet />;
}

export default RequireBack;
