import React, { Component, useState } from "react";
import PropTypes from "prop-types";
import "./TrackSearch.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { searchSongs } from "../../redux/actions/songActions";
import { updateHeaderTitle } from "../../redux/actions/uiActions";

const TrackSearch = ({ token, searchSongs, updateHeaderTitle }) => {
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
            updateHeaderTitle("Search Results...");
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
    token: state.tokenReducer.token,
    headerTitle: state.uiReducer.title
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      searchSongs,
      updateHeaderTitle
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackSearch);
