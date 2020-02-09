export const playlistReducer = (state = {}, action) => {
  switch (action.type) {
    case "FETCH_PLAYLIST_MENU_PENDING":
      return {
        fetchPlaylistPending: true,
        ...state
      };

    case "FETCH_PLAYLIST_MENU_SUCCESS":
      return {
        playlistMenu: action.playlists,
        playlists: action.playlists,
        fetchPlaylistError: false,
        fetchPlaylistPending: false,
        ...state
      };

    case "FETCH_PLAYLIST_MENU_ERROR":
      return {
        fetchPlaylistError: true,
        fetchPlaylistPending: false,
        ...state
      };

    case "ADD_PLAYLIST_ITEM":
      return {
        ...state,
        playlists: [...state.playlists, action.playlist]
      };

    case "FETCH_PLAYLIST_MENU_SUCCESS":
      return {
        playlistMenu: action.playlists,
        playlists: action.playlists,
        fetchPlaylistError: false,
        fetchPlaylistPending: false,
        ...state
      };

    case "FETCH_PLAYLIST_MENU_ERROR":
      return {
        fetchPlaylistError: true,
        fetchPlaylistPending: false,
        ...state
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
