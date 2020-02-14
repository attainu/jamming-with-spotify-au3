import React, { Component, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  fetchPlaylistsMenu,
  fetchPlaylistSongs
} from "../../redux/actions/playlistActions";
import { updateHeaderTitle } from "../../redux/actions/uiActions";
import EditModal from "../Modals/EditModal";
import UnFollowModal from "../Modals/UnFollowPlaylistModal";
import "./UserPlaylists.css";

//class UserPlaylists extends Component {
const UserPlaylists = ({
  userId,
  token,
  playlistMenu,
  title,
  newPlaylistData,
  fetchPlaylistSongs,
  fetchPlaylistsMenu,
  updateHeaderTitle,
  updatedPlaylistResponse,
  folResponse,
  delResponse
}) => {
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.userId !== "" && nextProps.token !== "") {
  //     this.props.fetchPlaylistsMenu(nextProps.userId, nextProps.token);
  //   }
  // }

  const [addModalShow, setModal] = useState(false);
  const [editModalShow, setEditModal] = useState(false);
  const [playlistName, setplaylistName] = useState("");
  //const [playlistNameEdit, setplaylistNameEdit] = useState("");
  const [playlistDesc, setplaylistDesc] = useState("");
  const [playlistId, setplaylistId] = useState("");

  const openModal = e => {
    let playlistname, playlistid;
    setModal(true);
    if (e.target.parentElement.parentElement.classList.contains("delete-btn")) {
      playlistname = e.target.parentElement.parentElement.previousSibling.previousSibling.innerText.trim();
      playlistid = e.target.parentElement.parentElement.previousSibling.previousSibling.getAttribute(
        "data-key"
      );
    } else if (
      e.target.parentElement.parentElement.classList.contains(
        "delete-other-btn"
      )
    ) {
      playlistname = e.target.parentElement.parentElement.previousSibling.innerText.trim();
      playlistid = e.target.parentElement.parentElement.previousSibling.getAttribute(
        "data-key"
      );
    }

    setplaylistName(playlistname);
    setplaylistId(playlistid);

    setTimeout(() => console.log(playlistName, playlistDesc));
  };

  const openEditModal = e => {
    setEditModal(true);
    let playlistname = e.target.parentElement.parentElement.previousSibling.innerText.trim();
    setplaylistName(playlistname);
    let playlistdesc = playlistMenu.filter(
      playlist => playlist.name === playlistname
    )[0].description;
    setplaylistDesc(playlistdesc);
    let playlistid = e.target.parentElement.parentElement.previousSibling.getAttribute(
      "data-key"
    );
    setplaylistId(playlistid);
    console.log(playlistid, playlistname, playlistdesc);
  };

  let editModalClose = () => {
    setEditModal(false);
  };

  let addModalClose = () => {
    setModal(false);
  };

  useEffect(() => {
    if (userId !== "" && token !== "") {
      fetchPlaylistsMenu(userId, token);
    }
  }, [
    userId,
    token,
    newPlaylistData,
    updatedPlaylistResponse,
    folResponse,
    delResponse
  ]);

  const renderPlaylists = () => {
    return playlistMenu.map(playlist => {
      const getPlaylistSongs = () => {
        updateHeaderTitle(playlist.name);
        fetchPlaylistsMenu(userId, token);
        fetchPlaylistSongs(playlist.owner.id, playlist.id, token);
      };

      return (
        <>
          <div className="user-playlist-item">
            <li
              onClick={getPlaylistSongs}
              className={
                title === playlist.name
                  ? "active side-menu-item"
                  : "side-menu-item"
              }
              key={playlist.id}
              data-key={playlist.id}
            >
              {playlist.name}
              &nbsp;&nbsp;
            </li>

            {playlist.owner.id === userId ? (
              <>
                <div className="edit-btn">
                  <span>
                    <i className="fa fa-edit" onClick={openEditModal}></i>
                  </span>
                  {playlistId && playlistName && playlistDesc && (
                    <EditModal
                      onHide={editModalClose}
                      show={editModalShow}
                      playlistId={playlistId}
                      playlistDesc={playlistDesc}
                      playlistName={playlistName}
                    />
                  )}
                </div>
                <div className="delete-btn">
                  <span>
                    <i className="fa fa-minus-circle" onClick={openModal}></i>
                  </span>
                  {playlistName && playlistId && (
                    <UnFollowModal
                      onHide={addModalClose}
                      show={addModalShow}
                      playlistId={playlistId}
                      playlistName={playlistName}
                    />
                  )}
                </div>
              </>
            ) : (
              <div className="delete-other-btn">
                <span>
                  <i className="fa fa-minus-circle" onClick={openModal}></i>
                </span>
                {playlistName && playlistId && (
                  <UnFollowModal
                    onHide={addModalClose}
                    show={addModalShow}
                    playlistId={playlistId}
                    playlistName={playlistName}
                  />
                )}
              </div>
            )}
          </div>
        </>
      );
    });
  };

  return (
    <div className="user-playlist-container">
      <h3 className="user-playlist-header">Playlists</h3>
      {playlistMenu && renderPlaylists()}
    </div>
  );
};

UserPlaylists.propTypes = {
  userId: PropTypes.string,
  token: PropTypes.string,
  title: PropTypes.string,
  playlistMenu: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  fetchPlaylistsMenu: PropTypes.func,
  fetchPlaylistSongs: PropTypes.func,
  updateHeaderTitle: PropTypes.func
};

const mapStateToProps = state => {
  return {
    userId: state.userReducer.user ? state.userReducer.user.id : "",
    playlistMenu: state.playlistReducer.playlistMenu
      ? state.playlistReducer.playlistMenu
      : "",
    token: state.tokenReducer.token ? state.tokenReducer.token : "",
    title: state.uiReducer.title,
    newPlaylistData: state.createPlaylistReducer.newPlaylistData,
    updatedPlaylistResponse: state.editPlaylistReducer.updatedPlaylistResponse,
    folResponse: state.followPlaylistReducer.folResponse,
    delResponse: state.unFollowPlaylistReducer.delResponse
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchPlaylistsMenu,
      fetchPlaylistSongs,
      updateHeaderTitle
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPlaylists);
