import Cookie from "cookie-universal";
function Logout() {
  const cookie = Cookie();
  function handleLogout() {
    cookie.removeAll();
    window.location.pathname = "/";
  }
  return (
    <button className="log-out btn-2" onClick={handleLogout}>
      Logout
    </button>
  );
}

export default Logout;
