import axios from "axios";
import { BaseApi, CATEGORY } from "../../API/Api";
import React, { useState } from "react";
import Cookie from "cookie-universal";
import { useNavigate } from "react-router-dom";

function AddCategory() {
  const [errorMessage, setErrorMessage] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const cookie = Cookie();
  async function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("name", name);
    data.append("image", image);
    try {
      const res = await axios.post(`${BaseApi}${CATEGORY}`, data, {
        headers: {
          Authorization: "Bearer " + cookie.get("cookieToken"),
        },
      });
      if (res.status === 201) {
        navigate(`/dashboard/categories/show/${res.data.data.data._id}`);
      }
    } catch (err) {
      if (err.response.status === 400) {
        setErrorMessage("This Is Category Has Been Used");
      } else {
        console.log(err);
      }
    }
  }

  return (
    <form className="add-category main-section" onSubmit={handleSubmit}>
      <h1>Add Category</h1>
      <label htmlFor="category">Category Name:</label>
      <input
        id="category"
        name="category"
        onChange={(e) => setName(e.target.value)}
      />
      {errorMessage && <p>{errorMessage}</p>}
      <label htmlFor="image">Image:</label>
      <input type="file" onChange={(e) => setImage(e.target.files.item(0))} />
      <button className="btn" type="submit">
        Add
      </button>
    </form>
  );
}

export default AddCategory;
