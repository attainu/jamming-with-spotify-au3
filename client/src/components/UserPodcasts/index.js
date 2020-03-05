import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  fetchPodcastMenu,
  fetchPodcastSongs,
  deletePodcast
} from "../../redux/actions/podcastActions";
import {fetchUser} from '../../redux/actions/userActions'
import { updateHeaderTitle } from "../../redux/actions/uiActions";
import DeletePodcastModal from "../Modals/DeletePodcast";
import EditPodcastModal from "../Modals/EditPodcastModal";
import "../UserPlaylists/UserPlaylists.css";

const UserPodcasts = ({
  podcastMenu,
  fetchPodcastMenu,
  userName,
  newPodcastData,
  delResponse,
  updateRes,
  fetchPodcastSongs,
  updateHeaderTitle,
  title,

}) => {  

  const [addPodcastModalShow, setPodcastModal] = useState(false);
  const [editModalShow, setEditModal] = useState(false);
  const [podcastName, setpodcastName] = useState("");
  const [podcastId, setpodcastId] = useState("");
  const [podcastDesc, setPodcastDesc] = useState("");

  const openModal = e => {
    setPodcastModal(true);
    let podcastname = e.target.parentElement.parentElement.previousSibling.previousSibling.innerText.trim();
    let podcastid = e.target.parentElement.parentElement.previousSibling.previousSibling.getAttribute(
      "data-key"
    );

    setpodcastName(podcastname);
    setpodcastId(podcastid);

    setTimeout(() => console.log(podcastId, podcastName));
  };

  let addPodcastModalClose = () => {
    setPodcastModal(false);
  };

  const openEditModal = e => {
    setEditModal(true);
    let podcastname = e.target.parentElement.parentElement.previousSibling.innerText.trim();
    setpodcastName(podcastname);

    let podcastdesc = podcastMenu.filter(
      podcast => podcast.podcastName === podcastname
    )[0].description
    setPodcastDesc(podcastdesc);

    let podcastid = e.target.parentElement.parentElement.previousSibling.getAttribute(
      "data-key"
    );
    setpodcastId(podcastid);
  };

  let editModalClose = () => {
    setEditModal(false);
  };

  useEffect(() => {
   fetchPodcastMenu(userName)
  }, [userName,newPodcastData, delResponse, updateRes])

  const renderPodcasts = () => {
    return podcastMenu.map(podcast => {
      const getPodcastSongs = () => {
        fetchPodcastSongs(podcast.id);
        fetchPodcastMenu(userName)
        updateHeaderTitle(podcast.podcastName);
      };

      return (
        <div className="user-playlist-item" key={Math.random()*10}>
        <li
          onClick={getPodcastSongs}
          className={
            title === podcast.podcastName
              ? "active side-menu-item"
              : "side-menu-item"
          }
          key={podcast.id}
          data-key={podcast.id}
        >
          {podcast.podcastName}
        </li>
          {
            <>
              <div className="edit-btn">
                <span>
                  <i className="fa fa-edit" onClick={openEditModal}></i>
                </span>
                {podcastId && podcastName && podcastDesc && (
                  <EditPodcastModal
                    onHide={editModalClose}
                    show={editModalShow}
                    podcastId={podcastId}
                    podcastDesc={podcastDesc}
                    podcastName={podcastName}
                  />
                )}
              </div>
              <div className="delete-btn">
                  <span>
                    <i className="fa fa-minus-circle" onClick={openModal}></i>
                  </span>
                    <DeletePodcastModal
                    onHide={addPodcastModalClose}
                    show={addPodcastModalShow}
                    podcastId={podcastId}
                    podcastName={podcastName}
                  />
                </div>
            </>
          }
          </div>
      );
    });
  }

    return (
      <div className="user-playlist-container">
        <h3 className="user-playlist-header">Podcasts</h3>
        {podcastMenu && renderPodcasts()}
      </div>
    );
  
}

UserPodcasts.propTypes = {
  title: PropTypes.string,
  podcastMenu: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  fetchPodcastMenu: PropTypes.func,
  fetchPodcastSongs: PropTypes.func,
  updateHeaderTitle: PropTypes.func
};

const mapStateToProps = state => {
  return {
    podcastMenu: state.podcastReducer.podcastMenu
      ? state.podcastReducer.podcastMenu
      : "",
    title: state.uiReducer.title,
    newPodcastData: state.createPodcastReducer.newPodcastData,
    delResponse : state.deletePodcastReducer.delResponse,
    userName : state.userReducer.user ? state.userReducer.user.display_name : "",
    updateRes : state.editPodcastReducer.updatedPodcastResponse
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchPodcastMenu,
      fetchPodcastSongs,
      fetchUser,
      updateHeaderTitle,
      deletePodcast
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPodcasts);
