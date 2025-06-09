import React from "react";
import { Outlet } from "react-router-dom";
import "./Layout.css"; // Import your custom styles

const Layout = () => {
  return (
    <div className="background-wrapper">
      <div className="content-overlay">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
