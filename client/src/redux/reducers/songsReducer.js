const defaultState = {
  fetchArtistSongsPending: true,
  fetchSongsPending: true,
  fetchTopTracksPending: true,
  searchSongsPending: true,
  songPlaying: false,
  //timeElapsed: 0,
  songId: 0,
  viewType: "songs",
  songPaused: true
};

export const songsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "UPDATE_VIEW_TYPE":
      return {
        ...state,
        viewType: action.view
      };

    case "FETCH_ARTIST_SONGS_PENDING":
      return {
        ...state,
        fetchArtistSongsPending: true
      };

    case "FETCH_ARTIST_SONGS_SUCCESS":
      return {
        ...state,
        songs: action.songs,
        viewType: "Artist",
        fetchArtistSongsError: false,
        fetchArtistSongsPending: false
      };

    case "FETCH_ARTIST_SONGS_ERROR":
      return {
        ...state,
        fetchArtistSongsError: true,
        fetchArtistSongsPending: false
      };

    case "SEARCH_SONGS_SUCCESS":
      return {
        ...state,
        viewType: "Search",
        searchSongsError: false,
        songs: action.songs
      };

    case "SEARCH_SONGS_ERROR":
      return {
        ...state,
        searchSongsError: true
      };
    case "SEARCH_SONGS_PENDING":
      return {
        ...state,
        searchSongsPending: true
      };

    case "FETCH_TOPTRACKS_PENDING":
      return {
        ...state,
        fetchTopTracksPending: true
      };

    case "FETCH_TOPTRACKS_SUCCESS":
      return {
        ...state,
        songs: action.songs,
        viewType: "Top Tracks",
        fetchTopTracksError: false,
        fetchTopTracksPending: false
      };

    case "FETCH_TOPTRACKS_ERROR":
      return {
        ...state,
        fetchTopTracksError: true,
        fetchTopTracksPending: false
      };

    case "FETCH_RECENTLY_PLAYED_PENDING":
      return {
        ...state,
        fetchSongsPending: true
      };

    case "FETCH_RECENTLY_PLAYED_SUCCESS":
      return {
        ...state,
        songs: action.songs,
        viewType: "Recently Played",
        fetchSongsError: false,
        fetchSongsPending: false
      };

    case "FETCH_RECENTLY_PLAYED_ERROR":
      return {
        ...state,
        fetchSongsError: true,
        fetchSongsPending: false
      };

    case "FETCH_PLAYLIST_SONGS_PENDING":
      return {
        ...state,
        fetchPlaylistSongsPending: true
      };

    case "FETCH_PLAYLIST_SONGS_SUCCESS":
      return {
        ...state,
        songs: action.songs,
        viewType: "playlist",
        fetchPlaylistSongsError: false,
        fetchPlaylistSongsPending: false
      };

    case "FETCH_PLAYLIST_SONGS_ERROR":
      return {
        ...state,
        fetchPlaylistSongsError: true,
        fetchPlaylistSongsPending: true
      };

    case "BROWSE_ALBUM_PENDING":
      return {
        ...state,
        browseAlbumPending: true
      };

    case "BROWSE_ALBUM_SUCCESS":
      return {
        ...state,
        songs: action.songs,
        viewType: "Songs",
        browseAlbumError: false,
        browseAlbumPending: false
      };

    case "BROWSE_ALBUM_ERROR":
      return {
        ...state,
        browseAlbumError: true,
        browseAlbumPending: false
      };

    // case "PLAY_SONG":
    //   return {
    //     ...state,
    //     songPlaying: true,
    //     songDetails: action.song,
    //     songId: action.song.id,
    //     songPaused: false
    //   };

    // case "STOP_SONG":
    //   return {
    //     ...state,
    //     songPlaying: false,
    //     songDetails: null,
    //     songPaused: true
    //   };

    // case "PAUSE_SONG":
    //   return {
    //     ...state,
    //     songPaused: true
    //   };

    // case "RESUME_SONG":
    //   return {
    //     ...state,
    //     songPaused: false
    //   };

    default:
      return state;
  }
};

export default songsReducer;
