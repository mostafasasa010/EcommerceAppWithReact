import { useEffect, useState } from "react";
import { BaseApi, CATEGORY, IMAGES } from "../../API/Api";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";
import { Link } from "react-router-dom";
import Cookie from "cookie-universal";

function AllCategory() {
  const [categories, setCategories] = useState();
  const [loading, setLoading] = useState(true);
  const cookie = Cookie();
  const [isDeleted, setIsDeleted] = useState(false);
  async function getAllCategory() {
    try {
      const res = await axios(`${BaseApi}${CATEGORY}`);
      setCategories(res.data.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getAllCategory();
  }, [isDeleted]);
  async function handleDelete(id) {
    try {
      const res = await axios.delete(`${BaseApi}${CATEGORY}${id}`, {
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
  function writeCategories() {
    if (categories && categories.length > 0) {
      return categories.map((category, i) => (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{category.name}</td>
          <td>
            <img src={`${IMAGES}${CATEGORY}${category.image}`} alt="Pic" />
          </td>
          <td>
            <Link onClick={() => handleDelete(category._id)}>
              <i className="ph ph-trash delete"></i>
            </Link>
            <Link to={`/dashboard/categories/show/${category._id}`}>
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
      <div className="categories-dash">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{writeCategories()}</tbody>
        </table>
      </div>
    </>
  );
}

export default AllCategory;
