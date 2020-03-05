import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ButtonToolbar, Button, Modal } from "react-bootstrap";
import { editPodcast } from "../../../redux/actions/podcastActions";

const EditPodcastModal = ({
  onHide,
  show,
  podcastId,
  podcastName,
  podcastDesc,
  editPodcast
}) => {
  const [newPodcastName, setNewPodcastName] = useState(podcastName);
  const [newPodcastDesc, setNewPodcastDesc] = useState(podcastDesc);

  const handleChange = e => {
    if (e.target.nodeName === "INPUT") setNewPodcastName(e.target.value);
    if (e.target.nodeName === "TEXTAREA") setNewPodcastDesc(e.target.value);
  };

  const handleClick = e => {
    e.preventDefault();
    let jsonBody = JSON.stringify({
      name: newPodcastName,
      description: newPodcastDesc,
      public: false
    });
    editPodcast(podcastId, jsonBody);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} style={{ color: "black", opacity: 0.9 }}>
      <Modal.Header closeButton>
        <Modal.Title>EDIT PODCAST</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="form-group">
            <label htmlFor="playlist-name">Podcast Name</label>
            <input
              type="text"
              className="form-control"
              name="playlist-name"
              value={newPodcastName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="playlist-desc">Description</label>
            <textarea
              className="form-control"
              name="playlist-desc"
              value={newPodcastDesc}
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
    newPodcastData: state.createPodcastReducer.newPodcastData
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      editPodcast
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPodcastModal);
