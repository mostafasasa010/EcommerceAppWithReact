import Cookie from "cookie-universal";
function Logout() {
  const cookie = Cookie();
  function handleLogout() {
    cookie.remove("cookieToken");
    window.location.pathname = "/";
  }
  return (
    <button className="log-out" onClick={handleLogout}>
      Logout
    </button>
  );
}

export default Logout;
