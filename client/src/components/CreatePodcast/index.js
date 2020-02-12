import React, { useState } from "react";
// import PropTypes from "prop-types";
// import { bindActionCreators } from "redux";
// import { connect } from "react-redux";
import PodcastModal from "../Modals/PodcastModal";
//import { ButtonToolbar } from "react-bootstrap";
import "../CreatePlaylist/CreatePlaylist.css";

const CreatePodcast = () => {
  const [addModalShow, setModal] = useState(false);

  const openModal = () => {
    setModal(true);
  };

  let addModalClose = () => {
    setModal(false);
  };
  return (
    <>
      <div className="new-playlist-container" onClick={openModal}  style={{marginTop : "10px"}}>
        <i className="fa fa-plus-circle" aria-hidden="true"></i>
        <h3 className="new-playlist-header">&nbsp;Create Podcast</h3>
      </div>
      <PodcastModal onHide={addModalClose} show={addModalShow} />
    </>
  );
};

export default CreatePodcast;