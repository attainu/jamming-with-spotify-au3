import React, { Component, useState } from "react";
import PropTypes from "prop-types";
import "./TrackSearch.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { searchSongs } from "../../redux/actions/songActions";
// import SongList from '../SongList'

const TrackSearch = props => {
  const [searchTerm, setSearchTerm] = useState("");

  const updateSearchTerm = e => {
    setSearchTerm(e.target.value);
  };

  var accessToken = props.token;
  return (
    <div className="track-search-container">
      <form
        onSubmit={() => {
          props.searchSongs(searchTerm, accessToken);
        }}
      >
        <input
          onChange={updateSearchTerm}
          type="text"
          placeholder="Search..."
        />
        <button
          onClick={e => {
            e.preventDefault();
            props.searchSongs(searchTerm, accessToken);
          }}
        >
          <i className="fa fa-search search" aria-hidden="true" />
        </button>
      </form>

      {/* <SongList/> */}
    </div>
  );
};

TrackSearch.propTypes = {
  searchSongs: PropTypes.func,
  token: PropTypes.string
};

const mapStateToProps = state => {
  return {
    token: state.tokenReducer.token
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      searchSongs
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackSearch);
