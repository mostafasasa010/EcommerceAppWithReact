import axios from "axios";
import { useEffect, useState } from "react";
import { BaseApi, USER } from "../../API/Api";
import Cookie from "cookie-universal";

function UsersData() {
  const [usersData, setUsersData] = useState([]);
  const cookie = Cookie();
  useEffect(() => {
    fetch(`${BaseApi}${USER}`, {
      headers: {
        Authorization: "Bearer " + cookie.get("cookieToken"),
      },
    })
      .then((res) => res.json())
      .then((data) => setUsersData(data.data.data))
      .catch((err) => console.log(err));
    console.log(usersData);
  }, []);
  return (
    <div>
      <h1>Users Page</h1>
      {usersData.map((user, i) => {
        <p>
          {i}- {user[i]}
        </p>;
      })}
    </div>
  );
}

export default UsersData;
