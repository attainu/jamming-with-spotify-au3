import React from "react";
import "./Logout.css";

const Logout = () => {
  function logout() {
    const url = "https://www.spotify.com/logout/";
    const spotifyLogoutWindow = window.open(
      url,
      "Spotify Logout",
      "width=700,height=500,top=40,left=40"
    );
    setTimeout(() => {
      spotifyLogoutWindow.close();
      window.location.href = "http://localhost:8888/login";
    }, 2000);
  }

  return (
    <div className="logout-container">
      <button className="logout-button" onClick={logout}>
        LOGOUT
      </button>
    </div>
  );
};

export default Logout;
