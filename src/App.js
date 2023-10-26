import { Route, Routes } from "react-router-dom";
// Pages Wesite Files
import SignUp from "./Pages/Website/Auth/SignUp";
import HomePage from "./Pages/Website/HomePage";
import CartPage from "./Pages/Website/CartPage";
import FavPage from "./Pages/Website/FavPage";
import UserPage from "./Pages/Website/UserPage";
import Login from "./Pages/Website/Auth/LogIn";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="cart" element={<CartPage />} />
          <Route path="fav" element={<FavPage />} />
          <Route path="user" element={<UserPage />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
