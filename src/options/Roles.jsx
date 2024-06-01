import axios from "axios";
import React, { useEffect, useState } from "react";
import img from ".././assets/arrowUpDown.png";

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [addMode, setAddMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [newRole, setNewRole] = useState({ name: "", status: false });
  const [editRole, setEditRole] = useState({
    _id: "",
    name: "",
    status: false,
  });
  const [filteredRoles, setFilteredRoles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:9000/roles")
      .then((response) => {
        setRoles(response.data);
        setFilteredRoles(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  async function addRole() {
    try {
      const response = await axios.post(
        "http://localhost:9000/add-role",
        newRole
      );
      setRoles((prevRoles) => [...prevRoles, response.data]);
      setFilteredRoles((prevRoles) => [...prevRoles, response.data]);
      setAddMode(false);
      setNewRole({ name: "", status: false });
    } catch (error) {
      console.error("Error adding role:", error);
    }
  }

  async function updateRole() {
    try {
      const response = await axios.put(
        `http://localhost:9000/role/${editRole._id}`,
        editRole
      );
      setRoles((prevRoles) =>
        prevRoles.map((role) =>
          role._id === editRole._id ? response.data : role
        )
      );
      setFilteredRoles((prevRoles) =>
        prevRoles.map((role) =>
          role._id === editRole._id ? response.data : role
        )
      );
      setEditMode(false);
      setEditRole({ _id: "", name: "", status: false });
    } catch (error) {
      console.error("Error updating role:", error);
    }
  }

  async function handleEdit(id) {
    const roleToEdit = roles.find((role) => role._id === id);
    setEditRole(roleToEdit);
    setEditMode(true);
    setAddMode(false);
  }

  async function handleDelete(id) {
    try {
      await axios.delete(`http://localhost:9000/role/${id}`);
      setRoles((prevRoles) => prevRoles.filter((role) => role._id !== id));
      setFilteredRoles((prevRoles) =>
        prevRoles.filter((role) => role._id !== id)
      );
    } catch (error) {
      console.error("Error deleting role:", error);
    }
  }

  function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredRoles(
      roles.filter((role) => {
        const status = role.status ? "active" : "inactive";
        return (
          role._id.toLowerCase().includes(query) ||
          role.name.toLowerCase().includes(query) ||
          status.includes(query)
        );
      })
    );
  }

  return (
    <main className="main-container">
      <div className="roles-main">
        {addMode ? (
          <div>
            <h3
              style={{ width: "100px", cursor: "pointer" }}
              onClick={() => setAddMode(false)}
            >
              {" "}
              &#x2190; Add Role
            </h3>
            <div className="coolinput">
              <label htmlFor="input" className="text">
                Role name
              </label>
              <input
                type="text"
                value={newRole.name}
                onChange={(e) =>
                  setNewRole({ ...newRole, name: e.target.value })
                }
                className="input-user"
              />
            </div>
            <div className="button-user">
              <button className="button2" onClick={() => setAddMode(false)}>
                Cancel
              </button>
              <button className="button1" onClick={addRole}>
                Save
              </button>
            </div>
          </div>
        ) : editMode ? (
          <div>
            <h3
              style={{ width: "100px", cursor: "pointer" }}
              onClick={() => setEditMode(false)}
            >
              {" "}
              &#x2190;Edit Role
            </h3>
            <div className="coolinput">
              <label htmlFor="input" className="text">
                Role name
              </label>
              <input
                type="text"
                value={editRole.name}
                onChange={(e) =>
                  setEditRole({ ...editRole, name: e.target.value })
                }
                className="input-user"
              />
            </div>
            <div className="coolinput">
              <label htmlFor="status" className="text">
                Status
              </label>
              <select
                value={editRole.status}
                onChange={(e) =>
                  setEditRole({
                    ...editRole,
                    status: e.target.value === "true",
                  })
                }
                className="input-user"
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
            <div className="button-user">
              <button className="button2" onClick={() => setEditMode(false)}>
                Cancel
              </button>
              <button className="button1" onClick={updateRole}>
                Save
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="main-search">
              <div className="group">
                <img
                  className="sidebar-list-icons"
                  src="../src/assets/sidebar/role.png"
                  alt="Roles"
                />
                <span>Roles</span>
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
              <button
                onClick={() => {
                  setAddMode(true);
                  setEditMode(false);
                }}
              >
                Add New
              </button>
            </div>
            <hr />
            {filteredRoles.length > 0 ? (
              <table className="styled-table">
                <thead>
                  <tr>
                    <th>
                      Id
                      <img src={img} alt="" />
                    </th>
                    <th>
                      Role name
                      <img src={img} alt="" />
                    </th>
                    <th>
                      Status
                      <img src={img} alt="" />
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
                  {filteredRoles.map((role) => (
                    <tr key={role._id}>
                      <td>{role._id}</td>
                      <td>{role.name}</td>
                      <td
                        className={
                          role.status ? "active-role" : "inactive-role"
                        }
                      >
                        {role.status ? "Active" : "Inactive"}
                      </td>
                      <td>
                        <button
                          className="delete-edit"
                          onClick={() => handleEdit(role._id)}
                        >
                          <img src="../src/assets/editIcon.png" alt="" />
                        </button>
                        <button
                          className="delete-edit"
                          onClick={() => handleDelete(role._id)}
                        >
                          <img src="../src/assets/deleteicon.png" alt="" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No Roles found</p>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default Roles;
