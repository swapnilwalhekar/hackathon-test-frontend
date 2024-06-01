import React, { useState } from "react";

const EditUser = ({ currentUser, setEditMode, handleEditSubmit }) => {
  const [userDetails, setUserDetails] = useState(currentUser);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  return (
    <div className="user-wrapper">
      <h2>&#x2190; Edit User</h2>
      <div className="input-wrapper">
        <div className="coolinput">
          <label htmlFor="name" className="text">
            Name
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            name="name"
            className="input-user"
            value={userDetails.name}
            onChange={handleChange}
          />
        </div>
        <div className="coolinput">
          <label htmlFor="contact" className="text">
            Mobile
          </label>
          <input
            type="number"
            placeholder="Enter your mobile number"
            name="contact"
            className="input-user"
            value={userDetails.contact}
            onChange={handleChange}
          />
        </div>
        <div className="coolinput">
          <label htmlFor="email" className="text">
            Email-Id
          </label>
          <input
            type="email"
            placeholder="Enter your email address"
            name="email"
            className="input-user"
            value={userDetails.email}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="input-wrapper new-wrapper">
        <div className="coolinput">
          <label htmlFor="role" className="text">
            Role
          </label>
          <input
            type="text"
            placeholder="Select role"
            name="role"
            className="input-user"
            value={userDetails.role}
            onChange={handleChange}
          />
        </div>
        <form className="file-upload-form">
          <label htmlFor="file" className="file-upload-label">
            <div className="file-upload-design">
              <svg viewBox="0 0 640 512" height="1em">
                <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path>
              </svg>
              <span className="browse-button">Browse file</span>
            </div>
            <input id="file" type="file" />
          </label>
        </form>
        <div className="coolinput">
          <label htmlFor="status" className="text">
            Status
          </label>
          <select
            name="status"
            className="input-user"
            value={userDetails.status}
            onChange={(e) =>
              setUserDetails({
                ...userDetails,
                status: e.target.value === "true",
              })
            }
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>
      </div>
      <div className="button-user">
        <button className="button2" onClick={() => setEditMode(false)}>
          Cancel
        </button>
        <button
          className="button1"
          onClick={() => handleEditSubmit(userDetails)}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditUser;
