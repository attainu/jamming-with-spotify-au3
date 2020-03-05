import React from "react";
import UserDetails from "../UserDetails";
import TrackSearch from "../TrackSearch";
import Logout from "../Logout";
import "./Header.css";
const Header = () => {
  function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }
  return (
    <div className="header">
      <TrackSearch />
      <div className="topnav" id="myTopnav">
        <div className="nav-section">
          <UserDetails />
          <Logout />
          <a style={{ fontSize: 15 }} className="icon" onClick={myFunction}>
            &#9776;
          </a>
        </div>
      </div>
    </div>
  );
};
export default Header;