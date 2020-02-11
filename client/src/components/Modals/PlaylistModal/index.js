import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ButtonToolbar, Button, Modal } from "react-bootstrap";
import CreatePlaylist from "../../CreatePlaylist";
import {
  createPlaylist,
  fetchPlaylistsMenu
} from "../../../redux/actions/playlistActions";

const PlaylistModal = ({ onHide, show, userId, token, createPlaylist }) => {
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [newPlaylistDesc, setNewPlaylistDesc] = useState("");
  //const [addModalShow, setModal] = useState(false);

  const handleChange = e => {
    if (e.target.nodeName === "INPUT") setNewPlaylistName(e.target.value);
    if (e.target.nodeName === "TEXTAREA") setNewPlaylistDesc(e.target.value);
  };

  // const keyChange = e => {
  //   console.log(e.target.value);
  //   setNewPlaylistName(e.target.value);
  //   console.log(newPlaylistName);
  // };

  const handleClick = e => {
    e.preventDefault();
    let jsonBody = JSON.stringify({
      name: newPlaylistName,
      description: newPlaylistDesc,
      public: false
    });
    createPlaylist(userId, jsonBody, token);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} style={{ color: "black", opacity: 0.9 }}>
      <Modal.Header closeButton>
        <Modal.Title>NEW PLAYLIST</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="form-group">
            <label htmlFor="playlist-name">Playlist Name</label>
            <input
              type="text"
              className="form-control"
              name="playlist-name"
              value={newPlaylistName}
              //onKeyUp={keyChange}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="playlist-desc">Description</label>
            <textarea
              className="form-control"
              name="playlist-desc"
              value={newPlaylistDesc}
              onChange={handleChange}
              maxLength="300"
            />
          </div>
        </form>
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
    newPlaylistData: state.createPlaylistReducer.newPlaylistData
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      createPlaylist,
      fetchPlaylistsMenu
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistModal);
