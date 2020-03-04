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
import "../UserPlaylists/UserPlaylists.css";

const UserPodcasts = (props) => {  

  const [addPodcastModalShow, setPodcastModal] = useState(false);
  const [podcastName, setpodcastName] = useState("");
  const [podcastId, setpodcastId] = useState("");

  const openModal = e => {
    setPodcastModal(true);
    setpodcastName(
      e.target.parentElement.parentElement.previousSibling.innerText
    );
    setpodcastId(
      e.target.parentElement.parentElement.previousSibling.getAttribute(
        "data-key"
      )
    );

    setTimeout(() => console.log(podcastId, podcastName));
  };

  let addPodcastModalClose = () => {
    setPodcastModal(false);
  };


  useEffect(() => {
   props.fetchPodcastMenu(props.userName)
   console.log(props)
  }, [props.userName,props.newPodcastData, props.delResponse])

  const renderPodcasts = () => {
    return props.podcastMenu.map(podcast => {
      const getPodcastSongs = () => {
        props.fetchPodcastSongs(podcast.id);
        props.fetchPodcastMenu(props.userName)
        props.updateHeaderTitle(podcast.podcastName);
      };

      return (
        <div className="user-playlist-item" key={Math.random()*10}>
        <li
          onClick={getPodcastSongs}
          className={
            props.title === podcast.podcastName
              ? "active side-menu-item"
              : "side-menu-item"
          }
          key={podcast.id}
          data-key={podcast.id}
        >
          {podcast.podcastName}
        </li>
          {
            <div className="delete-btn">
              <span>
                <i className="fa fa-times-circle" onClick={openModal}></i>
              </span>
              <DeletePodcastModal
                onHide={addPodcastModalClose}
                show={addPodcastModalShow}
                podcastId={podcastId}
                podcastName={podcastName}
              />
            </div>
          }
          </div>
      );
    });
  }

    return (
      <div className="user-playlist-container">
        <h3 className="user-playlist-header">Podcasts</h3>
        {props.podcastMenu && renderPodcasts()}
      </div>
    );
  
}

UserPodcasts.propTypes = {
  // userId: PropTypes.string,
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
    userName : state.userReducer.user ? state.userReducer.user.display_name : ""
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
