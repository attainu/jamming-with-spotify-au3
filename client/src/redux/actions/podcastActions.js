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