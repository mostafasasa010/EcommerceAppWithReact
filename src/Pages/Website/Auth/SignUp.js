import { useContext, useEffect, useState } from "react";
import Header from "../../../Components/Website/Header/Header";
import TopHeader from "../../../Components/Website/Header/TopHeader";
import axios from "axios";
import { User } from "../../../Context/Context";
import { useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [cPassword, setcPassword] = useState("");
  const [err, setErr] = useState(false);
  const [send, setSend] = useState(false);
  const [errEmail, setErrEmail] = useState("");
  const userContext = useContext(User);
  const navigate = useNavigate();
  const cookie = new Cookie();
  useEffect(() => {
    if (name.length > 1 && password.length > 7 && cPassword === password) {
      setSend(true);
    } else {
      setSend(false);
    }
  }, [cPassword, err, name.length, password]);
  async function handleSubmit(e) {
    e.preventDefault();
    setErr(true);
    const data = {
      name: name,
      email: email,
      password: password,
      passwordConfirm: cPassword,
    };
    if (send) {
      try {
        const res = await axios.post(
          "https://e-commerce-l194.onrender.com/api/v1/user/signUp",
          data
        );
        userContext.setAuth({
          token: res.data.token,
          name: data.name,
          email: data.email,
        });
        cookie.set("cookieToken", res.data.token);
        cookie.set("cookieName", data.name);
        cookie.set("cookieEmail", data.email);
        if (res.status === 201) {
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
        </form>
      </div>
    </>
  );
}

export default SignUp;
