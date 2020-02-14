import React from "react";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateHeaderTitle } from "../../redux/actions/uiActions";
import { fetchAlbumTracks } from "../../redux/actions/albumActions";
import { updateViewType } from "../../redux/actions/songActions";
import "./Albums.css";

const Albums = props => {
  //fetchAlbums(props.token)
  return (
    <div className="albums-container">
      {/* <div> */}
      {/* <li> */}
      {console.log(props)}

      {props.albums
        ? props.albums.map((item, index) => {
            const albumTracks = (token, item) => {
              props.fetchAlbumTracks(token, item.album.id);
              props.updateHeaderTitle(item.album.name);
              props.updateViewType("Album");
            };
            return (
              <div
                className="album-item"
                key={index}
                onClick={() => {
                  albumTracks(props.token, item);
                }}
              >
                <div className="album-image">
                  <img src={item.album.images[0].url} alt="album"></img>
                  <div className="play-song">
                    <i
                      className="fa fa-play-circle-o play-btn"
                      aria-hidden="true"
                    ></i>
                  </div>
                </div>

                <div className="album-details">
                  <p className="album-name">{item.album.name}</p>
                  <p className="artist-name">{item.album.artists[0].name}</p>
                </div>
              </div>
            );
          })
        : ""}
      {/* </li> */}
      {/* </div> */}
    </div>
  );

};

Albums.propTypes = {
  token: PropTypes.string,
  albums: PropTypes.array,
  updateHeaderTitle: PropTypes.func,
  fetchAlbumTracks: PropTypes.func
};

const mapStateToProps = state => {
  return {
    token: state.tokenReducer.token,
    albums: state.albumsReducer.albums
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchAlbumTracks,
      updateHeaderTitle,
      updateViewType
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Albums);