import uniqBy from "lodash/uniqBy";

export const fetchPlaylistSongsPending = () => {
  return {
    type: "FETCH_PLAYLIST_SONGS_PENDING"
  };
};

export const fetchPlaylistSongsSuccess = songs => {
  return {
    type: "FETCH_PLAYLIST_SONGS_SUCCESS",
    songs
  };
};

export const fetchPlaylistSongsError = () => {
  return {
    type: "FETCH_PLAYLIST_SONGS_ERROR"
  };
};

export const fetchPlaylistsMenuPending = () => {
  return {
    type: "FETCH_PLAYLISTS_MENU_PENDING"
  };
};

export const fetchPlaylistsMenuSuccess = playlists => {
  return {
    type: "FETCH_PLAYLISTS_MENU_SUCCESS",
    playlists
  };
};

export const fetchPlaylistsMenuError = () => {
  return {
    type: "FETCH_PLAYLISTS_MENU_ERROR"
  };
};

export const addPlaylistItem = playlist => {
  return {
    type: "ADD_PLAYLIST_ITEM",
    playlist
  };
};

export const fetchCategoryPlaylistsPending = () => {
  return {
    type: "FETCH_CATEGORY_PLAYLISTS_PENDING"
  };
};

export const fetchCategoryPlaylistsError = () => {
  return {
    type: "FETCH_CATEGORY_PLAYLISTS_ERROR"
  };
};

export const fetchCategoryPlaylistsSuccess = playlists => {
  console.log(playlists);
  return {
    type: "FETCH_CATEGORY_PLAYLISTS_SUCCESS",
    playlists
  };
};

export const createPlaylistPending = () => {
  return {
    type: "CREATE_PLAYLIST_PENDING"
  };
};

export const createPlaylistSuccess = playlist => {
  return {
    type: "CREATE_PLAYLIST_SUCCESS",
    playlist
  };
};

export const createPlaylistError = () => {
  return {
    type: "CREATE_PLAYLIST_ERROR"
  };
};

export const saveTrackToPlaylistPending = () => {
  return {
    type: "SAVE_PLAYLIST_TRACK_PENDING"
  };
};

export const saveTrackToPlaylistSuccess = addedTrack => {
  return {
    type: "SAVE_PLAYLIST_TRACK_SUCCESS",
    addedTrack
  };
};

export const saveTrackToPlaylistError = () => {
  return {
    type: "SAVE_PLAYLIST_TRACK_ERROR"
  };
};

export const fetchPlaylistSongs = (userId, playlistId, accessToken) => {
  return dispatch => {
    const request = new Request(
      `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
      {
        headers: new Headers({
          Authorization: "Bearer " + accessToken
        })
      }
    );

    dispatch(fetchPlaylistSongsPending());

    fetch(request)
      .then(res => {
        return res.json();
      })
      .then(res => {
        //remove duplicate tracks
        res.items = uniqBy(res.items, item => {
          return item.track.id;
        });
        console.log(res.items);
        dispatch(fetchPlaylistSongsSuccess(res.items));
      })
      .catch(err => {
        dispatch(fetchPlaylistSongsError(err));
      });
  };
};

export const fetchPlaylistsMenu = (userId, accessToken) => {
  return dispatch => {
    const request = new Request(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        headers: new Headers({
          Authorization: "Bearer " + accessToken
        })
      }
    );

    dispatch(fetchPlaylistsMenuPending());

    fetch(request)
      .then(res => {
        if (res.statusText === "Unauthorized") {
          window.location.href = "./";
        }
        return res.json();
      })
      .then(res => {
        console.log(res.items);
        dispatch(fetchPlaylistsMenuSuccess(res.items));
      })
      .catch(err => {
        dispatch(fetchPlaylistsMenuError(err));
      });
  };
};

export const fetchCategoryPlaylists = (accessToken, categoryId) => {
  return dispatch => {
    const request = new Request(
      `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists`,
      {
        headers: new Headers({
          Authorization: "Bearer " + accessToken
        })
      }
    );

    dispatch(fetchCategoryPlaylistsPending());

    fetch(request)
      .then(res => {
        if (res.statusText === "Unauthorized") {
          window.location.href = "./";
        }
        return res.json();
      })
      .then(res => {
        console.log(res.playlists.items);
        dispatch(fetchCategoryPlaylistsSuccess(res.playlists.items));
      })
      .catch(err => {
        dispatch(fetchCategoryPlaylistsError(err));
      });
  };
};

export const createPlaylist = (userId, playlistData, accessToken) => {
  return dispatch => {
    const request = new Request(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        headers: new Headers({
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json"
        }),
        method: "POST",
        body: playlistData
      }
    );

    dispatch(createPlaylistPending());
    fetch(request)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        dispatch(createPlaylistError("Request failed!"));
        //throw new Error("Request failed!");
      })
      .then(res => {
        console.log("playlist successfully created.", res);
        dispatch(createPlaylistSuccess(res));
      })
      // .then(res => dispatch(fetchPlaylistsMenu(userId, accessToken)))
      .catch(err => {
        dispatch(createPlaylistError(err));
      });
  };
};

export const saveTrackToPlaylist = (playlistId, trackURI, accessToken) => {
  return dispatch => {
    const request = new Request(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${encodeURIComponent(
        trackURI
      )}`,
      {
        headers: new Headers({
          Authorization: "Bearer " + accessToken,
          Accept: "application/json",
          "Content-Type": "application/json"
        }),
        method: "POST"
      }
    );

    console.log(request);

    dispatch(saveTrackToPlaylistPending());

    fetch(request)
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then(res => {
        console.log("tracks successfully stored", res);
        dispatch(saveTrackToPlaylistSuccess(res));
      })
      .catch(err => {
        dispatch(saveTrackToPlaylistError(err));
      });
  };
};
