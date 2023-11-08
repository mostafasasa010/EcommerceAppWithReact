import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookie from "cookie-universal";
// Components Files
import Loading from "../../../Components/Loading/Loading";
import TopHeader from "../../../Components/Website/Header/TopHeader";
import Header from "../../../Components/Website/Header/Header";
// Api Files
import { BaseApi, LOGIN, USER } from "../../../API/Api";
// Function Sign Up Page
function Login() {
  // React Dom
  const navigate = useNavigate();
  // User Data
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  // Error Handle
  const [err, setErr] = useState(false);
  const [errEmail, setErrEmail] = useState("");
  const [send, setSend] = useState(false);
  // Loading Handle
  const [loading, setLoading] = useState(false);
  // Cookie
  const cookie = new Cookie();
  // This Use Effect Because Set True When Accept Condition
  useEffect(() => {
    if (password.length > 7) {
      setSend(true);
    } else {
      setSend(false);
    }
  }, [password.length]);
  // This Function To Handle Submit Form
  async function handleSubmit(e) {
    e.preventDefault();
    // When On Submit Show Loading
    setLoading(true);
    setErr(true);
    const data = {
      email: email,
      password: password,
    };
    if (send) {
      try {
        const res = await axios.post(`${BaseApi}${USER}${LOGIN}`, data);
        // When Send To Data Done, Hidden Loading
        setLoading(false);
        // Access To Payload
        const payload = res.data.token.split(".")[1];
        const decodedPayload = atob(payload);
        const jsonPayload = JSON.parse(decodedPayload);
        // Set Data User To Cookies
        cookie.set("cookieToken", res.data.token);
        cookie.set("cookieName", jsonPayload.name);
        cookie.set("cookieId", jsonPayload.id);
        cookie.set("cookieEmail", data.email);
        cookie.set("cookieRole", jsonPayload.role);
        if (res.status === 200) {
          if (cookie.get("cookieRole") === "admin") {
            navigate("/dashboard/users");
          } else {
            navigate("/");
          }
        }
      } catch (err) {
        // When Error Send Data, Hidden Loading
        setLoading(false);
        setErrEmail(err.response.data.message);
      }
    } else {
      setLoading(false);
    }
  }
  return (
    <>
      {loading && <Loading />}
      <TopHeader />
      <Header />
      <div className="sign-up">
        <form onSubmit={handleSubmit}>
          <h1>Log In</h1>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {email === "" && err && <p>You Must Enter Your Email</p>}
            {errEmail && <p>{errEmail}</p>}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setpassword(e.target.value)}
              placeholder="8+ characters"
            />
            {password < 8 && err && (
              <p>Password Must Be Larger Than 7 Character</p>
            )}
          </div>
          <div>
            <input type="checkbox" id="check" required />
            <label htmlFor="check">
              Are you agree to Clicon <span>Terms of Condition</span> and{" "}
              <span>Privacy Policy.</span>
            </label>
          </div>
          <button type="submit">Log In</button>
          <p className="p-login">
            <i className="ph ph-hand"></i>
            If You Don't Have An Account <Link to="/signup">Sign Up Now.</Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
