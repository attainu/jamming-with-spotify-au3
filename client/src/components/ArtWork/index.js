import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import './ArtWork.css'

const ArtWork = (props) => {
 return(
     <div className="album-artwork-container">
        <img className='album-artwork' src={props.albumImage} alt="album-image"/>
     </div>
 )
}

ArtWork.propType = {
    albumImage: PropTypes.string
}

const mapStateToProps = state => {
     console.log(state.songsReducer.songDetails)

    return{
        albumImage: state.songsReducer.songDetails ? state.songsReducer.songDetails.album.images[0].url : ""
    }
}

export default connect(mapStateToProps)(ArtWork)