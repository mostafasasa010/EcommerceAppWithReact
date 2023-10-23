import { useState } from "react";
import Header from "../../../Components/Website/Header/Header";
import TopHeader from "../../../Components/Website/Header/TopHeader";
import axios from "axios";
function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [cPassword, setcPassword] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      name: name,
      email: email,
      password: password,
      passwordConfirm: cPassword,
    };
    try {
      const res = await axios.post(
        "https://e-commerce-l194.onrender.com/api/v1/user/signUp",
        data
      );
      console.log(res);
    } catch (err) {
      console.log(err.config.data);
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
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="Cpassword">Confirm Password</label>
            <input
              type="password"
              id="Cpassword"
              onChange={(e) => setcPassword(e.target.value)}
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </>
  );
}

export default SignUp;
