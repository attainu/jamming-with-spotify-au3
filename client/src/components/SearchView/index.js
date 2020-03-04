import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./SearchView.css";
import "../Albums/Albums.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  searchArtist,
  followArtist,
  clearArtistSearch
} from "../../redux/actions/artistActions";

import { updateHeaderTitle } from "../../redux/actions/uiActions";
import {
  fetchAlbumTracks,
  searchAlbum,
  saveAlbum,
  clearAlbumSearch
} from "../../redux/actions/albumActions";
import { updateViewType } from "../../redux/actions/songActions";

const SearchView = ({
  token,
  viewType,
  searchArtist,
  searchAlbum,
  followArtist,
  saveAlbum,
  headerTitle,
  searchArtistList,
  searchAlbumList,
  clearArtistSearch,
  clearAlbumSearch,
  artistList,
  albumList,
  fetchAlbumTracks,
  updateViewType,
  updateHeaderTitle
}) => {
  const [artistName, setArtistName] = useState("");
  const [albumName, setAlbumName] = useState("");

  const updateSearchTerm = e => {
    if (headerTitle === "Artists") setArtistName(e.target.value);
    else if (headerTitle === "Albums") setAlbumName(e.target.value);
  };

  const handleClick = (e, searchId) => {
    console.log(e.target.innerText, searchId);
    if (e.target.innerText === "FOLLOW" && headerTitle === "Artists")
      followArtist(searchId, token);
    else if (e.target.innerText === "FOLLOW" && headerTitle === "Albums")
      saveAlbum(searchId, token);
  };

  useEffect(() => {
    console.log("Unmounting");
    if (viewType !== "Artists") clearArtistSearch();
    if (viewType !== "Albums" && viewType !== "Album") clearAlbumSearch();

    console.log(searchArtistList);
  }, [viewType]);

  return (
    <>
      {(headerTitle === "Artists" || headerTitle === "Albums") && (
        <>
          <div className="search-box-container">
            <form>
              <input
                onChange={updateSearchTerm}
                type="text"
                placeholder="Search..."
              />
              <button
                onClick={e => {
                  e.preventDefault();
                  headerTitle === "Artists"
                    ? searchArtist(artistName, token)
                    : searchAlbum(albumName, token);
                }}
              >
                <i className="fa fa-search search" aria-hidden="true" />
              </button>
            </form>
          </div>
        </>
      )}

      {headerTitle === "Artists" && searchArtistList.length > 0 && (
        <>
          <h3 className="artist-search-text">RESULTS</h3>
          <div className="search-results-container">
            {searchArtistList.map((artist, i) => {
              return (
                <li className="artist-item" key={i}>
                  <a>
                    <div>
                      <div className="artist-image">
                        <img
                          alt="artist-cover"
                          src={
                            artist.images[0]
                              ? artist.images[0].url
                              : "https://source.unsplash.com/1600x900/?music"
                          }
                        />
                      </div>
                      <div className="artist-details">
                        <p>{artist.name}</p>
                      </div>
                    </div>
                  </a>

                  <div
                    className="artist-follow-btn"
                    onClick={e => handleClick(e, artist.id)}
                  >
                    <div>
                      <p>
                        {artistList.findIndex(
                          item => item.name === artist.name
                        ) > -1
                          ? null
                          : "FOLLOW"}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </div>
        </>
      )}

      {headerTitle === "Albums" && searchAlbumList.length > 0 && (
        <>
          <h3 className="artist-search-text">RESULTS</h3>
          <div className="search-results-container">
            {searchAlbumList.map((album, i) => {
              const albumTracks = (token, album) => {
                fetchAlbumTracks(token, album.id);
                updateHeaderTitle(album.name);
                updateViewType("Album");
              };

              return (
                <>
                  <div className="album-item" key={album.id}>
                    <div
                      className="album-image"
                      onClick={() => {
                        albumTracks(token, album);
                      }}
                    >
                      <img src={album.images[0].url} alt="album"></img>
                      <div className="play-song">
                        <i
                          className="fa fa-play-circle-o play-btn"
                          aria-hidden="true"
                        ></i>
                      </div>
                    </div>

                    <div className="album-details">
                      <p className="album-name">{album.name}</p>
                      <p className="artist-name">{album.artists[0].name}</p>
                    </div>

                    <div
                      className="album-follow-btn"
                      onClick={e => handleClick(e, album.id)}
                    >
                      <p>
                        {albumList.findIndex(
                          item => item.album.name === album.name
                        ) > -1
                          ? null
                          : "FOLLOW"}
                      </p>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

SearchView.propTypes = {
  searchArtist: PropTypes.func,
  followArtist: PropTypes.func,
  clearArtistSearch: PropTypes.func,
  searchAlbum: PropTypes.func,
  saveAlbum: PropTypes.func,
  token: PropTypes.string,
  headerTitle: PropTypes.string,
  viewType: PropTypes.string,
  searchArtistList: PropTypes.array,
  artistList: PropTypes.array,
  updateHeaderTitle: PropTypes.func,
  fetchAlbumTracks: PropTypes.func
};

const mapStateToProps = state => {
  return {
    token: state.tokenReducer.token,
    headerTitle: state.uiReducer.title,
    searchArtistList: state.searchArtistReducer.searchArtistList,
    searchAlbumList: state.searchAlbumReducer.searchAlbumList,
    artistList: state.artistsReducer.artistList
      ? state.artistsReducer.artistList.items
      : [],
    albumList: state.albumsReducer.albums ? state.albumsReducer.albums : [],
    viewType: state.songsReducer.viewType
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      searchArtist,
      followArtist,
      clearArtistSearch,
      clearAlbumSearch,
      searchAlbum,
      saveAlbum,
      fetchAlbumTracks,
      updateViewType,
      updateHeaderTitle
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchView);
