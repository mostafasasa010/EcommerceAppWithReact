import axios from "axios";
import { BaseApi, CATEGORY } from "../../API/Api";
import React, { useState } from "react";
import Cookie from "cookie-universal";
import { useNavigate } from "react-router-dom";

function AddCategory() {
  const cookie = Cookie();
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  async function addCategory(name) {
    try {
      const response = await axios.post(
        `${BaseApi}${CATEGORY}`,
        {
          name: name,
        },
        {
          headers: {
            Authorization: "Bearer " + cookie.get("cookieToken"),
          },
        }
      );
      console.log("API Response:", response.data);
      setError(false);
    } catch (error) {
      console.error("API Error:", error);
      setError(true);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const categoryName = e.target.elements.category.value;
    if (categoryName.trim() !== "" && error) {
      addCategory(categoryName);
      navigate("/dashboard/products");
    } else {
      console.error("Category name cannot be empty");
    }
  }

  return (
    <form className="add-category" onSubmit={handleSubmit}>
      <h1>Add Category</h1>
      <label htmlFor="category">Category Name:</label>
      <input id="category" name="category" />
      <button type="submit">Add</button>
    </form>
  );
}

export default AddCategory;
