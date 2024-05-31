import axios from "axios";
import React, { useEffect, useState } from "react";

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [addMode, setAddMode] = useState(false);
  const [newRole, setNewRole] = useState({ name: "", status: false });

  useEffect(() => {
    axios
      .get("http://localhost:9000/roles")
      .then((response) => setRoles(response.data))
      .catch((error) => console.error(error));
  }, []);

  async function addRole() {
    try {
      const response = await axios.post(
        "http://localhost:9000/add-role",
        newRole
      );
      setRoles([...roles, response.data]); // Assuming the response contains the new role
      setAddMode(false);
      setNewRole({ name: "", status: false });
    } catch (error) {
      console.error("Error adding role:", error);
    }
  }

  async function handleEdit(id) {
    console.log("edit", id);
  }

  async function handleDelete(id) {
    try {
      await axios.delete(`http://localhost:9000/role/${id}`);
      setRoles(roles.filter((role) => role._id !== id));
    } catch (error) {
      console.error("Error deleting role:", error);
    }
  }

  return (
    <main className="main-container">
      <div className="roles-main">
        {addMode ? (
          <div>
            <span>Add Role</span>
            <input
              type="text"
              placeholder="Role name"
              value={newRole.name}
              onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
            />
            <label>
              <input
                type="checkbox"
                checked={newRole.status}
                onChange={(e) =>
                  setNewRole({ ...newRole, status: e.target.checked })
                }
              />
              Active
            </label>
            <button onClick={addRole}>Save</button>
            <button onClick={() => setAddMode(false)}>Cancel</button>
          </div>
        ) : (
          <div>
            <img
              className="sidebar-list-icons"
              src="../src/assets/sidebar/role.png"
              alt="Roles"
            />
            <span>Roles</span>
            <input type="text" />
            <button onClick={() => setAddMode(true)}>Add New</button>
            <hr />
            {roles.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Role name</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {roles.map((role) => (
                    <tr key={role._id}>
                      <td>{role._id}</td>
                      <td>{role.name}</td>
                      <td>{role.status ? "Active" : "Inactive"}</td>
                      <td>
                        <button onClick={() => handleEdit(role._id)}>
                          Edit
                        </button>
                        <button onClick={() => handleDelete(role._id)}>
                          Delete
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
