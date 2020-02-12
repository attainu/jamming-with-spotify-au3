import React, { useState } from "react";
//import moment from "moment";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { fetchArtistSongs } from "../../redux/actions/artistActions";
import AddToPlaylistModal from "../Modals/AddToPlaylistModal";
import "../SongList/SongList.css";
import { addSongToLibrary } from "../../redux/actions/userActions";

const SingleArtistTracks = ({
  artistSongs,
  viewType,
  fetchArtistSongsPending,
  fetchArtistSongsError,
  songs,
  songAddedId,
  songId,
  songPaused,
  songPlaying,
  resumeSong,
  pauseSong,
  audioControl,
  addSongToLibrary,
  token
 }) => {
  const [addModalShow, setModal] = useState(false);
  const [trackURI, setTrackURI] = useState("");

  const openModal = e => {
    setModal(true);
    let trackName =
      e.target.parentElement.parentElement.children[1].children[0].innerText;
    console.log(trackName);
    setTrackURI(
      songs.filter(song => song.track.name === trackName)[0].track.uri
    );
  };

  let addModalClose = () => {
    setModal(false);
  };

  const msToMinutesAndSeconds = (ms) =>{
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  const renderSongs = () => {
    return artistSongs
    ? artistSongs.map((song, i) => {
        const buttonClass =
          song.track.id === songId && !songPaused
            ? "fa-pause-circle-o"
            : "fa-play-circle-o";

      return (
        <li className={ 
          song.track.id === songId
            ? 'active user-song-item'
            : 'user-song-item'
           } key={i}>
            
          <div
              onClick={() => {
                song.track.id === songId &&
                songPlaying &&
                songPaused
                  ? resumeSong()
                  : songPlaying &&
                    !songPaused &&
                    song.track.id === songId
                  ? pauseSong()
                  :audioControl(song);
              }}
              className="play-song"
            >
              <i
                className={`fa ${buttonClass} play-btn`}
                aria-hidden="true"
              />
          </div>

          {viewType === "Artist" && (
            <p
              className="add-song"
              onClick={() => {
                addSongToLibrary(token, song.track.id);
              }}
            >
              {songAddedId === song.track.id ? (
                <i className="fa fa-check add-song" aria-hidden="true" />
              ) : (
                <i className="fa fa-plus add-song" aria-hidden="true" />
              )}
            </p>
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
            {/* <p>{moment(song.added_at).format("YYYY-MM-DD")}</p> */}
          </div>

          <div className="song-length">
            <p>{msToMinutesAndSeconds(song.track.duration_ms)}</p>
          </div>
          <p className="add-song">
            <i
              className="fa fa-plus"
              aria-hidden="true"
              style={{ color: "red" }}
              onClick={openModal}
            />
          </p>
          <AddToPlaylistModal
            onHide={addModalClose}
            show={addModalShow}
            trackURI={trackURI}
          />
        </li>
      );
  }): null
  }

    // console.log("View Type:", this.props.viewType);
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
        {artistSongs &&
          !fetchArtistSongsPending &&
          !fetchArtistSongsError &&
          renderSongs()}
      </div>
    );
  }


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
    viewType: state.songsReducer.viewType,
    songPlaying: state.songsReducer.songPlaying,
    songPaused: state.songsReducer.songPaused,
    songId: state.songsReducer.songId,
    songAddedId: state.userReducer.songId || "",
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchArtistSongs,
      addSongToLibrary
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleArtistTracks);
