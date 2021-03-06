import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { increaseSongTime } from "../../redux/actions/songActions";
import moment from "moment";
import defaultImage from "./defaultImage.jpg";
import "./SongControls.css";

class SongControls extends Component {
  state = {
    timeElapsed: this.props.timeElapsed
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.songPlaying) {
      clearInterval(this.state.intervalId);
    }

    if (nextProps.songPlaying && nextProps.timeElapsed === 0) {
      clearInterval(this.state.intervalId);
      this.calculateTime();
    }

    this.setState({
      timeElapsed: nextProps.timeElapsed
    });
  }

  calculateTime = () => {
    const intervalId = setInterval(() => {
      if (this.state.timeElapsed === 30) {
        clearInterval(this.state.intervalId);
        this.props.stopSong();
      } else if (!this.props.songPaused) {
        this.props.increaseSongTime(this.state.timeElapsed + 1);
      }
    }, 1000);

    this.setState({
      intervalId: intervalId
    });
  };

  getSongIndex = () => {
    let songs,
      songDetails = this.props.songDetails;
    if (this.props.viewType === "Liked Songs") {
      songs = this.props.likedSongs;
    } else if (
      this.props.viewType === "Album" ||
      this.props.viewType === "New Release Album"
    ) {
      songs = this.props.albumSongs;
    } else if(this.props.viewType === "Favourite Songs"){
      songs = this.props.favouriteSongs
    } else {
      songs = this.props.songs;
    }
    const currentIndex = songs
      .map((song, index) => {
        if (song.track === songDetails || song === songDetails) {
          return index;
        }
      })
      .filter(item => {
        return item !== undefined;
      })[0];

    return currentIndex;
  };

  nextSong = () => {
    let songs,
      audioControl = this.props.audioControl;
    if (this.props.viewType === "Liked Songs") {
      songs = this.props.likedSongs;
    } else if (
      this.props.viewType === "Album" ||
      this.props.viewType === "New Release Album"
    ) {
      songs = this.props.albumSongs;
    } else if(this.props.viewType === "Favourite Songs"){
      songs = this.props.favouriteSongs
    } else {
      songs = this.props.songs;
    }
    let currentIndex = this.getSongIndex();
    currentIndex === songs.length - 1
      ? audioControl(songs[0])
      : audioControl(songs[currentIndex + 1]);
  };

  prevSong = () => {
    let songs,
      audioControl = this.props.audioControl;
    if (this.props.viewType === "Liked Songs") {
      songs = this.props.likedSongs;
    } else if (
      this.props.viewType === "Album" ||
      this.props.viewType === "New Release Album"
    ) {
      songs = this.props.albumSongs;
    } else {
      songs = this.props.songs;
    }
    let currentIndex = this.getSongIndex();
    currentIndex === 0
      ? audioControl(songs[songs.length - 1])
      : audioControl(songs[currentIndex - 1]);
  };

  render() {
    const showPlay = this.props.songPaused
      ? "fa fa-play-circle-o play-btn"
      : "fa fa-pause-circle-o pause-btn";

    return (
      <div className="song-player-container">
        <div className="song-details">
          <p className="song-name">{this.props.songName}</p>
          <p className="artist-name">{this.props.artistName}</p>
        </div>

        <div className="song-controls">
          <div onClick={this.prevSong} className="reverse-song">
            <i className="fa fa-step-backward reverse" aria-hidden="true" />
          </div>

          <div className="play-btn">
            <i
              onClick={
                !this.props.songPaused
                  ? this.props.pauseSong
                  : this.props.resumeSong
              }
              className={"fa play-btn" + showPlay}
              aria-hidden="true"
            />
          </div>

          <div className="stop-btn">
            <i
              onClick={this.props.stopSong}
              className={"fa fa-stop-circle-o"}
              aria-hidden="true"
            />
          </div>

          <div onClick={this.nextSong} className="next-song">
            <i className="fa fa-step-forward forward" aria-hidden="true" />
          </div>
        </div>

        <div className="song-progress-container">
          <p className="timer-start">
          </p>
          <div className="song-progress">
            <div
              style={{ width: this.state.timeElapsed * 16.5 }}
              className="song-expired"
            />
          </div>
          <p className="timer-end">
            {moment()
              .minutes(0)
              .second(30 - this.state.timeElapsed)
              .format("m:ss")}
          </p>
        </div>
        <div
          className={
            this.props.albumImage === defaultImage
              ? "default-image-container"
              : "song-image-container"
          }
        >
          <img
            className={
              this.props.albumImage === defaultImage
                ? "default-image"
                : "song-image"
            }
            src={this.props.albumImage}
            alt="song"
          />
        </div>
      </div>
    );
  }
}

SongControls.propTypes = {
  timeElapsed: PropTypes.number,
  songPlaying: PropTypes.bool,
  songPaused: PropTypes.bool,
  songName: PropTypes.string,
  artistName: PropTypes.string,
  stopSong: PropTypes.func,
  resumeSong: PropTypes.func,
  increaseSongTime: PropTypes.func,
  pauseSong: PropTypes.func,
  songs: PropTypes.array,
  likedSongs: PropTypes.array,
  favouriteSongs: PropTypes.array,
  songDetails: PropTypes.object,
  audioControl: PropTypes.func
};

const mapStateToProps = state => {
  return {
    songName: state.songsReducer.songDetails
      ? state.songsReducer.songDetails.name 
      ? state.songsReducer.songDetails.name
      : state.songsReducer.songDetails.trackName
      : "" ,

    artistName: state.songsReducer.songDetails
      ? state.songsReducer.songDetails.track
        ? state.songsReducer.songDetails.track.artists
          ? state.songsReducer.songDetails.track.artists[0].name
          : state.songsReducer.songDetails.artists[0].name
        :  state.songsReducer.songDetails.artistName 
      : "",
    albumImage: state.songsReducer.songDetails
      ? state.songsReducer.songDetails.album
        ? state.songsReducer.songDetails.album.images[0].url 
        : state.songsReducer.songDetails.albumName
      : defaultImage,
    songPlaying: state.songsReducer.songPlaying,
    timeElapsed: state.songsReducer.timeElapsed,
    songPaused: state.songsReducer.songPaused,
    songDetails: state.songsReducer.songDetails,
    songs: state.songsReducer.songs,
    albumSongs: state.albumTracksReducer.albumTracks
      ? state.albumTracksReducer.albumTracks
      : [],
    likedSongs: state.songsReducer.likedSongs,
    favouriteSongs : state.songsReducer.favouriteSongs,
    viewType: state.songsReducer.viewType
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      increaseSongTime
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SongControls);
