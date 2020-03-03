export const fetchArtistsPending = () => {
  return {
    type: "FETCH_ARTISTS_PENDING"
  };
};

export const fetchArtistsSuccess = artists => {
  return {
    type: "FETCH_ARTISTS_SUCCESS",
    artists
  };
};

export const fetchArtistsError = () => {
  return {
    type: "FETCH_ARTISTS_ERROR"
  };
};

export const searchArtistPending = () => {
  return {
    type: "SEARCH_ARTIST_PENDING"
  };
};

export const searchArtistSuccess = artists => {
  return {
    type: "SEARCH_ARTIST_SUCCESS",
    artists
  };
};

export const searchArtistError = () => {
  return {
    type: "SEARCH_ARTIST_ERROR"
  };
};

export const clearArtistSearch = () => {
  return {
    type: "CLEAR_ARTIST_SEARCH"
  };
};

export const followArtistPending = () => {
  return {
    type: "FOLLOW_ARTIST_PENDING"
  };
};

export const followArtistSuccess = res => {
  return {
    type: "FOLLOW_ARTIST_SUCCESS",
    res
  };
};

export const followArtistError = () => {
  return {
    type: "FOLLOW_ARTIST_ERROR"
  };
};

export const unfollowArtistPending = () => {
  return {
    type: "UNFOLLOW_ARTIST_PENDING"
  };
};

export const unfollowArtistSuccess = res => {
  return {
    type: "UNFOLLOW_ARTIST_SUCCESS",
    res
  };
};

export const unfollowArtistError = () => {
  return {
    type: "UNFOLLOW_ARTIST_ERROR"
  };
};

export const fetchArtists = (accessToken, artistIds) => {
  return dispatch => {
    const request = new Request(
      `https://api.spotify.com/v1/me/following?type=artist`,
      //`https://api.spotify.com/v1/artists?ids=${artistIds}`,
      {
        headers: new Headers({
          Authorization: "Bearer " + accessToken
        })
      }
    );

    dispatch(fetchArtistsPending());

    fetch(request)
      .then(res => {
        return res.json();
      })
      .then(res => {
        console.log("Followed Artists:", res);
        dispatch(fetchArtistsSuccess(res.artists));
      })
      .catch(err => {
        dispatch(fetchArtistsError(err));
      });
  };
};

export const fetchArtistSongsPending = () => {
  return {
    type: "FETCH_ARTIST_SONGS_PENDING"
  };
};

export const fetchArtistSongsSuccess = songs => {
  return {
    type: "FETCH_ARTIST_SONGS_SUCCESS",
    songs
  };
};

export const fetchArtistSongsError = () => {
  return {
    type: "FETCH_ARTIST_SONGS_ERROR"
  };
};

export const fetchArtistSongs = (artistId, accessToken) => {
  return dispatch => {
    const request = new Request(
      `https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=US`,
      {
        headers: new Headers({
          Authorization: "Bearer " + accessToken
        })
      }
    );

    dispatch(fetchArtistSongsPending());

    fetch(request)
      .then(res => {
        if (res.statusText === "Unauthorized") {
          window.location.href = "./";
        }
        return res.json();
      })
      .then(res => {
        console.log(res);
        // map the response to match that returned from get song request
        res.items = res.tracks.map(item => {
          return {
            track: item
          };
        });
        console.log(res.items);
        dispatch(fetchArtistSongsSuccess(res.items));
      })
      .catch(err => {
        dispatch(fetchArtistSongsError(err));
      });
  };
};

export const searchArtist = (artistName, accessToken) => {
  return dispatch => {
    const request = new Request(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        artistName
      )}&type=artist`,

      {
        headers: new Headers({
          Authorization: "Bearer " + accessToken
        })
      }
    );

    dispatch(searchArtistPending());

    fetch(request)
      .then(res => {
        return res.json();
      })
      .then(res => {
        console.log("Searched Artist:", res.artists.items);
        dispatch(searchArtistSuccess(res.artists.items));
      })
      .catch(err => {
        dispatch(searchArtistError(err));
      });
  };
};

export const followArtist = (artistId, accessToken) => {
  return dispatch => {
    const request = new Request(
      `https://api.spotify.com/v1/me/following?type=artist&ids=${encodeURIComponent(
        artistId
      )}`,
      {
        method: "PUT",
        headers: new Headers({
          Authorization: "Bearer " + accessToken
        })
      }
    );

    dispatch(followArtistPending());

    fetch(request)
      // .then(res => {
      //   return res.json();
      // })
      .then(res => {
        console.log("Successfully followed artist:", res);
        dispatch(followArtistSuccess(res));
      })
      .catch(err => {
        dispatch(followArtistError(err));
      });
  };
};

export const unfollowArtist = (artistId, accessToken) => {
  return dispatch => {
    const request = new Request(
      `https://api.spotify.com/v1/me/following?type=artist&ids=${encodeURIComponent(
        artistId
      )}`,
      {
        method: "DELETE",
        headers: new Headers({
          Authorization: "Bearer " + accessToken
        })
      }
    );

    dispatch(unfollowArtistPending());

    fetch(request)
      // .then(res => {
      //   return res.json();
      // })
      .then(res => {
        console.log("Successfully followed artist:", res);
        dispatch(unfollowArtistSuccess(res));
      })
      .catch(err => {
        dispatch(unfollowArtistError(err));
      });
  };
};

export const setArtistIds = artistIds => {
  return {
    type: "SET_ARTIST_IDS",
    artistIds
  };
};
