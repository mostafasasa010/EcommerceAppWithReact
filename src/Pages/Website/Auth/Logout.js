import Cookie from "cookie-universal";
function Logout() {
  const cookie = Cookie();
  function handleLogout() {
    cookie.remove("cookieToken");
    cookie.remove("cookieName");
    cookie.remove("cookieEmail");
    window.location.pathname = "/";
  }
  return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;
