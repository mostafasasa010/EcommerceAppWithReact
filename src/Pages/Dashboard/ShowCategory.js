import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BaseApi, CATEGORY, IMAGES } from "../../API/Api";
import Loading from "../../Components/Loading/Loading";
import Cookie from "cookie-universal";

function ShowCategory() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [image, setImage] = useState("no-image.png");
  const [loading, setLoading] = useState(true);
  const cookie = Cookie();
  const navigate = useNavigate();
  async function getOneCategory() {
    const res = await axios.get(`${BaseApi}${CATEGORY}${id}`);
    const data = res.data.data.data;
    setLoading(false);
    setName(data.name);
    setImage(data.image);
  }
  useEffect(() => {
    getOneCategory();
  }, []);
  async function handleDelete() {
    const res = await axios.delete(`${BaseApi}${CATEGORY}${id}`, {
      headers: {
        Authorization: "Bearer " + cookie.get("cookieToken"),
      },
    });
    if (res.status === 204) {
      navigate("/dashboard/categories");
    }
  }
  return (
    <>
      {loading && <Loading />}
      <div className="main-section show-category">
        <h1>Show Category</h1>
        <div className="image">
          <img src={`${IMAGES}${CATEGORY}${image}`} alt="Pic" />
        </div>
        <div>
          <span>Category Name:</span>
          <span>{name}</span>
        </div>
        <div>
          <span>Id:</span>
          <span>{id}</span>
        </div>
        <button className="btn-2" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </>
  );
}

export default ShowCategory;
