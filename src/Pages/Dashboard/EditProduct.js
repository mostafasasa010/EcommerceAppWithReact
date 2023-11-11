import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookie from "cookie-universal";
import axios from "axios";
import { BaseApi, CATEGORY, PRODUCTS } from "../../API/Api";
import Loading from "../../Components/Loading/Loading";

function EditProduct() {
  const { id } = useParams();
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
  const [loading, setLoading] = useState(true);
  console.log(category);
  useEffect(() => {
    if (name.length > 0 && category !== "" && originalP > 0) {
      setSend(true);
    } else {
      setSend(false);
    }
    if (category === undefined) {
      setCategory("");
    }
  }, [name, category, originalP]);
  async function patchData(e) {
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
      const res = await axios.patch(`${BaseApi}${PRODUCTS}${id}`, data, {
        headers: {
          Authorization: "Bearer " + cookie.get("cookieToken"),
        },
      });
      console.log("patch", res);
      if ((res.status = 202)) {
        navigate(`/dashboard/products/show/${id}`);
      }
    }
  }
  async function getProductData() {
    const res = await axios.get(`${BaseApi}${PRODUCTS}${id}`);
    const data = res.data.data.data;
    console.log("get", res);
    setLoading(false);
    setCategory(data.category && data.category.name);
    setName(data.name);
    setBrand(data.brand);
    setStock(data.inStock);
    setOriginalP(data.price[0].originalPrice);
    setdiscountP(data.price[0].discount);
  }
  useEffect(() => {
    getProductData();
  }, []);
  useEffect(() => {
    if (discountP > 0) {
      setdiscountOp("Yes");
    }
  }, [discountP]);
  async function getCategories() {
    const res = await axios.get(`${BaseApi}${CATEGORY}`);
    const data = res.data.data.data;
    const re = data.map((cat, i) => {
      return (
        <option key={i} value={cat.name}>
          {cat.name}
        </option>
      );
    });
    setCategories(re);
  }
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      {loading && <Loading />}
      <form className="main-section edit-product" onSubmit={patchData}>
        <h1>Edit Product</h1>
        <div>
          <label htmlFor="product">
            Product:
            <input
              id="product"
              name="product"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Product Name"
            />
            {name.length === 0 && msgError && <p>Requird Product Name</p>}
          </label>
          <label htmlFor="category">
            Category:
            <select
              id="category"
              name="Category"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option value="">Select A Category</option>
              {categories}
            </select>
            {category === "" && msgError && <p>Required Select Category</p>}
          </label>
          <label htmlFor="brand">
            Brand:
            <input
              id="brand"
              name="brand"
              onChange={(e) => setBrand(e.target.value)}
              value={brand}
              placeholder="Brand Name"
            />
          </label>
          <label htmlFor="stock">
            Stock:
            <input
              type="number"
              id="stock"
              name="stock"
              onChange={(e) => setStock(e.target.value)}
              value={stock}
              placeholder="Stock Number"
            />
          </label>
          <div>
            <label htmlFor="price">
              Price:
              <input
                id="price"
                type="number"
                onChange={(e) => {
                  setOriginalP(e.target.value);
                }}
                value={originalP}
                placeholder="Original Price"
              />
              {(+originalP === 0 || originalP.length === 0) && msgError ? (
                <p>Requird Enter Price</p>
              ) : null}
            </label>
            <label htmlFor="discount" className="discount">
              Discount:
              <select
                id="discount"
                onChange={(e) => setdiscountOp(e.target.value)}
                value={discountOp}
              >
                <option value="">Discount</option>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
              {discountOp === "Yes" && (
                <input
                  type="number"
                  onChange={(e) => setdiscountP(e.target.value)}
                  value={discountP}
                  placeholder="Discount"
                />
              )}
            </label>
            <label htmlFor="percentage">
              The discount percentage is:
              <span id="percentage">
                {((discountP * 100) / originalP).toFixed(2) + "%"}
              </span>
            </label>
            <label htmlFor="finalP">
              Final Price:
              <span id="finalP">
                {originalP - discountP > 0 ? originalP - discountP + "$" : "0"}
              </span>
            </label>
          </div>
        </div>
        <button className="btn" type="submit" onClick={() => setMsgError(true)}>
          Add
        </button>
      </form>
    </>
  );
}

export default EditProduct;
