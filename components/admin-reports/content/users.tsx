import { useEffect, useState } from "react";
import { getToken } from "utils/helpers";
import { API, BEARER } from "utils/constant";
import { message } from "antd";
import csvDownload from "json-to-csv-export";

const UserReports = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [viewedUsers, setViewedUsers] = useState("all");
  const token = getToken();
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API}/users`, {
        headers: { Authorization: `${BEARER} ${token}` },
      });
      const data = await response.json();
      console.log("data", data);
      setUsers(data);
      setFilteredUsers(data);
    } catch (error) {
      console.error(error);
      message.error("Error While Fetching Users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filterUsers = (e) => {
    const { value } = e.target;
    setViewedUsers(value);
    if (value === "active") {
      setFilteredUsers(users.filter((user) => !user.blocked));
    } else if (value === "inactive") {
      setFilteredUsers(users.filter((user) => user.blocked));
    } else {
      setFilteredUsers(users);
    }
  };

  const downloadOrders = () => {
    const json = filteredUsers.map((user) => ({
      userID: user.id,
      username: user.username,
      joinedDate: user.createdAt,
      email: user.email,
      phone: user.phone,
    }));
    console.log(json);
    const dataToConvert = {
      data: json,
      filename: `${viewedUsers}_users`,
      delimiter: ",",
      headers: ["ID", "Username", "Joined At", "email", "Phone"],
    };
    csvDownload(dataToConvert);
  };

  return (
    <section className="content order">
      <div className="filter__select">
        <h4>Sort by: </h4>
        <div className="select-wrapper">
          <select onChange={filterUsers}>
            <option>All</option>
            <option value="active">Active Users</option>
            <option value="inactive">Blocked</option>
          </select>
        </div>
      </div>
      <div className="actions">
        <div className="card">
          <span>Number of Users</span>
          <span>{filteredUsers && filteredUsers.length}</span>
        </div>
        <a
          href="http://localhost:1337/admin/content-manager/collectionType/plugin::users-permissions.user?page=1&pageSize=10&sort=username:ASC"
          className="view--button"
          target="_blank"
        >
          View Users
        </a>
        <button onClick={downloadOrders} className="download--button">
          Download users
        </button>
      </div>
    </section>
  );
};

export default UserReports;
