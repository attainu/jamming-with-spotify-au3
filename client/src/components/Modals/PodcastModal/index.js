import React, { useState } from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ButtonToolbar, Button, Modal } from "react-bootstrap";
// import CreatePodcast from "../../CreatePodcast";
import {createPodcast, fetchPodcastMenu} from '../../../redux/actions/podcastActions'

const PodcastModal = ({ onHide, show, createPodcast }) => {
  const [newPodcastName, setNewPodcastName] = useState("");
  const [newPodcastDesc, setNewPodcastDesc] = useState("");
  //const [addModalShow, setModal] = useState(false);

  const handleChange = e => {
    if (e.target.name === "name") setNewPodcastName(e.target.value);
    if (e.target.name === "description") setNewPodcastDesc(e.target.value);
  };

  const handleClick = e => {
    e.preventDefault();
    let jsonBody = {
      name: newPodcastName,
      description: newPodcastDesc,
      public: false
    }
    createPodcast(jsonBody);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} style={{ color: "black", opacity: 0.9 }}>
      <Modal.Header closeButton>
        <Modal.Title>NEW PODCAST</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="form-group">
            <label htmlFor="podcast-name">Podcast Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={newPodcastName}
              //onKeyUp={keyChange}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="podcast-desc">Description</label>
            <input
              type="text"
              className="form-control"
              name="description"
              value={newPodcastDesc}
              onChange={handleChange}
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
    newPodcastData: state.createPodcastReducer.newPodcastData
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      createPodcast,
      fetchPodcastMenu
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PodcastModal);