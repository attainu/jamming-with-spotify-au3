import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ButtonToolbar, Button, Modal, Form } from "react-bootstrap";
import {
  saveTrackToPodcast,
  fetchPodcastMenu,
  fetchPodcastSongs
} from "../../../redux/actions/podcastActions";

const AddToPodcastModal = ({
  onHide,
  show,
  userId,
  podcastMenu,
  saveTrackToPodcast,
  fetchPodcastMenu,
  fetchPodcastSongs,
  trackDetails
}) => {
  const [selectedPodcast, setSelectedPodcast] = useState("");

  const handleChange = e => {
    setSelectedPodcast(e.target.value);
  };

  const handleClick = e => {
    e.preventDefault();
    console.log(selectedPodcast);
    let podcast = podcastMenu.filter(
      podcast => podcast.podcastName === selectedPodcast
    )[0];
    console.log("Filtered podcast", podcast);
    console.log(podcast.id, trackDetails);
    saveTrackToPodcast(podcast.id, trackDetails);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} style={{ color: "black", opacity: 0.9 }}>
      <Modal.Header closeButton>
        <Modal.Title>ADD TO PODCAST</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Select Podcast</Form.Label>
            <Form.Control as="select" onChange={handleChange}>
              <option value="Select">Select</option>
              {podcastMenu.map((podcast, index) => {
                return (
                  <option key={index} value={podcast.podcastName}>
                    {podcast.podcastName}
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
    // token: state.tokenReducer.token ? state.tokenReducer.token : "",
    podcastMenu: state.podcastReducer.podcastMenu
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      saveTrackToPodcast,
      fetchPodcastMenu,
      fetchPodcastSongs
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToPodcastModal);