import React, { Component } from "react";
//import moment from "moment";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchArtistSongs } from "../../redux/actions/artistActions";
import "../SongList/SongList.css";
import { addSongToLibrary } from "../../redux/actions/userActions";

class SingleArtistTracks extends Component {
  msToMinutesAndSeconds(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  renderSongs() {
    return this.props.artistSongs
    ? this.props.artistSongs.map((song, i) => {
        const buttonClass =
          song.track.id === this.props.songId && !this.props.songPaused
            ? "fa-pause-circle-o"
            : "fa-play-circle-o";

      return (
        <li className={ 
          song.track.id === this.props.songId
            ? 'active user-song-item'
            : 'user-song-item'
           } key={i}>
            
          <div
              onClick={() => {
                song.track.id === this.props.songId &&
                this.props.songPlaying &&
                this.props.songPaused
                  ? this.props.resumeSong()
                  : this.props.songPlaying &&
                    !this.props.songPaused &&
                    song.track.id === this.props.songId
                  ? this.props.pauseSong()
                  : this.props.audioControl(song);
              }}
              className="play-song"
            >
              <i
                className={`fa ${buttonClass} play-btn`}
                aria-hidden="true"
              />
          </div>

          {this.props.viewType === "Artist" && (
            <p
              className="add-song"
              onClick={() => {
                this.props.addSongToLibrary(this.props.token, song.track.id);
              }}
            >
              {this.props.songAddedId === song.track.id ? (
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
            <p>{this.msToMinutesAndSeconds(song.track.duration_ms)}</p>
          </div>
        </li>
      );
  }): null
  }

  render() {
    console.log("View Type:", this.props.viewType);
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
        {this.props.artistSongs &&
          !this.props.fetchArtistSongsPending &&
          !this.props.fetchArtistSongsError &&
          this.renderSongs()}
      </div>
    );
  }
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
