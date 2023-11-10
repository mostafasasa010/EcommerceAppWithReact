import axios from "axios";
import { useEffect, useState } from "react";
import { BaseApi, CATEGORY } from "../../API/Api";

function AddProduct() {
  const [categories, setCategories] = useState("");
  const [discountOp, setdiscountOp] = useState("");
  const [OriginalP, setOriginalP] = useState(0);
  const [discountP, setdiscountP] = useState(0);
  async function getCategories() {
    const res = await axios.get(`${BaseApi}${CATEGORY}`);
    const data = res.data.data.data;
    const re = data.map((cat, i) => {
      return <option key={i}>{cat.name}</option>;
    });
    setCategories(re);
  }
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <form className="add-product">
      <h1>Add Product</h1>
      <label htmlFor="product">Product Name:</label>
      <input id="product" name="product" />
      <label htmlFor="category">Category:</label>
      <select id="category">{categories}</select>
      <label htmlFor="brand">Brand Name:</label>
      <input id="brand" name="brand" />
      <label htmlFor="stock">Stock Namber:</label>
      <input type="number" id="stock" name="stock" />
      <div>
        <label htmlFor="price">Price:</label>
        <input
          id="price"
          placeholder="Original Price"
          onChange={(e) => setOriginalP(e.target.value)}
        />
        <label htmlFor="discount">Discount</label>
        <select id="discount" onChange={(e) => setdiscountOp(e.target.value)}>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
        {discountOp === "Yes" && (
          <input
            placeholder="Discount"
            onChange={(e) => setdiscountP(e.target.value)}
          />
        )}
        <label htmlFor="finalP">Final Price:</label>
        <span id="finalP">{OriginalP - discountP}</span>
      </div>
      <button type="submit">Add</button>
    </form>
  );
}

export default AddProduct;
