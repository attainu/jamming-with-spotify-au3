import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import defaultCover from "./music.jpg";
import {
  fetchCategories,
  fetchNewReleases,
  fetchFeatured
} from "../../redux/actions/browseActions";
import {
  fetchPlaylistSongs,
  addPlaylistItem,
  fetchPlaylistsMenu,
  unFollowPlaylist
} from "../../redux/actions/playlistActions";
import { updateHeaderTitle } from "../../redux/actions/uiActions";
import { updateViewType } from "../../redux/actions/songActions";
import { followPlaylist } from "../../redux/actions/playlistActions";
import { saveAlbum, fetchAlbums } from "../../redux/actions/albumActions";
import "./MainHeader.css";

const MainHeader = ({
  pauseSong,
  resumeSong,
  fetchCategories,
  fetchNewReleases,
  fetchFeatured,
  fetchPlaylistSongs,
  followPlaylist,
  addPlaylistItem,
  updateHeaderTitle,
  updateViewType,
  songPaused,
  headerTitle,
  viewType,
  playlistMenu,
  albums,
  searchAlbumList,
  playlists,
  categoryPlaylists,
  token,
  userId,
  artists,
  releaseAlbum,
  saveAlbum,
  fetchAlbums
}) => {
  let currentPlaylist;
  let currentAlbum;
  let currentArtist;

  const handleFollow = playlistId => {
    console.log(playlistId);
    followPlaylist(playlistId, token);
  };

  const handleAlbumSave = albumId => {
    console.log(albumId);
    saveAlbum(albumId, token);
    fetchAlbums(token);
  };

  if (viewType === "playlist") {
    currentPlaylist = playlists.filter(playlist => {
      return playlist.name === headerTitle;
    })[0];
    console.log("Current Playlist", currentPlaylist);
  }

  if (viewType === "Album") {
    currentAlbum = albums.filter(item => {
      return item.album.name === headerTitle;
    })[0]
      ? albums.filter(item => {
          return item.album.name === headerTitle;
        })[0]
      : searchAlbumList.filter(item => {
          return item.name === headerTitle;
        })[0];
    console.log(currentAlbum);
  }

  if (viewType === "New Release Album") {
    currentAlbum = { ...releaseAlbum };
    console.log(currentAlbum);
  }

  if (viewType === "Artist" && artists.length > 0) {
    currentArtist = artists.filter(artist => {
      return artist.name === headerTitle;
    })[0];
    console.log(currentArtist);
  }

  return (
    <div className="section-title">
      {viewType === "playlist" && (
        <div className="playlist-title-container">
          <div className="playlist-image-container">
            <img
              className="playlist-image"
              src={
                !currentPlaylist.images[0]
                  ? defaultCover
                  : currentPlaylist.images[0].url
              }
            />
          </div>
          <div className="playlist-info-container">
            <p className="playlist-text">PLAYLIST</p>
            <h3 className="header-title">{headerTitle}</h3>
            <h4 className="playlist-desc">{currentPlaylist.description}</h4>
            <p className="created-by">
              Created By:{" "}
              <span className="lighter-text">
                {currentPlaylist.owner.display_name}
              </span>{" "}
              - {currentPlaylist.tracks.total}{" "}
              {currentPlaylist.tracks.total > 1 ? "songs" : "song"}
            </p>
            {playlistMenu.findIndex(
              playlist => playlist.name === headerTitle
            ) === -1 ? (
              <button
                className="follow-btn"
                onClick={() => handleFollow(currentPlaylist.id)}
              >
                FOLLOW
              </button>
            ) : (
              <span className="following-text">FOLLOWING</span>
            )}
            <button
              onClick={!songPaused ? pauseSong : resumeSong}
              className="main-pause-play-btn"
            >
              {songPaused ? "PLAY" : "PAUSE"}
            </button>
          </div>
        </div>
      )}

      {viewType === "Category Playlist" && categoryPlaylists
        ? categoryPlaylists.map((currentPlaylist, index) => {
            const getPlaylistSongs = () => {
              addPlaylistItem(currentPlaylist);
              console.log(currentPlaylist.owner.id, currentPlaylist.id, token);
              fetchPlaylistSongs(
                currentPlaylist.owner.id,
                currentPlaylist.id,
                token
              );
              updateHeaderTitle(currentPlaylist.name);
            };

            return (
              <>
                <div
                  className="playlist-title-container"
                  style={{ cursor: "pointer" }}
                  key={index}
                  onClick={() => getPlaylistSongs()}
                >
                  <div className="playlist-image-container">
                    <img
                      className="playlist-image"
                      src={
                        currentPlaylist.images[0]
                          ? currentPlaylist.images[0].url
                          : null
                      }
                    />
                  </div>
                  <div className="playlist-info-container">
                    <p className="playlist-text">PLAYLIST</p>
                    <h3 className="header-title">{currentPlaylist.name}</h3>
                    <h4 className="playlist-desc">
                      {currentPlaylist.description}
                    </h4>
                    <p className="created-by">
                      Created By:{" "}
                      <span className="lighter-text">
                        {currentPlaylist.owner.display_name}
                      </span>{" "}
                      - {currentPlaylist.tracks.total} songs
                    </p>
                    <button
                      onClick={!songPaused ? pauseSong : resumeSong}
                      className="main-pause-play-btn"
                    ></button>
                  </div>
                </div>
                <br />
              </>
            );
          })
        : null}

      {viewType === "Album" && currentAlbum && (
        <div>
          <div className="current-album-header-container">
            <img
              alt="albumName"
              className="current-album-image"
              src={
                currentAlbum.album
                  ? currentAlbum.album.images[0].url
                  : currentAlbum.images[0].url
              }
            />
            <div className="current-album-info">
              <p>Album from your library</p>
              <h3>
                {currentAlbum.album
                  ? currentAlbum.album.name
                  : currentAlbum.name}
              </h3>
              <p className="created-by">
                By:{" "}
                <span className="lighter-text">
                  {currentAlbum.album
                    ? currentAlbum.album.artists[0].name
                    : currentAlbum.artists[0].name}{" "}
                </span>{" "}
                -{" "}
                {currentAlbum.album
                  ? currentAlbum.album.total_tracks
                  : currentAlbum.total_tracks}{" "}
                {currentAlbum.album
                  ? currentAlbum.album.total_tracks > 1
                    ? "songs"
                    : "song"
                  : currentAlbum.total_tracks > 1
                  ? "songs"
                  : "song"}
              </p>
              {albums.findIndex(item => item.album.name === headerTitle) ===
              -1 ? (
                <button
                  className="follow-btn"
                  onClick={() =>
                    currentAlbum.album
                      ? handleAlbumSave(currentAlbum.album.id)
                      : handleAlbumSave(currentAlbum.id)
                  }
                >
                  + LIBRARY
                </button>
              ) : (
                <span className="following-text">SAVED TO LIBRARY</span>
              )}
              <button
                onClick={!songPaused ? pauseSong : resumeSong}
                className="main-pause-play-btn album-button"
              >
                {songPaused ? "PLAY" : "PAUSE"}
              </button>
            </div>
          </div>
        </div>
      )}

      {viewType === "New Release Album" && (
        <div className="playlist-title-container">
          <div className="playlist-image-container">
            <img
              className="playlist-image"
              src={currentAlbum.images[0] ? currentAlbum.images[0].url : null}
            />
          </div>
          <div className="playlist-info-container">
            <p className="playlist-text">NEW RELEASE ALBUM</p>
            <h3 className="header-title">{headerTitle}</h3>
            <p className="created-by">
              By:{" "}
              <span className="lighter-text">
                {currentAlbum.artists[0].name}
              </span>{" "}
              - {currentAlbum.total_tracks}{" "}
              {currentAlbum.total_tracks > 1 ? "songs" : "song"}
            </p>
            {albums.findIndex(item => item.album.name === headerTitle) ===
            -1 ? (
              <button
                className="follow-btn"
                onClick={() => handleAlbumSave(currentAlbum.id)}
              >
                + LIBRARY
              </button>
            ) : (
              <span className="following-text">SAVED TO LIBRARY</span>
            )}
            <button
              onClick={!songPaused ? pauseSong : resumeSong}
              className="main-pause-play-btn"
            >
              {songPaused ? "PLAY" : "PAUSE"}
            </button>
          </div>
        </div>
      )}

      {viewType === "Artist" && currentArtist && (
        <div>
          <div className="current-artist-header-container">
            <img
              alt="artistName"
              className="current-artist-image"
              src={currentArtist.images[0].url}
            />
            <div className="current-artist-info">
              <p>Artist from your library</p>
              <h3>{currentArtist.name}</h3>
            </div>
          </div>
          <button
            onClick={!songPaused ? pauseSong : resumeSong}
            className="main-pause-play-btn artist-button"
          >
            {songPaused ? "PLAY" : "PAUSE"}
          </button>
        </div>
      )}

      {(headerTitle === "Liked Songs" ||
        headerTitle === "Songs" ||
        headerTitle === "Recently Played" ||
        headerTitle === "Albums" ||
        headerTitle === "Artists" ||
        headerTitle === "Search Results..." ||
        headerTitle === "Top Tracks") && (
        <div>
          <h3 className="header-title">{headerTitle}</h3>
          {headerTitle !== "Artists" && headerTitle !== "Albums" && (
            <button
              onClick={!songPaused ? pauseSong : resumeSong}
              className="main-pause-play-btn"
            >
              {songPaused ? "PLAY" : "PAUSE"}
            </button>
          )}
        </div>
      )}

      {headerTitle === "Browse" && (
        <div>
          <h3 className="header-title">{headerTitle}</h3>
          <div className="browse-headers">
            <p
              className={viewType === "Genres" ? "active" : ""}
              onClick={() => {
                fetchCategories(token);
                updateViewType("Genres");
                updateHeaderTitle("Browse");
              }}
            >
              Genres
            </p>
            <p
              className={viewType === "New Releases" ? "active" : ""}
              onClick={() => {
                fetchNewReleases(token);
                updateViewType("New Releases");
                updateHeaderTitle("Browse");
              }}
            >
              New Releases
            </p>
            <p
              className={viewType === "Featured" ? "active" : ""}
              onClick={() => {
                fetchFeatured(token);
                updateViewType("Featured");
                updateHeaderTitle("Browse");
              }}
            >
              Featured
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

MainHeader.propTypes = {
  pauseSong: PropTypes.func,
  resumeSong: PropTypes.func,
  fetchCategories: PropTypes.func,
  fetchNewReleases: PropTypes.func,
  fetchFeatured: PropTypes.func,
  updateHeaderTitle: PropTypes.func,
  updateViewType: PropTypes.func,
  songPaused: PropTypes.bool,
  headerTitle: PropTypes.string,
  viewType: PropTypes.string,
  playlists: PropTypes.array,
  categoryPlaylists: PropTypes.array,
  playlistMenu: PropTypes.array,
  token: PropTypes.string,
  artists: PropTypes.array,
  releaseAlbum: PropTypes.object,
  albums: PropTypes.array
};

const mapStateToProps = state => {
  return {
    songPaused: state.songsReducer.songPaused,
    headerTitle: state.uiReducer.title,
    viewType: state.songsReducer.viewType,
    playlistMenu: state.playlistReducer.playlistMenu,
    playlists: state.playlistReducer.playlists,
    categoryPlaylists: state.categoryPlaylistReducer.categoryPlaylists,
    releaseAlbum: state.albumsReducer.releaseAlbum,
    artists: state.artistsReducer.artistList
      ? state.artistsReducer.artistList.items
      : [],
    userId: state.userReducer.user ? state.userReducer.user.id : "",
    token: state.tokenReducer.token,
    albums: state.albumsReducer.albums ? state.albumsReducer.albums : [],
    searchAlbumList: state.searchAlbumReducer.searchAlbumList
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchCategories,
      fetchNewReleases,
      fetchPlaylistSongs,
      fetchPlaylistsMenu,
      addPlaylistItem,
      updateHeaderTitle,
      updateViewType,
      fetchFeatured,
      followPlaylist,
      saveAlbum,
      fetchAlbums
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainHeader);
