import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SongList from "../SongList";
import Albums from "../Albums";
import ArtistList from "../ArtistList";
import SingleArtistTracks from "../SingleArtistTracks";
import SingleAlbumTracks from "../SingleAlbumTracks";
import Profile from "../Profile";
import BrowseView from "../BrowseView";
import "./MainView.css";
import LikedSongs from "../LikedSongs";

const MainView = ({
  headerTitle,
  viewType,
  //viewTypeAlbum,
  audioControl,
  resumeSong,
  pauseSong
}) => {
  return (
    <React.Fragment>
      {headerTitle === "Artists" ? (
        <ArtistList />
      ) : headerTitle === "Get Profile" ? (
        <Profile />
      ) : headerTitle === "Recently Played" ? (
        <SongList
          resumeSong={resumeSong}
          pauseSong={pauseSong}
          audioControl={audioControl}
        />
      ) : headerTitle === "Top Tracks" ? (
        <SongList
          resumeSong={resumeSong}
          pauseSong={pauseSong}
          audioControl={audioControl}
        />
      ) : headerTitle === "Browse" ? (
        <BrowseView />
      ) : viewType === "Artist" ? (
        <SingleArtistTracks
          resumeSong={resumeSong}
          pauseSong={pauseSong}
          audioControl={audioControl}
        />
      ) : viewType === "Liked Songs" ? (
        <LikedSongs
          resumeSong={resumeSong}
          pauseSong={pauseSong}
          audioControl={audioControl}
        />
      ) : viewType === "Albums" ? (
        <Albums audioControl={audioControl} />
      ) : viewType === "Album" || viewType === "New Release Album" ? (
        <SingleAlbumTracks />
      ) : viewType === "Category Playlist" ? null : (
        <SongList
          resumeSong={resumeSong}
          pauseSong={pauseSong}
          audioControl={audioControl}
        />
      )}
      {/* {headerTitle === "Albums" ? (
        <AlbumList audioControl={audioControl} />
      ) : headerTitle === "Artists" ? (
        <ArtistList />
      ) : headerTitle === "Browse" ? (
        <BrowseView />
      ) : (
        //anything else show SongList
        <SongList
          resumeSong={resumeSong}
          pauseSong={pauseSong}
          audioControl={audioControl}
        />
      )} */}
    </React.Fragment>
  );
};

MainView.propTypes = {
  headerTitle: PropTypes.string,
  audioControl: PropTypes.func,
  resumeSong: PropTypes.func,
  pauseSong: PropTypes.func
};

const mapStateToProps = state => {
  return {
    headerTitle: state.uiReducer.title,
    viewType: state.songsReducer.viewType
    //viewTypeAlbum: state.albumTracksReducer.viewType
  };
};

export default connect(mapStateToProps)(MainView);
