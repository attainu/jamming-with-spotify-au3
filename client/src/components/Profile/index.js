import React from "react";
import PropTypes from "prop-types";
import "./Profile.css";
import { connect } from "react-redux";
import default_avatar from "../UserDetails/default_avatar.png";

const Profile = ({ userImage, displayName, userID, email, DOB, country }) => {
  return (
    <div className="profile-details-container">
      <h2 className="header-title">Account Overview</h2>
      <img alt="user" className="profile-image" src={userImage} />
      <h3>Profile</h3>
      <hr />
      <div className="profile-item displayname-box">
        <span className="item-label">Display Name</span>
        <span className="item-value">{displayName}</span>
      </div>
      <div className="profile-item username-box">
        <span className="item-label">Username</span>
        <span className="item-value">{userID}</span>
      </div>
      <div className="profile-item email-box">
        <span className="item-label">Email</span>
        <span className="item-value">{email}</span>
      </div>
      <div className="profile-item country-box">
        <span className="item-label">Country</span>
        <span className="item-value">{country}</span>
      </div>
    </div>
  );
};

Profile.propTypes = {
  userImage: PropTypes.string,
  displayName: PropTypes.string,
  userID: PropTypes.string,
  email: PropTypes.string,
  country: PropTypes.string
};

const mapStateToProps = state => {
  return {
    displayName: state.userReducer.user
      ? state.userReducer.user.display_name
      : "",
    userImage:
      state.userReducer.user && state.userReducer.user.images[0]
        ? state.userReducer.user.images[0].url
        : default_avatar,
    userID: state.userReducer.user.id,
    email: state.userReducer.user.email,
    country: state.userReducer.user.country
  };
};

Profile.propTypes = {
  updateHeaderTitle: PropTypes.func
};

export default connect(mapStateToProps)(Profile);
