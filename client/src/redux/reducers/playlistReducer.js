export const playlistReducer = (state = {}, action) => {
  switch (action.type) {
    case "FETCH_PLAYLISTS_MENU_PENDING":
      return {
        ...state,
        fetchPlaylistPending: true
      };

    case "FETCH_PLAYLISTS_MENU_SUCCESS":
      return {
        ...state,
        playlistMenu: [...action.playlists],
        playlists: [...action.playlists],
        fetchPlaylistError: false,
        fetchPlaylistPending: false
      };

    case "FETCH_PLAYLISTS_MENU_ERROR":
      return {
        ...state,
        fetchPlaylistError: true,
        fetchPlaylistPending: false
      };

    case "ADD_PLAYLIST_ITEM":
      return {
        ...state,
        playlists: [...state.playlists, action.playlist]
      };

    default:
      return state;
  }
};

export const categoryPlaylistReducer = (state = {}, action) => {
  switch (action.type) {
    case "FETCH_CATEGORY_PLAYLISTS_PENDING":
      return {
        fetchCategoryPlaylistsPending: true,
        ...state
      };

    case "FETCH_CATEGORY_PLAYLISTS_SUCCESS":
      console.log(action.playlists);
      return {
        ...state,
        categoryPlaylists: action.playlists,
        fetchCategoryPlaylistsError: false,
        fetchCategoryPlaylistsPending: false
      };

    case "FETCH_CATEGORY_PLAYLISTS_ERROR":
      return {
        fetchCategoryPlaylistsError: true,
        fetchCategoryPlaylistsPending: false,
        ...state
      };

    default:
      return state;
  }
};

export const createPlaylistReducer = (state = {}, action) => {
  switch (action.type) {
    case "CREATE_PLAYLIST_PENDING":
      return {
        ...state,
        createPlaylistPending: true
      };

    case "CREATE_PLAYLIST_SUCCESS":
      return {
        ...state,
        newPlaylistData: action.playlist,
        createPlaylistPending: false,
        createPlaylistError: false
      };

    case "CREATE_PLAYLIST_ERROR":
      return {
        ...state,
        createPlaylistPending: false,
        createPlaylistError: true
      };

    default:
      return state;
  }
};

export const editPlaylistReducer = (state = {}, action) => {
  switch (action.type) {
    case "EDIT_PLAYLIST_PENDING":
      return {
        ...state,
        editPlaylistPending: true
      };

    case "EDIT_PLAYLIST_SUCCESS":
      return {
        ...state,
        updatedPlaylistResponse: action.response,
        editPlaylistPending: false,
        editPlaylistError: false
      };

    case "EDIT_PLAYLIST_ERROR":
      return {
        ...state,
        editPlaylistPending: false,
        editPlaylistError: true
      };

    default:
      return state;
  }
};

export const unFollowPlaylistReducer = (state = {}, action) => {
  switch (action.type) {
    case "UNFOLLOW_PLAYLIST_PENDING":
      return {
        ...state,
        unFollowPlaylistPending: true
      };

    case "UNFOLLOW_PLAYLIST_SUCCESS":
      return {
        ...state,
        delResponse: action.delResponse,
        unFollowPlaylistPending: false,
        unFollowPlaylistError: false
      };

    case "UNFOLLOW_PLAYLIST_ERROR":
      return {
        ...state,
        unFollowPlaylistPending: false,
        unFollowPlaylistError: true
      };

    default:
      return state;
  }
};
