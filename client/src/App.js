import React, { Component } from "react";
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
import UserPodcasts from "./components/UserPodcasts";
import CreatePlaylist from "./components/CreatePlaylist";
import Footer from "./components/Footer";
import "./App.css";
import { connect } from "react-redux";
import CreatePodcast from "./components/CreatePodcast";
import SearchView from "./components/SearchView";

class App extends Component {
  static audio;

  componentDidMount() {
    if (!window.location.pathname.includes("access_token") && !this.props.token)
      window.location.href = "http://localhost:8888/login";
    else {
      var access_token = window.location.pathname.split("=")[1].split("&")[0];
      if (access_token) {
        this.props.setToken(access_token);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.token) {
      this.props.fetchUser(nextProps.token);
    }

    if (this.audio !== undefined) {
      this.audio.volume = nextProps.volume / 100;
    }
  }

  stopSong = () => {
    if (this.audio) {
      this.props.stopSong();
      this.audio.pause();
    }
  };

  pauseSong = () => {
    if (this.audio) {
      this.props.pauseSong();
      this.audio.pause();
    }
  };

  resumeSong = () => {
    if (this.audio) {
      this.props.resumeSong();
      this.audio.play();
    }
  };

  audioControl = song => {
    const { playSong, stopSong } = this.props;

    if (this.audio === undefined) {
      song.track ? playSong(song.track) : playSong(song);
      this.audio = song.track
        ? new Audio(song.track.preview_url)
        : new Audio(song.preview_url);
      this.audio.play();
    } else {
      stopSong();
      this.audio.pause();
      song.track ? playSong(song.track) : playSong(song);
      this.audio = song.track
        ? new Audio(song.track.preview_url)
        : new Audio(song.preview_url);
      this.audio.play();
    }
  };

  render() {
    return (
      <div className="App">
        <div className="app-container">
          <div className="left-side-section">
            <SideMenu />
            <CreatePlaylist />
            <UserPlaylists />
            <CreatePodcast />
            <UserPodcasts/>
          </div>
          <div className="main-section">
            <Header />
            <div className="main-section-container">
              <MainHeader
                pauseSong={this.pauseSong}
                resumeSong={this.resumeSong}
              />
              <SearchView />
              <MainView
                pauseSong={this.pauseSong}
                resumeSong={this.resumeSong}
                audioControl={this.audioControl}
              />
            </div>
          </div>
          <Footer
            stopSong={this.stopSong}
            pauseSong={this.pauseSong}
            resumeSong={this.resumeSong}
            audioControl={this.audioControl}
          />
        </div>
      </div>
    );
  }
}

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