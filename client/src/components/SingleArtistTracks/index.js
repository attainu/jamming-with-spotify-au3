import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { fetchArtistSongs } from "../../redux/actions/artistActions";
import AddToPlaylistModal from "../Modals/AddToPlaylistModal";
import AddToPodcastModal from "../Modals/AddToPodcastModal";
import {
  addSongToLibrary,
  removeSongFromLibrary,
  fetchUser
} from "../../redux/actions/userActions";
import "../SongList/SongList.css";
import {
  fetchSongs,
  fetchFavourites,
  addFavourites,
  removeFavourite
} from "../../redux/actions/songActions";

const SingleArtistTracks = ({
  token,
  artistSongs,
  viewType,
  favouriteSongs,
  addFavourites,
  removeFavourite,
  fetchFavourites,
  fetchArtistSongsPending,
  fetchArtistSongsError,
  addSongToLibrary,
  removeSongFromLibrary,
  songs,
  likedSongs,
  songPlaying,
  songPaused,
  resumeSong,
  pauseSong,
  audioControl,
  songId,
  songAddedId,
  userName
}) => {
  const [addModalShow, setModal] = useState(false);
  const [trackURI, setTrackURI] = useState("");

  const openModal = e => {
    setModal(true);
    let trackName =
      e.target.parentElement.parentElement.parentElement.parentElement
        .children[2].children[0].innerText;
    setTrackURI(
      songs.filter(song => song.track.name === trackName)[0].track.uri
    );
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

   function toggleFav(e, songID) {
    let selectedTrackId = e.target.id
    let selectedTrack = songs.filter(song => song.track.id === selectedTrackId)[0].track
 
    if (e.target.classList.contains("fa-heart")) {
      e.target.className = "fa fa-heart-o";
      removeFavourite(selectedTrack.id);
    } 
    else if (e.target.classList.contains("fa-heart-o")) {
      let data = {
        trackName: selectedTrack.name,
        trackId: selectedTrack.id,
        albumName: selectedTrack.album.name,
        artistName: selectedTrack.artists[0].name,
        albumReleaseDate : selectedTrack.album.release_date,
        duration: msToMinutesAndSeconds(selectedTrack.duration_ms),
        userName: userName
      }

      e.target.className = "fa fa-heart"
      e.target.style.color = "red"
      addFavourites(data);
    }
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
    fetchSongs(token);
  }

  const renderSongs = () => {
    return artistSongs.map((song, i) => {
      let songID = song.track.id;
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
            <i className={`fa ${buttonClass} play-btn`} aria-hidden="true" />
          </div>
          {viewType === "Artist" && (
            <>
              <p className="fav-song" >
              {favouriteSongs.findIndex(song => song.trackId === songID) > -1 ? (
                  <i
                    className="fa fa-heart"
                    aria-hidden="true"
                    style={{color: "red"}}
                    id = {song.track.id}
                    onClick={e => toggleFav(e, songID)}
                  />
                ) : (
                  <i
                    className="fa fa-heart-o"
                    aria-hidden="true"
                    id = {song.track.id}
                    onClick={e => toggleFav(e, songID)}
                  />
                )}
             </p>
              &nbsp;
              <p className="add-song">
                {likedSongs.findIndex(song => song.track.id === songID) > -1 ? (
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
            <p>{song.track.album.name}</p>
          </div>

          <div className="song-added">
            <p>{song.track.album.release_date}</p>
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
              <Dropdown.Item href="#"
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
    });
  };

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
      {artistSongs &&
        !fetchArtistSongsPending &&
        !fetchArtistSongsError &&
        renderSongs()}
    </div>
  );
};

SingleArtistTracks.propTypes = {
  viewType: PropTypes.string,
  songAddedId: PropTypes.string,
  token: PropTypes.string,
  songs: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  fetchArtistSongsError: PropTypes.bool,
  fetchArtistSongsPending: PropTypes.bool,
  fetchArtistSongs: PropTypes.func,
  addSongToLibrary: PropTypes.func

};

const mapStateToProps = state => {
  return {
    token: state.tokenReducer.token ? state.tokenReducer.token : "",
    artistSongs: state.songsReducer.songs ? state.songsReducer.songs : "",
    fetchArtistSongsError: state.songsReducer.fetchArtistSongsError,
    fetchArtistSongsPending: state.songsReducer.fetchArtistSongsPending,
    favouriteSongs : state.songsReducer.favouriteSongs ? state.songsReducer.favouriteSongs : [] ,
    viewType: state.songsReducer.viewType,
    songs: state.songsReducer.songs,
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
      fetchArtistSongs,
      addSongToLibrary,
      removeSongFromLibrary,
      fetchSongs,
      fetchFavourites,
      addFavourites,
      removeFavourite,
      fetchUser
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleArtistTracks);
