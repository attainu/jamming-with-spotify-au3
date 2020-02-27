import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateVolume } from "../../redux/actions/soundActions";
import "./VolumeControls.css";

const VolumeControls = ({ volume, updateVolume }) => {
  const [localVolume, setVolume] = useState(volume);
  console.log("Local vol", localVolume);

  const changeVolume = e => {
    console.log(e.target.value);
    setVolume(e.target.value);
    updateVolume(Math.ceil(e.target.value / 10) * 10);
  };

  return (
    <div className="volume-container">
      <i className="fa fa-volume-up" aria-hidden="true" />
      <input
        className="volume"
        type="range"
        min={0}
        max={100}
        value={localVolume}
        onChange={changeVolume}
      />
    </div>
  );
};

VolumeControls.propTypes = {
  volume: PropTypes.number,
  updateVolume: PropTypes.func
};

const mapStateToProps = state => {
  return {
    volume: state.soundReducer.volume
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateVolume
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(VolumeControls);
