import React, { Component,useState, useEffect } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  fetchFavourites
} from "../../redux/actions/songActions";
import "../SongList/SongList.css";
import AddToPlaylistModal from "../Modals/AddToPlaylistModal";
import AddToPodcastModal from '../Modals/AddToPodcastModal'
// import { addSongToLibrary } from "../../redux/actions/userActions";

const FavouriteSongs = ({
  favouriteSongs,
  fetchFavouritesError,
  fetchFavouritesPending,
  viewType,
  userId,
  addFavourites,
  fetchFavourites,
  songPlaying,
  songPaused,
  resumeSong,
  pauseSong,
  audioControl,
  songId,
  fetchPlaylistSongsPending,
  fetchPlaylistPending,
  newFavSong
//   addSongToLibrary
}) => {
 
  useEffect(() => {
    if (
      !fetchFavouritesError &&
      !fetchFavouritesPending &&
      viewType === "Favourite Songs"
    ) {
      fetchFavourites();
    }
  }, [newFavSong]);

  const [addModalShow, setModal] = useState(false);
  const [trackURI, setTrackURI] = useState("");

  const openModal = e => {
    setModal(true);
    // let trackName =
    //   e.target.parentElement.parentElement.parentElement.parentElement
    //     .children[2].children[0].innerText;
    // console.log(trackName);
    // setTrackURI(
    //   songs.filter(song => song.track.name === trackName)[0].track.uri
    // );
  };

  const addModalClose = () => {
    setModal(false);
  };

  const [addPodcastModalShow, setPodcastModal] = useState(false);

  const openPodcastModal = e => {
    setPodcastModal(true)
  }

  const addPodcastModalClose = () => {
    setPodcastModal(false);
  };

  const renderSongs = () => {
    return favouriteSongs
      ? favouriteSongs.map((song, i) => {
          let songID = song.id;
          const buttonClass =
            song.id === songId && !songPaused
              ? "fa-pause-circle-o"
              : "fa-play-circle-o";

          return (
            <li
              className={
                song.id === songId
                  ? "active user-song-item"
                  : "user-song-item"
              }
              key={i}
            >
              <div
                onClick={() => {
                  song.id === songId && songPlaying && songPaused
                    ? resumeSong()
                    : songPlaying && !songPaused && song.id === songId
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

              <div className="song-title">
                <p>{song.trackName}</p>
              </div>

              <div className="song-artist">
                <p>{song.artistName}</p>
              </div>

              <div className="song-album">
                <p>{song.albumName}</p>
              </div>

              <div className="song-added">
                <p>{song.albumReleaseDate}</p>
              </div>

              <div className="song-length">
                <p>{song.duration}</p>
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
                        // onClick={openModal}
                      >
                        - &nbsp; Remove from Playlist
                      </Dropdown.Item>
                    </DropdownButton>
                  </div>
                ) : null
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
                      <Dropdown.Item
                        href="#"
                        className="options-dropdown"
                        onClick={openPodcastModal}
                      >
                        + &nbsp; Podcast
                      </Dropdown.Item>
                    </DropdownButton>
                  </div>
                  <AddToPlaylistModal
                  onHide={addModalClose}
                  show={addModalShow}
                  trackURI={trackURI}
                />

                <AddToPodcastModal
                  onHide={addPodcastModalClose}
                  show={addPodcastModalShow}
                  // trackURI={trackURI}
                />
                </>
              )}
            </li>
          );
        })
      : null;
  };

  console.log("View Type:", viewType);
  return (
    <div>
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
      {favouriteSongs &&
        !fetchFavouritesPending &&
        renderSongs()}

    </div>
  );
};

FavouriteSongs.propTypes = {
  viewType: PropTypes.string,
  songId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  songAddedId: PropTypes.string,
  favouriteSongs: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  fetchFavouritesError: PropTypes.bool,
  fetchFavouritesPending: PropTypes.bool,
  fetchPlaylistSongsPending: PropTypes.bool,
  fetchPlaylistPending: PropTypes.bool,
  fetchPlaylistSongsError: PropTypes.bool,
  audioControl: PropTypes.func,
  songPaused: PropTypes.bool,
  songPlaying: PropTypes.bool,
  resumeSong: PropTypes.func,
  pauseSong: PropTypes.func
  // addSongToLibrary: PropTypes.func
};

const mapStateToProps = state => {
  return {
    favouriteSongs: state.songsReducer.favouriteSongs
      ? state.songsReducer.favouriteSongs
      : [],
    fetchFavouritesError: state.songsReducer.fetchFavouritesError,
    fetchFavouritesPending: state.songsReducer.fetchFavouritesPending,
    fetchPlaylistSongsPending: state.songsReducer.fetchPlaylistSongsPending,
    fetchPlaylistPending: state.playlistReducer.fetchPlaylistPending,
    fetchPlaylistSongsError: state.songsReducer.fetchPlaylistSongsError,
    songPlaying: state.songsReducer.songPlaying,
    songPaused: state.songsReducer.songPaused,
    songId: state.songsReducer.songId,
    songAddedId: state.userReducer.songId || "",
    viewType: state.songsReducer.viewType,
    newFavSong: state.songsReducer.newFavSong ?  state.songsReducer.newFavSong : "",
    userId: state.userReducer.user ? state.userReducer.user.id : ""
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchFavourites
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FavouriteSongs);
