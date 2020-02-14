import { combineReducers } from "redux";
import userReducer from "./userReducer";
import tokenReducer from "./tokenReducer";
import { songsReducer } from "./songsReducer";
import artistsReducer from "./artistsReducer";
import uiReducer from "./uiReducer";
import browseReducer from "./browseReducer";
import { albumsReducer, albumTracksReducer } from "./albumsReducer";
import {
  playlistReducer,
  categoryPlaylistReducer,
  createPlaylistReducer,
  unFollowPlaylistReducer
} from "./playlistReducer";
import {createPodcastReducer, podcastReducer, deletePodcastReducer} from './podcastReducer'
import soundReducer from "./soundReducer";

export default combineReducers({
  tokenReducer,
  userReducer,
  songsReducer,
  artistsReducer,
  uiReducer,
  browseReducer,
  albumsReducer,
  albumTracksReducer,
  playlistReducer,
  podcastReducer,
  categoryPlaylistReducer,
  deletePodcastReducer,
  createPlaylistReducer,
  createPodcastReducer,
  unFollowPlaylistReducer,
  soundReducer
});