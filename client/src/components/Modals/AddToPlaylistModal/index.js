import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ButtonToolbar, Button, Modal, Form } from "react-bootstrap";
import {
  saveTrackToPlaylist,
  fetchPlaylistsMenu,
  fetchPlaylistSongs
} from "../../../redux/actions/playlistActions";

const AddToPlaylistModal = ({
  onHide,
  show,
  userId,
  token,
  playlistMenu,
  saveTrackToPlaylist,
  fetchPlaylistsMenu,
  fetchPlaylistSongs,
  trackURI
}) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState("");

  const handleChange = e => {
    console.log(e.target.value);
    setSelectedPlaylist(e.target.value);
  };

  const handleClick = e => {
    e.preventDefault();
    console.log(selectedPlaylist);
    let playlist = playlistMenu.filter(
      playlist => playlist.name === selectedPlaylist
    )[0];
    console.log("Filtered playlist", playlist);
    console.log(playlist.id, trackURI, token);
    saveTrackToPlaylist(playlist.id, trackURI, token);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} style={{ color: "black", opacity: 0.9 }}>
      <Modal.Header closeButton>
        <Modal.Title>ADD TO PLAYLIST</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Select Playlist</Form.Label>
            <Form.Control as="select" onChange={handleChange}>
              <option value="Select">Select</option>
              {playlistMenu.map((playlist, index) => {
                return (
                  <option key={index} value={playlist.name}>
                    {playlist.name}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <ButtonToolbar>
          <Button variant="danger mr-2" onClick={onHide}>
            Close
          </Button>
          <Button variant="success" onClick={handleClick}>
            Save
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
    playlistMenu: state.playlistReducer.playlistMenu
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      saveTrackToPlaylist,
      fetchPlaylistsMenu,
      fetchPlaylistSongs
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToPlaylistModal);