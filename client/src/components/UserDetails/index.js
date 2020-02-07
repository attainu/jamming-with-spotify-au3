import React from "react";
import PropTypes from "prop-types";
import "./UserDetails.css";
import { connect } from "react-redux";
import default_avatar from "./default_avatar.png";

const UserDetails = ({ userImage, displayName }) => {
  return (
    <div className="user-details-container">
      <img alt="user" className="user-image" src={userImage} />
      <p className="user-name">{displayName}</p>
    </div>
  );
};

UserDetails.propTypes = {
  userImage: PropTypes.string,
  displayName: PropTypes.string
};

const mapStateToProps = state => {
  return {
    displayName: state.userReducer.user
      ? state.userReducer.user.display_name
      : "",
    userImage:
      state.userReducer.user && state.userReducer.user.images[0]
        ? state.userReducer.user.images[0].url
        : default_avatar
  };
};

export default connect(mapStateToProps)(UserDetails);
