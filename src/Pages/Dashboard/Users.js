import { useEffect, useState } from "react";
import Cookie from "cookie-universal";
import { BaseApi, USER } from "../../API/Api";
import Loading from "../../Components/Loading/Loading";

function Users() {
  const [usersData, setUsersData] = useState([]);
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
  }, []);
  console.log(usersData);
  function writeName() {
    if (usersData && usersData.length > 0) {
      return usersData.map((user, i) => (
        <tr key={i}>
          <td>{i}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.role}</td>
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
            </tr>
          </thead>
          <tbody>{writeName()}</tbody>
        </table>
      </div>
    </>
  );
}

export default Users;
