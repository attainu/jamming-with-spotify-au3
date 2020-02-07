import { combineReducers } from "redux";
import userReducer from "./userReducer";
import tokenReducer from "./tokenReducer";
import { songsReducer } from "./songsReducer";
import artistsReducer from "./artistsReducer";
import uiReducer from "./uiReducer";
import browseReducer from "./browseReducer";
import { albumsReducer, albumTracksReducer } from "./albumsReducer";
import playlistReducer from "./playlistReducer";

export default combineReducers({
  tokenReducer,
  userReducer,
  songsReducer,
  artistsReducer,
  uiReducer,
  browseReducer,
  albumsReducer,
  albumTracksReducer,
  playlistReducer
});
