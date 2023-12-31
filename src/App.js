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
import ShowProduct from "./Pages/Dashboard/ShowProduct";
import AddProduct from "./Pages/Dashboard/AddProduct";
import EditUserByAdmin from "./Pages/Dashboard/EditUserByAdmin";
import ShowCategory from "./Pages/Dashboard/ShowCategory";
import EditCategory from "./Pages/Dashboard/EditCategory";
import EditProduct from "./Pages/Dashboard/EditProduct";
import Err404 from "./Pages/Website/Err404";
import RequireRoute from "./Pages/Website/RequireRoute";
import RequireBack from "./Pages/RequireBack";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<Err404 />} />
        <Route path="/" element={<HomePage />}>
          <Route path="cart" element={<CartPage />} />
          <Route path="fav" element={<FavPage />} />
          <Route path="user" element={<UserPage />} />
        </Route>
        <Route element={<RequireRoute />}>
          <Route path="dashboard/" element={<Dashboard />}>
            <Route path="users" element={<Users />} />
            <Route path="users/edit/:id" element={<EditUserByAdmin />} />
            <Route path="products" element={<Products />} />
            <Route path="addProduct" element={<AddProduct />} />
            <Route path="products/show/:id" element={<ShowProduct />} />
            <Route path="products/edit/:id" element={<EditProduct />} />
            <Route path="addCategory" element={<AddCategory />} />
            <Route path="categories" element={<AllCategory />} />
            <Route path="categories/show/:id" element={<ShowCategory />} />
            <Route path="categories/edit/:id" element={<EditCategory />} />
            <Route path="users/show/:id" element={<ShowUser />} />
          </Route>
        </Route>
        <Route element={<RequireBack />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
