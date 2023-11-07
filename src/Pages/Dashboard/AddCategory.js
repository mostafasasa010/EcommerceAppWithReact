import axios from "axios";
import { BaseApi, CATEGORY } from "../../API/Api";
import React, { useState } from "react";
import Cookie from "cookie-universal";
import { useNavigate } from "react-router-dom";

function AddCategory() {
  const [errorMessage, setErrorMessage] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const cookie = Cookie();
  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      name: name,
    };
    try {
      const res = await axios.post(`${BaseApi}${CATEGORY}`, data, {
        headers: {
          Authorization: "Bearer " + cookie.get("cookieToken"),
        },
      });
      if (res.status === 201) {
        navigate("/dashboard/categories");
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
    <form className="add-category" onSubmit={handleSubmit}>
      <h1>Add Category</h1>
      <label htmlFor="category">Category Name:</label>
      <input
        id="category"
        name="category"
        onChange={(e) => setName(e.target.value)}
      />
      {errorMessage && <p>{errorMessage}</p>}
      <button type="submit">Add</button>
    </form>
  );
}

export default AddCategory;
