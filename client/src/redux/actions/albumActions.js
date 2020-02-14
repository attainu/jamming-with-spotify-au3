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

export const addAlbum = album => {
  return {
    type: "ADD_ALBUM",
    album
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
        res.items = res.items.map(item => {
          return {
            track: item
          };
        });
        console.log(res.items);
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
      .then(res => {
        if (res.statusText === "Unauthorized") {
          window.location.href = "./";
        }
        return res.json();
      })
      .then(res => {
        console.log("Save Album", res);
        dispatch(saveAlbumSuccess(res.items));
      })
      .catch(err => {
        dispatch(saveAlbumError(err));
      });
  };
};
