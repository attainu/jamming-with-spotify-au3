import React, { Component, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  fetchPlaylistsMenu,
  fetchPlaylistSongs
} from "../../redux/actions/playlistActions";
import { updateHeaderTitle } from "../../redux/actions/uiActions";
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
  updateHeaderTitle
}) => {
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.userId !== "" && nextProps.token !== "") {
  //     this.props.fetchPlaylistsMenu(nextProps.userId, nextProps.token);
  //   }
  // }

  useEffect(() => {
    if (userId !== "" && token !== "") {
      fetchPlaylistsMenu(userId, token);
    }
  }, [userId, token, newPlaylistData]);

  const renderPlaylists = () => {
    return playlistMenu.map(playlist => {
      const getPlaylistSongs = () => {
        fetchPlaylistSongs(playlist.owner.id, playlist.id, token);
        updateHeaderTitle(playlist.name);
      };

      return (
        <li
          onClick={getPlaylistSongs}
          className={
            title === playlist.name ? "active side-menu-item" : "side-menu-item"
          }
          key={playlist.id}
        >
          {playlist.name}
        </li>
      );
    });
  };

  //render() {
  return (
    <div className="user-playlist-container">
      <h3 className="user-playlist-header">Playlists</h3>
      {playlistMenu && renderPlaylists()}
    </div>
  );
};
//}

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
    newPlaylistData: state.createPlaylistReducer.newPlaylistData
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
