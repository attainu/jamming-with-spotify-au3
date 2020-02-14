export const createPodcastReducer = (state = {}, action) => {
    switch (action.type) {
      case "CREATE_PODCAST_PENDING":
        return {
          ...state,
          createPodcastPending: true
        };
  
      case "CREATE_PODCAST_SUCCESS":
        return {
          ...state,
          newPodcastData: action.podcast,
          createPodcastPending: false,
          createPodcastError: false
        };
  
      case "CREATE_PODCAST_ERROR":
        return {
          ...state,
          createPodcastPending: false,
          createPodcastError: true
        };
  
      default:
        return state;
    }
  };

export const podcastReducer = (state = {}, action) => {
  switch (action.type) {
    case "FETCH_PODCASTS_MENU_PENDING":
      return {
        ...state,
        fetchPodcastPending: true
      };

    case "FETCH_PODCASTS_MENU_SUCCESS":
      return {
        ...state,
        podcastMenu: [...action.podcasts],
        podcasts: [...action.podcasts],
        fetchPodcastError: false,
        fetchPodcastPending: false
      };

    case "FETCH_PODCASTS_MENU_ERROR":
      return {
        ...state,
        fetchPodcastError: true,
        fetchPodcastPending: false
      };

    // case "ADD_PLAYLIST_ITEM":
    //   return {
    //     ...state,
    //     playlists: [...state.playlists, action.playlist]
    //   };

    default:
      return state;
  }
};

export const deletePodcastReducer = (state = {}, action) => {
  switch (action.type) {
    case "DELETE_PODCAST_PENDING":
      return {
        ...state,
        deletePodcastPending: true
      };

    case "DELETE_PODCAST_SUCCESS":
      return {
        ...state,
        deletePodcastError: false,
        deletePodcastPending: false
      };

    case "DELETE_PODCAST_ERROR":
      return {
        ...state,
        deletePodcastPending: false,
        deletePodcastError: true
      };

    default:
      return state;
  }
};