import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  fetchArtistSongs,
  unfollowArtist
} from "../../redux/actions/artistActions";
import { updateHeaderTitle } from "../../redux/actions/uiActions";
import "./ArtistList.css";

const ArtistList = ({
  artists,
  unfollowArtist,
  fetchArtistSongs,
  token,
  updateHeaderTitle
}) => {
  const renderArtists = () => {
    return artists.map((artist, i) => {
      const artistSongsAction = (artist, token) => {
        fetchArtistSongs(artist.id, token);
        updateHeaderTitle(artist.name);
      };

      const handleClick = (e, artistId) => {
        console.log(e.target.innerText, artistId);
        if (e.target.innerText === "UNFOLLOW") {
          unfollowArtist(artistId, token);
        }
      };

      return (
        <div>
          <li
            onClick={() => {
              artistSongsAction(artist, token);
            }}
            className="artist-item"
            key={i}
          >
            <a>
              <div>
                <div className="artist-image">
                  <img
                    alt="artist-cover"
                    src={artist.images[0] ? artist.images[0].url : ""}
                  />
                </div>
                <div className="artist-details">
                  <p>{artist.name}</p>
                </div>
              </div>
            </a>
          </li>
          <div
            className="artist-unfollow-btn"
            onClick={e => handleClick(e, artist.id)}
          >
            <div>
              <p>
                {artists.findIndex(item => item.name === artist.name) > -1
                  ? "UNFOLLOW"
                  : null}
              </p>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <h3 className="artist-following-text">FOLLOWING</h3>
      <ul className="artist-view-container">{artists && renderArtists()}</ul>
    </>
  );
};

ArtistList.propTypes = {
  artists: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  fetchArtistSongs: PropTypes.func,
  token: PropTypes.string,
  updateHeaderTitle: PropTypes.func
};

const mapStateToProps = state => {
  return {
    token: state.tokenReducer.token ? state.tokenReducer.token : "",
    artists: state.artistsReducer.artistList
      ? state.artistsReducer.artistList.items
      : ""
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchArtistSongs,
      unfollowArtist,
      updateHeaderTitle
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistList);
