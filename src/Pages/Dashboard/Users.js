import { useEffect, useState } from "react";
import Cookie from "cookie-universal";
import { BaseApi, USER, USERID } from "../../API/Api";
import Loading from "../../Components/Loading/Loading";
import { Link } from "react-router-dom";
import axios from "axios";

function Users() {
  const [usersData, setUsersData] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [noUsers, setNoUsers] = useState(false);
  const cookie = Cookie();
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState("");
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
      setNoUsers(true);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    api();
  }, [isDeleted]);
  useEffect(() => {
    axios
      .get(`${BaseApi}${USER}${USERID}`, {
        headers: {
          Authorization: "Bearer " + cookie.get("cookieToken"),
        },
      })
      .then((res) => setCurrentUser(res.data.data.data));
  }, []);
  async function handleDelete(id) {
    if (currentUser._id !== id) {
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
  }
  function writeName() {
    if (usersData && usersData.length > 0) {
      return usersData.map((user, i) => (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{user.name === currentUser.name && user.name + " (You)"}</td>
          <td>{user.email}</td>
          <td>{user.role}</td>
          <td>
            {currentUser._id !== user._id && (
              <Link onClick={() => handleDelete(user._id)}>
                <i className="ph ph-trash delete"></i>
              </Link>
            )}
            <Link to={`/dashboard/users/edit/${user._id}`}>
              <i className="ph ph-pencil edit"></i>
            </Link>
            <Link
              to={`/dashboard/users/show/${user._id}`}
              onClick={() => cookie.set("cookieIdShow", user._id)}
            >
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
      <div className="users main-section">
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
          <tbody>
            {usersData.length === 0 ? (
              <tr>
                <td>Loading</td>
              </tr>
            ) : usersData.length === 0 && noUsers ? (
              <tr>
                <td>Users Not Found</td>
              </tr>
            ) : (
              writeName()
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Users;
