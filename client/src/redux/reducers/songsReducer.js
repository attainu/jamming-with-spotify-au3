const defaultState = {
  fetchArtistSongsPending: true,
  fetchSongsPending: true,
  fetchTopTracksPending: true,
  searchSongsPending: true,
  songPlaying: false,
  timeElapsed: 0,
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

    case "PLAY_SONG":
      return {
        ...state,
        songPlaying: true,
        songDetails: action.song,
        songId: action.song.id,
        timeElapsed: 0,
        songPaused: false
      };

    case "STOP_SONG":
      return {
        ...state,
        songPlaying: false,
        songDetails: null,
        timeElapsed: 0,
        songPaused: true
      };

    case "PAUSE_SONG":
      return {
        ...state,
        songPaused: true
      };

    case "RESUME_SONG":
      return {
        ...state,
        songPaused: false
      };

    case "INCREASE_SONG_TIME":
      return {
        ...state,
        timeElapsed: action.time
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

    case "FETCH_PODCASTS_SONGS_PENDING":
      return {
        ...state,
        fetchPodcastSongsPending: true
      };

    case "FETCH_PODCASTS_SONGS_SUCCESS":
      return {
        ...state,
        podcastSongs: action.songs,
        viewType: "podcast",
        fetchPodcastSongsError: false,
        fetchPodcastSongsPending: false
      };

    case "FETCH_PODCASTS_SONGS_ERROR":
      return {
        ...state,
        fetchPodcastSongsError: true,
        fetchPodcastSongsPending: true
      };

    case "FETCH_SONGS_PENDING":
      return {
        ...state,
        fetchSongsPending: true
      };

    case "FETCH_SONGS_SUCCESS":
      return {
        ...state,
        likedSongs: action.likedSongs,
        fetchSongsError: false,
        fetchSongsPending: false,
        viewType: "Liked Songs"
      };

    case "FETCH_SONGS_ERROR":
      return {
        ...state,
        fetchSongsError: true,
        fetchSongsPending: false
      };

    case "SAVE_PLAYLIST_TRACK_PENDING":
      return {
        ...state,
        savePlaylistTrackPending: true
      };

    case "SAVE_PLAYLIST_TRACK_SUCCESS":
      return {
        ...state,
        //songs: action.songs,
        addedTrack: action.addedTrack,
        savePlaylistTrackPending: false,
        savePlaylistTrackError: false
        //viewType: "songs"
      };

    case "SAVE_PLAYLIST_TRACK_ERROR":
      return {
        ...state,
        savePlaylistTrackError: true,
        savePlaylistTrackPending: false
      };

    case "SAVE_PODCAST_TRACK_PENDING":
      return {
        ...state,
        saveTrackToPodcastPending: true
      };

    case "SAVE_PODCAST_TRACK_SUCCESS":
      return {
        ...state,
        updatePodcastRes: action.saveTrackRes,
        saveTrackToPodcastPending: false,
        saveTrackToPodcastError: false
      };

    case "SAVE_PODCAST_TRACK_ERROR":
      return {
        ...state,
        saveTrackToPodcastError: true,
        saveTrackToPodcastPending: false
      };

    case "REMOVE_PLAYLIST_TRACK_PENDING":
      return {
        ...state,
        savePlaylistTrackPending: true
      };

    case "REMOVE_PLAYLIST_TRACK_SUCCESS":
      return {
        ...state,
        removedTrack: action.removedTrack,
        savePlaylistTrackPending: false,
        savePlaylistTrackError: false
      };

    case "REMOVE_PLAYLIST_TRACK_ERROR":
      return {
        ...state,
        savePlaylistTrackError: true,
        savePlaylistTrackPending: false
      };

    case "DELETE_TRACK_FROM_PODCAST_PENDING":
      return {
        ...state,
        savePodcastTrackPending: true
      };

    case "DELETE_TRACK_FROM_PODCAST_SUCCESS":
      return {
        ...state,
        delTrackRes: action.delTrackRes,
        savePodcastTrackPending: false,
        savePodcastTrackError: false
      };

    case "DELETE_TRACK_FROM_PODCAST_ERROR":
      return {
        ...state,
        savePodcastTrackError: true,
        savePodcastTrackPending: false
      };

    case "ADD_FAVOURITES_PENDING":
      return {
        ...state,
        addFavouritesPending: true
      };

    case "ADD_FAVOURITES_SUCCESS":
      return {
        ...state,
        newFavSong: action.res,
        addFavouritesError: false,
        addFavouritesPending: false,
      };

    case "ADD_FAVOURITES_ERROR":
      return {
        ...state,
        addFavouritesError: true,
        addFavouritesPending: false
      };

    case "FETCH_FAVOURITES_PENDING":
      return {
        ...state,
        fetchFavouritesPending: true
      };

    case "FETCH_FAVOURITES_SUCCESS":
      return {
        ...state,
        favouriteSongs: action.songs,
        fetchFavouritesError: false,
        fetchFavouritesPending: false,
        viewType: "Favourite Songs"
      };
  
    case "FETCH_FAVOURITES_ERROR":
      return {
        ...state,
        fetchFavouritesError: true,
        fetchFavouritesPending: false
      };

    default:
      return state;
  }
};

export default songsReducer;
