import React, { Component, useEffect, useState } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
// import moment from "moment";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  //searchSongs,
  fetchSongs,
  fetchFavourites,
  addFavourites
} from "../../redux/actions/songActions";
import "../SongList/SongList.css";
import AddToPlaylistModal from "../Modals/AddToPlaylistModal";
import AddToPodcastModal from '../Modals/AddToPodcastModal'
import {fetchUser} from '../../redux/actions/userActions'
import { addSongToLibrary } from "../../redux/actions/userActions";
import { fetchPlaylistsMenu } from "../../redux/actions/playlistActions";

const LikedSongs = ({
  userId,
  token,
  songs,
  playlistMenu,
  likedSongs,
  fetchSongsError,
  fetchSongsPending,
  viewType,
  fetchSongs,
  addFavourites,
  fetchFavourites,
  fetchFavouritesPending,
  fetchFavouritesError,
  favouriteSongs,
  //searchSongs,
  songPlaying,
  songPaused,
  resumeSong,
  pauseSong,
  audioControl,
  songId,
  newFavSong,
  fetchPlaylistSongsPending,
  fetchPlaylistPending,
  userName
}) => {
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

  const [addModalShow, setModal] = useState(false);
  const [trackURI, setTrackURI] = useState("");

  useEffect(() => {
    if (
      token !== "" &&
      !fetchSongsError &&
      !fetchSongsPending &&
      viewType === "Liked Songs" 
    ) {
      fetchSongs(token) 
    }
  }, [token]);

  const openModal = e => {
    setModal(true);
    //fetchPlaylistsMenu(userId, token);
    let trackName =
      e.target.parentElement.parentElement.parentElement.parentElement
        .children[2].children[0].innerText;
    console.log(trackName);
    console.log(
      likedSongs.filter(song => song.track.name === trackName)[0].track.uri
    );
    setTrackURI(
      likedSongs.filter(song => song.track.name === trackName)[0].track.uri
    );
  };

  let addModalClose = () => {
    setModal(false);
  };

  const [addPodcastModalShow, setPodcastModal] = useState(false);
  const [trackDetails, setTrackDetails] = useState("");

  const openPodcastModal = e => {
    setPodcastModal(true)
    let selectedId = e.target.id
    let selectedTrack = likedSongs.filter(song => song.track.id === selectedId)[0].track
    setTrackDetails(selectedTrack)
  }

  const addPodcastModalClose = () => {
    setPodcastModal(false);
  };

  const addToFavSongs = (e) => {
     let selectedTrackId = e.target.id
     let selectedTrack = likedSongs.filter(song => song.track.id === selectedTrackId)[0].track
     
     e.target.className = "fa fa-heart"
     e.target.style.color = "red"
     
       let data = {
       trackName: selectedTrack.name,
       trackId: selectedTrack.id,
       albumName: selectedTrack.album.name,
       artistName: selectedTrack.artists[0].name,
       albumReleaseDate : selectedTrack.album.release_date,
       duration: msToMinutesAndSeconds(selectedTrack.duration_ms),
       userName: userName
     }
     console.log('jsonbody' , data)
     addFavourites(data)
  }

  const msToMinutesAndSeconds = ms => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  const renderSongs = () => {
    return likedSongs
      ? likedSongs.map((song, i) => {
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

              <p className="fav-song" >
              {favouriteSongs.findIndex(song => song.trackId === songID) > -1 ? (
                  <i
                    className="fa fa-heart"
                    aria-hidden="true"
                    style={{color: "red"}}
                    // onClick={e => toggleButton(e, token, songID)}
                  />
                ) : (
                  <i
                    className="fa fa-heart-o"
                    aria-hidden="true"
                    id = {song.track.id}
                    onClick={addToFavSongs}
                  />
                )}

              </p>

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
                        id={song.track.id}>
                        + &nbsp; Podcast
                      </Dropdown.Item>
                    </DropdownButton>
                  </div>
                  {playlistMenu && (
                    <AddToPlaylistModal
                      onHide={addModalClose}
                      show={addModalShow}
                      trackURI={trackURI}
                      playlistMenu={playlistMenu}
                    />
                  )}

                <AddToPodcastModal
                  onHide={addPodcastModalClose}
                  show={addPodcastModalShow}
                  trackDetails = {trackDetails}
                />
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
      {songs &&
        !fetchSongsPending &&
        !fetchPlaylistSongsPending &&
        !fetchPlaylistPending &&
        renderSongs()}

      {/* {songs && !searchSongsPending && !searchSongsError && renderSongs()} */}

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

LikedSongs.propTypes = {
  viewType: PropTypes.string,
  token: PropTypes.string,
  songId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  songAddedId: PropTypes.string,
  songs: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  likedSongs: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  searchSongsError: PropTypes.bool,
  searchSongsPending: PropTypes.bool,
  searchSongs: PropTypes.func,
  //fetchRecentlyPlayed: PropTypes.func,
  fetchTopTracksPending: PropTypes.bool,
  fetchTopTracksError: PropTypes.bool,
  //fetchTopTracks: PropTypes.func,
  fetchSongsError: PropTypes.bool,
  fetchSongsPending: PropTypes.bool,
  fetchPlaylistSongsPending: PropTypes.bool,
  fetchPlaylistPending: PropTypes.bool,
  fetchPlaylistSongsError: PropTypes.bool,
  browseAlbumPending: PropTypes.bool,
  browseAlbumError: PropTypes.bool,
  //fetchPlaylistSongs: PropTypes.func
  fetchSongs: PropTypes.func,
  audioControl: PropTypes.func,
  songPaused: PropTypes.bool,
  songPlaying: PropTypes.bool,
  resumeSong: PropTypes.func,
  pauseSong: PropTypes.func
  // addSongToLibrary: PropTypes.func
};

const mapStateToProps = state => {
  return {
    userId: state.userReducer.user ? state.userReducer.user.id : "",
    token: state.tokenReducer.token ? state.tokenReducer.token : "",
    songs: state.songsReducer.songs ? state.songsReducer.songs : [],
    likedSongs: state.songsReducer.likedSongs
      ? state.songsReducer.likedSongs
      : [],
    favouriteSongs : state.songsReducer.favouriteSongs ? state.songsReducer.favouriteSongs : [] ,
    newFavSong: state.songsReducer.newFavSong? state.songsReducer.newFavSong : "",
    searchSongsError: state.songsReducer.searchSongsError,
    searchSongsPending: state.songsReducer.searchSongsPending,
    fetchTopTracksError: state.songsReducer.fetchTopTracksError,
    fetchTopTracksPending: state.songsReducer.fetchTopTracksPending,
    fetchSongsError: state.songsReducer.fetchSongsError,
    fetchSongsPending: state.songsReducer.fetchSongsPending,
    fetchFavouritesError: state.songsReducer.fetchFavouritesError,
    fetchFavouritesPending: state.songsReducer.fetchFavouritesPending,
    fetchPlaylistSongsPending: state.songsReducer.fetchPlaylistSongsPending,
    fetchPlaylistPending: state.playlistReducer.fetchPlaylistPending,
    fetchPlaylistSongsError: state.songsReducer.fetchPlaylistSongsError,
    playlistMenu: state.playlistReducer.playlistMenu,
    songPlaying: state.songsReducer.songPlaying,
    songPaused: state.songsReducer.songPaused,
    songId: state.songsReducer.songId,
    songAddedId: state.userReducer.songId || "",
    viewType: state.songsReducer.viewType,
    userName : state.userReducer.user ? state.userReducer.user.display_name : ""
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchSongs,
      addFavourites,
      fetchFavourites,
      fetchUser
      //fetchRecentlyPlayed,
      //fetchTopTracks,
      //addSongToLibrary,
      //searchSongs
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(LikedSongs);
