import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BaseApi, USER } from "../../API/Api";
import Cookie from "cookie-universal";
import Loading from "../../Components/Loading/Loading";

function EditUserByAdmin() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [fname, setFName] = useState("");
  const cookie = Cookie();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  async function getUserName() {
    const res = await axios.get(`${BaseApi}${USER}${id}`, {
      headers: {
        Authorization: "Bearer " + cookie.get("cookieToken"),
      },
    });
    const data = res.data.data.data;
    setLoading(false);
    setFName(data.name);
  }

  useEffect(() => {
    getUserName();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      name: name,
    };
    if (name !== "") {
      const res = await axios.patch(`${BaseApi}${USER}${id}`, data, {
        headers: {
          Authorization: "Bearer " + cookie.get("cookieToken"),
        },
      });
      if (res.status === 202) {
        navigate(`/dashboard/users/show/${id}`);
      }
      console.log(res);
    }
  }
  return (
    <>
      {loading && <Loading />}
      <form className="edit-user-by-admin main-section" onSubmit={handleSubmit}>
        <h1>Edit User</h1>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            placeholder={fname}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button className="btn" type="submit">
          Edit
        </button>
      </form>
    </>
  );
}

export default EditUserByAdmin;
