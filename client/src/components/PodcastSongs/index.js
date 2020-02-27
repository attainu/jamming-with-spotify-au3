import React, { useEffect, useState } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "../SongList/SongList.css";
import {
  addSongToLibrary,
  removeSongFromLibrary,
  fetchUser
} from "../../redux/actions/userActions";
import {
    fetchSongs,
    fetchFavourites,
    addFavourites
  } from "../../redux/actions/songActions";
import { fetchPodcastMenu, deleteTrackFromPodcast} from "../../redux/actions/podcastActions";

const PodcastSongs = ({
  token,
  headerTitle,
  songs,
  podcastMenu,
  likedSongs,
  favouriteSongs,
  fetchFavourites,
  fetchSongsPending,
  addFavourites,
  viewType,
  albumName,
  albums,
  songPlaying,
  songPaused,
  resumeSong,
  pauseSong,
  audioControl,
  songId,
  userName,
  deleteTrackFromPodcast,
  addSongToLibrary,
  removeSongFromLibrary,
  fetchPodcastSongsPending
}) => {
 
  useEffect(() => {
   if(favouriteSongs.length === 0) {
     fetchFavourites()
    }
  }, [favouriteSongs]);


  const handleRemoveTrack = e => {
    let trackID = e.target.id

    let podcastId = podcastMenu.filter(
      item => item.podcastName === headerTitle
    )[0].id;

    let selectedTrack = songs.filter(song => song.id == trackID)

    let data = {
      trackName: selectedTrack.name,
      trackId: selectedTrack.id,
      albumName: selectedTrack.album ? selectedTrack.ablum.name : "",
      artistName: selectedTrack.artists ? selectedTrack.artists[0].name : "",
      albumReleaseDate : selectedTrack.album ? selectedTrack.album.release_date : "",
      duration: msToMinutesAndSeconds(selectedTrack.duration_ms),
      userName: userName
    }

    deleteTrackFromPodcast(podcastId, trackID, data);
  }

  const addToFavSongs = (e) => {
    let selectedTrackId = e.target.id
    let selectedTrack = songs.filter(song => song.track.id == selectedTrackId)[0].track
    
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
    addFavourites(data)
 }
  const msToMinutesAndSeconds = ms => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  function toggleButton(e, token, songID) {
    if (e.target.classList.contains("fa-check")) {
      e.target.className = "fa fa-plus";
      removeSongFromLibrary(token, songID);
    } else if (e.target.classList.contains("fa-plus")) {
      e.target.className = "fa fa-check";
      addSongToLibrary(token, songID);
    }
  }

  var selected_album = albums
  ? albums.filter(item => item.album.name === albumName)
  : [];

  const currentPodcast = podcastMenu ? podcastMenu.filter(item => item.podcastName === headerTitle)[0] : []

  const renderSongs = () => {
    return songs
      ? songs.map((song, i) => {
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

              {viewType !== "Liked Songs" && (
                <>
                  <p className="fav-song" >
                  {favouriteSongs.findIndex(song => song.trackId === songID) > -1 ? (
                      <i
                        className="fa fa-heart"
                        aria-hidden="true"
                        style={{color: "red"}}
                      />
                    ) : (
                      <i
                        className="fa fa-heart-o"
                        aria-hidden="true"
                        id = {song.id}
                        onClick={addToFavSongs}
                      />
                    )}

                  </p>
                  &nbsp;
                  <p className="add-song">
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

              <div className="song-title">
                <p>{song.name ? song.name : ""}</p>
              </div>

              <div className="song-artist">
                <p>{song.artists ? song.artists[0].name: ""}</p>
              </div>

              <div className="song-album">
                <p>{song.album ? song.album.name : albumName}</p>
              </div>

              <div className="song-added">
                <p>{song.album ? song.album.release_date : selected_album[0] ? selected_album[0].album.release_date : "---"}</p>
              </div>

              <div className="song-length">
                <p>
                  {msToMinutesAndSeconds(
                    song.duration_ms
                  )}
                </p>
              </div>

              {currentPodcast ? (
                currentPodcast.createdBy === userName ? (
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
                        id={song.id}
                      >
                        - &nbsp; Remove from Podcast
                      </Dropdown.Item>
                    </DropdownButton>
                  </div>
                ) : null
              ) : (
                <>
                  <div className="add-song">
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
                      >
                        + &nbsp; Spotify Playlist
                      </Dropdown.Item>
                    </DropdownButton>
                  </div>
                </>
              )}
            </li>
          );
        })
      : null;
  };

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
        !fetchPodcastSongsPending &&
        renderSongs()}

    </div>
  );
};

PodcastSongs.propTypes = {
  viewType: PropTypes.string,
  token: PropTypes.string,
  headerTitle: PropTypes.string,
  songId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  songAddedId: PropTypes.string,
  songs: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  likedSongs: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  fetchSongsError: PropTypes.bool,
  fetchSongsPending: PropTypes.bool,
  fetchPodcastSongsPending: PropTypes.bool,
  fetchPodcastSongsError: PropTypes.bool,
  podcastMenu: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  fetchSongs: PropTypes.func,
  audioControl: PropTypes.func,
  songPaused: PropTypes.bool,
  songPlaying: PropTypes.bool,
  resumeSong: PropTypes.func,
  pauseSong: PropTypes.func,
  addSongToLibrary: PropTypes.func
};

const mapStateToProps = state => {
  return {
    token: state.tokenReducer.token ? state.tokenReducer.token : "",
    headerTitle: state.uiReducer.title,
    songs: state.songsReducer.songs ? state.songsReducer.songs.songs : [],
    likedSongs: state.songsReducer.likedSongs ? state.songsReducer.likedSongs : [],
    favouriteSongs : state.songsReducer.favouriteSongs ? state.songsReducer.favouriteSongs : [] ,
    fetchSongsError: state.songsReducer.fetchSongsError,
    fetchSongsPending: state.songsReducer.fetchSongsPending,
    fetchPodcastSongsPending: state.songsReducer.fetchPodcastSongsPending,
    fetchPodcastSongsError: state.songsReducer.fetchPodcastSongsError,
    podcastMenu: state.podcastReducer.podcastMenu,
    songPlaying: state.songsReducer.songPlaying,
    songPaused: state.songsReducer.songPaused,
    songId: state.songsReducer.songId,
    songAddedId: state.userReducer.songId || "",
    viewType: state.songsReducer.viewType,
    albumName: state.uiReducer.title,
    albums: state.albumsReducer.albums ? state.albumsReducer.albums : [],
    userName : state.userReducer.user ? state.userReducer.user.display_name : ""
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { 
      fetchSongs,
      addFavourites,
      addSongToLibrary,
      fetchFavourites,
      fetchPodcastMenu,
      deleteTrackFromPodcast,
      addSongToLibrary,
      removeSongFromLibrary,
      fetchUser
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PodcastSongs);
