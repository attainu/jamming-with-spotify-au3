import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ButtonToolbar, Button, Modal } from "react-bootstrap";
import CreatePlaylist from "../../CreatePlaylist";
import {
  unFollowPlaylist,
  fetchPlaylistsMenu
} from "../../../redux/actions/playlistActions";

const UnFollowPlaylistModal = ({
  onHide,
  show,
  userId,
  token,
  unFollowPlaylist,
  fetchPlaylistsMenu,
  playlistId,
  playlistName
}) => {
  const handleClick = e => {
    e.preventDefault();
    unFollowPlaylist(playlistId, token);
    onHide();
  };

  console.log(playlistId, playlistName);

  return (
    <Modal show={show} onHide={onHide} style={{ color: "black", opacity: 0.9 }}>
      <Modal.Header closeButton>
        <Modal.Title>UNFOLLOW PLAYLIST</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Want to unfollow {playlistName} ?</p>
      </Modal.Body>
      <Modal.Footer>
        <ButtonToolbar>
          <Button variant="danger mr-2" onClick={onHide}>
            CLOSE
          </Button>
          <Button variant="success" onClick={handleClick}>
            UNFOLLOW
          </Button>
        </ButtonToolbar>
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = state => {
  return {
    userId: state.userReducer.user ? state.userReducer.user.id : "",
    token: state.tokenReducer.token ? state.tokenReducer.token : "",
    newPlaylistData: state.createPlaylistReducer.newPlaylistData
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      unFollowPlaylist,
      fetchPlaylistsMenu
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnFollowPlaylistModal);
