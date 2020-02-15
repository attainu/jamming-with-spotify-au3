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

export const createPodcast =  (podcastData) => {
    return dispatch => {
      const request = new Request(
        `http://localhost:8888/podcasts`,
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
          //throw new Error("Request failed!");
        })
        .then(res => {
          console.log("podcast successfully created.", res);
          dispatch(createPodcastSuccess(res));
        })
        // .then(res => dispatch(fetchPlaylistsMenu(userId, accessToken)))
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

export const fetchPodcastMenu = () => {
  return dispatch => {
    const request = new Request(
      `http://localhost:8888/podcasts`
    );

    dispatch(fetchPodcastsMenuPending());

    fetch(request)
      .then(res => {
        // if (res.statusText === "Unauthorized") {
        //   window.location.href = "./";
        // }
        return res.json();
      })
      .then(res => {
        console.log(res);
        dispatch(fetchPodcastsMenuSuccess(res));
      })
      .catch(err => {
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

export const fetchPodcastSongs = (podcastId) => {
  return dispatch => {
    const request = new Request(
      `http://localhost:8888/podcasts/${podcastId}`
    );

    dispatch(fetchPodcastSongsPending());

    fetch(request)
      .then(res => {
        // if (res.statusText === "Unauthorized") {
        //   window.location.href = "./";
        // }
        return res.json();
      })
      .then(res => {
        res = res.map(item => {
          return {
            track: item
          };
        });
        dispatch(fetchPodcastSongsSuccess(res));
      })
      .catch(err => {
        dispatch(fetchPodcastSongsError(err));
      });
  };
};

export const saveTrackToPodcastPending = () => {
  return {
    type: "SAVE_PODCAST_TRACK_PENDING"
  };
};

export const saveTrackToPodcastSuccess = addedTrack => {
  return {
    type: "SAVE_PODCAST_TRACK_SUCCESS",
    addedTrack
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
      `http://localhost:8888/podcasts/${podcastId}`,
      {
        headers: new Headers({
          "Content-Type": "application/json",
          // 'Access-Control-Allow-Origin' : 'http://localhost:3000'
        }),
        method: "PUT",
        body: JSON.stringify(trackDetails)
      }
    );

    dispatch(saveTrackToPodcastPending());

    fetch(request)
      .then(res => {
        return res
      })
      .then(res => {
        
        res = {
          track : res
        }
        console.log("tracks stored inside podcast", res);
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

export const deletePodcastSuccess = (delResponse) => {
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

export const deletePodcast = (podcastId) => {
  return dispatch => {
    const request = new Request(
      `http://localhost:8888/podcasts/${podcastId}`,
      {
        method: "DELETE"
      }
    );

    dispatch(deletePodcastPending());

    fetch(request)
      .then(res => {
        if(res.ok){
          return res
        }
        dispatch(deletePodcastError('Response error'))
      })

      .then(res => {
        console.log("deleted podcast", res);
        dispatch(deletePodcastSuccess(res));
      })
      .catch(err => {
        dispatch(deletePodcastError(err));
      });
  };
};