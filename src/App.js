import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/Website/HomePage";
import CartPage from "./Pages/Website/CartPage";
import FavPage from "./Pages/Website/FavPage";
import UserPage from "./Pages/Website/UserPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="cart" element={<CartPage />} />
          <Route path="fav" element={<FavPage />} />
          <Route path="user" element={<UserPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
