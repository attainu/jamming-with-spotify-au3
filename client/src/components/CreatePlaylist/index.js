import React, { useState } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PlaylistModal from "../Modals/PlaylistModal";
//import { ButtonToolbar } from "react-bootstrap";
import "./CreatePlaylist.css";

const CreatePlaylist = () => {
  const [addModalShow, setModal] = useState(false);

  const openModal = () => {
    setModal(true);
  };

  let addModalClose = () => {
    setModal(false);
  };
  return (
    <>
      <div className="new-playlist-container" onClick={openModal}>
        <i className="fa fa-plus-circle" aria-hidden="true"></i>
        <h3 className="new-playlist-header">&nbsp;Create Playlist</h3>
      </div>
      <PlaylistModal onHide={addModalClose} show={addModalShow} />
    </>
  );
};

export default CreatePlaylist;
