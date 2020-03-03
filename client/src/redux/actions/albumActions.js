export const fetchAlbumsSuccess = albums => {
  return {
    type: "FETCH_ALBUMS_SUCCESS",
    albums
  };
};

export const fetchAlbumsError = () => {
  return {
    type: "FETCH_ALBUMS_ERROR"
  };
};

export const fetchAlbumsPending = () => {
  return {
    type: "FETCH_ALBUMS_PENDING"
  };
};

export const saveAlbumPending = () => {
  return {
    type: "SAVE_ALBUM_PENDING"
  };
};

export const saveAlbumError = () => {
  return {
    type: "SAVE_ALBUM_ERROR"
  };
};

export const saveAlbumSuccess = savedAlbum => {
  return {
    type: "SAVE_ALBUM_SUCCESS",
    savedAlbum
  };
};

export const unFollowAlbumPending = () => {
  return {
    type: "UNFOLLOW_ALBUM_PENDING"
  };
};

export const unFollowAlbumError = () => {
  return {
    type: "UNFOLLOW_ALBUM_ERROR"
  };
};

export const unFollowAlbumSuccess = unFollowedAlbum => {
  return {
    type: "UNFOLLOW_ALBUM_SUCCESS",
    unFollowedAlbum
  };
};

export const addAlbum = album => {
  return {
    type: "ADD_ALBUM",
    album
  };
};

export const searchAlbumPending = () => {
  return {
    type: "SEARCH_ALBUM_PENDING"
  };
};

export const searchAlbumSuccess = albums => {
  return {
    type: "SEARCH_ALBUM_SUCCESS",
    albums
  };
};

export const searchAlbumError = () => {
  return {
    type: "SEARCH_ALBUM_ERROR"
  };
};

export const clearAlbumSearch = () => {
  return {
    type: "CLEAR_ALBUM_SEARCH"
  };
};

export const fetchAlbums = accessToken => {
  return dispatch => {
    const request = new Request(`https://api.spotify.com/v1/me/albums`, {
      headers: new Headers({
        Authorization: "Bearer " + accessToken
      })
    });
    dispatch(fetchAlbumsPending());

    fetch(request)
      .then(res => {
        return res.json();
      })
      .then(res => {
        console.log(res.items);
        dispatch(fetchAlbumsSuccess(res.items));
      })
      .catch(err => {
        dispatch(fetchAlbumsError(err));
      });
  };
};

//fetch tracks of an album
export const fetchAlbumTracksSuccess = albumTracks => {
  return {
    type: "FETCH_ALBUM_TRACKS_SUCCESS",
    albumTracks
  };
};

export const fetchAlbumTracksError = () => {
  return {
    type: "FETCH_ALBUM_TRACKS_ERROR"
  };
};

export const fetchAlbumTracksPending = () => {
  return {
    type: "FETCH_ALBUM_TRACKS_PENDING"
  };
};

export const fetchAlbumTracks = (accessToken, albumId) => {
  return dispatch => {
    console.log(dispatch);
    const request = new Request(
      `https://api.spotify.com/v1/albums/${albumId}/tracks`,
      {
        headers: new Headers({
          Authorization: "Bearer " + accessToken
        })
      }
    );
    dispatch(fetchAlbumTracksPending());

    fetch(request)
      .then(res => {
        return res.json();
      })
      .then(res => {
        console.log(res);
        dispatch(fetchAlbumTracksSuccess(res.items));
      })
      .catch(err => {
        console.log(err);
        dispatch(fetchAlbumTracksError(err));
      });
  };
};

export const saveAlbum = (albumId, accessToken) => {
  return dispatch => {
    const request = new Request(
      `https://api.spotify.com/v1/me/albums?ids=${albumId}`,
      {
        headers: new Headers({
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json"
        }),
        method: "PUT"
      }
    );
    dispatch(saveAlbumPending());

    fetch(request)
      // .then(res => {
      //   if (res.statusText === "Unauthorized") {
      //     window.location.href = "./";
      //   }
      //   return res.json();
      // })
      .then(res => {
        console.log("Save Album", res);
        dispatch(saveAlbumSuccess(res));
      })
      .catch(err => {
        dispatch(saveAlbumError(err));
      });
  };
};

export const unFollowAlbum = (albumId, accessToken) => {
  return dispatch => {
    const request = new Request(
      `https://api.spotify.com/v1/me/albums?ids=${albumId}`,
      {
        headers: new Headers({
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json"
        }),
        method: "DELETE"
      }
    );
    dispatch(unFollowAlbumPending());

    fetch(request)
      .then(res => {
        console.log("Unfollow Album", res);
        dispatch(unFollowAlbumSuccess(res));
      })
      .catch(err => {
        dispatch(unFollowAlbumError(err));
      });
  };
};

export const searchAlbum = (albumName, accessToken) => {
  return dispatch => {
    const request = new Request(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        albumName
      )}&type=album`,

      {
        headers: new Headers({
          Authorization: "Bearer " + accessToken
        })
      }
    );

    dispatch(searchAlbumPending());

    fetch(request)
      .then(res => {
        return res.json();
      })
      .then(res => {
        console.log("Searched Album:", res.albums.items);
        dispatch(searchAlbumSuccess(res.albums.items));
      })
      .catch(err => {
        dispatch(searchAlbumError(err));
      });
  };
};
