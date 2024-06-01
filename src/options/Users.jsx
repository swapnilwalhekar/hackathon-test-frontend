import axios from "axios";
import React, { useEffect, useState } from "react";
import img from ".././assets/arrowUpDown.png";
import AddUser from "./AddUser";
import EditUser from "./EditUser";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [addMode, setAddMode] = useState(false);
  const [editMode, setEditMode] = useState(false); // State for edit mode
  const [currentUser, setCurrentUser] = useState(null); // State for current user to edit
  const [newRole, setNewRole] = useState({ name: "", status: false });
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const getUserData = async () => {
    try {
      const response = await axios.get("http://localhost:9000/app-users");
      setUsers(response.data);
      setFilteredUsers(response.data);
      console.log("response.data:", response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  async function addAppUser(newUser) {
    try {
      const response = await axios.post(
        "http://localhost:9000/add-appuser",
        newUser
      );
      setUsers((prevUsers) => [...prevUsers, response.data]);
      setFilteredUsers((prevUsers) => [...prevUsers, response.data]);
      setAddMode(false);
      console.error("response:", response);
    } catch (error) {
      console.error("Error adding role:", error);
    }
  }

  async function handleDelete(id) {
    try {
      await axios.delete(`http://localhost:9000/appuser/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      setFilteredUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== id)
      );
    } catch (error) {
      console.error("Error deleting role:", error);
    }
  }

  function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredUsers(
      users.filter((user) => {
        const status = user.status ? "active" : "inactive";
        return (
          user._id.toLowerCase().includes(query) ||
          user.name.toLowerCase().includes(query) ||
          status.includes(query)
        );
      })
    );
  }

  async function handleEditSubmit(updatedUser) {
    try {
      const response = await axios.put(
        `http://localhost:9000/appuser/${updatedUser._id}`,
        updatedUser
      );
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === updatedUser._id ? response.data : user
        )
      );
      setFilteredUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === updatedUser._id ? response.data : user
        )
      );
      setEditMode(false);
      setCurrentUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  }

  function handleEdit(id) {
    const user = users.find((user) => user._id === id);
    setCurrentUser(user);
    setEditMode(true);
  }

  return (
    <main className="main-container">
      <div className="roles-main">
        {addMode ? (
          <AddUser
            newRole={newRole}
            setNewRole={setNewRole}
            setAddMode={setAddMode}
            addAppUser={addAppUser}
          />
        ) : editMode ? (
          <EditUser
            currentUser={currentUser}
            setEditMode={setEditMode}
            handleEditSubmit={handleEditSubmit}
          />
        ) : (
          <div>
            <div className="main-search">
              <div className="group">
                <img
                  className="sidebar-list-icons"
                  src="../src/assets/sidebar/user.png"
                  alt="Roles"
                />
                <span>Users</span>
                <svg className="icon" aria-hidden="true" viewBox="0 0 24 24">
                  <g>
                    <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                  </g>
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearch}
                  className="input"
                  placeholder="Search role"
                />
              </div>
              <button onClick={() => setAddMode(true)}>Add New</button>
            </div>
            <hr />
            {filteredUsers.length > 0 ? (
              <table className="styled-table">
                <thead>
                  <tr>
                    <th>
                      Id
                      <img src={img} alt="" />
                    </th>
                    <th>
                      Name
                      <img src={img} alt="" />
                    </th>
                    <th>
                      Mobile
                      <img src={img} alt="" />
                    </th>
                    <th>
                      Email Id
                      <span>
                        <img src={img} alt="" />
                      </span>
                    </th>
                    <th>
                      Role
                      <span>
                        <img src={img} alt="" />
                      </span>
                    </th>
                    <th>
                      Status
                      <span>
                        <img src={img} alt="" />
                      </span>
                    </th>
                    <th>
                      Action
                      <span>
                        <img src={img} alt="" />
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user._id}>
                      <td>{user._id}</td>
                      <td>{user.name}</td>
                      <td>{user.contact}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td
                        className={
                          user.status ? "active-role" : "inactive-role"
                        }
                      >
                        {user.status ? "Active" : "Inactive"}
                      </td>
                      <td>
                        <button
                          className="delete-edit"
                          onClick={() => handleEdit(user._id)}
                        >
                          <img src="../src/assets/editIcon.png" alt="" />
                        </button>
                        <button
                          className="delete-edit"
                          onClick={() => handleDelete(user._id)}
                        >
                          <img src="../src/assets/deleteicon.png" alt="" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No Users found</p>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default Users;
