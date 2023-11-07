import { Route, Routes } from "react-router-dom";
// Pages Wesite Files
import SignUp from "./Pages/Website/Auth/SignUp";
import HomePage from "./Pages/Website/HomePage";
import CartPage from "./Pages/Website/CartPage";
import FavPage from "./Pages/Website/FavPage";
import UserPage from "./Pages/Website/UserPage";
import Login from "./Pages/Website/Auth/LogIn";
import Products from "./Pages/Dashboard/Products";
import Users from "./Pages/Dashboard/Users";
import Dashboard from "./Pages/Dashboard/Dashboard";
import ShowUser from "./Pages/Dashboard/ShowUser";
import AddCategory from "./Pages/Dashboard/AddCategory";
import AllCategory from "./Pages/Dashboard/AllCategory";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="cart" element={<CartPage />} />
          <Route path="fav" element={<FavPage />} />
          <Route path="user" element={<UserPage />} />
        </Route>
        <Route path="dashboard/" element={<Dashboard />}>
          <Route path="users" element={<Users />} />
          <Route path="products" element={<Products />} />
          <Route path="addCategory" element={<AddCategory />} />
          <Route path="categories" element={<AllCategory />} />
          <Route path="users/show/:id" element={<ShowUser />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
