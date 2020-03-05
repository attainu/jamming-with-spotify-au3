import { combineReducers } from "redux";
import userReducer from "./userReducer";
import tokenReducer from "./tokenReducer";
import { songsReducer } from "./songsReducer";
import {
  artistsReducer,
  searchArtistReducer,
  followArtistReducer,
  unfollowArtistReducer
} from "./artistsReducer";
import uiReducer from "./uiReducer";
import browseReducer from "./browseReducer";
import {
  albumsReducer,
  albumTracksReducer,
  searchAlbumReducer,
  saveAlbumReducer,
  unFollowAlbumReducer
} from "./albumsReducer";
import {
  playlistReducer,
  categoryPlaylistReducer,
  createPlaylistReducer,
  editPlaylistReducer,
  followPlaylistReducer,
  unFollowPlaylistReducer
} from "./playlistReducer";
import {createPodcastReducer, podcastReducer, deletePodcastReducer, editPodcastReducer} from './podcastReducer'
import soundReducer from "./soundReducer";

export default combineReducers({
  tokenReducer,
  userReducer,
  songsReducer,
  artistsReducer,
  searchArtistReducer,
  followArtistReducer,
  unfollowArtistReducer,
  uiReducer,
  browseReducer,
  albumsReducer,
  albumTracksReducer,
  searchAlbumReducer,
  saveAlbumReducer,
  unFollowAlbumReducer,
  playlistReducer,
  podcastReducer,
  editPodcastReducer,
  categoryPlaylistReducer,
  deletePodcastReducer,
  createPlaylistReducer,
  createPodcastReducer,
  editPlaylistReducer,
  followPlaylistReducer,
  unFollowPlaylistReducer,
  soundReducer
});