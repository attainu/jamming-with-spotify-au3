import React from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ButtonToolbar, Button, Modal } from "react-bootstrap";
// import CreatePodcast from "../../CreatePodcast";
import {
    fetchPodcastMenu,
    deletePodcast,
    fetchPodcastSongs
  } from "../../../redux/actions/podcastActions";

const DeletePodcastModal = ({
  onHide,
  show,
  deletePodcast,
  fetchPodcastMenu,
  podcastId,
  podcastName
}) => {

  const handleClick = e => {
    e.preventDefault();
    deletePodcast(podcastId);
    onHide();
  };

  console.log(podcastId);

  return (
    <Modal show={show} onHide={onHide} style={{ color: "black", opacity: 0.9 }}>
      <Modal.Header closeButton>
        <Modal.Title>DELETE PODCAST</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Want to delete {podcastName} ?</p>
      </Modal.Body>
      <Modal.Footer>
        <ButtonToolbar>
          <Button variant="danger mr-2" onClick={onHide}>
            Close
          </Button>
          <Button variant="success" onClick={handleClick}>
            Delete
          </Button>
        </ButtonToolbar>
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = state => {
  return {
    newPodcastData: state.createPodcastReducer.newPodcastData
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      deletePodcast,
      fetchPodcastMenu,
      fetchPodcastSongs
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeletePodcastModal);
