import React, { Component, useState } from "react";
import PropTypes from "prop-types";
import "./TrackSearch.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { searchSongs } from "../../redux/actions/songActions";

const TrackSearch = ({ token, searchSongs }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const updateSearchTerm = e => {
    setSearchTerm(e.target.value);
  };

  var accessToken = token;
  return (
    <div className="track-search-container">
      <form
        onSubmit={() => {
          searchSongs(searchTerm, accessToken);
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
            searchSongs(searchTerm, accessToken);
          }}
        >
          <i className="fa fa-search search" aria-hidden="true" />
        </button>
      </form>
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
