import React, { Component, useEffect } from "react";
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
//import { addSongToLibrary } from "../../redux/actions/userActions";

//class SongList extends Component {
const SongList = ({
  token,
  songs,
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
  fetchPlaylistSongsPending,
  searchSongsPending,
  searchSongsError
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

  useEffect(() => {
    if (
      token !== "" &&
      !fetchSongsError &&
      fetchSongsPending &&
      viewType === "songs"
    ) {
      fetchSongs(token);
    } else {
      searchSongs(token);
    }
  }, [token]);

  const msToMinutesAndSeconds = ms => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  const renderSongs = () => {
    return songs
      ? songs.map((song, i) => {
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

              {viewType !== "songs" && (
                <p
                  className="add-song"
                  onClick={() => {
                    //this.props.addSongToLibrary(this.props.token, song.track.id);
                  }}
                >
                  {/* {this.props.songAddedId === song.track.id ? (
                    <i className="fa fa-check add-song" aria-hidden="true" />
                  ) : (
                    <i className="fa fa-plus add-song" aria-hidden="true" />
                  )} */}
                </p>
              )}

              {viewType === "songs" && (
                <p className="add-song">
                  <i className="fa fa-check" aria-hidden="true" />
                </p>
              )}
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
  songId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  songAddedId: PropTypes.string,
  songs: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
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
    token: state.tokenReducer.token ? state.tokenReducer.token : "",
    songs: state.songsReducer.songs ? state.songsReducer.songs : "",
    searchSongsError: state.songsReducer.searchSongsError,
    searchSongsPending: state.songsReducer.searchSongsPending,
    fetchTopTracksError: state.songsReducer.fetchTopTracksError,
    fetchTopTracksPending: state.songsReducer.fetchTopTracksPending,
    fetchSongsError: state.songsReducer.fetchSongsError,
    fetchSongsPending: state.songsReducer.fetchSongsPending,
    fetchPlaylistSongsPending: state.songsReducer.fetchPlaylistSongsPending,
    fetchPlaylistSongsError: state.songsReducer.fetchPlaylistSongsError,
    browseAlbumPending: state.songsReducer.browseAlbumPending,
    browseAlbumError: state.songsReducer.browseAlbumError,
    //releaseAlbum: state.albumReducer.releaseAlbum,
    //fetchPlaylistSongs: state.songsReducer.fetchPlaylistSongs,
    songPlaying: state.songsReducer.songPlaying,
    songPaused: state.songsReducer.songPaused,
    songId: state.songsReducer.songId,
    //songAddedId: state.userReducer.songId || "",
    viewType: state.songsReducer.viewType
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchSongs,
      //fetchRecentlyPlayed,
      //fetchTopTracks,
      //addSongToLibrary
      searchSongs
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SongList);
