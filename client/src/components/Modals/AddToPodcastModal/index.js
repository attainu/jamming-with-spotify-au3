import React, { useState } from "react";
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
  podcastMenu,
  saveTrackToPodcast,
  trackDetails
}) => {
  const [selectedPodcast, setSelectedPodcast] = useState("");

  const handleChange = e => {
    setSelectedPodcast(e.target.value);
  };

  const handleClick = e => {
    e.preventDefault();
    let podcast = podcastMenu.filter(
      podcast => podcast.podcastName === selectedPodcast
    )[0];
    console.log("Filtered podcast", podcast);
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
              {podcastMenu ?  podcastMenu.map((podcast, index) => {
                return (
                  <option key={index} value={podcast.podcastName}>
                    {podcast.podcastName}
                  </option>
                );
              }) : null }
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
    // userId: state.userReducer.user ? state.userReducer.user.id : "",
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