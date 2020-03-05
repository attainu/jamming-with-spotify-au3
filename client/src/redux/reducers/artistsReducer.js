const defaultState = {
  artistIds: ""
};

export const artistsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "SET_ARTIST_IDS":
      return {
        ...state,
        artistIds: action.artistIds
      };

    case "FETCH_ARTISTS_PENDING":
      return {
        ...state,
        fetchArtistsPending: true
      };

    case "FETCH_ARTISTS_SUCCESS":
      return {
        ...state,
        artistList: action.artists,
        fetchArtistsError: false,
        fetchArtistsPending: false
      };

    case "FETCH_ARTISTS_ERROR":
      return {
        ...state,
        fetchArtistsError: true,
        fetchArtistsPending: false
      };

    default:
      return state;
  }
};

export const searchArtistReducer = (state = {}, action) => {
  switch (action.type) {
    case "SEARCH_ARTIST_PENDING":
      return {
        ...state,
        searchArtistPending: true
      };

    case "SEARCH_ARTIST_SUCCESS":
      return {
        ...state,
        searchArtistList: action.artists,
        fetchArtistsError: false,
        fetchArtistsPending: false
      };

    case "SEARCH_ARTIST_ERROR":
      return {
        ...state,
        searchArtistError: false,
        searchArtistPending: false
      };

    case "CLEAR_ARTIST_SEARCH":
      return {
        ...state,
        searchArtistList: [],
        searchArtistError: true,
        searchArtistPending: false
      };

    default:
      return state;
  }
};

export const followArtistReducer = (state = {}, action) => {
  switch (action.type) {
    case "FOLLOW_ARTIST_PENDING":
      return {
        ...state,
        followArtistPending: true
      };

    case "FOLLOW_ARTIST_SUCCESS":
      return {
        ...state,
        followedArtist: action.res,
        followArtistError: false,
        followArtistsPending: false
      };

    case "FOLLOW_ARTIST_ERROR":
      return {
        ...state,
        followArtistError: true,
        followArtistPending: false
      };

    default:
      return state;
  }
};

export const unfollowArtistReducer = (state = {}, action) => {
  switch (action.type) {
    case "UNFOLLOW_ARTIST_PENDING":
      return {
        ...state,
        unfollowArtistPending: true
      };

    case "UNFOLLOW_ARTIST_SUCCESS":
      return {
        ...state,
        unfollowedArtist: action.res,
        unfollowArtistError: false,
        unfollowArtistsPending: false
      };

    case "UNFOLLOW_ARTIST_ERROR":
      return {
        ...state,
        unfollowArtistError: true,
        unfollowArtistPending: false
      };

    default:
      return state;
  }
};
