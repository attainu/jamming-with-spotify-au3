import React, { Component, useEffect, useState } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
// import moment from "moment";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  searchSongs,
  fetchSongs
  //   fetchRecentlyPlayed,
  //   fetchTopTracks
} from "../../redux/actions/songActions";
import "../SongList/SongList.css";
import AddToPlaylistModal from "../Modals/AddToPlaylistModal";
import {
  addSongToLibrary,
  removeSongFromLibrary
} from "../../redux/actions/userActions";
import { removeTrackFromPlaylist } from "../../redux/actions/playlistActions";

//class SongList extends Component {
const SongList = ({
  userId,
  token,
  headerTitle,
  songs,
  playlistMenu,
  likedSongs,
  fetchSongsError,
  fetchSongsPending,
  viewType,
  fetchSongs,
  searchSongs,
  songPlaying,
  songPaused,
  resumeSong,
  pauseSong,
  audioControl,
  songId,
  songAddedId,
  removeTrackFromPlaylist,
  addSongToLibrary,
  removeSongFromLibrary,
  fetchPlaylistSongsPending,
  searchSongsPending,
  searchSongsError
}) => {
  const [addModalShow, setModal] = useState(false);
  const [trackURI, setTrackURI] = useState("");

  // componentWillReceiveProps(nextProps) {
  //   if (
  //     nextProps.token !== "" &&
  //     !nextProps.fetchSongsError &&
  //     nextProps.fetchSongsPending &&
  //     nextProps.viewType === "songs"
  //   ) {
  //     this.props.fetchSongs(nextProps.token);
  //   }
  // if (
  //   nextProps.token !== "" &&
  //   !nextProps.searchSongsError &&
  //   nextProps.searchSongsPending &&
  //   nextProps.viewType === "songs"
  // )
  //   else {
  //     this.props.searchSongs(nextProps.token);
  //   }
  // }

  useEffect(() => {
    if (
      token !== "" &&
      !fetchSongsError &&
      fetchSongsPending
      // viewType === "songs"
    ) {

      fetchSongs(token);
    } else {
      searchSongs(token);
    }
  }, [token, likedSongs]);

  const openModal = e => {
    setModal(true);
    let trackName =
      e.target.parentElement.parentElement.parentElement.parentElement
        .children[3].children[0].innerText;
    console.log(trackName);
    console.log(
      songs.filter(song => song.track.name === trackName)[0].track.uri
    );
    setTrackURI(
      songs.filter(song => song.track.name === trackName)[0].track.uri
    );
  };

  let addModalClose = () => {
    setModal(false);
  };

  const handleRemoveTrack = e => {
    let trackName =
      e.target.parentElement.parentElement.parentElement.parentElement
        .children[3].children[0].innerText;
    console.log(trackName);
    console.log(
      songs.filter(song => song.track.name === trackName)[0].track.uri
    );
    setTrackURI(
      songs.filter(song => song.track.name === trackName)[0].track.uri
    );

    let playlistID = playlistMenu.filter(
      playlist => playlist.name === headerTitle
    )[0].id;

    console.log(playlistID);

    removeTrackFromPlaylist(playlistID, trackURI, token);
  };

  const msToMinutesAndSeconds = ms => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  function toggleButton(e, token, songID) {
    console.log(e.target);
    if (e.target.classList.contains("fa-check")) {
      e.target.className = "fa fa-plus";
      removeSongFromLibrary(token, songID);
    } else if (e.target.classList.contains("fa-plus")) {
      e.target.className = "fa fa-check";
      addSongToLibrary(token, songID);
    }
    //fetchSongs(token);
  }

  const renderSongs = () => {
    return songs
      ? songs.map((song, i) => {
          let songID = song.track.id;
          //console.log(song.added_by);
          const buttonClass =
            song.track.id === songId && !songPaused
              ? "fa-pause-circle-o"
              : "fa-play-circle-o";

          return (
            <li
              className={
                song.track.id === songId
                  ? "active user-song-item"
                  : "user-song-item"
              }
              key={i}
            >
              <div
                onClick={() => {
                  song.track.id === songId && songPlaying && songPaused
                    ? resumeSong()
                    : songPlaying && !songPaused && song.track.id === songId
                    ? pauseSong()
                    : audioControl(song);
                }}
                className="play-song"
              >
                <i
                  className={`fa ${buttonClass} play-btn`}
                  aria-hidden="true"
                />
              </div>

              {viewType !== "Liked Songs" && (
                <>
                  <p className="fav-song">
                    <i className="fa fa-heart-o" aria-hidden="true" />
                  </p>
                  &nbsp;
                  <p className="add-song">
                    {/* {songAddedId === songID || */}
                    {likedSongs.findIndex(song => song.track.id === songID) >
                    -1 ? (
                      <i
                        className={"fa fa-check"}
                        aria-hidden="true"
                        onClick={e => toggleButton(e, token, songID)}
                      />
                    ) : (
                      <i
                        className="fa fa-plus"
                        aria-hidden="true"
                        onClick={e => toggleButton(e, token, songID)}
                      />
                    )}
                  </p>
                </>

              )}

              {/* {viewType === "songs" && (
                <p className="add-song">
                  <i className="fa fa-check" aria-hidden="true" />
                </p>
              )} */}
              {/* 
          {this.props.viewType === "search" && (
            <p className="add-song">
              <i className="fa fa-plus" aria-hidden="true" />
            </p>
          )}

          {this.props.viewType === "Top Tracks" && (
            <p className="add-song">
              <i className="fa fa-plus" aria-hidden="true" />
            </p>
          )}

          {this.props.viewType === "Recently Played" && (
            <p className="add-song">
              <i className="fa fa-plus" aria-hidden="true" />
            </p>
          )} */}

              <div className="song-title">
                <p>{song.track.name}</p>
              </div>

              <div className="song-artist">
                <p>{song.track.artists[0].name}</p>
              </div>

              <div className="song-album">
                <p>{song.track.album.name}</p>
              </div>

              <div className="song-added">
                <p>{song.track.album.release_date}</p>
                {/* <p>{moment(song.added_at).format("YYYY-MM-DD")}</p> */}
              </div>

              <div className="song-length">
                <p>
                  {msToMinutesAndSeconds(
                    song.track.duration_ms
                      ? song.track.duration_ms
                      : song.duration_ms
                  )}
                </p>
              </div>

              {song.added_by ? (
                song.added_by.id === userId ? (
                  <div className="remove-song-playlist">
                    <DropdownButton
                      id="dropdown-button-drop-right"
                      title=""
                      drop="right"
                      variant="secondary"
                      key="right"
                    >
                      <Dropdown.Item
                        href="#"
                        className="options-dropdown"
                        onClick={handleRemoveTrack}
                      >
                        - &nbsp; Remove from Playlist
                      </Dropdown.Item>
                    </DropdownButton>
                  </div>
                ) : (
                  <>
                    <div className="add-song-playlist">
                      <DropdownButton
                        id="dropdown-button-drop-right"
                        title=""
                        drop="right"
                        variant="secondary"
                        key="right"
                      >
                        <Dropdown.Item
                          href="#"
                          className="options-dropdown"
                          onClick={openModal}
                        >
                          + &nbsp; Spotify Playlist
                        </Dropdown.Item>
                      </DropdownButton>
                    </div>
                    <AddToPlaylistModal
                      onHide={addModalClose}
                      show={addModalShow}
                      trackURI={trackURI}
                    />
                  </>
                )
              ) : (
                <>
                  <div className="add-song-playlist">
                    <DropdownButton
                      id="dropdown-button-drop-right"
                      title=""
                      drop="right"
                      variant="secondary"
                      key="right"
                    >
                      <Dropdown.Item
                        href="#"
                        className="options-dropdown"
                        onClick={openModal}
                      >
                        + &nbsp; Spotify Playlist
                      </Dropdown.Item>
                    </DropdownButton>
                  </div>
                  {addModalShow && (
                    <AddToPlaylistModal
                      onHide={addModalClose}
                      show={addModalShow}
                      trackURI={trackURI}
                    />
                  )}
                </>
              )}
            </li>
          );
        })
      : null;
  };

  //render() {
  console.log("View Type:", viewType);
  return (
    <div className="song-container">
      <div className="song-header-container">
        <div className="song-title-header">
          <p>Title</p>
        </div>
        <div className="song-artist-header">
          <p>Artist</p>
        </div>
        <div className="song-album-header">
          <p>Album</p>
        </div>
        <div className="song-added-header">
          <i className="fa fa-calendar-plus-o" aria-hidden="true" />
        </div>
        <div className="song-length-header">
          <p>
            <i className="fa fa-clock-o" aria-hidden="true" />
          </p>
        </div>
      </div>
      {songs &&
        !fetchSongsPending &&
        !fetchPlaylistSongsPending &&
        renderSongs()}

      {songs && !searchSongsPending && !searchSongsError && renderSongs()}

      {/* {this.props.songs &&
          !this.props.fetchSongsError &&
          !this.props.fetchSongsPending &&
          this.renderSongs()} */}

      {/* {this.props.songs &&
          !this.props.fetchTopTracksPending &&
          !this.props.fetchTopTracksError &&
          this.renderSongs()} */}

      {/* {this.props.songs &&
          !this.props.fetchPlaylistSongsPending &&
          !this.props.fetchPlaylistSongsError &&
          this.renderSongs()} */}

      {/* {this.props.songs &&
          !this.props.browseAlbumPending &&
          !this.props.browseAlbumError &&
          this.renderSongs()} */}
    </div>
  );
  //}
};


SongList.propTypes = {
  viewType: PropTypes.string,
  token: PropTypes.string,
  headerTitle: PropTypes.string,
  songId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  songAddedId: PropTypes.string,
  songs: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  likedSongs: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  searchSongsError: PropTypes.bool,
  searchSongsPending: PropTypes.bool,
  searchSongs: PropTypes.func,
  fetchTopTracksPending: PropTypes.bool,
  fetchTopTracksError: PropTypes.bool,
  fetchSongsError: PropTypes.bool,
  fetchSongsPending: PropTypes.bool,
  fetchPlaylistSongsPending: PropTypes.bool,
  fetchPlaylistSongsError: PropTypes.bool,
  playlistMenu: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  fetchSongs: PropTypes.func,
  audioControl: PropTypes.func,
  songPaused: PropTypes.bool,
  songPlaying: PropTypes.bool,
  resumeSong: PropTypes.func,
  pauseSong: PropTypes.func

};

const mapStateToProps = state => {
  return {
    userId: state.userReducer.user ? state.userReducer.user.id : "",
    token: state.tokenReducer.token ? state.tokenReducer.token : "",
    headerTitle: state.uiReducer.title,
    songs: state.songsReducer.songs ? state.songsReducer.songs : [],
    likedSongs: state.songsReducer.likedSongs
      ? state.songsReducer.likedSongs
      : [],
    searchSongsError: state.songsReducer.searchSongsError,
    searchSongsPending: state.songsReducer.searchSongsPending,
    fetchTopTracksError: state.songsReducer.fetchTopTracksError,
    fetchTopTracksPending: state.songsReducer.fetchTopTracksPending,
    fetchSongsError: state.songsReducer.fetchSongsError,
    fetchSongsPending: state.songsReducer.fetchSongsPending,
    fetchPlaylistSongsPending: state.songsReducer.fetchPlaylistSongsPending,
    fetchPlaylistSongsError: state.songsReducer.fetchPlaylistSongsError,
    playlistMenu: state.playlistReducer.playlistMenu,
    songPlaying: state.songsReducer.songPlaying,
    songPaused: state.songsReducer.songPaused,
    songId: state.songsReducer.songId,
    songAddedId: state.userReducer.songId || "",
    viewType: state.songsReducer.viewType
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchSongs,
      removeTrackFromPlaylist,
      addSongToLibrary,
      removeSongFromLibrary,
      searchSongs
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SongList);
