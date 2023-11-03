import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BaseApi, USER } from "../../API/Api";
import Cookie from "cookie-universal";
import Loading from "../../Components/Loading/Loading";

function ShowUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const cookie = Cookie();
  const [isDeleted, setIsDeleted] = useState(false);
  const navigate = useNavigate();
  try {
    async function getUserData() {
      const res = await axios.get(
        `${BaseApi}${USER}${cookie.get("cookieIdShow")}`,
        {
          headers: {
            Authorization: "Bearer " + cookie.get("cookieToken"),
          },
        }
      );
      setLoading(false);
      setName(res.data.data.data.name);
      setEmail(res.data.data.data.email);
      setId(res.data.data.data._id);
      setRole(res.data.data.data.role);
    }
    useEffect(() => {
      getUserData();
    }, []);
  } catch (err) {
    console.log(err);
  }

  async function handleDelete() {
    try {
      const res = await axios.delete(`${BaseApi}${USER}${id}`, {
        headers: {
          Authorization: "Bearer " + cookie.get("cookieToken"),
        },
      });
      if (res.status === 204) {
        setIsDeleted(!isDeleted);
        navigate("/dashboard/users");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {loading && <Loading />}
      <div className="show-user">
        <h3>
          <span>Name:</span> {name}
        </h3>
        <p>
          <span>Email:</span> {email}
        </p>
        <p>
          <span>Id:</span> {id}
        </p>
        <p>
          <span>Role:</span> {role}
        </p>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </>
  );
}

export default ShowUser;
