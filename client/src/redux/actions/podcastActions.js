export const createPodcastPending = () => {
  return {
    type: "CREATE_PODCAST_PENDING"
  };
};

export const createPodcastSuccess = podcast => {
  return {
    type: "CREATE_PODCAST_SUCCESS",
    podcast
  };
};

export const createPodcastError = () => {
  return {
    type: "CREATE_PODCAST_ERROR"
  };
};

export const createPodcast = podcastData => {
  return dispatch => {
    const request = new Request(
      `https://jamming-spotify.herokuapp.com/podcasts`,
      {
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        method: "POST",
        body: JSON.stringify(podcastData)
      }
    );

    dispatch(createPodcastPending());
    fetch(request)
      .then(res => {
        if (res.ok) {
          return res;
        }
        dispatch(createPodcastError("Request failed!"));
      })
      .then(res => {
        console.log("podcast successfully created.", res);
        dispatch(createPodcastSuccess(res));
      })
      .catch(err => {
        dispatch(createPodcastError(err));
      });
  };
};

export const fetchPodcastsMenuPending = () => {
  return {
    type: "FETCH_PODCASTS_MENU_PENDING"
  };
};

export const fetchPodcastsMenuSuccess = podcasts => {
  return {
    type: "FETCH_PODCASTS_MENU_SUCCESS",
    podcasts
  };
};

export const fetchPodcastsMenuError = () => {
  return {
    type: "FETCH_PODCASTS_MENU_ERROR"
  };
};

export const fetchPodcastMenu = userName => {
  return dispatch => {
    const request = new Request(
      `https://jamming-spotify.herokuapp.com/podcasts/${userName}`
    );

    dispatch(fetchPodcastsMenuPending());

    fetch(request)
      .then(res => {
        return res.json();
      })
      .then(res => {
        dispatch(fetchPodcastsMenuSuccess(res));
      })
      .catch(err => {
        console.log(err);
        dispatch(fetchPodcastsMenuError(err));
      });
  };
};

export const fetchPodcastSongsPending = () => {
  return {
    type: "FETCH_PODCASTS_SONGS_PENDING"
  };
};

export const fetchPodcastSongsSuccess = songs => {
  return {
    type: "FETCH_PODCASTS_SONGS_SUCCESS",
    songs
  };
};

export const fetchPodcastSongsError = () => {
  return {
    type: "FETCH_PODCASTS_SONGS_ERROR"
  };
};

export const fetchPodcastSongs = podcastId => {
  return dispatch => {
    const request = new Request(
      `https://jamming-spotify.herokuapp.com/podcast/${podcastId}`
    );

    dispatch(fetchPodcastSongsPending());

    fetch(request)
      .then(res => {
        return res.json();
      })
      .then(res => {
        dispatch(fetchPodcastSongsSuccess(res));
      })
      .catch(err => {
        console.log("error", err);
        dispatch(fetchPodcastSongsError(err));
      });
  };
};

export const saveTrackToPodcastPending = () => {
  return {
    type: "SAVE_PODCAST_TRACK_PENDING"
  };
};

export const saveTrackToPodcastSuccess = saveTrackRes => {
  return {
    type: "SAVE_PODCAST_TRACK_SUCCESS",
    saveTrackRes
  };
};

export const saveTrackToPodcastError = () => {
  return {
    type: "SAVE_PODCAST_TRACK_ERROR"
  };
};

export const saveTrackToPodcast = (podcastId, trackDetails) => {
  return dispatch => {
    const request = new Request(
      `https://jamming-spotify.herokuapp.com/updatePodcast/${podcastId}`,
      {
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        method: "PUT",
        body: JSON.stringify(trackDetails)
      }
    );
    dispatch(saveTrackToPodcastPending());

    fetch(request)
      .then(res => {
        return res;
      })
      .then(res => {
        dispatch(saveTrackToPodcastSuccess(res));
      })
      .catch(err => {
        dispatch(saveTrackToPodcastError(err));
      });
  };
};

export const deletePodcastPending = () => {
  return {
    type: "DELETE_PODCAST_PENDING"
  };
};

export const deletePodcastSuccess = delResponse => {
  return {
    type: "DELETE_PODCAST_SUCCESS",
    delResponse
  };
};

export const deletePodcastError = () => {
  return {
    type: "DELETE_PODCAST_ERROR"
  };
};

export const deletePodcast = podcastId => {
  return dispatch => {
    const request = new Request(
      `https://jamming-spotify.herokuapp.com/podcasts/${podcastId}`,
      {
        method: "DELETE"
      }
    );

    dispatch(deletePodcastPending());

    fetch(request)
      .then(res => {
        if (res.ok) {
          return res;
        }
        dispatch(deletePodcastError("Response error"));
      })

      .then(res => {
        dispatch(deletePodcastSuccess(res));
      })
      .catch(err => {
        dispatch(deletePodcastError(err));
      });
  };
};

export const deleteTrackFromPodcastPending = () => {
  return {
    type: "DELETE_TRACK_FROM_PODCAST_PENDING"
  };
};

export const deleteTrackFromPodcastSuccess = delTrackRes => {
  return {
    type: "DELETE_TRACK_FROM_PODCAST_SUCCESS",
    delTrackRes
  };
};

export const deleteTrackFromPodcastError = () => {
  return {
    type: "DELETE_TRACK_FROM_PODCAST_ERROR"
  };
};

export const deleteTrackFromPodcast = (podcastId, trackId) => {
  return dispatch => {
    const request = new Request(
      `https://jamming-spotify.herokuapp.com/podcast/${podcastId}/${trackId}`,
      {
        method: "DELETE"
      }
    );

    dispatch(deleteTrackFromPodcastPending());

    fetch(request)
      .then(res => {
        return res;
      })
      .then(res => {
        dispatch(deleteTrackFromPodcastSuccess(res));
      })
      .catch(err => {
        dispatch(deleteTrackFromPodcastError(err));
      });
  };
};

export const editPodcastPending = () => {
  return {
    type: "EDIT_PODCAST_PENDING"
  };
};

export const editPodcastSuccess = updateRes => {
  return {
    type: "EDIT_PODCAST_SUCCESS",
    updateRes
  };
};

export const editPodcastError = () => {
  return {
    type: "EDIT_PODCAST_ERROR"
  };
};

export const editPodcast = (podcastId, data) => {
  return dispatch => {
    const request = new Request(
      `https://jamming-spotify.herokuapp.com/${podcastId}`,
      {
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        method: "PUT",
        body: data
      }
    );

    dispatch(editPodcastPending());

    fetch(request)
      .then(res => {
        return res;
      })
      .then(res => {
        console.log("podcast successfully updated.", res);
        dispatch(editPodcastSuccess(res));
      })
      .catch(err => {
        dispatch(editPodcastError(err));
      });
  };
};