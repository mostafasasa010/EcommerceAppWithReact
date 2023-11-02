import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookie from "cookie-universal";
// Components Files
import Loading from "../../../Components/Loading/Loading";
import TopHeader from "../../../Components/Website/Header/TopHeader";
import Header from "../../../Components/Website/Header/Header";
// Api Files
import { BaseApi, SIGNUP, USER } from "../../../API/Api";
// Function Sign Up Page
function SignUp() {
  // React Dom
  const navigate = useNavigate();
  // User Data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [cPassword, setcPassword] = useState("");
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
    if (name.length > 1 && password.length > 7 && cPassword === password) {
      setSend(true);
    } else {
      setSend(false);
    }
  }, [cPassword, name.length, password]);
  // This Function To Handle Submit Form
  async function handleSubmit(e) {
    e.preventDefault();
    // When On Submit Show Loading
    setLoading(true);
    setErr(true);
    const data = {
      name: name,
      email: email,
      password: password,
      passwordConfirm: cPassword,
    };
    if (send) {
      try {
        const res = await axios.post(`${BaseApi}${USER}${SIGNUP}`, data);
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
        if (res.status === 201) {
          navigate("/");
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
          <h1>Sign Up</h1>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
            {name.length < 2 && err && (
              <p>User Name Must Be Larger Than 1 Character</p>
            )}
          </div>
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
            <label htmlFor="Cpassword">Confirm Password</label>
            <input
              type="password"
              id="Cpassword"
              onChange={(e) => setcPassword(e.target.value)}
            />
            {password !== cPassword && err && <p>Password Is Not Match</p>}
          </div>
          <div>
            <input type="checkbox" id="check" required />
            <label htmlFor="check">
              Are you agree to Clicon <span>Terms of Condition</span> and{" "}
              <span>Privacy Policy.</span>
            </label>
          </div>
          <button type="submit">Sign Up</button>
          <p className="p-signup">
            <i className="ph ph-hand"></i>
            If You Have An Account <Link to="/login">Log In Now.</Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default SignUp;
