import { useEffect, useState } from "react";
import Cookie from "cookie-universal";
import { BaseApi, USER, USERID } from "../../API/Api";
import Loading from "../../Components/Loading/Loading";
import { Link } from "react-router-dom";
import axios from "axios";

function Users() {
  const [usersData, setUsersData] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const cookie = Cookie();
  const [loading, setLoading] = useState(true);
  async function api() {
    try {
      const response = await fetch(`${BaseApi}${USER}`, {
        headers: {
          Authorization: "Bearer " + cookie.get("cookieToken"),
        },
      });
      const data = await response.json();
      setUsersData(data.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    api();
  }, [isDeleted]);
  async function handleDelete(id) {
    try {
      const res = await axios.delete(`${BaseApi}${USER}${id}`, {
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
  function writeName() {
    if (usersData && usersData.length > 0) {
      return usersData.map((user, i) => (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.role}</td>
          <td>
            <Link onClick={() => handleDelete(user._id)}>
              <i className="ph ph-trash delete"></i>
            </Link>
            <Link to={USERID}>
              <i className="ph ph-pencil edit"></i>
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
      <div className="users">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{writeName()}</tbody>
        </table>
      </div>
    </>
  );
}

export default Users;
