import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Home from "../options/Home";
import Roles from "../options/Roles";
import Users from "../options/Users";

const MainHome = () => {
  const [selectedTab, setSelectedTab] = useState("Home");

  return (
    <div className="grid-container">
      <Header />
      <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      {selectedTab == "Home" && <Home />}
      {selectedTab == "Roles" && <Roles />}
      {selectedTab == "Users" && <Users />}
    </div>
  );
};

export default MainHome;
