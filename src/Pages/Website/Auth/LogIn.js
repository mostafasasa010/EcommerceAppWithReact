import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookie from "cookie-universal";
// Context Files
import { User } from "../../../Context/Context";
// Components Files
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
  // Context
  const userContext = useContext(User);
  // Cookie
  const cookie = new Cookie();
  // This Use Effect Because Set True When Accept Condition
  useEffect(() => {
    if (password.length > 7) {
      setSend(true);
    } else {
      setSend(false);
    }
  }, [err]);
  // This Function To Handle Submit Form
  async function handleSubmit(e) {
    e.preventDefault();
    setErr(true);
    const data = {
      email: email,
      password: password,
    };
    if (send) {
      try {
        const res = await axios.post(`${BaseApi}${USER}${LOGIN}`, data);
        // Set Data User To Cookies
        cookie.set("cookieToken", res.data.token);
        cookie.set("cookieEmail", data.email);
        // Get Data User From Cookies Then Set To Context Store
        userContext.setAuth({
          token: cookie.get("cookieToken"),
          email: cookie.get("cookieEmail"),
        });
        if (res.status === 200) {
          navigate("/");
        }
      } catch (err) {
        setErrEmail(err.response.data.message);
      }
    }
  }
  return (
    <>
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
        </form>
      </div>
    </>
  );
}

export default Login;
