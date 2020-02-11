import React, { Component, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { increaseSongTime } from "../../redux/actions/songActions";
import moment from "moment";
import "./SongControls.css";

//class SongControls extends Component {
const SongControls = ({
  songName,
  artistName,
  songPaused,
  songPlaying,
  timeElapsed,
  songs,
  songDetails,
  stopSong,
  pauseSong,
  resumeSong,
  audioControl
}) => {
  // state = {
  //   timeElapsed: this.props.timeElapsed
  // };

  const [timeElapsedLocal, setTimeElapsed] = useState(timeElapsed);
  const [intervalIdLocal, setIntervalId] = useState();

  useEffect(() => {
    if (!songPlaying) clearInterval(intervalIdLocal);
    if (songPlaying && timeElapsed === 0) {
      clearInterval(intervalIdLocal);
      calculateTime();
    }
    setTimeElapsed(timeElapsed);
  }, [songPlaying, timeElapsed]);

  // componentWillReceiveProps(nextProps) {
  //   if (!nextProps.songPlaying) {
  //     clearInterval(this.state.intervalId);
  //   }

  //   if (nextProps.songPlaying && nextProps.timeElapsed === 0) {
  //     clearInterval(this.state.intervalId);
  //     this.calculateTime();
  //   }

  //   this.setState({
  //     timeElapsed: nextProps.timeElapsed
  //   });
  // }

  const calculateTime = () => {
    const intervalId = setInterval(() => {
      if (timeElapsedLocal === 30) {
        clearInterval(intervalIdLocal);
        stopSong();
      } else if (!songPaused) {
        increaseSongTime(timeElapsedLocal + 1);
      }
    }, 1000);

    setIntervalId(intervalId);

    // this.setState({
    //   intervalId: intervalId
    // });
  };

  const getSongIndex = () => {
    //const { songs, songDetails } = this.props;
    const currentIndex = songs
      .map((song, index) => {
        if (song.track === songDetails) {
          return index;
        }
      })
      .filter(item => {
        return item !== undefined;
      })[0];

    return currentIndex;
  };

  const nextSong = () => {
    //const { songs, audioControl } = this.props;
    let currentIndex = getSongIndex();
    currentIndex === songs.length - 1
      ? audioControl(songs[0])
      : audioControl(songs[currentIndex + 1]);
  };

  const prevSong = () => {
    //const { songs, audioControl } = this.props;
    let currentIndex = getSongIndex();
    currentIndex === 0
      ? audioControl(songs[songs.length - 1])
      : audioControl(songs[currentIndex - 1]);
  };

  //render() {
  const showPlay = songPaused
    ? "fa fa-play-circle-o play-btn"
    : "fa fa-pause-circle-o pause-btn";

  return (
    <div className="song-player-container">
      <div className="song-details">
        <p className="song-name">{songName}</p>
        <p className="artist-name">{artistName}</p>
      </div>

      <div className="song-controls">
        <div onClick={prevSong} className="reverse-song">
          <i className="fa fa-step-backward reverse" aria-hidden="true" />
        </div>

        <div className="play-btn">
          <i
            onClick={!songPaused ? pauseSong : resumeSong}
            className={"fa play-btn" + showPlay}
            aria-hidden="true"
          />
        </div>

        <div onClick={nextSong} className="next-song">
          <i className="fa fa-step-forward forward" aria-hidden="true" />
        </div>
      </div>

      <div className="song-progress-container">
        <p className="timer-start">
          {/* {moment()
              .minutes(0)
              .second(this.state.timeElapsed)
              .format("m:ss")} */}
        </p>
        <div className="song-progress">
          <div
            style={{ width: timeElapsedLocal * 16.5 }}
            className="song-expired"
          />
        </div>
        <p className="timer-end">
          {moment()
            .minutes(0)
            .second(30 - timeElapsedLocal)
            .format("m:ss")}
        </p>
      </div>
    </div>
  );
};
//}

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
  songDetails: PropTypes.object,
  audioControl: PropTypes.func
};

const mapStateToProps = state => {
  return {
    songName: state.songsReducer.songDetails
      ? state.songsReducer.songDetails.name
      : "",
    artistName: state.songsReducer.songDetails
      ? state.songsReducer.songDetails.artists[0].name
      : "",
    songPlaying: state.songsReducer.songPlaying,
    timeElapsed: state.songsReducer.timeElapsed,
    songPaused: state.songsReducer.songPaused,
    songDetails: state.songsReducer.songDetails,
    songs: state.songsReducer.songs
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
