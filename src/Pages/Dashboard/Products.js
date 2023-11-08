import axios from "axios";
import { BaseApi, PRODUCTS } from "../../API/Api";
import { useEffect, useState } from "react";
import Loading from "../../Components/Loading/Loading";
import { Link } from "react-router-dom";
import Cookie from "cookie-universal";

function Products() {
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);
  const cookie = Cookie();
  try {
    async function getAllProducts() {
      const res = await axios(`${BaseApi}${PRODUCTS}`);
      setProducts(res.data.data.data);
      setLoading(false);
    }
    useEffect(() => {
      getAllProducts();
    }, [isDeleted]);
  } catch (err) {
    console.log(err);
  }
  async function handleDelete(id) {
    try {
      const res = await axios.delete(`${BaseApi}${PRODUCTS}${id}`, {
        headers: {
          Authorization: "Bearer " + cookie.get("cookieToken"),
        },
      });
      if (res.status === 204) {
        setIsDeleted(!isDeleted);
      }
    } catch (err) {
      console.log(err);
    }
  }
  function writeProducts() {
    if (products && products.length > 0) {
      return products.map((product, i) => (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{product.name}</td>
          <td>
            {product.category !== undefined
              ? product.category.name
              : "Not Found"}
          </td>
          <td>{product.inStock}</td>
          <td>{product.price["0"].finalPrice}</td>
          <td>
            <Link onClick={() => handleDelete(product._id)}>
              <i className="ph ph-trash delete"></i>
            </Link>
            <Link to={`/dashboard/products/show/${product._id}`}>
              <i className="ph ph-eye show"></i>
            </Link>
          </td>
        </tr>
      ));
    }
    return null;
  }
  return (
    <>
      {loading && <Loading />}
      <div className="products-dash">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Category</th>
              <th>In Stock</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{writeProducts()}</tbody>
        </table>
      </div>
    </>
  );
}

export default Products;
