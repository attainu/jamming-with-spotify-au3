import React, { Component, useEffect } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { fetchUser } from "./redux/actions/userActions";
import { setToken } from "./redux/actions/tokenActions";
import {
  playSong,
  stopSong,
  pauseSong,
  resumeSong
} from "./redux/actions/songActions";
import Header from "./components/Header";
import SideMenu from "./components/SideMenu";
import MainHeader from "./components/MainHeader";
import MainView from "./components/MainView";
import UserPlaylists from "./components/UserPlaylists";
import CreatePlaylist from "./components/CreatePlaylist";
import Footer from "./components/Footer";
import "./App.css";
import { connect } from "react-redux";
//import { Redirect } from "react-router-dom";

//class App extends Component {
const App = ({
  token,
  volume,
  setToken,
  fetchUser,
  playSong,
  stopSong,
  pauseSong,
  resumeSong
}) => {
  let audio;

  useEffect(() => {
    console.log(window.location.pathname);

    if (!window.location.pathname.includes("access_token") && !token)
      window.location.href = "http://localhost:8888/login";
    //<Redirect to="http://localhost:8888/login" />;
    else {
      var access_token = window.location.pathname.split("=")[1].split("&")[0];
      console.log(access_token);
      if (access_token) {
        setToken(access_token);
      }
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (token) fetchUser(token);
      if (audio !== undefined) {
        audio.volume = volume / 100;
      }
    }, 1000);
  }, [token]);
  // componentDidMount() {
  //   console.log(window.location.pathname);

  //   if (!window.location.pathname.includes("access_token") && !this.props.token)
  //     window.location.href = "http://localhost:8888/login";
  //   //<Redirect to="http://localhost:8888/login" />;
  //   else {
  //     var access_token = window.location.pathname.split("=")[1].split("&")[0];
  //     console.log(access_token);
  //     if (access_token) {
  //       this.props.setToken(access_token);
  //     }
  //   }
  // }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.token) {
  //     this.props.fetchUser(nextProps.token);
  //   }

  //   if (this.audio !== undefined) {
  //     this.audio.volume = nextProps.volume / 100;
  //   }
  // }

  const stopSongPlay = () => {
    if (audio) {
      stopSong();
      audio.pause();
    }
  };

  const pauseSongPlay = () => {
    if (audio) {
      pauseSong();
      audio.pause();
    }
  };

  const resumeSongPlay = () => {
    if (audio) {
      resumeSong();
      audio.play();
    }
  };

  const audioControl = song => {
    //const { playSong, stopSong } = this.props;

    if (audio === undefined) {
      playSong(song.track);
      audio = new Audio(song.track.preview_url);
      audio.play();
    } else {
      stopSong();
      audio.pause();
      playSong(song.track);
      audio = new Audio(song.track.preview_url);
      audio.play();
    }
  };

  //render() {
  return (
    <div className="App">
      <div className="app-container">
        {/* <button className="add-button btn btn-sm btn-light">Install App &nbsp; <i className="fa fa-arrow-down"></i> </button> */}
        <div className="left-side-section">
          <SideMenu />
          <CreatePlaylist />
          <UserPlaylists />
        </div>
        <div className="main-section">
          <Header />
          <div className="main-section-container">
            <MainHeader pauseSong={pauseSongPlay} resumeSong={resumeSongPlay} />
            <MainView
              pauseSong={pauseSongPlay}
              resumeSong={resumeSongPlay}
              audioControl={audioControl}
            />
          </div>
        </div>
        <Footer
          stopSong={stopSongPlay}
          pauseSong={pauseSongPlay}
          resumeSong={resumeSongPlay}
          audioControl={audioControl}
        />
      </div>
    </div>
  );
  // }
};

App.propTypes = {
  token: PropTypes.string,
  setToken: PropTypes.func,
  pauseSong: PropTypes.func,
  playSong: PropTypes.func,
  stopSong: PropTypes.func,
  resumeSong: PropTypes.func,
  volume: PropTypes.number
};

const mapStateToProps = state => {
  return {
    token: state.tokenReducer.token ? state.tokenReducer.token : "",
    volume: state.soundReducer.volume
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchUser,
      setToken,
      playSong,
      stopSong,
      pauseSong,
      resumeSong
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
