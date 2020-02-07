export const fetchUserSuccess = user => {
  return {
    type: "FETCH_USER_SUCCESS",
    user
  };
};

export const fetchUserError = () => {
  return {
    type: "FETCH_USER_ERROR"
  };
};

export const fetchUser = accessToken => {
  return dispatch => {
    const request = new Request("https://api.spotify.com/v1/me", {
      headers: new Headers({
        Authorization: "Bearer " + accessToken
      })
    });

    fetch(request)
      .then(res => {
        console.log("Fetch User Details :", res);
        // send user back to homepage if no token
        if (res.statusText === "Unauthorized") {
          window.location.href = "./";
        }
        return res.json();
      })
      .then(res => {
        dispatch(fetchUserSuccess(res));
      })
      .catch(err => {
        dispatch(fetchUserError(err));
      });
  };
};
