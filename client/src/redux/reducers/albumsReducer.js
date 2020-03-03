export const albumsReducer = (state = {}, action) => {
  switch (action.type) {
    case "FETCH_ALBUMS_PENDING":
      return {
        ...state,
        fetchAlbumsPending: true
      };

    case "FETCH_ALBUMS_SUCCESS":
      return {
        ...state,
        albums: action.albums,
        fetchAlbumsError: false,
        fetchAlbumsPending: false
      };

    case "FETCH_ALBUMS_ERROR":
      return {
        ...state,
        fetchAlbumsError: true,
        fetchAlbumsPending: false
      };

    case "ADD_ALBUM":
      return {
        ...state,
        //albums: action.album
        releaseAlbum: action.album
      };

    default:
      return state;
  }
};

//export default albumsReducer;

export const albumTracksReducer = (state = {}, action) => {
  switch (action.type) {
    case "FETCH_ALBUM_TRACKS_PENDING":
      return {
        ...state,
        fetchAlbumTracksPending: true
      };

    case "FETCH_ALBUM_TRACKS_SUCCESS":
      return {
        ...state,
        albumTracks: action.albumTracks,
        fetchAlbumTracksError: false,
        fetchAlbumTracksPending: false,
        viewType: "Album"
      };

    case "FETCH_ALBUM_TRACKS_ERROR":
      return {
        ...state,
        fetchAlbumTracksError: true,
        fetchAlbumTracksPending: false
      };

    default:
      return state;
  }
};

export const searchAlbumReducer = (state = {}, action) => {
  switch (action.type) {
    case "SEARCH_ALBUM_PENDING":
      return {
        ...state,
        searchAlbumPending: true
      };

    case "SEARCH_ALBUM_SUCCESS":
      return {
        ...state,
        searchAlbumList: action.albums,
        fetchAlbumsError: false,
        fetchAlbumsPending: false
      };

    case "SEARCH_ALBUM_ERROR":
      return {
        ...state,
        searchAlbumError: false,
        searchAlbumPending: false
      };

    case "CLEAR_ALBUM_SEARCH":
      return {
        ...state,
        searchAlbumList: [],
        searchAlbumError: true,
        searchAlbumPending: false
      };

    default:
      return state;
  }
};

export const saveAlbumReducer = (state = {}, action) => {
  switch (action.type) {
    case "SAVE_ALBUM_PENDING":
      return {
        ...state,
        saveAlbumPending: true
      };

    case "SAVE_ALBUM_SUCCESS":
      return {
        ...state,
        savedAlbum: action.savedAlbum,
        saveAlbumPending: false,
        saveAlbumError: false
      };

    case "SAVE_ALBUM_ERROR":
      return {
        ...state,
        saveAlbumPending: false,
        saveAlbumError: true
      };

    default:
      return state;
  }
};

export const unFollowAlbumReducer = (state = {}, action) => {
  switch (action.type) {
    case "UNFOLLOW_ALBUM_PENDING":
      return {
        ...state,
        unFollowAlbumPending: true
      };

    case "UNFOLLOW_ALBUM_SUCCESS":
      return {
        ...state,
        unFollowedAlbum: action.unFollowedAlbum,
        unFollowAlbumPending: false,
        unFollowAlbumError: false
      };

    case "UNFOLLOW_ALBUM_ERROR":
      return {
        ...state,
        unFollowAlbumPending: false,
        unFollowAlbumError: true
      };

    default:
      return state;
  }
};
