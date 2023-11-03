import axios from "axios";
import { BaseApi, PRODUCTS } from "../../API/Api";
import { useEffect, useState } from "react";
import Loading from "../../Components/Loading/Loading";

function Products() {
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);
  try {
    async function getAllProducts() {
      const res = await axios(`${BaseApi}${PRODUCTS}`);
      setProducts(res.data.data.data);
      setLoading(false);
    }
    useEffect(() => {
      getAllProducts();
    }, []);
  } catch (err) {
    console.log(err);
  }
  function writeProducts() {
    if (products && products.length > 0) {
      return products.map((product, i) => (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{product.name}</td>
          <td>{product.category.name}</td>
          <td>{product.inStock}</td>
          <td>{product.price["0"].finalPrice}</td>
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
            </tr>
          </thead>
          <tbody>{writeProducts()}</tbody>
        </table>
      </div>
    </>
  );
}

export default Products;
