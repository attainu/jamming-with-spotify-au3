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

export const editPlaylistPending = () => {
  return {
    type: "EDIT_PLAYLIST_PENDING"
  };
};

export const editPlaylistSuccess = response => {
  return {
    type: "EDIT_PLAYLIST_SUCCESS",
    response
  };
};

export const editPlaylistError = () => {
  return {
    type: "EDIT_PLAYLIST_ERROR"
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

export const removeTrackFromPlaylistPending = () => {
  return {
    type: "REMOVE_PLAYLIST_TRACK_PENDING"
  };
};

export const removeTrackFromPlaylistSuccess = removedTrack => {
  return {
    type: "REMOVE_PLAYLIST_TRACK_SUCCESS",
    removedTrack
  };
};

export const removeTrackFromPlaylistError = () => {
  return {
    type: "REMOVE_PLAYLIST_TRACK_ERROR"
  };
};

export const followPlaylistPending = () => {
  return {
    type: "FOLLOW_PLAYLIST_PENDING"
  };
};

export const followPlaylistSuccess = folResponse => {
  return {
    type: "FOLLOW_PLAYLIST_SUCCESS",
    folResponse
  };
};

export const followPlaylistError = () => {
  return {
    type: "FOLLOW_PLAYLIST_ERROR"
  };
};

export const unFollowPlaylistPending = () => {
  return {
    type: "UNFOLLOW_PLAYLIST_PENDING"
  };
};

export const unFollowPlaylistSuccess = delResponse => {
  return {
    type: "UNFOLLOW_PLAYLIST_SUCCESS",
    delResponse
  };
};

export const unFollowPlaylistError = () => {
  return {
    type: "UNFOLLOW_PLAYLIST_ERROR"
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
        if (!res.ok) {
          dispatch(createPlaylistError());
        }
        return res.json();
      })
      .then(res => {
        console.log("playlist successfully created.", res);
        dispatch(createPlaylistSuccess(res));
      })
      .catch(err => {
        dispatch(createPlaylistError(err));
      });
  };
};

export const editPlaylist = (playlistId, playlistData, accessToken) => {
  return dispatch => {
    const request = new Request(
      `https://api.spotify.com/v1/playlists/${playlistId}`,
      {
        headers: new Headers({
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json"
        }),
        method: "PUT",
        body: playlistData
      }
    );

    dispatch(editPlaylistPending());

    fetch(request)
      .then(res => {
        return res;
      })
      .then(res => {
        console.log("playlist successfully updated.", res);
        dispatch(editPlaylistSuccess(res));
      })
      .catch(err => {
        dispatch(editPlaylistError(err));
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

export const removeTrackFromPlaylist = (playlistId, trackURI, accessToken) => {
  return dispatch => {
    const request = new Request(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${encodeURIComponent(
        trackURI
      )}`,
      {
        method: "DELETE",
        headers: new Headers({
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json"
        })
      }
    );

    console.log(request);

    dispatch(removeTrackFromPlaylistPending());

    fetch(request)
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then(res => {
        console.log("track successfully removed", res);
        dispatch(removeTrackFromPlaylistSuccess(res));
      })
      .catch(err => {
        dispatch(removeTrackFromPlaylistError(err));
      });
  };
};

export const followPlaylist = (playlistId, accessToken) => {
  return dispatch => {
    const request = new Request(
      `https://api.spotify.com/v1/playlists/${playlistId}/followers`,
      {
        method: "PUT",
        headers: new Headers({
          Authorization: "Bearer " + accessToken,
          Accept: "application/json",
          "Content-Type": "application/json"
        })
      }
    );

    console.log(request);

    dispatch(followPlaylistPending());

    fetch(request)
      .then(res => {
        console.log(res);
        return res;
      })
      .then(res => {
        console.log("Playlist successfully followed", res);
        dispatch(followPlaylistSuccess(res));
      })
      .catch(err => {
        dispatch(followPlaylistError(err));
      });
  };
};

export const unFollowPlaylist = (playlistId, accessToken) => {
  return dispatch => {
    const request = new Request(
      `https://api.spotify.com/v1/playlists/${playlistId}/followers`,
      {
        method: "DELETE",
        headers: new Headers({
          Authorization: "Bearer " + accessToken
        })
      }
    );

    console.log(request);

    dispatch(unFollowPlaylistPending());

    fetch(request)
      .then(res => {
        console.log(res);
        return res;
      })
      .then(res => {
        console.log("Playlist successfully unfollowed", res);
        dispatch(unFollowPlaylistSuccess(res));
      })
      .catch(err => {
        dispatch(unFollowPlaylistError(err));
      });
  };
};
