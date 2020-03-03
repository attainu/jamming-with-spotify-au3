import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { bindActionCreators } from "redux";
import { fetchAlbumTracks } from "../../redux/actions/albumActions";
import AddToPlaylistModal from "../Modals/AddToPlaylistModal";
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
import "../SongList/SongList.css";
import AddToPodcastModal from "../Modals/AddToPodcastModal";

const SingleAlbumTracks = ({
  token,
  songs,
  viewType,
  fetchFavourites,
  addFavourites,
  fetchAlbumTracksPending,
  fetchAlbumTracksError,
  addSongToLibrary,
  removeSongFromLibrary,
  albumName,
  albums,
  likedSongs,
  songPlaying,
  songPaused,
  favouriteSongs,
  resumeSong,
  pauseSong,
  audioControl,
  songId,
  userName,
  songAddedId
}) => {
  const [addModalShow, setModal] = useState(false);
  const [trackURI, setTrackURI] = useState("");

  const openModal = e => {
    setModal(true);
    let trackName =
      e.target.parentElement.parentElement.parentElement.parentElement
     .children[3].children[0].innerText;
    console.log(trackName);
    setTrackURI(songs.filter(song => song.name === trackName)[0].uri);
  };

  const addModalClose = () => {
    setModal(false);
  };

  const [addPodcastModalShow, setPodcastModal] = useState(false);
  const [trackDetails, setTrackDetails] = useState("");

  const openPodcastModal = e => {
    setPodcastModal(true)
    let selectedId = e.target.id
    let selectedTrack = songs.filter(song => song.track.id === selectedId)[0].track
    setTrackDetails(selectedTrack)
  }

  const addPodcastModalClose = () => {
    setPodcastModal(false);
  };

  useEffect(() => {
   if(favouriteSongs.length === 0) {
     fetchFavourites()
    }
  }, [favouriteSongs]);

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
    fetchSongs(token);
  }

  var selected_album = albums
  ? albums.filter(item => item.album.name === albumName)
  : [];

  const addToFavSongs = (e) => {
    let selectedTrackId = e.target.id
    let selectedTrack = songs.filter(song => song.track.id === selectedTrackId)[0].track
    e.target.className = "fa fa-heart"
    e.target.style.color = "red"
    
      let data = {
      trackName: selectedTrack.name,
      trackId: selectedTrack.id,
      albumName: albumName,
      artistName: selectedTrack.artists[0].name,
      albumReleaseDate : selected_album[0] ? selected_album[0].album.release_date : "---",
      duration: msToMinutesAndSeconds(selectedTrack.duration_ms),
      userName: userName
    }
    addFavourites(data)
 }
  const renderSongs = () => {
    const selected_album = albums
    ? albums.filter(item => item.album.name === albumName)
    : [];
    return songs.map((song, i) => {
      let songID = song.id;
      const buttonClass =
        song.id === songId && !songPaused
          ? "fa-pause-circle-o"
          : "fa-play-circle-o";

      return (
        <li
          className={
            song.id === songId ? "active user-song-item" : "user-song-item"
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
            <i className={`fa ${buttonClass} play-btn`} aria-hidden="true" />
          </div>

          {viewType === "Album" && (
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
                    id = {song.track.id}
                    onClick={addToFavSongs}
                  />
                )}
             </p>
              &nbsp;
              <p className="add-song">
                {likedSongs.findIndex(song => song.id === songID) > -1 ? (
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
            <p>{song.track.name}</p>
          </div>

          <div className="song-artist">
            <p>{song.track.artists[0].name}</p>
          </div>

          <div className="song-album">
            <p>{albumName}</p>
          </div>

          <div className="song-added">
            <p>
              {selected_album[0] ? selected_album[0].album.release_date : "---"}
            </p>
          </div>

          <div className="song-length">
            <p>{msToMinutesAndSeconds(song.track.duration_ms)}</p>
          </div>
         
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

          <AddToPlaylistModal
            onHide={addModalClose}
            show={addModalShow}
            trackURI={trackURI}
          />

          <AddToPodcastModal
            onHide={addPodcastModalClose}
            show={addPodcastModalShow}
            trackDetails={trackDetails}
          />
        </li>
      );
  })
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
      {songs &&
        !fetchAlbumTracksError &&
        !fetchAlbumTracksPending &&
        renderSongs()}
    </div>
  );
};

SingleAlbumTracks.propTypes = {
  viewType: PropTypes.string,
  token: PropTypes.string,
  songs: PropTypes.array,
  fetchAlbumTracksPending: PropTypes.bool,
  fetchAlbumTracksError: PropTypes.bool,
  fetchAlbumTracks: PropTypes.func,
  addSongToLibrary: PropTypes.func
};

const mapStateToProps = state => {
  return {
    token: state.tokenReducer.token ? state.tokenReducer.token : "",
    songs: state.albumTracksReducer.albumTracks
      ? state.albumTracksReducer.albumTracks
      : [],
    fetchAlbumTracksError: state.albumTracksReducer.fetchAlbumTracksError,
    fetchAlbumTracksPending: state.albumTracksReducer.fetchAlbumTracksPending,
    favouriteSongs : state.songsReducer.favouriteSongs ? state.songsReducer.favouriteSongs : [] ,
    viewType: state.albumTracksReducer.viewType,
    albumName: state.uiReducer.title,
    albums: state.albumsReducer.albums ? state.albumsReducer.albums : [],
    likedSongs: state.songsReducer.likedSongs
      ? state.songsReducer.likedSongs
      : [],
    songPlaying: state.songsReducer.songPlaying,
    songPaused: state.songsReducer.songPaused,
    songId: state.songsReducer.songId,
    songAddedId: state.userReducer.songId || "",
    userName : state.userReducer.user ? state.userReducer.user.display_name : ""
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchAlbumTracks,
      addSongToLibrary,
      removeSongFromLibrary,
      fetchSongs,
      fetchFavourites,
      addFavourites,
      fetchUser
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleAlbumTracks);
