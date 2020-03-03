import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  fetchFavourites
} from "../../redux/actions/songActions";
import {fetchUser} from '../../redux/actions/userActions'
import "../SongList/SongList.css";

const FavouriteSongs = ({
  favouriteSongs,
  fetchFavouritesError,
  fetchFavouritesPending,
  viewType,
  fetchFavourites,
  songPlaying,
  songPaused,
  resumeSong,
  pauseSong,
  audioControl,
  songId,
  userName,
  newFavSong
}) => {
 
  useEffect(() => {
    if (
      !fetchFavouritesError &&
      !fetchFavouritesPending &&
      viewType === "Favourite Songs"
    ) {
      fetchFavourites(userName);
    }
  }, [newFavSong]);

  const renderSongs = () => {
    return favouriteSongs
      ? favouriteSongs.map((song, i) => {
          const buttonClass =
            song.id === songId && !songPaused
              ? "fa-pause-circle-o"
              : "fa-play-circle-o";

          return (
            <li
              className={
                song.id === songId
                  ? "active user-song-item"
                  : "user-song-item"
              }
              key={i}
            >
              <div
                onClick={() => {
                  song.id === songId && songPlaying && songPaused
                    ? resumeSong()
                    : songPlaying && !songPaused && song.id === songId
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

              <div className="song-title">
                <p>{song.trackName}</p>
              </div>

              <div className="song-artist">
                <p>{song.artistName}</p>
              </div>

              <div className="song-album">
                <p>{song.albumName}</p>
              </div>

              <div className="song-added">
                <p>{song.albumReleaseDate}</p>
              </div>

              <div className="song-length">
                <p>{song.duration}</p>
              </div>
            </li>
          );
        })
      : null;
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
      {favouriteSongs &&
        !fetchFavouritesPending &&
        renderSongs()}

    </div>
  );
};

FavouriteSongs.propTypes = {
  viewType: PropTypes.string,
  songId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  songAddedId: PropTypes.string,
  favouriteSongs: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  fetchFavouritesError: PropTypes.bool,
  fetchFavouritesPending: PropTypes.bool,
  fetchPlaylistSongsPending: PropTypes.bool,
  fetchPlaylistPending: PropTypes.bool,
  fetchPlaylistSongsError: PropTypes.bool,
  audioControl: PropTypes.func,
  songPaused: PropTypes.bool,
  songPlaying: PropTypes.bool,
  resumeSong: PropTypes.func,
  pauseSong: PropTypes.func
};

const mapStateToProps = state => {
  return {
    favouriteSongs: state.songsReducer.favouriteSongs
      ? state.songsReducer.favouriteSongs
      : [],
    fetchFavouritesError: state.songsReducer.fetchFavouritesError,
    fetchFavouritesPending: state.songsReducer.fetchFavouritesPending,
    fetchPlaylistSongsPending: state.songsReducer.fetchPlaylistSongsPending,
    fetchPlaylistPending: state.playlistReducer.fetchPlaylistPending,
    fetchPlaylistSongsError: state.songsReducer.fetchPlaylistSongsError,
    songPlaying: state.songsReducer.songPlaying,
    songPaused: state.songsReducer.songPaused,
    songId: state.songsReducer.songId,
    songAddedId: state.userReducer.songId || "",
    viewType: state.songsReducer.viewType,
    newFavSong: state.songsReducer.newFavSong ?  state.songsReducer.newFavSong : "",
    userId: state.userReducer.user ? state.userReducer.user.id : "",
    userName: state.userReducer.user ? state.userReducer.user.display_name : ""
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchFavourites,
      fetchUser
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FavouriteSongs);
