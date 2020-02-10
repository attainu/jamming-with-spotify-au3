import React from "react";
//import moment from "moment";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchAlbumTracks } from "../../redux/actions/albumActions";
import "../SongList/SongList.css";
import { addSongToLibrary } from "../../redux/actions/userActions";

const SingleAlbumTracks = ({
  songs,
  token,
  viewType,
  fetchAlbumTracksPending,
  fetchAlbumTracksError,
  albumName,
  albums,
  songId,
  songPaused,
  songPlaying,
  songAddedId,
  resumeSong,
  pauseSong,
  audioControl,
}) => {
  const msToMinutesAndSeconds = ms => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  const renderSongs = () => {
    const selected_album = albums
      ? albums.filter(item => item.album.name === albumName)
      : [];

      return songs
      ? songs.map((song, i) => {
          const buttonClass =
            song.track.id === songId && !songPaused
              ? "fa-pause-circle-o"
              : "fa-play-circle-o";

      return (
        <li className={
          song.track.id === songId
            ? "active user-song-item"
            : "user-song-item"
        } key={i}>

        
        <div
          onClick={() => {
            song.track.id === songId &&
            songPlaying &&
            songPaused
              ? resumeSong()
              : songPlaying &&
                !songPaused &&
                song.id === songId
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

        {viewType === "Album" && (
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
            <p>{albumName}</p>
          </div>

          <div className="song-added">
            <p>
              {selected_album[0] ? selected_album[0].album.release_date : "---"}
            </p>
            {/* <p>{moment(song.added_at).format("YYYY-MM-DD")}</p> */}
          </div>

          <div className="song-length">
            <p>{msToMinutesAndSeconds(song.duration_ms)}</p>
          </div>
        </li>
      );
  }): null
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
    viewType: state.albumTracksReducer.viewType,
    albumName: state.uiReducer.title,
    albums: state.albumsReducer.albums ? state.albumsReducer.albums : [],
    songPlaying: state.songsReducer.songPlaying,
    songPaused: state.songsReducer.songPaused,
    songId: state.songsReducer.songId,
    songAddedId: state.userReducer.songId || "",
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchAlbumTracks,
      addSongToLibrary
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleAlbumTracks);
