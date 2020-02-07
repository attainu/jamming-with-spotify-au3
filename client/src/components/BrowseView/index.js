import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  fetchPlaylistSongs,
  addPlaylistItem
} from "../../redux/actions/playlistActions";
import { updateViewType } from "../../redux/actions/songActions";
import { updateHeaderTitle } from "../../redux/actions/uiActions";
import "./BrowseView.css";
import { fetchAlbumTracks, addAlbum } from "../../redux/actions/albumActions";

const BrowseView = ({
  view,
  viewType,
  token,
  fetchPlaylistSongs,
  updateHeaderTitle,
  updateViewType,
  addPlaylistItem,
  addAlbum,
  fetchAlbumTracks
}) => {
  let browseView;

  if (view) {
    browseView = view.map((item, i) => {
      const getPlaylistSongs = () => {
        addPlaylistItem(item);
        console.log(item.owner.id, item.id, token);
        fetchPlaylistSongs(item.owner.id, item.id, token);
        updateHeaderTitle(item.name);
      };

      const getAlbumSongs = () => {
        addAlbum(item);
        fetchAlbumTracks(token, item.id);
        updateViewType("New Release Album");
        //fetchPlaylistSongs(item.owner.id, item.id, token);
        updateHeaderTitle(item.name);
      };

      return (
        <li
          onClick={
            viewType === "Featured"
              ? getPlaylistSongs
              : viewType === "New Releases"
              ? getAlbumSongs
              : null
          }
          className="category-item"
          key={i}
        >
          <div className="category-image">
            <img
              alt="feature-cover"
              src={item.icons ? item.icons[0].url : item.images[0].url}
            />
            {viewType === "Genres" && (
              <p className="category-name">{item.name}</p>
            )}
          </div>
        </li>
      );
    });
  }

  return <ul className="browse-view-container">{browseView}</ul>;
};

BrowseView.propTypes = {
  view: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  viewType: PropTypes.string,
  token: PropTypes.string,
  fetchPlaylistSongs: PropTypes.func,
  fetchAlbumTracks: PropTypes.func,
  updateHeaderTitle: PropTypes.func,
  addPlaylistItem: PropTypes.func,
  addAlbum: PropTypes.func
};

const mapStateToProps = state => {
  return {
    view: state.browseReducer.view,
    viewType: state.songsReducer.viewType,
    token: state.tokenReducer.token
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchPlaylistSongs,
      updateHeaderTitle,
      updateViewType,
      addPlaylistItem,
      addAlbum,
      fetchAlbumTracks
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(BrowseView);
