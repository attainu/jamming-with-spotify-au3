import { combineReducers } from "redux";
import userReducer from "./userReducer";
import tokenReducer from "./tokenReducer";
import { songsReducer } from "./songsReducer";
import artistsReducer from "./artistsReducer";
import uiReducer from "./uiReducer";
import browseReducer from "./browseReducer";
import {
  albumsReducer,
  albumTracksReducer,
  saveAlbumReducer
} from "./albumsReducer";
import {
  playlistReducer,
  categoryPlaylistReducer,
  createPlaylistReducer,
  editPlaylistReducer,
  followPlaylistReducer,
  unFollowPlaylistReducer
} from "./playlistReducer";
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
  saveAlbumReducer,
  playlistReducer,
  categoryPlaylistReducer,
  createPlaylistReducer,
  editPlaylistReducer,
  followPlaylistReducer,
  unFollowPlaylistReducer,
  soundReducer
});
