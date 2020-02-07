import React from "react";
import UserDetails from "../UserDetails";
import TrackSearch from "../TrackSearch";
import Logout from "../Logout";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <TrackSearch />
      <UserDetails />
      <Logout />
    </div>
  );
};

export default Header;
