// import React from 'react'
import "../../src/assets/sidebar/home.png";

const Sidebar = ({ selectedTab, setSelectedTab }) => {
  return (
    <aside id="sidebar">
      <ul className="sidebar-list">
        <li
          className={`sidebar-list-item ${
            selectedTab === "Home" ? "active" : ""
          }`}
          onClick={() => setSelectedTab("Home")}
        >
          <img
            className="sidebar-list-icons"
            src="../src/assets/sidebar/home.png"
            alt="Home"
          />
          <a href="#">Home</a>
          <img
            className="sidebar-list-icons"
            src="../src/assets/sidebar/dropdown.png"
            alt="Dropdown"
          />
        </li>
        <li
          className={`sidebar-list-item ${
            selectedTab === "Roles" ? "active" : ""
          }`}
          onClick={() => setSelectedTab("Roles")}
        >
          <img
            className="sidebar-list-icons"
            src="../src/assets/sidebar/role.png"
            alt="Roles"
          />
          <a href="#">Roles</a>
          <img
            className="sidebar-list-icons"
            src="../src/assets/sidebar/dropdown.png"
            alt="Dropdown"
          />
        </li>
        <li
          className={`sidebar-list-item ${
            selectedTab === "Users" ? "active" : ""
          }`}
          onClick={() => setSelectedTab("Users")}
        >
          <img
            className="sidebar-list-icons"
            src="../src/assets/sidebar/user.png"
            alt="Users"
          />
          <a href="#">Users</a>
          <img
            className="sidebar-list-icons"
            src="../src/assets/sidebar/dropdown.png"
            alt="Dropdown"
          />
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
