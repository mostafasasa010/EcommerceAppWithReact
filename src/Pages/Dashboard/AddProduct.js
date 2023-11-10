import axios from "axios";
import { useEffect, useState } from "react";
import { BaseApi, CATEGORY, PRODUCTS } from "../../API/Api";
import Cookie from "cookie-universal";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const [categories, setCategories] = useState("");
  const [discountOp, setdiscountOp] = useState("");
  const [originalP, setOriginalP] = useState(0);
  const [discountP, setdiscountP] = useState(0);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [stock, setStock] = useState(0);
  const cookie = Cookie();
  const navigate = useNavigate();
  const [msgError, setMsgError] = useState(false);
  const [send, setSend] = useState(false);
  useEffect(() => {
    if (name.length > 0 && category !== "" && originalP > 0) {
      setSend(true);
    } else {
      setSend(false);
    }
  }, [name, category, originalP]);
  async function getCategories() {
    const res = await axios.get(`${BaseApi}${CATEGORY}`);
    const data = res.data.data.data;
    const re = data.map((cat, i) => {
      return (
        <option key={i} value={cat._id}>
          {cat.name}
        </option>
      );
    });
    setCategories(re);
  }
  useEffect(() => {
    getCategories();
  }, []);
  async function handleSubmit(e) {
    e.preventDefault();
    setMsgError(true);
    const data = {
      name: name,
      price: {
        originalPrice: originalP,
        discount: discountP,
      },
      inStock: stock,
      brand: brand,
    };
    if (send) {
      const res = await axios.post(
        `${BaseApi}${CATEGORY}${category}/${PRODUCTS}`,
        data,
        {
          headers: {
            Authorization: "Bearer " + cookie.get("cookieToken"),
          },
        }
      );
      console.log(res);
      if (res.status === 201) {
        navigate(`/dashboard/products/show/${res.data.data.data.id}`);
      }
    }
  }
  return (
    <form className="add-product" onSubmit={handleSubmit}>
      <h1>Add Product</h1>
      <label htmlFor="product">
        Product Name:
        <input
          id="product"
          name="product"
          onChange={(e) => setName(e.target.value)}
        />
        {name.length === 0 && msgError && <p>Requird Product Name</p>}
      </label>
      <label htmlFor="category">
        Category:
        <select
          id="category"
          name="Category"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select A Category</option>
          {categories}
        </select>
        {category === "" && msgError && <p>Requird Select Category</p>}
      </label>
      <label htmlFor="brand">
        Brand Name:
        <input
          id="brand"
          name="brand"
          onChange={(e) => setBrand(e.target.value)}
        />
      </label>
      <label htmlFor="stock">
        Stock Namber:
        <input
          type="number"
          id="stock"
          name="stock"
          onChange={(e) => setStock(e.target.value)}
        />
      </label>
      <div>
        <label htmlFor="price">
          Price:
          <input
            id="price"
            placeholder="Original Price"
            type="number"
            onChange={(e) => setOriginalP(e.target.value)}
          />
          {originalP === 0 && msgError && <p>Requird Enter Price</p>}
        </label>
        <label htmlFor="discount">
          Discount:
          <select id="discount" onChange={(e) => setdiscountOp(e.target.value)}>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
          {discountOp === "Yes" && (
            <input
              type="number"
              placeholder="Discount"
              onChange={(e) => setdiscountP(e.target.value)}
            />
          )}
        </label>
        <label htmlFor="percentage">
          The discount percentage is:
          <span id="percentage">{(discountP * 100) / originalP + "%"}</span>
        </label>
        <label htmlFor="finalP">
          Final Price:
          <span id="finalP">
            {originalP - discountP > 0 ? originalP - discountP + "$" : "0"}
          </span>
        </label>
      </div>
      <button type="submit" onClick={() => setMsgError(true)}>
        Add
      </button>
    </form>
  );
}

export default AddProduct;
