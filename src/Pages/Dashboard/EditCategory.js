import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BaseApi, CATEGORY } from "../../API/Api";
import Cookie from "cookie-universal";
import Loading from "../../Components/Loading/Loading";

function EditCategory() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const cookie = Cookie();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState("");

  async function getCategoryName() {
    const res = await axios.get(`${BaseApi}${CATEGORY}${id}`, {
      headers: {
        Authorization: "Bearer " + cookie.get("cookieToken"),
      },
    });
    const data = res.data.data.data;
    setLoading(false);
    setName(data.name);
  }

  useEffect(() => {
    getCategoryName();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("name", name);
    data.append("image", image);
    if (name !== "") {
      const res = await axios.patch(`${BaseApi}${CATEGORY}${id}`, data, {
        headers: {
          Authorization: "Bearer " + cookie.get("cookieToken"),
        },
      });
      if (res.status === 202) {
        navigate(`/dashboard/categories/show/${id}`);
      }
      console.log(res);
    }
  }
  return (
    <>
      {loading && <Loading />}
      <form className="edit-category main-section" onSubmit={handleSubmit}>
        <h1>Edit Category</h1>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Category Name"
          />
        </div>
        <label htmlFor="image">
          Image:
          <input
            type="file"
            onChange={(e) => setImage(e.target.files.item(0))}
          />
        </label>
        <button className="btn" type="submit">
          Edit
        </button>
      </form>
    </>
  );
}

export default EditCategory;
