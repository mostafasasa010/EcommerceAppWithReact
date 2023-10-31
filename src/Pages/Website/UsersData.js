import { useEffect, useState } from "react";
import { BaseApi, USER } from "../../API/Api";
import Cookie from "cookie-universal";

function UsersData() {
  const [usersData, setUsersData] = useState([]);
  const cookie = Cookie();
  async function api() {
    try {
      const response = await fetch(`${BaseApi}${USER}`, {
        headers: {
          Authorization: "Bearer " + cookie.get("cookieToken"),
        },
      });
      const data = await response.json();
      setUsersData(data.data.data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    api();
  }, []);
  function writeName() {
    if (usersData && usersData.length > 0) {
      return usersData.map((user, i) => (
        <p key={i}>
          {i + 1}- {user.name}
        </p>
      ));
    }
    return null;
  }
  return (
    <div>
      <h1>Users Page</h1>
      {writeName()}
    </div>
  );
}

export default UsersData;
